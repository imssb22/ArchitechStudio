
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Architects_Daughter } from 'next/font/google';
import AuthInitializer from "./(components)/_AuthInitializer/page";
import StoreProvider from "./StoreProvider";
// import { usePathname } from 'next/navigation';

import ClientNavbarWrapper from "./(components)/_clientNavbarWrapper/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archistudio",
  description: "Designing spaces that inspire. Building dreams that last.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><StoreProvider>
        <AuthInitializer/>
        <ClientNavbarWrapper/>
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
