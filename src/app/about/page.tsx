'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Sun, Moon, Mail, MapPin, ArrowDown, Globe } from 'lucide-react';
import { LinkedInIcon } from '@/components/icons';
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

export default function Sobre() {
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

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-blue-900 dark:via-zinc-900 dark:to-zinc-950">
          <div className="absolute inset-0 opacity-30 dark:opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4">
          <FadeIn>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring', delay: 0.1 }}
              className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-blue-500/30"
            >
              <Image
                src="/profile.jpeg"
                alt="Leandro Zacarias"
                width={160}
                height={160}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Leandro Zacarias</h1>
            <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium mb-6">
              {t.hero.role}
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
              {t.hero.description}
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="mailto:me@leandrozacarias.dev"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t.hero.contact}
              </a>
              <Link
                href="/experience"
                className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:border-blue-500 transition-colors"
              >
                {t.hero.viewExperience}
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <ArrowDown className="w-6 h-6 text-zinc-400 animate-bounce" />
            </motion.div>
          </FadeIn>
        </motion.div>
      </section>

      <footer id="contato" className="py-20 px-4 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-4">{t.contact.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-12">{t.contact.subtitle}</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            <FadeIn delay={0.1}>
              <a
                href="mailto:me@leandrozacarias.dev"
                className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-lg border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all hover:scale-105"
              >
                <Mail className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <span>me@leandrozacarias.dev</span>
              </a>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-lg border-zinc-200 dark:border-zinc-800">
                <MapPin className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <span>{t.contact.location}</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <a
                href="https://linkedin.com/in/leandrozacarias"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-lg border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all hover:scale-105"
              >
                <LinkedInIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </FadeIn>
          </div>
        </div>
      </footer>
    </div>
  );
}
