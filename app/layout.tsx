import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import ChatbotWidget from "@/components/ai/ChatbotWidget";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const clashDisplay = Syne({
  variable: "--font-clash",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RooMatch | Encuentra tu piso. Encuentra tu gente.",
  description: "La plataforma de alojamiento universitaria definitiva en Valencia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${jakartaSans.variable} ${clashDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MainLayout>
          {children}
        </MainLayout>
        <ChatbotWidget />
      </body>
    </html>
  );
}
