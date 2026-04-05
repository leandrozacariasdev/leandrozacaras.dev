import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experiência Profissional | Leandro Zacarias',
  description: 'Minha trajetória profissional com 20+ anos de experiência em tecnologia, liderança de equipes e arquitetura de sistemas.',
  openGraph: {
    title: 'Experiência Profissional | Leandro Zacarias',
    description: 'Minha trajetória profissional com 20+ anos de experiência',
    type: 'website',
    url: 'https://leandrozacarias.dev/experience',
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
