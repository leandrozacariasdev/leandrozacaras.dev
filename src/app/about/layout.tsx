import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre | Leandro Zacarias',
  description: 'Sobre Leandro Zacarias - Software Engineer com 20+ anos de experiência em sistemas distribuídos, arquitetura de software e liderança de equipes.',
  openGraph: {
    title: 'Sobre | Leandro Zacarias',
    description: 'Conheça mais sobre minha trajetória e experiência',
    type: 'website',
    url: 'https://leandrozacarias.dev/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
