'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import { Timeline } from './components/Timeline'
import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'
import { BackToTop } from './components/BackToTop'
import { ReadingProgress } from './components/ReadingProgress'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleArticleUpdate = (event: CustomEvent) => {
      setArticles(event.detail)
    }

    window.addEventListener('articleUpdated', handleArticleUpdate as EventListener)
    
    return () => {
      window.removeEventListener('articleUpdated', handleArticleUpdate as EventListener)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <html lang="en">
      <ThemeProvider attribute="class">
        <body className={`${inter.className} bg-image`}>
          <Header />
          <ReadingProgress />
          <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 md:pr-8">
              {children}
            </div>
            <aside className="w-full md:w-1/4 mt-8 md:mt-0">
              <Timeline articles={articles} />
            </aside>
          </main>
          <BackToTop />
        </body>
      </ThemeProvider>
    </html>
  )
}

