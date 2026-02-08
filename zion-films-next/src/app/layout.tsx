import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google"; // Importa as fontes
import "./globals.css"; // Importa os estilos
import { Header } from "@/components/ui/Header"; // Importa o Header
import { Footer } from "@/components/ui/Footer"; // Importa o Footer

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ZionFilms | Produtora Audiovisual",
  description:
    "Portfólio de ZionFilms - Videomaker. Produção de clipes, vídeos para eventos e comerciais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans bg-zion-dark text-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
