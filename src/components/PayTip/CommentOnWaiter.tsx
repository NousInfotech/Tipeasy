'use client';

import React, { useState } from 'react';

interface CommentOnWaiterProps {
  onNext: (comment: string) => void;
}

const CommentOnWaiter: React.FC<CommentOnWaiterProps> = ({ onNext }) => {
  const [comment, setComment] = useState<string>('');

  const handleNext = () => {
    onNext(comment || 'no_comment');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-5">
      <textarea
        placeholder="Leave your comments here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border-2 border-gray-300 rounded-md p-3 w-64 h-32"
      />
      <button
        onClick={handleNext}
        className="bg-purple-600 text-white p-3 rounded-md w-64"
      >
        Submit Comment
      </button>
      <button
        onClick={() => onNext('no_comment')}
        className="text-gray-600 underline"
      >
        Skip
      </button>
    </div>
  );
};

export default CommentOnWaiter;
