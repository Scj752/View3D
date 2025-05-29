import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareSquare, faDownload, faCalendar, faHdd, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'; // 新增空心心形
import { faShareSquare as faShareSquareOutline } from '@fortawesome/free-regular-svg-icons';
import { Rating } from 'react-simple-star-rating';

export function ModelDetails({ model }) {
  console.log("ModelDetails 接收到的model:", model);
  if (!model) {
    return <div>加载中...</div>;
  }
  const [like, setLike] = useState(false);
  const [likeNumber, setLikeNumber] = useState(model.likes || 0);
  const [likeAnimating, setLikeAnimating] = useState(false); // 动画状态
  const [showStats, setShowStats] = useState(false);
  
  const [rating, setRating] = useState(model.rating || 0);

  // 模拟数据加载动画
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 模拟数据加载延迟
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);
  
  const toggleLike = () => {
    setLikeAnimating(true); // 触发动画
    setTimeout(() => {
      setLike(!like);
      setLikeNumber(like ? likeNumber - 1 : likeNumber + 1);
      setLikeAnimating(false);
    }, 200); // 动画时长与CSS过渡一致
  };
  // 统计数据动画
  const handleStatsHover = () => {
    setShowStats(true);
    setTimeout(() => {
      setShowStats(false);
    }, 2000);
  };

  // 评分功能
  const handleRating = (rate) => {
    setRating(rate);
    // 这里可以添加评分提交逻辑
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* 顶部视觉卡片 */}
      <div className="relative h-64 bg-gradient-to-r from-pink-500 to-violet-500">
        {/* 模型预览图或3D渲染缩略图 */}
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${model.thumbnail || 'https://picsum.photos/800/400'})` }}></div>
        
        {/* 浮动操作按钮 */}
        <div className="absolute bottom-4 right-4 flex space-x-3">
          <button 
            className="bg-white/90 hover:bg-white text-pink-500 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
            onClick={toggleLike}
          >
            <FontAwesomeIcon 
              icon={like ? faHeart : faHeartOutline} 
              className={`text-2xl cursor-pointer ${likeAnimating ? 'like-animation' : ''}`}
              onClick={toggleLike}
            />
            <span className="ml-1 text-sm text-pink-500 font-semibold">
              {likeNumber}
            </span>
          </button>
          <button 
            className="bg-white/90 hover:bg-white text-pink-500 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          >
            <FontAwesomeIcon icon={faShareSquareOutline} />
          </button>
          <button 
            className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          >
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
      </div>
      
      {/* 详情内容 */}
      <div className="p-6 md:p-8">
        {/* 模型名称和描述 */}
        <div className="mb-6">
          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-800 mb-3 transition-all duration-300">
            {loading ? (
              <div className="w-3/4 h-8 bg-gray-200 rounded"></div>
            ) : (
              model.name || "未命名模型"
            )}
          </h1>
          
          <p className="text-gray-600 mb-4 transition-all duration-300 delay-100">
            {loading ? (
              <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            ) : (
              model.description || "暂无描述"
            )}
          </p>
        </div>
        
        {/* 模型统计信息 */}
        {/* 上传时间 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">上传日期</span>
              <FontAwesomeIcon icon={faCalendar} className="text-pink-500" />
            </div>
            <p className="text-lg font-semibold mt-2">
              {loading ? (
                <div className="w-1/3 h-5 bg-gray-200 rounded"></div>
              ) : (
                model.uploadDate || "未知"
              )}
            </p>
          </div>
          {/* 下载次数 */}
          <div className="bg-gray-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">下载次数</span>
              <FontAwesomeIcon icon={faDownload} className="text-pink-500" />
            </div>
            <p className="text-lg font-semibold mt-2">
              {loading ? (
                <div className="w-1/4 h-5 bg-gray-200 rounded"></div>
              ) : (
                model.downloads?.toLocaleString() || "0"
              )}
            </p>
          </div>
          {/* 文件大小 */}
          <div className="bg-gray-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">文件大小</span>
              <FontAwesomeIcon icon={faHdd} className="text-pink-500" />
            </div>
            <p className="text-lg font-semibold mt-2">
              {loading ? (
                <div className="w-1/4 h-5 bg-gray-200 rounded"></div>
              ) : (
                model.fileSize || "未知"
              )}
            </p>
          </div>
        </div>
        
        {/* 评分 */}
        <div className="flex items-center mb-6">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(i => (
              <FontAwesomeIcon 
                key={i} 
                icon={faStar} 
                className={`text-yellow-400 ${i <= (model.rating || 0) ? 'opacity-100' : 'opacity-30'}`} 
              />
            ))}
          </div>
          <span className="ml-2 text-gray-600">{(model.rating || 0).toFixed(1)}</span>
        </div>
        {/* 标签 */}
        <div>
          <div className="flex flex-wrap gap-2">
            {model.tags?.map(tag => (
              <span key={tag} className="bg-pink-100 text-pink-800 text-xs font-medium px-3 py-1 rounded-full transition-all duration-300 hover:bg-pink-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* 作者信息 */}
        <div className="flex items-center p-4 bg-gray-50 rounded-xl transition-all duration-300 hover:shadow-md">
          <img 
            src={model.author?.avatar || 'https://picsum.photos/64/64'} 
            alt={model.author?.name || '作者'} 
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="ml-4">
            <h4 className="font-semibold text-gray-800">
              {loading ? (
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
              ) : (
                <Link to={`/user/${model.author?.id || 'unknown'}`} className="hover:text-pink-500 transition-colors">
                  {model.author?.name || "未知作者"}
                </Link>
              )}
            </h4>
            <p className="text-sm text-gray-500">上传于 {model.uploadDate || "未知时间"}</p>
          </div>
        </div>
        {likeNumber > 0 && (
          <div className="mt-6 border-t pt-4">
            <p className="text-sm text-gray-500 mb-2">
              {likeNumber} 人觉得很赞
            </p>
            <div className="flex space-x-2 overflow-x-auto">
              {/* 展示最近5位点赞用户，点击头像可查看个人主页 */}
              {model.likers.slice(0, 5).map((user) => (
                <Link to={`/user/${user.id}`} key={user.id}>
                  <img 
                    src={user.avatar || "/default-avatar.jpg"} 
                    alt={user.username} 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  />
                </Link>
              ))}
              {likeNumber > 5 && (
                <Link to={`/model/${model.id}/likers`} className="flex items-center text-sm text-pink-500">
                  查看全部 <span className="font-semibold">{likeNumber - 5}</span> 人
                </Link>
              )}
            </div>
          </div>
        )}
        {like && (
          <div className="mt-4 bg-pink-100 p-3 rounded-lg">
            <p className="text-sm text-pink-800">
              感谢你的点赞！快来分享你对这个模型的看法吧～
            </p>
            <button 
              className="text-pink-500 font-medium"
              onClick={() => setShowCommentForm(true)} // 显示评论输入框
            >
              发表评论
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
