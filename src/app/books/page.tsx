'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useLocale, translations } from '@/components/locale-provider';
import Navbar from '@/components/navbar';

const BOOKS_KEYS = ['dontMakeMeThink', 'headFirstPatterns', 'domainDrivenDesign', 'cleanCode'];
const BOOK_CATEGORIES = ['usability', 'architecture', 'architecture', 'bestPractices'];

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

export default function Livros() {
  const { locale } = useLocale();
  const t = translations[locale];
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const booksList = t.books.booksList as Record<string, { title: string; author: string; link?: string }>;
  const categories = t.books.categories as Record<string, string>;

  return (
    <div className="min-h-screen transition-colors">
      <Navbar />

      <section className="pt-16 md:pt-32 pb-20 px-4">
        <motion.div style={{ opacity: heroOpacity }} className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.books.title}</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">{t.books.subtitle}</p>
          </FadeIn>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {BOOKS_KEYS.map((key, index) => {
              const book = booksList[key];
              return (
                <FadeIn key={index} delay={index * 0.1}>
                  <a 
                    href={book.link || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-lg border-zinc-200 dark:border-zinc-800 hover:border-blue-500/30 transition-all block"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{book.author}</p>
                      <span className="text-xs text-blue-600 dark:text-blue-400">{categories[BOOK_CATEGORIES[index]]}</span>
                    </div>
                  </a>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
