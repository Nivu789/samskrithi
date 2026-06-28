'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/',           label: 'Home'       },
  { href: '/about',      label: 'About'      },
  { href: '/activities', label: 'Activities' },
  { href: '/gallery',    label: 'Gallery'    },
  { href: '/events',     label: 'Events'     },
  { href: '/contact',    label: 'Contact'    },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brown-darkest shadow-[0_2px_20px_rgba(61,31,10,0.4)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-playfair text-2xl text-cream tracking-wide">
          Samskrithi<span className="text-gold">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-xs tracking-widest uppercase font-medium transition-colors duration-200 ${
                  pathname === href
                    ? 'text-gold'
                    : 'text-cream-dark hover:text-gold'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] cursor-pointer p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span
            className={`block w-6 h-px bg-cream-dark origin-center transition-all duration-300 ${
              open ? 'rotate-45 translate-y-[6px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-cream-dark transition-all duration-300 ${
              open ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-cream-dark origin-center transition-all duration-300 ${
              open ? '-rotate-45 -translate-y-[6px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-brown-darkest border-t border-brown-mid/30`}
      >
        <div className="px-6 py-4 space-y-3">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block text-xs tracking-widest uppercase font-medium py-1 transition-colors ${
                pathname === href ? 'text-gold' : 'text-cream-dark hover:text-gold'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
