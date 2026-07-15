import PracticeArcade from '@/components/games/PracticeArcade';

export default function AlgorithmArenaPage() {
  return (
    <PracticeArcade
      mode="algorithm-arena"
      title="Algorithm Arena"
      description="Reason from invariants, complexity, and changed inputs. Correctness is deterministic: every answer is checked against explicit evidence."
    />
  );
}
