import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://euconsultor.com.br"),
  title: "Eu, Consultor | Gestão para consultores de campo",
  description:
    "Organize atendimentos, clientes, agenda, relatórios e cobranças em um único sistema criado para consultores de campo.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  openGraph: {
    title: "Eu, Consultor | Gestão para consultores de campo",
    description:
      "Organize atendimentos, clientes, agenda, relatórios e cobranças em um único sistema criado para consultores de campo.",
    url: "https://euconsultor.com.br",
    siteName: "Eu, Consultor",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Eu, Consultor — Software para consultores de campo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eu, Consultor | Gestão para consultores de campo",
    description:
      "Organize atendimentos, clientes, agenda, relatórios e cobranças em um único sistema criado para consultores de campo.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
