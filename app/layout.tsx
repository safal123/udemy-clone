import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import ToastProvider from "@/components/providers/ToastProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Udemy Clone",
  description: "Udemy Clone",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        disableTransitionOnChange
      >
        <ToastProvider/>
        {children}
      </ThemeProvider>
      </body>
      </html>
    </ClerkProvider>
  );
}
