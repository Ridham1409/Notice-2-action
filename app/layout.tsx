import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Notice2Action — From Government Notice to Student Action',
  description:
    'Gujarat Education Intelligence Agent for scholarships, exams, admissions and verified deadline intelligence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}
