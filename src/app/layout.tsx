import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans, Roboto_Mono } from "next/font/google";
import NavBar from "@/components/shared/NavBar";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ICPC - International Collegiate Programming Contest",
  description: "El concurso de programación más antiguo, el más grande y el más importante",
  icons: {
    icon: "/icpc_icon.svg",
    shortcut: "/icpc_icon.svg",
    apple: "/icpc_icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${nunitoSans.variable} ${robotoMono.variable} font-sans antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
