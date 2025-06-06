import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

interface UploadButtonProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected: (files: FileList) => void;
  className?: string;
}

export function UploadButton({ 
  label = "上传文件", 
  accept = "zip/*", 
  multiple = false, 
  onFilesSelected,
  className = "" 
}: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 打开文件选择器
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onFilesSelected(files);
    }
  };

  // 拖放相关事件处理
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* 隐藏的原生文件输入控件 */}
      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {/* 自定义上传按钮 */}
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md ${
          isDragging ? 'ring-2 ring-offset-2 ring-pink-500' : ''
        }`}
      >
        <FontAwesomeIcon icon={faUpload} className="mr-2" />
        {label}
      </button>
      
      {/* 拖放提示（可选） */}
      {isDragging && (
        <div className="absolute inset-0 bg-pink-100 border-2 border-dashed border-pink-500 rounded-lg flex items-center justify-center text-pink-600">
          释放文件进行上传
        </div>
      )}
    </div>
  );
}