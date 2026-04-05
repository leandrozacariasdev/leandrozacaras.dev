'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocale, translations } from '@/components/locale-provider';
import Navbar from '@/components/navbar';

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

export default function Publicacoes() {
  const { locale } = useLocale();
  const t = translations[locale];
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen transition-colors">
      <Navbar />

      <section className="pt-14 md:pt-32 pb-20 px-4">
        <motion.div style={{ opacity: heroOpacity }} className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.publications.title}</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">{t.publications.subtitle}</p>
          </FadeIn>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="p-12 bg-white dark:bg-zinc-900 rounded-xl border-zinc-200 dark:border-zinc-800 border">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                {t.publications.title}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                Em construção...
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
