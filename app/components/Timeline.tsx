'use client'

import { useEffect, useState } from 'react'

interface TimelineEvent {
  id: number
  date: string
  title: string
}

const events: TimelineEvent[] = [
  { id: 1, date: '2023-06-01', title: 'Published new article' },
  { id: 2, date: '2023-05-15', title: 'Started a new project' },
  { id: 3, date: '2023-05-01', title: 'Attended a conference' },
  // Add more events as needed
]

export const Timeline: React.FC = () => {
  const [visibleEvents, setVisibleEvents] = useState<TimelineEvent[]>([])

  useEffect(() => {
    const loadMoreEvents = () => {
      setVisibleEvents((prev) => [
        ...prev,
        ...events.slice(prev.length, prev.length + 2),
      ])
    }

    loadMoreEvents()

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        loadMoreEvents()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

