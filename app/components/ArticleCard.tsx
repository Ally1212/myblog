import { Facebook, Twitter, Linkedin } from 'lucide-react'

interface ArticleCardProps {
  title: string
  description: string
  date: string
  tags: string[]
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, date, tags }) => {
  const shareUrl = `https://yourblog.com/articles/${encodeURIComponent(title)}`

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">{date}</p>
      <div className="flex space-x-4">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
          <Facebook size={20} />
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-100">
          <Twitter size={20} />
        </a>
        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-300">
          <Linkedin size={20} />
        </a>
      </div>
    </div>
  )
}

