import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Livros Recomendados | Leandro Zacarias',
  description: 'Livros recomendados que marcaram minha trajetória profissional. Seleção de obras sobre engenharia de software, arquitetura, usabilidade e boas práticas de desenvolvimento.',
  openGraph: {
    title: 'Livros Recomendados | Leandro Zacarias',
    description: 'Livros que marcaram minha trajetória profissional',
    type: 'website',
    url: 'https://leandrozacarias.dev/books',
  },
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
