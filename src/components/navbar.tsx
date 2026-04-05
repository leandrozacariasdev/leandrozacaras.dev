'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Globe, ChevronDown, Sun, Moon } from 'lucide-react';
import { useLocale, translations } from '@/components/locale-provider';

interface NavbarProps {
  showBack?: boolean;
}

export default function Navbar({ showBack = false }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, mounted } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  
  const t = translations[locale];
  const navLabels = t.nav;

  const toggleLocale = () => {
    setLocale(locale === 'pt-BR' ? 'en' : 'pt-BR');
  };

  const mainLinks = [
    { href: '/about', label: navLabels.about },
    { href: '/experience', label: navLabels.experience },
  ];

  const moreLinks = [
    { href: '/skills', label: navLabels.skills },
    { href: '/books', label: navLabels.books },
    { href: '/education', label: navLabels.education },
    { href: '/publications', label: navLabels.publications },
  ];

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/" className="font-bold text-lg">LZ<span className="text-blue-600 text-2xl">.</span>dev</Link>
        
        <button 
          className="p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 top-14 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 px-4 py-3">
          <div className="flex flex-col gap-3 text-base">
            {showBack && (
              <Link href="/" className="py-3 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
                ← {t.common.back}
              </Link>
            )}
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href} className="py-3 border-b border-zinc-100 dark:border-zinc-800" onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            {moreLinks.map((link) => (
              <Link key={link.href} href={link.href} className="py-3 border-b border-zinc-100 dark:border-zinc-800" onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/#contato" className="py-3 border-b border-zinc-100 dark:border-zinc-800" onClick={() => setMobileMenuOpen(false)}>
              {navLabels.contact}
            </Link>
            <div className="flex gap-6 pt-4">
              <button onClick={toggleLocale} className="flex items-center gap-2 py-2">
                <Globe className="w-5 h-5" /> {locale === 'pt-BR' ? 'Português' : 'English'}
              </button>
              <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="flex items-center gap-2 py-2">
                {mounted && (theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />)} {locale === 'pt-BR' ? 'Tema' : 'Theme'}
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <nav className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">LZ<span className="text-blue-600 text-2xl">.</span>dev</Link>
          
          <div className="flex items-center gap-4 text-sm">
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-blue-600 transition-colors">
                {link.label}
              </Link>
            ))}
            
            <div className="relative">
              <button 
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                {locale === 'pt-BR' ? 'Mais' : 'More'} <ChevronDown className={`w-4 h-4 transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {moreMenuOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg py-2 min-w-[160px]">
                  {moreLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link href="/#contato" className="hover:text-blue-600 transition-colors">
              {navLabels.contact}
            </Link>
            
            <div className="flex items-center gap-2 ml-2 border-l border-zinc-300 dark:border-zinc-700 pl-4">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs font-medium"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                {locale === 'pt-BR' ? 'PT' : 'EN'}
              </button>
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label={locale === 'pt-BR' ? 'Alternar tema' : 'Toggle theme'}
              >
                {mounted && (theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />)}
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}