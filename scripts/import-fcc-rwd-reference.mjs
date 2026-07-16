import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const upstreamRoot = process.argv[2] ?? process.env.FREECODECAMP_ROOT;

if (!upstreamRoot) {
  throw new Error(
    'Pass a freeCodeCamp checkout path or set FREECODECAMP_ROOT. Example: npm run curriculum:reference:rwd -- /tmp/freecodecamp-rwd'
  );
}

const commit = execFileSync('git', ['-C', upstreamRoot, 'rev-parse', 'HEAD'], {
  encoding: 'utf8',
}).trim();
if (process.env.FREECODECAMP_COMMIT && process.env.FREECODECAMP_COMMIT !== commit) {
  throw new Error(
    `FREECODECAMP_COMMIT ${process.env.FREECODECAMP_COMMIT} differs from checkout HEAD ${commit}.`
  );
}
const structurePath = path.join(
  upstreamRoot,
  'curriculum/structure/superblocks/responsive-web-design-v9.json'
);
const blocksRoot = path.join(upstreamRoot, 'curriculum/structure/blocks');
const structure = JSON.parse(await readFile(structurePath, 'utf8'));

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const topLevelSections = (source) =>
  [...source.matchAll(/^# --([a-z-]+)--\s*$/gm)].map((match) => match[1]);
const section = (source, name) => {
  const marker = `# --${name}--`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) return '';
  const bodyStart = markerIndex + marker.length;
  const remaining = source.slice(bodyStart);
  const nextSection = remaining.search(/\n# --[a-z-]+--\s*$/m);
  return nextSection < 0 ? remaining : remaining.slice(0, nextSection);
};
const sourceEvidence = async (blockSlug, challenge) => {
  const relativePath = path.posix.join(
    'curriculum',
    'challenges',
    'english',
    'blocks',
    blockSlug,
    `${challenge.id}.md`
  );
  const source = await readFile(path.join(upstreamRoot, relativePath), 'utf8');
  const hints = section(source, 'hints');
  const questions = section(source, 'questions');
  const quizzes = section(source, 'quizzes');
  return {
    relativePath,
    sha256: sha256(source),
    bytes: Buffer.byteLength(source),
    topLevelSections: topLevelSections(source),
    hintCheckCount: [...hints.matchAll(/```(?:js|javascript)\s*\n/g)].length,
    quizQuestionCount:
      [...questions.matchAll(/^## --text--\s*$/gm)].length +
      [...quizzes.matchAll(/^### --question--\s*$/gm)].length,
    codeLanguages: [
      ...new Set(
        [...source.matchAll(/^```([^\s`]*)\s*$/gm)]
          .map((match) => match[1] || 'plain')
          .filter((language) => language !== 'md')
      ),
    ].sort(),
  };
};

const chapters = [];
const totals = {
  chapters: structure.chapters.length,
  modules: 0,
  blocks: 0,
  challenges: 0,
  byType: {},
};

for (const chapter of structure.chapters) {
  const modules = [];
  for (const module of chapter.modules) {
    const blocks = [];
    for (const slug of module.blocks) {
      const block = JSON.parse(await readFile(path.join(blocksRoot, `${slug}.json`), 'utf8'));
      const type = block.blockLabel ?? 'unknown';
      const challengeCount = block.challengeOrder?.length ?? 0;
      const challengeOrder = await Promise.all(
        (block.challengeOrder ?? []).map(async ({ id, title }) => ({
          id,
          title,
          sourceEvidence: await sourceEvidence(slug, { id }),
        }))
      );
      blocks.push({
        objectiveId: `fcc-v9-${slug}`,
        slug,
        type,
        challengeCount,
        challengeOrder,
      });
      totals.blocks += 1;
      totals.challenges += challengeCount;
      totals.byType[type] ??= { blocks: 0, challenges: 0 };
      totals.byType[type].blocks += 1;
      totals.byType[type].challenges += challengeCount;
    }
    modules.push({
      id: module.dashedName,
      type: module.moduleType ?? 'instructional',
      blocks,
    });
    totals.modules += 1;
  }
  chapters.push({
    id: chapter.dashedName,
    type: chapter.chapterType ?? 'instructional',
    modules,
  });
}

const reference = {
  schemaVersion: 2,
  source: 'freeCodeCamp Responsive Web Design v9',
  sourceUrl: 'https://www.freecodecamp.org/learn/responsive-web-design-v9/',
  upstreamCommit: commit,
  capturedAt: '2026-07-13T00:00:00.000Z',
  totals,
  chapters,
};

const challengeIds = chapters.flatMap((chapter) =>
  chapter.modules.flatMap((module) =>
    module.blocks.flatMap((block) => block.challengeOrder.map((challenge) => challenge.id))
  )
);
if (challengeIds.length !== new Set(challengeIds).size) {
  throw new Error('Responsive Web Design v9 reference contains duplicate challenge IDs.');
}

const output = path.join(process.cwd(), 'references', 'freecodecamp-rwd-v9.json');
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(reference, null, 2)}\n`);
console.log(
  `Wrote ${output}: ${totals.modules} modules, ${totals.blocks} blocks, ${totals.challenges} challenges.`
);
