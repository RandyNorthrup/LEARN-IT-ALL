import { load } from 'cheerio';
import * as csstree from 'css-tree';
import type { RequirementResult, WebExerciseFiles, WebRequirement } from '@/types/exercise';

function normalized(value: string): string {
  return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

function readCssDeclarations(css: string): Map<string, Map<string, string>> {
  const rules = new Map<string, Map<string, string>>();
  const ast = csstree.parse(css, { positions: false });

  csstree.walk(ast, {
    visit: 'Rule',
    enter(node) {
      if (node.type !== 'Rule' || node.prelude.type !== 'SelectorList') return;

      const selectors = csstree
        .generate(node.prelude)
        .split(',')
        .map((selector) => normalized(selector));
      const declarations = new Map<string, string>();

      if (node.block.type === 'Block') {
        node.block.children.forEach((child) => {
          if (child.type === 'Declaration') {
            declarations.set(
              child.property.toLowerCase(),
              normalized(csstree.generate(child.value))
            );
          }
        });
      }

      selectors.forEach((selector) => {
        rules.set(selector, declarations);
      });
    },
  });

  return rules;
}

export function validateWebExercise(
  files: WebExerciseFiles,
  requirements: WebRequirement[]
): RequirementResult[] {
  const $ = load(files.html);
  let cssRules: Map<string, Map<string, string>> | null = null;
  let cssError: string | null = null;

  try {
    cssRules = readCssDeclarations(files.css);
  } catch (error) {
    cssError = error instanceof Error ? error.message : 'Invalid CSS';
  }

  return requirements.map((requirement): RequirementResult => {
    const base = {
      id: requirement.id,
      description: requirement.description,
      hint: requirement.hint,
    };

    try {
      switch (requirement.type) {
        case 'selector-exists': {
          const count = $(requirement.selector).length;
          return { ...base, passed: count > 0, actual: `${count} found` };
        }
        case 'text-includes': {
          const actual = $(requirement.selector).first().text();
          return {
            ...base,
            passed: normalized(actual).includes(normalized(requirement.expected)),
            actual: actual.trim() || 'No text found',
          };
        }
        case 'attribute-equals': {
          const actual = $(requirement.selector).first().attr(requirement.attribute) ?? '';
          return {
            ...base,
            passed: normalized(actual) === normalized(requirement.expected),
            actual: actual || `${requirement.attribute} missing`,
          };
        }
        case 'css-property': {
          if (cssError || !cssRules) {
            return { ...base, passed: false, actual: cssError ?? 'Invalid CSS' };
          }
          const declaration = cssRules
            .get(normalized(requirement.selector))
            ?.get(requirement.property.toLowerCase());
          return {
            ...base,
            passed: normalized(declaration ?? '') === normalized(requirement.expected),
            actual: declaration ?? `${requirement.property} missing`,
          };
        }
        case 'source-includes': {
          const actual = files[requirement.source];
          return {
            ...base,
            passed: normalized(actual).includes(normalized(requirement.expected)),
            actual: `Checked ${requirement.source.toUpperCase()} source`,
          };
        }
      }
      return { ...base, passed: false, actual: 'Unknown requirement type' };
    } catch (error) {
      return {
        ...base,
        passed: false,
        actual: error instanceof Error ? error.message : 'Validation failed',
      };
    }
  });
}
