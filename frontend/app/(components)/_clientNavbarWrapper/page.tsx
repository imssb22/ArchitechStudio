'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../_navbar/page';

export default function ClientNavbarWrapper() {
  const pathname = usePathname();

  // Render Navbar on all routes except "/"
  if (pathname === '/') return null;

  return <Navbar />;
}
