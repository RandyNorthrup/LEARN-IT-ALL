import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LEARN-IT-ALL',
  description: 'Complete Custom Learning Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
