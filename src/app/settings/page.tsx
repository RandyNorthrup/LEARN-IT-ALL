import { ALL_COURSES } from '@/lib/data/courses';
import { dbHelpers } from '@/lib/db';
import SettingsClient from './SettingsClient';

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  const settings = dbHelpers.getSettings() as { displayName?: string } | undefined;
  return (
    <SettingsClient
      initialDisplayName={settings?.displayName ?? 'Learner'}
      courses={ALL_COURSES.map((course) => ({ id: course.id, title: course.title }))}
    />
  );
}
