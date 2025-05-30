import React, { useState } from 'react';
import { Link } from 'react-router';

export function UserModels({ profile }) {
  const isCurrentUser = localStorage.getItem("username") === profile.name;
  const [activeTab, setActiveTab] = useState('all'); // 仅当前用户需要

  // 根据标签筛选模型
  const getFilteredModels = () => {
    if (!isCurrentUser) return profile.uploadedModels.filter(m => m.isPublic);
    
    switch(activeTab) {
      case 'public':
        return profile.uploadedModels.filter(m => m.isPublic);
      case 'private':
        return profile.uploadedModels.filter(m => !m.isPublic);
      default: // all
        return profile.uploadedModels;
    }
  };

  const filteredModels = getFilteredModels();

  return (
    <div className="mt-8">
      {/* 标签导航（仅当前用户可见） */}
      {isCurrentUser && (
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 text-pink-600 border-b-2 border-pink-600 font-medium ${activeTab === 'all' ? 'text-pink-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('all')}
          >
            全部 ({profile.uploadedModels.length})
          </button>
          <button
            className={`px-4 py-2 text-pink-600 border-b-2 border-pink-600 font-medium ${activeTab === 'public' ? 'text-pink-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('public')}
          >
            公开 ({profile.uploadedModels.filter(m => m.isPublic).length})
          </button>
          <button
            className={`px-4 py-2 text-pink-600 border-b-2 border-pink-600 font-medium ${activeTab === 'private' ? 'text-pink-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('private')}
          >
            私有 ({profile.uploadedModels.filter(m => !m.isPublic).length})
          </button>
        </div>
      )}

      {/* 模型网格 */}
      {filteredModels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <Link
              to={`/models/${model.id}`}
              key={model.id}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={model.preview || 'https://picsum.photos/400/300'}
                    alt={model.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* 模型状态标签 */}
                  {!model.isPublic && (
                    <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
                      私有
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-pink-600 transition-colors">
                    {model.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <img
                        src={profile.avatar || 'https://picsum.photos/32/32'}
                        alt={profile.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-600">{profile.name}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <i className="fa fa-eye mr-1"></i> {model.views || 0}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <i className="fa fa-folder-open-o text-gray-400 text-5xl mb-4"></i>
          <p className="text-gray-500">
            {isCurrentUser ? "你还没有上传任何模型" : "该用户还没有公开的模型"}
          </p>
        </div>
      )}
    </div>
  );
}