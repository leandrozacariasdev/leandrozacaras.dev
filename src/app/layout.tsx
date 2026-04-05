import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/components/locale-provider";
import { PersonSchema } from "@/components/schema-markup";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollProgress from "@/components/scroll-progress";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://leandrozacarias.dev"),
  title: {
    default: "Leandro Zacarias | Software Engineer & Tech Lead",
    template: "%s | Leandro Zacarias",
  },
  description:
    "Software Engineer com 20+ anos de experiência. Especializado em sistemas distribuídos, design de sistemas, liderança de equipes e arquitetura de software. Engenharia em São Paulo, Brasil.",
  keywords: [
    "Software Engineer",
    "Tech Lead",
    "Engineering Manager",
    "Arquitetura de Software",
    "Sistemas Distribuídos",
    "Desenvolvedor Senior",
    "Desenvolvedor Full Stack",
    "Tech Lead Brasil",
    "Engenharia de Software São Paulo",
    "Leandro Zacarias",
  ],
  authors: [{ name: "Leandro Zacarias" }],
  creator: "Leandro Zacarias",
  publisher: "Leandro Zacarias",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: "https://leandrozacarias.dev",
    siteName: "Leandro Zacarias",
    title: "Leandro Zacarias | Software Engineer & Tech Lead",
    description:
      "Software Engineer com 20+ anos de experiência. Especializado em sistemas distribuídos, design de sistemas e liderança de equipes de engenharia.",
    firstName: "Leandro",
    lastName: "Zacarias",
    images: [
      {
        url: "https://leandrozacarias.dev/profile.jpeg",
        width: 400,
        height: 400,
        alt: "Leandro Zacarias - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leandro Zacarias | Software Engineer & Tech Lead",
    description:
      "Software Engineer com 20+ anos de experiência. Especializado em sistemas distribuídos, design de sistemas e liderança de equipes de engenharia.",
    creator: "@leandrozacaria_",
    images: ["https://leandrozacarias.dev/profile.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <PersonSchema />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LocaleProvider>
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none"
            >
              Skip to main content
            </a>
            <ScrollProgress />
            <ScrollToTop />
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
