'use client'

import { useState } from 'react'

interface Commentinterface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (newComment.trim() !== '') {
      const comment: Comment = {
        id: Date.now(),
        author: 'Anonymous', // You can replace this with a user system later
        content: newComment,
        date: new Date().toISOString(),
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>
      <div className="space-y-4 mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="font-semibold">{comment.author}</p>
            <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{new Date(comment.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          rows={3}
        />
        <button
          onClick={addComment}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

