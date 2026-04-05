import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publicações | Leandro Zacarias',
  description: 'Artigos e conteúdos técnicos sobre arquitetura de sistemas, microserviços, DevOps e boas práticas de engenharia de software.',
  openGraph: {
    title: 'Publicações | Leandro Zacarias',
    description: 'Artigos e conteúdos técnicos',
    type: 'website',
    url: 'https://leandrozacarias.dev/publications',
  },
};

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
