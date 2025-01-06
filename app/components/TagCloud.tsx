interface TagCloudProps {
  tags: string[]
  selectedTag: string
  onSelectTag: (tag: string) => void
}

export const TagCloud: React.FC<TagCloudProps> = ({ tags, selectedTag, onSelectTag }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelectTag(tag === selectedTag ? '' : tag)}
          className={`px-3 py-1 rounded-full text-sm ${
            tag === selectedTag
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          } hover:bg-blue-400 hover:text-white transition-colors duration-200`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

