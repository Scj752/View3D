// View3D/frontend/app/components/UploadModal.tsx
import React, { useState } from 'react';
import { uploadModel } from '../../api';

type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [formData, setFormData] = useState(new FormData());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formData.append(name, value);
    setFormData(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formData.append(e.target.name, file);
      setFormData(formData);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await uploadModel(formData);
      if (response) {
        console.log('Model uploaded successfully:', response);
        onClose();
      } else {
        setError('上传失败，请重试');
      }
    } catch (err: any) {
      setError(err.message || '上传过程中发生错误');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">上传3D模型</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fa fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                模型名称
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="输入模型名称"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="creatorId" className="block text-sm font-medium text-gray-700 mb-1">
                创建者ID
              </label>
              <input
                type="text"
                id="creatorId"
                name="creatorId"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="输入你的用户ID"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              模型描述
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="描述你的模型..."
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              标签（逗号分隔）
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="例如: 3D, 建筑, 室内设计"
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                缩略图
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                className="w-full"
                onChange={handleFileChange}
                required
              />
            </div>
            <div>
              <label htmlFor="modelFile" className="block text-sm font-medium text-gray-700 mb-1">
                模型文件
              </label>
              <input
                type="file"
                id="modelFile"
                name="modelFile"
                accept=".glb,.gltf,.obj,.fbx"
                className="w-full"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm">
              <i className="fa fa-exclamation-circle mr-1"></i> {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-2"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                <i className="fa fa-spinner fa-spin mr-1"></i> 上传中...
                </>
              ) : (
                <>
                <i className="fa fa-upload mr-1"></i> 上传模型
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}