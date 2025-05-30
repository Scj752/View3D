// app/scene/ModelComments.tsx
import React, { useState } from 'react';

export function ModelComments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment) {
      setComments([...comments, { text: newComment, rating }]);
      setNewComment('');
      setRating(0);
    }
  };

  return (
    <div>
      <h2>模型评论和评分</h2>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="请输入评论"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={1}>1星</option>
          <option value={2}>2星</option>
          <option value={3}>3星</option>
          <option value={4}>4星</option>
          <option value={5}>5星</option>
        </select>
        <button type="submit">提交</button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
            <p>评分: {comment.rating}星</p>
          </div>
        ))}
      </div>
    </div>
  );
}