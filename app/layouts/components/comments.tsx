import React, { useState, useEffect } from 'react';

export function Comments() {
  // 使用 useState 管理评论列表
  const [comments, setComments] = useState([]);
  // 管理当前输入的评论
  const [newComment, setNewComment] = useState({
    avatar: localStorage.getItem("userAvatar") || "",
    username: localStorage.getItem("username") || "",
    content: ""
  });

  // 从本地存储加载评论（如果有）
  useEffect(() => {
    const savedComments = localStorage.getItem('modelComments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  // 保存评论到本地存储
  useEffect(() => {
    localStorage.setItem('modelComments', JSON.stringify(comments));
  }, [comments]);

  // 处理评论内容变化
  const handleCommentChange = (e) => {
    setNewComment({
      ...newComment,
      content: e.target.value
    });
  };

  // 提交评论
  const handleSubmitComment = () => {
    if (!newComment.content.trim()) return; // 空评论不提交
    
    // 创建新评论对象
    const commentToAdd = {
      ...newComment,
      id: Date.now(), // 添加唯一ID
      timestamp: new Date().toISOString()
    };
    
    // 更新评论列表
    setComments([...comments, commentToAdd]);
    
    // 清空输入框
    setNewComment({
      avatar: localStorage.getItem("userAvatar") || "",
      username: localStorage.getItem("username") || "",
      content: ""
    });
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">评论区</h3>
      
      {/* 评论输入区 */}
      <div className="mb-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          placeholder="分享你的想法..."
          value={newComment.content}
          onChange={handleCommentChange}
          rows={3}
        />
        <button 
          className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg mt-3 transition-colors"
          onClick={handleSubmitComment}
          disabled={!newComment.content.trim()}
        >
          发表评论
        </button>
      </div>
      
      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">暂无评论，快来发表你的看法吧！</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <img 
                  src={comment.avatar || "https://picsum.photos/40/40"} 
                  alt={comment.username || "匿名用户"} 
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <h4 className="font-medium">{comment.username || "匿名用户"}</h4>
                  <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}