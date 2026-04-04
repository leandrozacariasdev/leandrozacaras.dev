'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, MapPin, ExternalLink, ArrowDown } from 'lucide-react';
import { LinkedInIcon } from '@/components/icons';
import { useLocale, translations } from '@/components/locale-provider';
import Navbar from '@/components/navbar';

const SKILLS = [
  { category: 'languages', items: ['C#', '.NET Core', 'Kotlin', 'Python', 'JavaScript', 'Node.js'] },
  { category: 'frontend', items: ['Angular', 'React', 'HTML/CSS', 'Tailwind CSS'] },
  { category: 'cloudInfra', items: ['Docker', 'Kubernetes', 'Azure', 'AWS', 'Cloud Computing'] },
  { category: 'architecture', items: ['Microservices', 'Event Driven', 'CQRS', 'DDD', 'SOLID', 'Clean Code'] },
  { category: 'database', items: ['SQL Server', 'NoSQL', 'Redis', 'ELK'] },
  { category: 'methodologies', items: ['Agile', 'TDD', 'BDD', 'DevOps', 'CI/CD'] },
  { category: 'security', items: ['Azure Vault', 'PCI DSS', 'OWASP'] },
  { category: 'others', items: ['Git', 'RESTful APIs', 'Messaging', 'Design Patterns'] },
];

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

export default function Home() {
  const { locale } = useLocale();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const t = translations[locale];

  const navLabels = t.nav;
  const heroText = t.hero;
  const contactText = t.contact;
  const projectsText = t.projectsPage;
  const skillsText = t.skills.categories;
  const educationText = t.education;

  return (
    <div className="min-h-screen transition-colors">
      <Navbar />
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-blue-900 dark:via-zinc-900 dark:to-zinc-950">
          <div className="absolute inset-0 opacity-30 dark:opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
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
            {heroText.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <a
              href="mailto:me@leandrozacarias.dev"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {heroText.contact}
            </a>
            <Link
              href="/experience"
              className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:border-blue-500 transition-colors"
            >
              {heroText.viewExperience}
            </Link>
          </motion.div>
        </motion.div>

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

      <section className="py-20 px-4 bg-zinc-50 dark:bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-8 text-center">{educationText.awardsTitle}</h2>
          </FadeIn>
          <div className="grid gap-4">
            {t.awards.map((award, index) => (
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

      <section id="projetos" className="py-20 px-4 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-4 text-center">{projectsText.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-center mb-12">{projectsText.subtitle}</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {t.projects.map((project, index) => (
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
                    {projectsText.viewProject}
                  </a>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="experiencia" className="py-20 px-4 bg-white dark:bg-zinc-100 dark:bg-zinc-900/30 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-12 text-center">{t.experience.title}</h2>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-blue-800" />
            
            {t.experiences.map((exp, index) => (
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

      <section id="habilidades" className="py-20 px-4 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-12 text-center">{t.skills.title}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((skill, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-white dark:bg-zinc-900 rounded-lg border-zinc-200 dark:border-zinc-800 hover:border-blue-500/30 transition-all"
                >
                  <h3 className="font-medium mb-3 text-blue-600 dark:text-blue-400">{skillsText[skill.category as keyof typeof skillsText]}</h3>
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

      <section id="formacao" className="py-20 px-4 bg-white dark:bg-zinc-100 dark:bg-zinc-900/30 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-12 text-center">{educationText.educationTitle}</h2>
          </FadeIn>
          <div className="space-y-6">
            {educationText.education.map((edu, index) => (
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

      <section id="contato" className="py-20 px-4 scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-semibold mb-4">{contactText.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-12">{contactText.subtitle}</p>
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
                <span>{contactText.location}</span>
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

      <footer className="py-8 text-center text-sm text-zinc-500 border-t border-zinc-800">
        <p>© {new Date().getFullYear()} Leandro Zacarias. {locale === 'pt-BR' ? 'Todos os direitos reservados.' : 'All rights reserved.'}</p>
      </footer>
    </div>
  );
}