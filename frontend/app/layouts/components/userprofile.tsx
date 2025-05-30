import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationDot, 
  faCalendar, 
  faUserGroup, 
  faUserPlus, 
  faEdit,
  faMessage, 
  faCheckCircle,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { EditProfileForm } from './editprofile.tsx';

export function UserProfile({ profile, isCurrentUser, onEditProfile }) {
  const [showStats, setShowStats] = useState(false);
  const [hoverCard, setHoverCard] = useState(null);
  
  // 统计数据动画效果
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowStats(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const statsElement = document.getElementById('user-stats');
    if (statsElement) {
      observer.observe(statsElement);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // 数字增长动画
  const formatNumber = (num) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + 'w';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleEditProfile = () => {
    setTempProfile(profile); // 复制当前数据
    setIsEditing(true);
  };

  const handleSaveProfile = (updatedProfile) => {
    // 实际项目中，这里应该调用API保存数据
    console.log("保存个人资料:", updatedProfile);
    
    // 模拟保存成功后更新状态
    setIsEditing(false);
    // 这里可以触发父组件的回调更新全局状态
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditProfileForm
        initialProfile={tempProfile}
        onSave={handleSaveProfile}
        onCancel={handleCancelEdit}
      />
    );
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* 顶部背景图 */}
      <div className="h-40 bg-gradient-to-r from-pink-500 to-violet-600 relative">
        {/* 自定义背景图 */}
        {profile.coverImage && (
          <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${profile.coverImage})` }}></div>
        )}
        
        {/* 编辑按钮（仅当前用户可见） */}
        {isCurrentUser && (
          <button 
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-110"
            onClick={handleEditProfile}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
      </div>
      
      {/* 用户信息主体 */}
      <div className="px-6 pb-6 relative">
        {/* 头像 */}
        <div className="flex justify-center -mt-16">
          <div className="relative">
            <img 
              src={profile.avatar || 'https://picsum.photos/200/200'} 
              alt={profile.name || '用户头像'} 
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover transition-all duration-300 hover:scale-105"
            />
            {/* 在线状态指示器 */}
            {profile.isOnline && (
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
        </div>
        
        {/* 基本信息 */}
        <div className="text-center mt-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            {profile.name || '未设置昵称'}
          </h1>
          
          {/* 用户身份标签 */}
          <div className="flex justify-center items-center space-x-2 mt-1 mb-3">
            {profile.isVerified && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> 已认证
              </span>
            )}
            {profile.isPremium && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                <FontAwesomeIcon icon={faStar} className="mr-1" /> VIP会员
              </span>
            )}
          </div>
          
          {/* 简介 */}
          <p className="text-gray-600 max-w-md mx-auto mb-4">
            {profile.introduction || '这个用户很懒，还没有留下简介'}
          </p>
          
          {/* 数据统计 */}
          <div id="user-stats" className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer"
                 onMouseEnter={() => setHoverCard('作品')}
                 onMouseLeave={() => setHoverCard(null)}>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {showStats ? formatNumber(profile.works || 0) : '0'}
              </div>
              <div className="text-sm text-gray-500">
                作品
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer"
                 onMouseEnter={() => setHoverCard('粉丝')}
                 onMouseLeave={() => setHoverCard(null)}>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {showStats ? formatNumber(profile.followers || 0) : '0'}
              </div>
              <div className="text-sm text-gray-500">
                粉丝
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer"
                 onMouseEnter={() => setHoverCard('关注')}
                 onMouseLeave={() => setHoverCard(null)}>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {showStats ? formatNumber(profile.followees || 0) : '0'}
              </div>
              <div className="text-sm text-gray-500">
                关注
              </div>
            </div>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex justify-center space-x-3 mt-6">
            {isCurrentUser ? (
              <button 
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                onClick={handleEditProfile}
              >
                <FontAwesomeIcon icon={faEdit} className="mr-1" /> 编辑资料
              </button>
            ) : (
              <button 
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                <FontAwesomeIcon icon={faUserPlus} className="mr-1" /> 关注
              </button>
            )}
            
            <button 
              className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-6 rounded-lg border border-gray-200 transition-all duration-300 transform hover:scale-105 shadow-sm"
            >
              <FontAwesomeIcon icon={faMessage} className="mr-1" /> 私信
            </button>
          </div>
          
          {/* 额外信息 */}
          <div className="flex justify-center space-x-6 mt-6 text-gray-600">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLocationDot} className="mr-1 text-pink-500" />
              <span>{profile.location || '未设置地区'}</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendar} className="mr-1 text-pink-500" />
              <span>注册于 {profile.registerTime || '未知时间'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}