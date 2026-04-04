'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Sun, Moon, Globe } from 'lucide-react';
import { useLocale, translations } from '@/components/locale-provider';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useState(() => setMounted(true));
  return mounted;
}

export default function Experiencia() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const t = translations[locale];
  const mounted = useMounted();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const toggleLocale = () => {
    setLocale(locale === 'pt-BR' ? 'en' : 'pt-BR');
  };

  return (
    <div className="min-h-screen transition-colors">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">LZ<span className="text-blue-600 text-2xl">.</span>dev</Link>
          <div className="flex gap-4 items-center text-sm">
            <Link href="/" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t.common.back}
            </Link>
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
              aria-label="Toggle theme"
            >
              {mounted && (theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />)}
            </button>
          </div>
        </nav>
      </header>

      <section className="pt-32 pb-20 px-4">
        <motion.div style={{ opacity: heroOpacity }} className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.experience.title}</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">{t.experience.subtitle}</p>
          </FadeIn>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {t.experiences.map((exp, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="p-5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/30 transition-all">
                <h3 className="text-lg font-semibold mb-1">{exp.company}</h3>
                {exp.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className="mt-3">
                    <p className="font-medium text-blue-600 dark:text-blue-400 text-sm">{role.title}</p>
                    <p className="text-xs text-zinc-500 mb-1">{role.period}</p>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{role.description}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
