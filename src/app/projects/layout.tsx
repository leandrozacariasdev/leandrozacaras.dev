import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projetos | Leandro Zacarias',
  description: 'Projetos que demonstram minha experiência e habilidades técnicas em desenvolvimento de software e arquitetura.',
  openGraph: {
    title: 'Projetos | Leandro Zacarias',
    description: 'Projetos que demonstram minha experiência',
    type: 'website',
    url: 'https://leandrozacarias.dev/projects',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
