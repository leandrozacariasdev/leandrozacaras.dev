'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Globe, Sun, Moon } from 'lucide-react';
import { useLocale, translations } from '@/components/locale-provider';

interface NavbarProps {
  showBack?: boolean;
}

export default function Navbar({ showBack = false }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, mounted } = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const t = translations[locale];
  const navLabels = t.nav;

  const toggleLocale = () => {
    setLocale(locale === 'pt-BR' ? 'en' : 'pt-BR');
  };

  const allLinks = [
    { href: '/#experiencia', label: navLabels.experience },
    { href: '/#habilidades', label: navLabels.skills },
    { href: '/books', label: navLabels.books },
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
             {allLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`py-3 border-b border-zinc-100 dark:border-zinc-800 ${isActive ? 'text-blue-600 font-medium' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
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
        <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">LZ<span className="text-blue-600 text-2xl">.</span>dev</Link>
          
           <div className="flex items-center gap-6 text-sm">
            {allLinks.map((link) => {
              const isActive = link.href.startsWith('/#') 
                ? false 
                : (pathname === link.href || pathname.startsWith(link.href + '/'));
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600 font-medium border-b-2 border-blue-600 pb-1' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
            
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