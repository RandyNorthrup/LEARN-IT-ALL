import { PUBLISHED_COURSES } from '@/lib/data/publishedCourses';
import { dbHelpers } from '@/lib/db';
import SettingsClient from './SettingsClient';

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  const settings = dbHelpers.getSettings() as { displayName?: string } | undefined;
  return (
    <SettingsClient
      initialDisplayName={settings?.displayName ?? 'Learner'}
      courses={PUBLISHED_COURSES.map((course) => ({ id: course.id, title: course.title }))}
    />
  );
}
