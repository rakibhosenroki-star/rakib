import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Lock, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full bg-slate-900/60 dark:bg-slate-950/60 backdrop-blur-xl border border-white/10 shadow-2xl transition-all">
        {/* Brand Logo */}
        <a href="#home" className="text-xl font-black tracking-tight text-white flex items-center">
          RAKIB<span className="text-purple-500 cursor-pointer select-none" onDoubleClick={onOpenAdmin} title="RAKIB.">.</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-200 hover:text-purple-400 hover:border-purple-500/50 transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-200 hover:text-white p-1"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto p-6 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-purple-400 py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
