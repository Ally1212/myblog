export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Background</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          I'm a passionate web developer with a focus on creating elegant and efficient solutions. 
          With years of experience in the field, I've worked on a variety of projects ranging from 
          small business websites to large-scale web applications.
        </p>
      </section>
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Interests</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          <li>Front-end development</li>
          <li>User experience design</li>
          <li>Open source contributions</li>
          <li>Continuous learning and improvement</li>
        </ul>
      </section>
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Feel free to reach out to me at: <a href="mailto:example@email.com" className="text-blue-600 dark:text-blue-400 hover:underline">example@email.com</a>
        </p>
      </section>
    </div>
  )
}

