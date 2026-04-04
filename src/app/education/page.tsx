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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function useMounted() {
  const [mounted] = useState(false);
  return mounted;
}

export default function Formacao() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const t = translations[locale];
  const mounted = useMounted();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const toggleLocale = () => {
    setLocale(locale === 'pt-BR' ? 'en' : 'pt-BR');
  };

  const educationText = t.education;

  return (
    <div className="min-h-screen transition-colors">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">LZ<span className="text-blue-600 text-2xl">.</span>dev</Link>
          <div className="flex gap-6 items-center text-sm">
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
              aria-label="Alternar tema"
            >
              {mounted && (theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />)}
            </button>
          </div>
        </nav>
      </header>

      <section className="pt-32 pb-20 px-4">
        <motion.div style={{ opacity: heroOpacity }} className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{educationText.title}</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">{educationText.subtitle}</p>
          </FadeIn>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-8">{educationText.educationTitle}</h2>
          </FadeIn>
          <div className="space-y-6 mb-16">
            {educationText.education.map((edu, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="flex gap-4 items-start">
                  <div className="w-3 h-3 mt-2 rounded-full bg-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold">{edu.institution}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{edu.degree}</p>
                    <p className="text-sm text-zinc-500">{edu.period}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <h2 className="text-2xl font-semibold mb-8">{educationText.awardsTitle}</h2>
          </FadeIn>
          <div className="grid gap-4">
            {t.awards.map((award, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-lg border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-zinc-600 dark:text-zinc-300">{award}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
