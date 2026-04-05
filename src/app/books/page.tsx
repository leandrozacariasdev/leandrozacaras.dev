'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Star, ExternalLink } from 'lucide-react';
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
          <FadeIn>
            <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Aqui estão as recomendações de livros que marcaram minha trajetória como engenheiro de software. São leituras que influenciaram minha forma de pensar sobre código, arquitetura e desenvolvimento. Se você busca aprender com os melhores, essas são excelentes escolhas para sua biblioteca profissional.
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-4">
            {BOOKS_KEYS.map((key, index) => {
              const book = booksList[key];
              return (
                <FadeIn key={index} delay={index * 0.1}>
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    href={book.link || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 flex items-center justify-center flex-shrink-0 group-hover:from-blue-200 group-hover:to-blue-100 dark:group-hover:from-blue-800/60 dark:group-hover:to-blue-700/40 transition-colors">
                        <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" aria-label="Recomendação" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-grow">{book.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-1 rounded">{categories[BOOK_CATEGORIES[index]]}</span>
                      <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                  </motion.a>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
