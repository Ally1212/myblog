'use client'

import { useState, useEffect } from 'react'
import { ArticleCard } from '../components/ArticleCard'
import { TagCloud } from '../components/TagCloud'
import { Search, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [mdContent, setMdContent] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null)
  const [articles, setArticles] = useState([
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
  ])

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTag === '' || article.tags.includes(selectedTag))
  )

  const allTags = Array.from(new Set(articles.flatMap(article => article.tags)))

  const handleSaveArticle = () => {
    const newArticle = {
      id: articles.length + 1,
      title: title || '未命名文档',
      description: mdContent.slice(0, 100) + '...',
      date: new Date().toISOString().split('T')[0],
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }
    
    setArticles([newArticle, ...articles])
    
    // 更新全局状态中的文章列表
    window.dispatchEvent(new CustomEvent('articleUpdated', { 
      detail: [newArticle, ...articles] 
    }))
    
    setMdContent('')
    setTitle('')
    setTags('')
    setIsDialogOpen(false)
  }
  const handleDeleteArticle = (id: number) => {
    setArticleToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (articleToDelete) {
      setArticles(articles.filter(article => article.id !== articleToDelete))
      setDeleteDialogOpen(false)
      setArticleToDelete(null)
    }
  }

  useEffect(() => {
    // 组件挂载时,发送初始文章数据到全局状态
    window.dispatchEvent(new CustomEvent('articleUpdated', { 
      detail: articles 
    }))
  }, []) // 空依赖数组表示仅在组件挂载时执行一次

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Articles</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="px-4 py-2 bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              写文档
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] h-[80vh] p-6 bg-white dark:bg-gray-900 border-none shadow-lg">
            <DialogHeader className="space-y-3 mb-6">
              <DialogTitle className="text-2xl font-bold tracking-tight">
                编写新文档
              </DialogTitle>
              <DialogDescription className="text-base text-gray-500 dark:text-gray-400">
                在这里创建和编辑您的文章，支持 Markdown 格式
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-sm font-semibold">
                  文章标题
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入文章标题..."
                  className="h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="tags" className="text-sm font-semibold">
                  标签
                </Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="输入标签，用逗号分隔..."
                  className="h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="content" className="text-sm font-semibold">
                  文章内容
                </Label>
                <Textarea
                  id="content"
                  value={mdContent}
                  onChange={(e) => setMdContent(e.target.value)}
                  placeholder="支持 Markdown 格式..."
                  className="min-h-[350px] text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary font-mono p-4 resize-none"
                />
              </div>
            </div>

            <DialogFooter className="mt-6 gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setTitle('')
                  setTags('')
                  setMdContent('')
                }}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                清空
              </Button>
              <Button 
                onClick={handleSaveArticle} 
                className="px-8 bg-primary hover:bg-primary/90"
              >
                保存文档
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
          <div key={article.id} className="group relative">
            <ArticleCard {...article} />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDeleteArticle(article.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="sm:max-w-[500px] p-6 bg-white dark:bg-gray-900 border-none shadow-lg">
          <AlertDialogHeader className="space-y-3 mb-6">
            <AlertDialogTitle className="text-2xl font-bold tracking-tight">
              确认删除
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-gray-500 dark:text-gray-400">
              您确定要删除这篇文章吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-3">
            <AlertDialogCancel className="hover:bg-gray-100 dark:hover:bg-gray-800">
              取消
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

