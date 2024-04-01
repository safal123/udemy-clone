import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ClerkLoaded, ClerkLoading, ClerkProvider} from "@clerk/nextjs";
import ToastProvider from "@/components/providers/ToastProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import {Loading} from "@/components/shared/Loading";

const inter = Inter({subsets: ["latin"]});


export const metadata: Metadata = {
  title: "Udemy Clone",
  description: "Udemy Clone",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ToastProvider/>
          <ClerkLoading>
            <Loading />
          </ClerkLoading>
          <ClerkLoaded>
            {children}
          </ClerkLoaded>
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
