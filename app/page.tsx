import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12 space-y-12 min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <section className="text-center max-w-3xl mx-auto transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Welcome to My Personal Website
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in">
          Explore my thoughts, projects, and experiences.
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Link 
          href="/articles" 
          className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 p-8 rounded-xl shadow-lg hover:shadow-2xl backdrop-blur-sm transition-all duration-300 ease-out transform hover:-translate-y-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            My Articles
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Read my latest thoughts and insights.
          </p>
        </Link>
        
        <Link 
          href="/about"
          className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 p-8 rounded-xl shadow-lg hover:shadow-2xl backdrop-blur-sm transition-all duration-300 ease-out transform hover:-translate-y-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
            About Me
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Learn more about my background and interests.
          </p>
        </Link>
      </section>
    </main>
  )
}

