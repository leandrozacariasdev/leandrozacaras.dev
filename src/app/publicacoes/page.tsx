'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Sun, Moon, ArrowLeft } from 'lucide-react';

const PUBLICATIONS = [
  {
    title: 'Arquitetura de Microserviços na Prática',
    description: 'Guia completo sobre design e implementação de sistemas distribuídos.',
    link: '#',
  },
  {
    title: 'Kubernetes: Do Básico ao Produção',
    description: 'Como escalar aplicações com containers em ambientes enterprise.',
    link: '#',
  },
];

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

export default function Publicacoes() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen transition-colors">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">LZ<span className="text-blue-600 text-2xl">.</span>dev</Link>
          <div className="flex gap-6 items-center text-sm">
            <Link href="/" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Publicações</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">Artigos e conteúdos técnicos que compartilhei</p>
          </FadeIn>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {PUBLICATIONS.map((pub, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-white dark:bg-zinc-900 rounded-xl border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all"
                >
                  <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                    {pub.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">{pub.description}</p>
                  <a
                    href={pub.link}
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    Ler publicação
                  </a>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
