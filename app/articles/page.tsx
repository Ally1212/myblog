'use client'

import { useState } from 'react'
import { ArticleCard } from '../components/ArticleCard'
import { TagCloud } from '../components/TagCloud'
import { Search } from 'lucide-react'

const articles = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    description: 'Learn how to build modern web applications with Next.js',
    date: '2023-05-15',
    tags: ['Next.js', 'React', 'Web Development']
  },
  {
    id: 2,
    title: 'The Power of Tailwind CSS',
    description: 'Discover how Tailwind CSS can streamline your styling workflow',
    date: '2023-06-01',
    tags: ['CSS', 'Tailwind', 'Web Design']
  },
  {
    id: 3,
    title: 'Mastering TypeScript',
    description: 'Improve your JavaScript projects with TypeScript',
    date: '2023-06-15',
    tags: ['TypeScript', 'JavaScript', 'Programming']
  },
  // Add more articles as needed
]

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTag === '' || article.tags.includes(selectedTag))
  )

  const allTags = Array.from(new Set(articles.flatMap(article => article.tags)))

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">My Articles</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full p-2 pl-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <TagCloud tags={allTags} selectedTag={selectedTag} onSelectTag={setSelectedTag} />
      <div className="space-y-6">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  )
}

