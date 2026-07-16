import { execFileSync } from 'node:child_process';
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
const structurePath = path.join(
  upstreamRoot,
  'curriculum/structure/superblocks/responsive-web-design-v9.json'
);
const blocksRoot = path.join(upstreamRoot, 'curriculum/structure/blocks');
const structure = JSON.parse(await readFile(structurePath, 'utf8'));

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
      const challengeOrder = (block.challengeOrder ?? []).map(({ id, title }) => ({ id, title }));
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
  schemaVersion: 1,
  source: 'freeCodeCamp Responsive Web Design v9',
  sourceUrl: 'https://www.freecodecamp.org/learn/responsive-web-design-v9/',
  upstreamCommit: process.env.FREECODECAMP_COMMIT ?? commit,
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
