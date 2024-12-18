import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import './globals.css'
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import ToastProvider from '@/components/providers/ToastProvider'
import ThemeProvider from '@/components/providers/ThemeProvider'
import NextTopLoader from 'nextjs-toploader'
import { Loading } from '@/components/shared/Loading'
import { Toaster } from '@/components/ui/toaster'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'

const inter = Inter ({subsets: ['latin']})


export const metadata: Metadata = {
  title: 'Udemy Clone',
  description: 'Udemy Clone'
}

export default function RootLayout ({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={ {
        elements: {
          formButtonPrimary: 'bg-primary text-white hover:bg-primary/60'
        }
      } }
    >
      <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/icon.svg"/>
        <title>
          { metadata.title as string }
        </title>
      </head>
      <body className={ inter.className }>
      <NextTopLoader
        color="#2299DD"
        initialPosition={ 0.08 }
        crawlSpeed={ 200 }
        height={ 3 }
        crawl={ true }
        showSpinner={ true }
        easing="ease"
        speed={ 200 }
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={ true }
        disableTransitionOnChange
      >
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <Toaster/>
        <ToastProvider/>
        <ClerkLoading>
          <Loading/>
        </ClerkLoading>
        <ClerkLoaded>
          { children }
        </ClerkLoaded>
      </ThemeProvider>
      </body>
      </html>
    </ClerkProvider>
  )
}
