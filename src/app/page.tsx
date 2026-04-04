'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Mail, MapPin, ExternalLink, ArrowDown, Sun, Moon } from 'lucide-react';
import { LinkedInIcon, GithubIcon } from '@/components/icons';

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
          'Identificação de oportunidades e melhorias no ciclo de desenvolvimento; Definição da arquitetura de novos sistemas; Code review, monitoramento e direcionamento do time.',
      },
      {
        title: 'Senior Development Analyst',
        period: 'fev. 2015 - abr. 2018',
        description:
          'Migração dos sistemas legados monolíticos para plataforma distribuída em nuvem; Desenvolvimento de plataforma CMS centralizada em Node.js.',
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
    company: 'Banco Cruzeiro do Sul',
    roles: [
      {
        title: 'Development Analyst',
        period: 'set. 2010 - jun. 2012',
        description: 'Melhorias nos processos de captação e processamento de propostas de empréstimos consignados junto à Dataprev.',
      },
    ],
  },
  {
    company: 'BSA Brasil',
    roles: [
      {
        title: 'Full Stack Engineer',
        period: 'jun. 2008 - mar. 2010',
        description: 'Sustentação do portal de captação de propostas de crédito consignado; Migração para arquitetura SOA em .NET WCF.',
      },
    ],
  },
];

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

const EDUCATION = [
  {
    institution: 'Universidade Anhembi Morumbi',
    degree: 'Pós-Graduação em Desenvolvimento de Software com Metodologias Ágeis',
    period: '2020 - 2021',
  },
  {
    institution: 'Faculdades Oswaldo Cruz',
    degree: 'Tecnólogo em Sistemas de Informação',
    period: '2005 - 2007',
  },
];

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

const AWARDS = [
  'Prêmio de profissional de destaque da área de tecnologia',
  '3º Lugar - 1º Hackathon Viagens (44ª ABAV Expo Internacional)',
  '1º Lugar - Hackathon Flytour em parceria com a Microsoft',
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
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

export default function Home() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen transition-colors">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="font-semibold text-lg">LZ<span className="text-blue-600">.</span>dev</a>
          <div className="flex gap-6 items-center text-sm">
            <a href="#sobre" className="hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded transition-colors">Sobre</a>
            <a href="#projetos" className="hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded transition-colors">Projetos</a>
            <a href="#experiencia" className="hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded transition-colors">Experiência</a>
            <a href="#habilidades" className="hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded transition-colors">Habilidades</a>
            <a href="#formacao" className="hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded transition-colors">Formação</a>
            <a href="#contato" className="hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded transition-colors">Contato</a>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Alternar tema"
            >
              {mounted && (
                theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )
              )}
            </button>
          </div>
        </nav>
      </header>
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-blue-900 dark:via-zinc-900 dark:to-zinc-950">
          <div className="absolute inset-0 opacity-30 dark:opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-4">
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
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            Leandro Zacarias
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium mb-6"
          >
            Software Engineer
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8"
          >
            20+ anos de experiência em tecnologia. Especializado em sistemas distribuídos, 
            design de sistemas e liderança de equipes de engenharia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <a
              href="https://linkedin.com/in/leandrozacarias"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <LinkedInIcon className="w-5 h-5" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 rounded-full hover:bg-zinc-800 transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <GithubIcon className="w-5 h-5" aria-hidden="true" />
              GitHub
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-zinc-500"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Awards Section with Stagger */}
      <section className="py-20 px-4 bg-zinc-50 dark:bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-8 text-center">Premiações</h2>
          </FadeIn>
          <div className="grid gap-4">
            {AWARDS.map((award, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-white dark:bg-zinc-900 rounded-lg border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-zinc-300">{award}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 px-4 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-4 text-center">Projetos</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-center mb-12">Projetos que demonstrem minha experiência e habilidades técnicas</p>
          </FadeIn>
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

      {/* Experience Section */}
      <section id="experiencia" className="py-20 px-4 bg-white dark:bg-zinc-100 dark:bg-zinc-900/30 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-12 text-center">Experiência Profissional</h2>
          </FadeIn>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-blue-800" />
            
            {EXPERIENCES.map((exp, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={`relative flex gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-blue-500 ring-4 ring-zinc-950" />
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

      {/* Skills Section */}
      <section id="habilidades" className="py-20 px-4 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-12 text-center">Habilidades Técnicas</h2>
          </FadeIn>
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

      {/* Education Section */}
      <section id="formacao" className="py-20 px-4 bg-white dark:bg-zinc-100 dark:bg-zinc-900/30 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-12 text-center">Formação Acadêmica</h2>
          </FadeIn>
          <div className="space-y-6">
            {EDUCATION.map((edu, index) => (
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 px-4 scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-4">Vamos conversar?</h2>
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
            <FadeIn delay={0.4}>
              <a
                href="https://linkedin.com/in/leandrozacarias"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-lg border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all hover:scale-105"
              >
                <LinkedInIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <span>linkedin.com/in/leandrozacarias</span>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-zinc-500 border-t border-zinc-800">
        <p>© {new Date().getFullYear()} Leandro Zacarias. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
