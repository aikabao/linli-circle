'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: '首卷', path: '/' },
  { name: '智联', path: '/zhilian' },
  { name: '自治', path: '/zizhi' },
  { name: '烟火', path: '/yanhuo' },
  { name: '格物', path: '/gewu' },
  { name: '入圈', path: '/ruquan' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-matte py-4 px-4 md:px-8 flex justify-center gap-4 md:gap-8">
      {navItems.map(item => (
        <Link
          key={item.path}
          href={item.path}
          className={`text-lg transition relative ${pathname === item.path ? 'text-cinnabar' : 'text-gray-700'} hover:text-cinnabar`}
        >
          {item.name}
          {pathname === item.path && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cinnabar rounded-full" />
          )}
        </Link>
      ))}
    </nav>
  );
}