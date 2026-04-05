'use client';

/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useState, useEffect, ReactNode, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

type Locale = 'en' | 'pt-BR';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  mounted: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

function LocaleContent({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt-BR');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = searchParams.toString();
    const urlParams = new URLSearchParams(params);
    const localeParam = urlParams.get('locale');
    if (localeParam === 'en') {
      setLocaleState('en');
    }
    setMounted(true);
  }, [searchParams]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (newLocale === 'en') {
      router.push(`${pathname}?locale=en`);
    } else {
      router.push(pathname);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale: mounted ? locale : 'pt-BR', setLocale, mounted }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <LocaleContent>{children}</LocaleContent>
    </Suspense>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
}

interface Translations {
  nav: {
    about: string;
    projects: string;
    publications: string;
    experience: string;
    skills: string;
    books: string;
    education: string;
    contact: string;
  };
  hero: {
    role: string;
    description: string;
    contact: string;
    viewExperience: string;
  };
  contact: {
    title: string;
    subtitle: string;
    location: string;
  };
  experience: {
    title: string;
    subtitle: string;
  };
  projectsPage: {
    title: string;
    subtitle: string;
    viewProject: string;
  };
  skills: {
    title: string;
    subtitle: string;
    categories: Record<string, string>;
  };
  books: {
    title: string;
    subtitle: string;
    categories: Record<string, string>;
    booksList: Record<string, { title: string; author: string; link?: string }>;
  };
  blogs: {
    title: string;
    subtitle: string;
    categories: Record<string, string>;
    blogsList: { name: string; description: string; url: string; categories: string[] }[];
  };
  authors: {
    title: string;
    subtitle: string;
    categories: Record<string, string>;
    authorsList: { name: string; description: string; url: string; categories: string[] }[];
  };
  education: {
    title: string;
    subtitle: string;
    educationTitle: string;
    awardsTitle: string;
    education: { institution: string; degree: string; period: string }[];
  };
  publications: {
    title: string;
    subtitle: string;
    readMore: string;
    list: { title: string; description: string; link: string }[];
  };
  common: {
    back: string;
  };
  experiences: {
    company: string;
    roles: { title: string; period: string; description: string }[];
  }[];
  projects: {
    title: string;
    description: string;
    tech: string[];
    link: string;
  }[];
  awards: string[];
}

export const translations: Record<Locale, Translations> = {
  'pt-BR': {
    nav: {
      about: 'Sobre',
      projects: 'Projetos',
       publications: 'Publicações',
       experience: 'Experiência',
       skills: 'Habilidades',
       books: 'Recomendações de Leitura',
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
    projectsPage: {
      title: 'Projetos',
      subtitle: 'Projetos que demonstram minha experiência e habilidades técnicas',
      viewProject: 'Ver projeto',
    },
    skills: {
      title: 'Habilidades Técnicas',
      subtitle: 'Tecnologias e competências',
      categories: {
        languages: 'Linguagens',
        frontend: 'Frontend',
        cloudInfra: 'Cloud & Infra',
        architecture: 'Arquitetura',
        database: 'Banco de Dados',
        methodologies: 'Metodologias',
        security: 'Segurança',
        others: 'Outros',
        },
     },
    books: {
      title: 'Recomendações de Livros',
      subtitle: 'Livros que marcaram minha trajetória',
      categories: {
        software: 'Engenharia de Software',
        career: 'Carreira',
        bestPractices: 'Boas Práticas',
        architecture: 'Arquitetura',
        usability: 'Usabilidade',
      },
      booksList: {
        dontMakeMeThink: { title: 'Não me faça pensar: atualizado', author: 'Steve Krug', link: 'https://amzn.to/4dvMIb2' },
        headFirstPatterns: { title: 'Use a Cabeça! Padrões de Projetos', author: 'Freeman & Robson', link: 'https://amzn.to/4dvMLne' },
        domainDrivenDesign: { title: 'Domain-Driven Design', author: 'Eric Evans', link: 'https://amzn.to/48gS0nb' },
        cleanCode: { title: 'Clean Code', author: 'Robert C. Martin', link: 'https://amzn.to/3PRFODd' },
      },
    },
     blogs: {
      title: 'Blogs Recomendados',
      subtitle: 'Blogs que acompanho e recomendo',
      categories: {
        architecture: 'Arquitetura',
        ddd: 'Domain-Driven Design',
        bestPractices: 'Boas Práticas',
        leadership: 'Liderança Técnica',
        cleanCode: 'Clean Code',
      },
      blogsList: [
        {
          name: 'Martin Fowler',
          description: 'Insights sobre arquitetura de software, padrões de design e boas práticas. Uma das maiores referências em engenharia de software.',
          url: 'https://martinfowler.com/',
          categories: ['architecture', 'bestPractices', 'ddd'],
        },
        {
          name: 'Kamil Grzybek',
          description: 'Exploração profunda em Domain-Driven Design, arquitetura clean e padrões avançados de desenvolvimento.',
          url: 'https://www.kamilgrzybek.com/',
          categories: ['architecture', 'ddd', 'cleanCode'],
        },
      ],
    },
    authors: {
      title: 'Autores Recomendados',
      subtitle: 'Autores que influenciam meu pensamento técnico',
      categories: {
        architecture: 'Arquitetura',
        ddd: 'Domain-Driven Design',
        bestPractices: 'Boas Práticas',
        leadership: 'Liderança Técnica',
        cleanCode: 'Clean Code',
      },
      authorsList: [],
    },
     education: {
      title: 'Formação e Premiações',
      subtitle: 'Educação e reconhecimentos',
      educationTitle: 'Formação Acadêmica',
      awardsTitle: 'Premiações',
      education: [
        { institution: 'Universidade Anhembi Morumbi', degree: 'Pós-Graduação em Desenvolvimento de Software com Metodologias Ágeis', period: '2020 - 2021' },
        { institution: 'Faculdades Oswaldo Cruz', degree: 'Tecnólogo em Sistemas de Informação', period: '2005 - 2007' },
      ],
    },
    publications: {
      title: 'Publicações',
      subtitle: 'Artigos e conteúdos técnicos que compartilhei',
      readMore: 'Ler publicação',
      list: [
        { title: 'Arquitetura de Microserviços na Prática', description: 'Guia completo sobre design e implementação de sistemas distribuídos.', link: '#' },
        { title: 'Kubernetes: Do Básico ao Produção', description: 'Como escalar aplicações com containers em ambientes enterprise.', link: '#' },
      ],
    },
    common: {
      back: 'Voltar',
    },
    experiences: [
      {
        company: 'Creditas',
        roles: [
          { title: 'Engineering Manager', period: 'nov. 2025 - atual', description: 'Liderança técnica e gestão de equipe de engenharia.' },
          { title: 'Engineering Lead', period: 'fev. 2022 - nov. 2025', description: 'Liderança técnica em equipe de desenvolvimento.' },
        ],
      },
      {
        company: 'Bom Pra Crédito',
        roles: [
          { title: 'Tech Lead', period: 'out. 2020 - fev. 2022', description: 'Liderança técnica em projetos de tecnologia financeira.' },
        ],
      },
      {
        company: 'Grupo Flytour',
         roles: [
           { title: 'Tech Lead', period: 'abr. 2018 - set. 2020', description: 'Definição de arquitetura, code review e orientação do time.' },
           { title: 'Software Engineer Senior', period: 'fev. 2015 - abr. 2018', description: 'Migração para nuvem e desenvolvimento de plataforma CMS em Node.js.' },
         ],
      },
      {
        company: 'Ventron',
        roles: [
          { title: 'Software Engineer Senior', period: 'jan. 2013 - jan. 2015', description: 'Desenvolvimento de sistemas para Livraria Saraiva, Vivo e Grupo Flytour.' },
        ],
      },
      {
        company: 'Deal',
        roles: [
          { title: 'Software Engineer Senior', period: 'jul. 2012 - dez. 2012', description: 'Migração de Power Builder para .NET no Itaú BBA.' },
          { title: 'Software Engineer Senior', period: 'abr. 2010 - ago. 2010', description: 'Migração de legado do Banco BMC para Bradesco.' },
        ],
      },
       {
         company: 'Banco Cruzeiro do Sul',
         roles: [
           { title: 'Software Engineer', period: 'set. 2010 - jun. 2012', description: 'Processamento de propostas de empréstimo e sistema de gestão de serviços.' },
         ],
       },
      {
        company: 'BSA Brasil',
        roles: [
          { title: 'Full Stack Engineer', period: 'jun. 2008 - mar. 2010', description: 'Manutenção de portal de crédito e migração SOA em .NET WCF.' },
        ],
      },
      {
        company: 'Teia Advertising and Marketing',
        roles: [
          { title: 'Full Stack Web Developer', period: 'out. 2007 - mai. 2008', description: 'Desenvolvimento web.' },
        ],
      },
      {
        company: 'Sweda Automação',
        roles: [
          { title: 'Information Technology Intern', period: 'out. 2006 - ago. 2007', description: 'Estágio em tecnologia da informação.' },
        ],
      },
    ],
    projects: [
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
    ],
    awards: [
      'Prêmio de profissional de destaque da área de tecnologia',
      '3º Lugar - 1º Hackathon Viagens (44ª ABAV Expo Internacional)',
      '1º Lugar - Hackathon Flytour em parceria com a Microsoft',
    ],
  },
  'en': {
    nav: {
      about: 'About',
      projects: 'Projects',
       publications: 'Publications',
       experience: 'Experience',
       skills: 'Skills',
       books: 'Reading Recommendations',
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
    projectsPage: {
      title: 'Projects',
      subtitle: 'Projects that demonstrate my experience and technical skills',
      viewProject: 'View project',
    },
    skills: {
      title: 'Technical Skills',
      subtitle: 'Technologies and competencies',
      categories: {
        languages: 'Languages',
        frontend: 'Frontend',
        cloudInfra: 'Cloud & Infra',
        architecture: 'Architecture',
        database: 'Database',
        methodologies: 'Methodologies',
        security: 'Security',
        others: 'Others',
      },
    },
     books: {
       title: 'Recommended Books',
       subtitle: 'Books that shaped my career',
       categories: {
         software: 'Software Engineering',
         career: 'Career',
         bestPractices: 'Best Practices',
         architecture: 'Architecture',
         usability: 'Usability',
       },
       booksList: {
         dontMakeMeThink: { title: "Don't Make Me Think: Revised", author: 'Steve Krug', link: 'https://amzn.to/4dvMIb2' },
         headFirstPatterns: { title: 'Head First Design Patterns', author: 'Freeman & Robson', link: 'https://amzn.to/4dvMLne' },
         domainDrivenDesign: { title: 'Domain-Driven Design', author: 'Eric Evans', link: 'https://amzn.to/48gS0nb' },
         cleanCode: { title: 'Clean Code', author: 'Robert C. Martin', link: 'https://amzn.to/3PRFODd' },
        },
     },
    blogs: {
      title: 'Recommended Blogs',
      subtitle: 'Blogs I follow and recommend',
      categories: {
        architecture: 'Architecture',
        ddd: 'Domain-Driven Design',
        bestPractices: 'Best Practices',
        leadership: 'Technical Leadership',
        cleanCode: 'Clean Code',
      },
      blogsList: [
        {
          name: 'Martin Fowler',
          description: 'Insights on software architecture, design patterns, and best practices. One of the biggest references in software engineering.',
          url: 'https://martinfowler.com/',
          categories: ['architecture', 'bestPractices', 'ddd'],
        },
        {
          name: 'Kamil Grzybek',
          description: 'Deep exploration into Domain-Driven Design, clean architecture, and advanced development patterns.',
          url: 'https://www.kamilgrzybek.com/',
          categories: ['architecture', 'ddd', 'cleanCode'],
        },
      ],
    },
    authors: {
      title: 'Recommended Authors',
      subtitle: 'Authors that influence my technical thinking',
      categories: {
        architecture: 'Architecture',
        ddd: 'Domain-Driven Design',
        bestPractices: 'Best Practices',
        leadership: 'Technical Leadership',
        cleanCode: 'Clean Code',
      },
      authorsList: [],
    },
     education: {
      title: 'Education & Awards',
      subtitle: 'Education and recognitions',
      educationTitle: 'Education',
      awardsTitle: 'Awards',
      education: [
        { institution: 'Universidade Anhembi Morumbi', degree: 'Postgraduate in Software Development with Agile Methodologies', period: '2020 - 2021' },
        { institution: 'Faculdades Oswaldo Cruz', degree: 'Technology Degree in Information Systems', period: '2005 - 2007' },
      ],
    },
    publications: {
      title: 'Publications',
      subtitle: 'Technical articles and content I have shared',
      readMore: 'Read publication',
      list: [
        { title: 'Practical Microservices Architecture', description: 'Complete guide to designing and implementing distributed systems.', link: '#' },
        { title: 'Kubernetes: From Basics to Production', description: 'How to scale applications with containers in enterprise environments.', link: '#' },
      ],
    },
    common: {
      back: 'Back',
    },
    experiences: [
      {
        company: 'Creditas',
        roles: [
          { title: 'Engineering Manager', period: 'Nov 2025 - Present', description: 'Technical leadership and team management.' },
          { title: 'Engineering Lead', period: 'Feb 2022 - Nov 2025', description: 'Technical leadership in development team.' },
        ],
      },
      {
        company: 'Bom Pra Crédito',
        roles: [
          { title: 'Tech Lead', period: 'Oct 2020 - Feb 2022', description: 'Technical leadership in fintech projects.' },
        ],
      },
      {
        company: 'Grupo Flytour',
        roles: [
          { title: 'Development Coordinator', period: 'Apr 2018 - Sep 2020', description: 'Architecture definition, code review and team guidance.' },
          { title: 'Software Engineer Senior', period: 'Feb 2015 - Apr 2018', description: 'Legacy to cloud migration and Node.js CMS platform.' },
        ],
      },
      {
        company: 'Ventron',
        roles: [
          { title: 'Software Engineer Senior', period: 'Jan 2013 - Jan 2015', description: 'Systems development for Livraria Saraiva, Vivo and Grupo Flytour.' },
        ],
      },
      {
        company: 'Deal',
        roles: [
          { title: 'Software Engineer Senior', period: 'Jul 2012 - Dec 2012', description: 'Power Builder to .NET migration for Itaú BBA.' },
          { title: 'Software Engineer Senior', period: 'Apr 2010 - Aug 2010', description: 'Legacy migration from Banco BMC to Bradesco.' },
        ],
      },
       {
         company: 'Banco Cruzeiro do Sul',
         roles: [
           { title: 'Software Engineer', period: 'Sep 2010 - Jun 2012', description: 'Loan proposal processing and service management system.' },
         ],
       },
      {
        company: 'BSA Brasil',
        roles: [
          { title: 'Full Stack Engineer', period: 'Jun 2008 - Mar 2010', description: 'Credit portal maintenance and SOA migration.' },
        ],
      },
      {
        company: 'Teia Advertising and Marketing',
        roles: [
          { title: 'Full Stack Web Developer', period: 'Oct 2007 - May 2008', description: 'Web development.' },
        ],
      },
      {
        company: 'Sweda Automação',
        roles: [
          { title: 'Information Technology Intern', period: 'Oct 2006 - Aug 2007', description: 'IT internship.' },
        ],
      },
    ],
    projects: [
      {
        title: 'Consigned Credit Portal',
        description: 'Complete platform for consigned credit proposals with SOA integration.',
        tech: ['.NET', 'WCF', 'SQL Server'],
        link: '#',
      },
      {
        title: 'Corporate CMS',
        description: 'Centralized Node.js CMS platform to replace all company websites and portals.',
        tech: ['Node.js', 'Angular', 'MongoDB'],
        link: '#',
      },
      {
        title: 'Travel Platform',
        description: 'Travel booking and management system with microservices and distributed architecture.',
        tech: ['Kubernetes', 'Azure', 'React'],
        link: '#',
      },
      {
        title: 'Bom Pra Crédito Credit System',
        description: 'Fintech platform for credit analysis and granting with Scoring Sphinx.',
        tech: ['.NET Core', 'Kafka', 'PostgreSQL'],
        link: '#',
      },
    ],
    awards: [
      'Outstanding technology professional award',
      '3rd Place - 1st Travel Hackathon (44th ABAV International Expo)',
      '1st Place - Flytour Hackathon in partnership with Microsoft',
    ],
  },
};