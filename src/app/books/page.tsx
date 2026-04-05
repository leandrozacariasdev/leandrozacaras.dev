'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Star, ExternalLink, Globe } from 'lucide-react';
import { useState } from 'react';
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

type TabType = 'books' | 'blogs' | 'others';

export default function Recomendacoes() {
  const { locale } = useLocale();
  const t = translations[locale];
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [activeTab, setActiveTab] = useState<TabType>('books');

  const booksList = t.books.booksList as Record<string, { title: string; author: string; link?: string }>;
  const booksCategories = t.books.categories as Record<string, string>;
  const blogsList = t.blogs.blogsList;
  const blogsCategories = t.blogs.categories as Record<string, string>;
  const othersList = t.others.othersList;
  const othersCategories = t.others.categories as Record<string, string>;

  const isPortuguese = locale === 'pt-BR';
  
  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'books', label: isPortuguese ? 'Livros' : 'Books', count: BOOKS_KEYS.length },
    { id: 'blogs', label: isPortuguese ? 'Blogs' : 'Blogs', count: blogsList.length },
    { id: 'others', label: isPortuguese ? 'Outros' : 'Others', count: othersList.length },
  ];

  return (
    <div className="min-h-screen transition-colors">
      <Navbar />

      <section className="pt-16 md:pt-32 pb-20 px-4">
        <motion.div style={{ opacity: heroOpacity }} className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isPortuguese ? 'Recomendações' : 'Recommendations'}
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              {isPortuguese 
                ? 'Livros, blogs e autores que influenciam meu desenvolvimento'
                : 'Books, blogs and authors that influence my growth'}
            </p>
          </FadeIn>
        </motion.div>
      </section>

      {/* Tabs */}
      <section className="py-12 px-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Books Tab */}
          {activeTab === 'books' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FadeIn>
                <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {isPortuguese
                      ? 'Aqui estão as recomendações de livros que marcaram minha trajetória como engenheiro de software. São leituras que influenciaram minha forma de pensar sobre código, arquitetura e desenvolvimento. Se você busca aprender com os melhores, essas são excelentes escolhas para sua biblioteca profissional.'
                      : 'Here are the book recommendations that shaped my career as a software engineer. These are readings that influenced my thinking about code, architecture, and development. If you want to learn from the best, these are excellent choices for your professional library.'}
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
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" aria-label={isPortuguese ? 'Recomendação' : 'Recommendation'} />
                        </div>
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-grow">{book.title}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{book.author}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-1 rounded">{booksCategories[BOOK_CATEGORIES[index]]}</span>
                          <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                        </div>
                      </motion.a>
                    </FadeIn>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Blogs Tab */}
          {activeTab === 'blogs' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FadeIn>
                <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {isPortuguese
                      ? 'Blogs que acompanho regularmente e que me ajudam a estar sempre atualizado com as melhores práticas, arquitetura de software e desenvolvimento de qualidade.'
                      : 'Blogs I follow regularly that help me stay updated with best practices, software architecture, and quality development.'}
                  </p>
                </div>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-4">
                {blogsList.map((blog, index) => (
                  <FadeIn key={index} delay={index * 0.1}>
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      href={blog.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all flex flex-col h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-800/20 flex items-center justify-center flex-shrink-0 group-hover:from-purple-200 group-hover:to-purple-100 dark:group-hover:from-purple-800/60 dark:group-hover:to-purple-700/40 transition-colors">
                          <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-grow">{blog.name}</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 flex-grow">{blog.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {blog.categories.slice(0, 2).map((cat, idx) => (
                            <span key={idx} className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2 py-1 rounded">
                              {blogsCategories[cat as keyof typeof blogsCategories]}
                            </span>
                          ))}
                        </div>
                        <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" />
                      </div>
                    </motion.a>
                  </FadeIn>
                ))}
               </div>
             </motion.div>
           )}

          {/* Others Tab */}
          {activeTab === 'others' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FadeIn>
                <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {isPortuguese
                      ? 'Recursos essenciais de referência para padrões de integração, refatoração, arquitetura e boas práticas. Plataformas e sites que consulto regularmente para aprofundar conhecimento técnico.'
                      : 'Essential reference resources for integration patterns, refactoring, architecture, and best practices. Platforms and websites I regularly consult to deepen technical knowledge.'}
                  </p>
                </div>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-4">
                {othersList.map((resource, index) => (
                  <FadeIn key={index} delay={index * 0.1}>
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all flex flex-col h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/20 flex items-center justify-center flex-shrink-0 group-hover:from-emerald-200 group-hover:to-emerald-100 dark:group-hover:from-emerald-800/60 dark:group-hover:to-emerald-700/40 transition-colors">
                          <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-grow">{resource.name}</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 flex-grow">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {resource.categories.slice(0, 2).map((cat, idx) => (
                            <span key={idx} className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded">
                              {othersCategories[cat as keyof typeof othersCategories]}
                            </span>
                          ))}
                        </div>
                        <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" />
                      </div>
                    </motion.a>
                  </FadeIn>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
