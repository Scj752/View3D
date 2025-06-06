// routes/upload.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { uploadModel, getCurrentUser } from '../api';

const UploadModelPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    modelFile: null,
    thumbnail: null,
    creatorId: null
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 检查用户登录状态
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user.id) {
          setFormData(prev => ({ ...prev, creatorId: user.id }));
          setIsLoggedIn(true);
        } else {
          // 用户未登录，重定向到登录页
          navigate('/login');
          setError('请先登录再上传模型');
        }
      } catch (err) {
        // 处理登录验证错误
        navigate('/login');
        setError('请先登录再上传模型');
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // 文件类型和大小验证
      if (fieldName === 'modelFile' && !file.name.endsWith('.zip')) {
        setError('请上传ZIP格式的模型文件');
        return;
      }
      
      if (fieldName === 'thumbnail' && !['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setError('请上传JPG、PNG或GIF格式的缩略图');
        return;
      }
      
      if (file.size > 100 * 1024 * 1024) { // 100MB限制
        setError('文件大小不能超过100MB');
        return;
      }
      
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 验证必填字段
    if (!formData.modelFile) {
      setError('请选择要上传的模型文件');
      return;
    }
    
    if (!formData.thumbnail) {
      setError('请选择模型缩略图');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');
    
    try {
      // 准备表单数据
      const form = new FormData();
      form.append('name', formData.name);
      form.append('description', formData.description);
      form.append('tags', formData.tags.split(',').map(tag => tag.trim()));
      form.append('modelFile', formData.modelFile);
      form.append('thumbnail', formData.thumbnail);
      form.append('creatorId', formData.creatorId);
      
      // 上传模型
      await uploadModel(form, (progress) => {
        setUploadProgress(progress);
      });
      
      // 上传成功后跳转
      setSuccessMessage('模型上传成功！');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.message || '上传失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">上传3D模型</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 模型基本信息字段 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              模型名称
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              标签（用逗号分隔）
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="例如: 3D模型,建筑,室内"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            模型描述
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        {/* 模型文件上传字段 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            模型文件（ZIP格式）
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {formData.modelFile ? (
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">已选择:</span> {formData.modelFile.name}
                  </p>
                </div>
              ) : (
                <div>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="model-file"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                    >
                      <span>上传模型文件</span>
                      <input
                        id="model-file"
                        name="model-file"
                        type="file"
                        accept=".zip"
                        onChange={(e) => handleFileChange(e, 'modelFile')}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">或拖放文件</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    支持ZIP格式，最大100MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 缩略图上传字段 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            缩略图（JPG/PNG/GIF）
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {formData.thumbnail ? (
                <div>
                  <img
                    src={URL.createObjectURL(formData.thumbnail)}
                    alt="缩略图预览"
                    className="max-h-40 mx-auto rounded"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">已选择:</span> {formData.thumbnail.name}
                  </p>
                </div>
              ) : (
                <div>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="thumbnail"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                    >
                      <span>上传缩略图</span>
                      <input
                        id="thumbnail"
                        name="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'thumbnail')}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">或拖放图片</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    支持JPG、PNG、GIF格式
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {isSubmitting && (
          <div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              上传中: {uploadProgress}%
            </p>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !formData.modelFile || !formData.thumbnail}
            className={`px-6 py-2 border border-transparent rounded-md text-white font-medium 
                        ${isSubmitting || !formData.modelFile || !formData.thumbnail 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'}`}
          >
            {isSubmitting ? '上传中...' : '提交'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadModelPage;