import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Importa a fonte
import "./globals.css"; // Importa os estilos
import { Header } from "@/components/ui/Header"; // Importa o Header
import { Footer } from "@/components/ui/Footer"; // Importa o Footer

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
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
    <html lang="pt-BR">
      <body className={`${poppins.variable} font-poppins bg-zion-dark text-white`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
