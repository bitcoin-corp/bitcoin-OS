import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bitcoin OS Test Environment',
  description: 'Testing the new Bitcoin OS UI Kit',
}

export default function TestOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      {children}
    </div>
  );
}