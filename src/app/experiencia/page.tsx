'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Sun, Moon } from 'lucide-react';

const EXPERIENCES = [
  {
    company: 'Creditas',
    roles: [
      {
        title: 'Engineering Manager',
        period: 'nov. 2025 - atual',
        description: 'Liderança técnica e gestão de equipe de engenharia.',
      },
      {
        title: 'Engineering Lead',
        period: 'fev. 2022 - nov. 2025',
        description: 'Liderança técnica em equipe de desenvolvimento.',
      },
    ],
  },
  {
    company: 'Bom Pra Crédito',
    roles: [
      {
        title: 'Tech Lead',
        period: 'out. 2020 - fev. 2022',
        description: 'Liderança técnica em projetos de tecnologia financeira.',
      },
    ],
  },
  {
    company: 'Grupo Flytour',
    roles: [
      {
        title: 'Coordenador de desenvolvimento',
        period: 'abr. 2018 - set. 2020',
        description:
          'Identificação de oportunidades e melhorias no ciclo de desenvolvimento; Definição da arquitetura de novos sistemas; Code review, monitoramento e direcionamento do time. Realização de entrevistas técnicas e novas contratações; Feedback periódico; Referência técnica e conhecimento profundo do negócio; Onboarding de clientes internacionais.',
      },
      {
        title: 'Senior Development Analyst',
        period: 'fev. 2015 - abr. 2018',
        description:
          'Migração dos sistemas legados monolíticos para plataforma distribuída em nuvem; Desenvolvimento de plataforma CMS centralizada em Node.js para substituição de todos os sites e portais da companhia.',
      },
    ],
  },
  {
    company: 'Ventron',
    roles: [
      {
        title: 'Senior Development Analyst',
        period: 'jan. 2013 - jan. 2015',
        description: 'Atuando como Analista de Desenvolvimento de Sistemas em projetos dos clientes: Livraria Saraiva, Vivo, Grupo CRM e Grupo Flytour.',
      },
    ],
  },
  {
    company: 'Deal',
    roles: [
      {
        title: 'Senior Development Analyst',
        period: 'jul. 2012 - dez. 2012',
        description: 'Migração de legado em Power Builder para plataforma .NET do Banco Itaú BBA.',
      },
      {
        title: 'System Analyst',
        period: 'abr. 2010 - ago. 2010',
        description: 'Migração de dados e sistemas legados do Banco BMC, adquirido pelo Bradesco.',
      },
    ],
  },
  {
    company: 'Banco Cruzeiro do Sul',
    roles: [
      {
        title: 'Development Analyst',
        period: 'set. 2010 - jun. 2012',
        description: 'Melhorias nos processos de captação e processamento de propostas de empréstimos consignados junto à Dataprev. Implantação do sistema gerenciador de serviços para operacionalização de solicitações de saque, seguro, cartão adicional e 2ª via de cartão no módulo de cartão consignado.',
      },
    ],
  },
  {
    company: 'BSA Brasil',
    roles: [
      {
        title: 'Full Stack Engineer',
        period: 'jun. 2008 - mar. 2010',
        description: 'Sustentação do portal de captação de propostas de crédito consignado do Banco Cruzeiro do Sul e dos sites institucionais da corretora de valores Apregoa e do FIDC BCSul Verax Crédito Consignado. Migração de regras de negócios para arquitetura SOA em .NET WCF.',
      },
    ],
  },
  {
    company: 'Teia Advertising and Marketing',
    roles: [
      {
        title: 'Full Stack Web Developer',
        period: 'out. 2007 - mai. 2008',
        description: 'Desenvolvimento web.',
      },
    ],
  },
  {
    company: 'Sweda Automação',
    roles: [
      {
        title: 'Information Technology Intern',
        period: 'out. 2006 - ago. 2007',
        description: 'Estágio em tecnologia da informação.',
      },
    ],
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

export default function Experiencia() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Experiência Profissional</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">Minha trajetória profissional</p>
          </FadeIn>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2" />
            {EXPERIENCES.map((exp, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="relative mb-12 last:mb-0">
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-blue-500 ring-4 ring-white dark:ring-zinc-950" />
                  <div className="md:w-1/2 ml-8 md:ml-0">
                    <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg border-zinc-200 dark:border-zinc-800 hover:border-blue-500/30 transition-all">
                      <h3 className="text-xl font-semibold mb-1">{exp.company}</h3>
                      {exp.roles.map((role, roleIndex) => (
                        <div key={roleIndex} className="mt-4">
                          <p className="font-medium text-blue-600 dark:text-blue-400">{role.title}</p>
                          <p className="text-sm text-zinc-500 mb-2">{role.period}</p>
                          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{role.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
