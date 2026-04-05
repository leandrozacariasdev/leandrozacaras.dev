import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Habilidades Técnicas | Leandro Zacarias',
  description: 'Tecnologias e competências em desenvolvimento de software, arquitetura, cloud, banco de dados e liderança de equipes.',
  openGraph: {
    title: 'Habilidades Técnicas | Leandro Zacarias',
    description: 'Tecnologias e competências profissionais',
    type: 'website',
    url: 'https://leandrozacarias.dev/skills',
  },
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
