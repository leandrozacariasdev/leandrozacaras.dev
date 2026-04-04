'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Sun, Moon, ExternalLink, Mail, MapPin, Globe } from 'lucide-react';
import { LinkedInIcon } from '@/components/icons';
import { useLocale, translations } from '@/components/locale-provider';

const PROJECTS = [
  {
    title: 'Portal de Crédito Consignado',
    description: 'Plataforma completa para captação de propostas de crédito consignado com integração SOA.',
    tech: ['.NET', 'WCF', 'SQL Server'],
    link: '#',
  },
  {
    title: 'CMS Corporate',
    description: 'Plataforma CMS centralizada em Node.js para substituição de todos os sites e portais da companhia.',
    tech: ['Node.js', 'Angular', 'MongoDB'],
    link: '#',
  },
  {
    title: 'Plataforma de Viagens',
    description: 'Sistema de reservas e gestão de viagens com microsserviços e arquitetura distribuída.',
    tech: ['Kubernetes', 'Azure', 'React'],
    link: '#',
  },
  {
    title: 'Sistema de Crédito Bom Pra Crédito',
    description: 'Plataforma fintech para análise e concessão de crédito com Scoring Sphinx.',
    tech: ['.NET Core', 'Kafka', 'PostgreSQL'],
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

export default function Projetos() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.projects.title}</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">{t.projects.subtitle}</p>
          </FadeIn>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group p-6 bg-white dark:bg-zinc-900 rounded-xl border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    Ver projeto
                  </a>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <footer id="contato" className="py-20 px-4 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-4">Let&apos;s talk?</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-12">Entre em contato para conversas sobre tecnologia</p>
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
                <span>São Paulo, SP - Brasil</span>
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
