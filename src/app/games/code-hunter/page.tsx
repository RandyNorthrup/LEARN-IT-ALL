import PracticeArcade from '@/components/games/PracticeArcade';

export default function CodeHunterPage() {
  return (
    <PracticeArcade
      mode="code-hunter"
      title="Bug Forensics"
      description="Locate the causal line, predict the failure, and select a repair that still works in a changed case."
    />
  );
}
