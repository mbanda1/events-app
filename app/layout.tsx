import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryClientProvider from './api/QueryClientProvider';
import AuthProvider from './auth/Provider';
import "./globals.css";
import NavBar from "./navBar";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
        <AuthProvider>
        <Theme appearance="light" accentColor="sky" radius="large" scaling="110%">
          <NavBar />
          <main className='p-3'>
            <Container>
              {children}
            </Container>
          </main>
          {/* <ThemePanel/> */}
        </Theme>
        </AuthProvider>
       </QueryClientProvider>
      </body>
    </html>
  );
}
