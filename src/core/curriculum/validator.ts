import { load } from 'cheerio';
import * as csstree from 'css-tree';
import {
  type ParserError,
  parse as parseHtmlDocument,
  parseFragment as parseHtmlFragment,
} from 'parse5';
import { evaluateConfigContract } from '../learning/configLabSimulator';
import { evaluatePrompt } from '../learning/promptHarness';
import type { CurriculumCheck } from './schema';

export interface CurriculumSubmission {
  files?: {
    html?: string;
    css?: string;
    javascript?: string;
    typescript?: string;
    python?: string;
    go?: string;
    c?: string;
    sql?: string;
    shell?: string;
    prompt?: string;
    config?: string;
  };
  selectedOptionId?: string;
  orderedOptionIds?: string[];
  textResponse?: string;
}

export interface CurriculumCheckResult {
  id: string;
  description: string;
  passed: boolean;
  feedback: string;
}

function normalize(value: string): string {
  return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

function cssDeclarations(css: string): Map<string, Map<string, string>> {
  const rules = new Map<string, Map<string, string>>();
  const ast = csstree.parse(css, { positions: false });

  csstree.walk(ast, {
    visit: 'Rule',
    enter(node) {
      if (node.type !== 'Rule' || node.prelude.type !== 'SelectorList') return;
      const declarations = new Map<string, string>();
      node.block.children.forEach((child) => {
        if (child.type === 'Declaration') {
          declarations.set(child.property.toLowerCase(), normalize(csstree.generate(child.value)));
        }
      });
      csstree
        .generate(node.prelude)
        .split(',')
        .forEach((selector) => {
          rules.set(normalize(selector), declarations);
        });
    },
  });

  return rules;
}

export function validateCurriculumChecks(
  submission: CurriculumSubmission,
  checks: CurriculumCheck[]
): CurriculumCheckResult[] {
  const html = submission.files?.html ?? '';
  const css = submission.files?.css ?? '';
  const $ = load(html);
  let rules: Map<string, Map<string, string>> | null = null;
  let cssError = '';

  try {
    rules = cssDeclarations(css);
  } catch (error) {
    cssError = error instanceof Error ? error.message : 'CSS could not be parsed';
  }

  return checks.map((check) => {
    let passed = false;
    let observed = '';
    let includeObservedFeedback = true;

    try {
      switch (check.type) {
        case 'dom-selector-count': {
          const count = $(check.selector).length;
          passed =
            count >= check.minimum && (check.maximum === undefined || count <= check.maximum);
          observed = `Found ${count}; expected ${check.minimum}${check.maximum === undefined ? ' or more' : check.maximum === check.minimum ? '' : ` to ${check.maximum}`}`;
          break;
        }
        case 'dom-text': {
          observed = $(check.selector).first().text().trim();
          passed =
            check.comparison === 'exact'
              ? normalize(observed) === normalize(check.expected)
              : normalize(observed).includes(normalize(check.expected));
          break;
        }
        case 'dom-relationship': {
          const subjects = $(check.subjectSelector).toArray();
          const matching = subjects.filter((subject) => {
            const element = $(subject);
            switch (check.relation) {
              case 'direct-child':
                return element.parent().is(check.targetSelector);
              case 'descendant':
                return element.parents(check.targetSelector).length > 0;
              case 'immediately-after':
                return element.prev().is(check.targetSelector);
              case 'after':
                return element.prevAll(check.targetSelector).length > 0;
            }
            return false;
          }).length;
          passed = matching >= check.minimum;
          observed = `${matching} of ${subjects.length} matched ${check.relation} ${check.targetSelector}`;
          break;
        }
        case 'dom-attribute': {
          const element = $(check.selector).first();
          const value = element.attr(check.attribute);
          observed = value ?? 'Attribute missing';
          switch (check.comparison) {
            case 'present':
              passed = value !== undefined;
              break;
            case 'absent':
              passed = value === undefined;
              break;
            case 'exact':
              passed = value !== undefined && normalize(value) === normalize(check.expected ?? '');
              break;
            case 'token':
              passed = Boolean(
                value
                  ?.split(/\s+/u)
                  .some((token) => normalize(token) === normalize(check.expected ?? ''))
              );
              break;
          }
          break;
        }
        case 'html-parse-errors': {
          const errors: ParserError[] = [];
          const options = { onParseError: (error: ParserError) => errors.push(error) };
          if (check.mode === 'document') parseHtmlDocument(html, options);
          else parseHtmlFragment(html, options);
          const ignored = new Set(check.ignoredErrorCodes);
          const relevant = errors.filter((error) => !ignored.has(error.code));
          passed = relevant.length <= check.maximumErrors;
          observed = relevant.length
            ? `${relevant.length} parser error(s): ${[...new Set(relevant.map((error) => error.code))].join(', ')}`
            : 'No relevant parser errors';
          break;
        }
        case 'css-declaration': {
          observed =
            rules?.get(normalize(check.selector))?.get(check.property.toLowerCase()) ??
            (cssError || 'Declaration missing');
          passed = normalize(observed) === normalize(check.expected);
          break;
        }
        case 'source-includes': {
          const source = submission.files?.[check.file] ?? '';
          passed = normalize(source).includes(normalize(check.expected));
          observed = `Checked ${check.file.toUpperCase()} source`;
          break;
        }
        case 'source-matches': {
          const source = submission.files?.[check.file] ?? '';
          passed = new RegExp(check.pattern, check.flags).test(source);
          observed = `Checked ${check.file.toUpperCase()} source`;
          break;
        }
        case 'prompt-contract': {
          const prompt = submission.files?.prompt ?? '';
          const markerIndex = check.afterMarker ? prompt.lastIndexOf(check.afterMarker) : 0;
          const scopedPrompt = check.afterMarker
            ? markerIndex >= 0
              ? prompt.slice(markerIndex + check.afterMarker.length)
              : ''
            : prompt;
          const results = evaluatePrompt(scopedPrompt);
          const resultById = new Map(results.map((result) => [result.id, result]));
          const missing = check.requiredCriteria.filter((id) => !resultById.get(id)?.passed);
          passed = missing.length === 0;
          observed = missing.length
            ? `Missing: ${missing.join(', ')}`
            : 'Required prompt contract present';
          break;
        }
        case 'config-contract': {
          const results = evaluateConfigContract(submission.files?.config ?? '', check.workspace);
          const resultById = new Map(results.map((result) => [result.id, result]));
          const missing = check.requiredCriteria.filter((id) => !resultById.get(id)?.passed);
          passed = missing.length === 0;
          observed = missing.length
            ? `Missing: ${missing.join(', ')}`
            : 'Required configuration contract present';
          break;
        }
        case 'choice-equals': {
          observed = submission.selectedOptionId ?? 'No option selected';
          passed = observed === check.expectedOptionId;
          includeObservedFeedback = false;
          break;
        }
        case 'order-equals': {
          const submitted = submission.orderedOptionIds ?? [];
          observed = submitted.join(' > ') || 'No order submitted';
          passed =
            submitted.length === check.expectedOptionIds.length &&
            submitted.every((optionId, index) => optionId === check.expectedOptionIds[index]);
          includeObservedFeedback = false;
          break;
        }
        case 'written-evidence': {
          const response = submission.textResponse?.trim() ?? '';
          passed =
            response.length >= check.minimumCharacters &&
            response.length <= check.maximumCharacters;
          observed = `${response.length} characters; human or rubric review remains required`;
          break;
        }
        case 'number-equals': {
          const response = submission.textResponse?.trim() ?? '';
          const numericText = response.match(/[-+]?(?:\d[\d,]*\.?\d*|\.\d+)(?:e[-+]?\d+)?/i)?.[0];
          const value = numericText ? Number(numericText.replaceAll(',', '')) : Number.NaN;
          const normalizedResponse = normalize(response);
          const unitPassed =
            check.acceptedUnits.length === 0 ||
            check.acceptedUnits.some((unit) => normalizedResponse.includes(normalize(unit)));
          passed =
            Number.isFinite(value) &&
            Math.abs(value - check.expected) <= check.tolerance &&
            unitPassed;
          observed = Number.isFinite(value)
            ? `${value}${unitPassed ? '' : '; required unit missing'}`
            : 'No number supplied';
          break;
        }
      }
    } catch (error) {
      observed = error instanceof Error ? error.message : 'Check could not run';
    }

    return {
      id: check.id,
      description: check.description,
      passed,
      feedback: passed
        ? check.type === 'written-evidence'
          ? 'Evidence recorded; review required.'
          : 'Passed'
        : `${check.failureMessage}${includeObservedFeedback ? ` Observed: ${observed}` : ''}`,
    };
  });
}
