'use client'

import { useEffect, useState } from 'react'

interface TimelineEvent {
  id: number
  date: string
  title: string
}

interface TimelineProps {
  articles: Array<{
    id: number
    title: string
    date: string
  }>
}

export const Timeline: React.FC<TimelineProps> = ({ articles }) => {
  const [visibleEvents, setVisibleEvents] = useState<TimelineEvent[]>([])

  useEffect(() => {
    // 将文章转换为时间线事件格式
    const articleEvents = articles.map(article => ({
      id: article.id,
      date: article.date,
      title: `Published: ${article.title}`
    }))
    
    // 按日期排序
    const sortedEvents = articleEvents.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    setVisibleEvents(sortedEvents)
  }, [articles])

  return (
    <div className="relative hidden md:block">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 dark:bg-gray-700"></div>
      {visibleEvents.map((event, index) => (
        <div
          key={event.id}
          className={`relative mb-8 ${
            index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
          }`}
        >
          <div
            className={`absolute top-0 ${
              index % 2 === 0 ? 'right-0' : 'left-0'
            } w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2 ${
              index % 2 === 0 ? '-translate-x-1/2' : 'translate-x-1/2'
            }`}
          ></div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {event.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

