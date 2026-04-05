'use client';

export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Leandro Zacarias',
    url: 'https://leandrozacarias.dev',
    image: 'https://leandrozacarias.dev/profile.jpeg',
    jobTitle: 'Software Engineer & Tech Lead',
    email: 'me@leandrozacarias.dev',
    sameAs: [
      'https://linkedin.com/in/leandrozacarias',
      'https://x.com/leandrozacaria_',
    ],
    description:
      'Software Engineer com 20+ anos de experiência. Especializado em sistemas distribuídos, design de sistemas e liderança de equipes de engenharia.',
    knowsAbout: [
      'Software Engineering',
      'Distributed Systems',
      'Microservices',
      'Software Architecture',
      'Team Leadership',
      'Cloud Computing',
      'DevOps',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
