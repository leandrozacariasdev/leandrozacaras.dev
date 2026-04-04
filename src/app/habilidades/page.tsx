'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Sun, Moon } from 'lucide-react';

const SKILLS = [
  { category: 'Linguagens', items: ['C#', '.NET Core', 'Kotlin', 'Python', 'JavaScript', 'Node.js'] },
  { category: 'Frontend', items: ['Angular', 'React', 'HTML/CSS', 'Tailwind CSS'] },
  { category: 'Cloud & Infra', items: ['Docker', 'Kubernetes', 'Azure', 'AWS', 'Computação em Nuvem'] },
  { category: 'Arquitetura', items: ['Microsserviços', 'Event Driven', 'CQRS', 'DDD', 'SOLID', 'Clean Code'] },
  { category: 'Banco de Dados', items: ['SQL Server', 'NoSQL', 'Redis', 'ELK'] },
  { category: 'Metodologias', items: ['Agile', 'TDD', 'BDD', 'DevOps', 'CI/CD'] },
  { category: 'Segurança', items: ['Azure Vault', 'PCI DSS', 'OWASP'] },
  { category: 'Outros', items: ['Git', 'APIs RESTful', 'Mensageria', 'Design Patterns'] },
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

export default function Habilidades() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Habilidades Técnicas</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">Technologias e competências</p>
          </FadeIn>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((skill, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-white dark:bg-zinc-900 rounded-lg border-zinc-200 dark:border-zinc-800 hover:border-blue-500/30 transition-all"
                >
                  <h3 className="font-medium mb-3 text-blue-600 dark:text-blue-400">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
