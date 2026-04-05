import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formação e Premiações | Leandro Zacarias',
  description: 'Educação acadêmica, cursos e prêmios recebidos ao longo da carreira profissional.',
  openGraph: {
    title: 'Formação e Premiações | Leandro Zacarias',
    description: 'Educação acadêmica e reconhecimentos profissionais',
    type: 'website',
    url: 'https://leandrozacarias.dev/education',
  },
};

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
