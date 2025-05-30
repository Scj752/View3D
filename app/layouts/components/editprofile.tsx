// EditProfileForm.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faTimes, 
  faUpload,
  faCamera
} from '@fortawesome/free-solid-svg-icons';

type Profile = {
  name: string;
  avatar: string;
  coverImage: string;
  introduction: string;
  location: string;
  isVerified: boolean;
  isPremium: boolean;
};

interface EditProfileFormProps {
  initialProfile: Profile;
  onSave: (updatedProfile: Profile) => void;
  onCancel: () => void;
}

export function EditProfileForm({ initialProfile, onSave, onCancel }: EditProfileFormProps) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // 预览图片
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      // 预览图片
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 实际项目中，这里应该发送数据到后端
      // 并处理文件上传
      
      onSave(profile);
    } catch (error) {
      console.error("保存失败:", error);
      // 显示错误提示
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* 顶部背景图编辑区域 */}
      <div className="h-40 bg-gray-200 relative">
        {profile.coverImage && (
          <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${profile.coverImage})` }}></div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
          <label htmlFor="cover-upload" className="cursor-pointer text-white flex items-center">
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            更换封面
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
          </label>
        </div>
      </div>
      
      {/* 编辑表单 */}
      <div className="px-6 pb-6 relative">
        {/* 头像编辑区域 */}
        <div className="flex justify-center -mt-16">
          <div className="relative">
            <img 
              src={profile.avatar || 'https://picsum.photos/200/200'} 
              alt={profile.name || '用户头像'} 
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            
            <div className="absolute bottom-0 right-0 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <FontAwesomeIcon icon={faCamera} className="text-white" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>
        </div>
        
        {/* 表单内容 */}
        <div className="mt-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">昵称</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">所在地</label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
            <textarea
              name="introduction"
              value={profile.introduction}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          
          {/* 用户身份设置 */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">账户设置</h3>
            
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="verified"
                checked={profile.isVerified}
                onChange={() => setProfile(prev => ({ ...prev, isVerified: !prev.isVerified }))}
                className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="verified" className="ml-2 block text-sm text-gray-700">
                认证用户
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="premium"
                checked={profile.isPremium}
                onChange={() => setProfile(prev => ({ ...prev, isPremium: !prev.isPremium }))}
                className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="premium" className="ml-2 block text-sm text-gray-700">
                VIP会员
              </label>
            </div>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-1" /> 取消
            </button>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span>
                  <FontAwesomeIcon icon="spinner" spin className="mr-1" /> 保存中...
                </span>
              ) : (
                <span>
                  <FontAwesomeIcon icon={faCheck} className="mr-1" /> 保存
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}