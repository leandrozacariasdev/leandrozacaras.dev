'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Locale = 'en' | 'pt-BR';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt-BR');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('locale') === 'en') {
      setLocaleState('en');
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (newLocale === 'en') {
      router.push(`${pathname}?locale=en`);
    } else {
      router.push(pathname);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
}

export const translations = {
  'pt-BR': {
    nav: {
      about: 'Sobre',
      projects: 'Projetos',
      publications: 'Publicações',
      experience: 'Experiência',
      skills: 'Habilidades',
      books: 'Livros',
      education: 'Formação',
      contact: 'Contato',
    },
    hero: {
      role: 'Software Engineer',
      description: '20+ anos de experiência em tecnologia. Especializado em sistemas distribuídos, design de sistemas e liderança de equipes de engenharia.',
      contact: 'Entre em contato',
      viewExperience: 'Ver experiência',
    },
    contact: {
      title: 'Vamos conversar?',
      subtitle: 'Entre em contato para conversas sobre tecnologia',
      location: 'São Paulo, SP - Brasil',
    },
    experience: {
      title: 'Experiência Profissional',
      subtitle: 'Minha trajetória profissional',
    },
    projects: {
      title: 'Projetos',
      subtitle: 'Projetos que demonstram minha experiência e habilidades técnicas',
      viewProject: 'Ver projeto',
    },
    skills: {
      title: 'Habilidades Técnicas',
      subtitle: 'Tecnologias e competências',
    },
    books: {
      title: 'Livros Recomendados',
      subtitle: 'Livros que marcaram minha trajetória',
    },
    education: {
      title: 'Formação e Premiações',
      subtitle: 'Educação e reconhecimentos',
      educationTitle: 'Formação Acadêmica',
      awardsTitle: 'Premiações',
    },
    publications: {
      title: 'Publicações',
      subtitle: 'Artigos e conteúdos técnicos que compartilhei',
      readMore: 'Ler publicação',
    },
    common: {
      back: 'Voltar',
    },
  },
  'en': {
    nav: {
      about: 'About',
      projects: 'Projects',
      publications: 'Publications',
      experience: 'Experience',
      skills: 'Skills',
      books: 'Books',
      education: 'Education',
      contact: 'Contact',
    },
    hero: {
      role: 'Software Engineer',
      description: '20+ years of experience in technology. Specialized in distributed systems, software design and engineering team leadership.',
      contact: 'Contact me',
      viewExperience: 'View experience',
    },
    contact: {
      title: "Let's talk?",
      subtitle: 'Get in touch for conversations about technology',
      location: 'São Paulo, SP - Brazil',
    },
    experience: {
      title: 'Professional Experience',
      subtitle: 'My career journey',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Projects that demonstrate my experience and technical skills',
      viewProject: 'View project',
    },
    skills: {
      title: 'Technical Skills',
      subtitle: 'Technologies and competencies',
    },
    books: {
      title: 'Recommended Books',
      subtitle: 'Books that shaped my career',
    },
    education: {
      title: 'Education & Awards',
      subtitle: 'Education and recognitions',
      educationTitle: 'Education',
      awardsTitle: 'Awards',
    },
    publications: {
      title: 'Publications',
      subtitle: 'Technical articles and content I have shared',
      readMore: 'Read publication',
    },
    common: {
      back: 'Back',
    },
  },
};
