// View3D/frontend/app/api.ts
const API_BASE_URL = 'http://localhost:8080/api';

// 登录
export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include', // 确保发送和接收cookie
  });
  
  if (!response.ok) {
    throw new Error(await response.text() || '登录失败');
  }
  
  return response.json();
};

// 获取当前用户信息
export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('未登录或登录已过期');
  }
  
  return response.json();
};

// 登出
export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('登出失败');
  }
  
  return response.json();
};

// 获取所有模型
export const getAllModels = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/models/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
};

// 获取模型详情
export const getModelById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/models/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch model details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching model details:', error);
    return null;
  }
};

// 下载模型
export const downloadModel = async (filePath: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/models/download/${filePath}`);
    if (!response.ok) {
      throw new Error('Failed to download model');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath.split('/').pop() || 'model.glb';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading model:', error);
  }
};

// 上传模型
export const uploadModel = async (formData, onProgress) => {
  const response = await fetch(`${API_BASE_URL}/models/upload`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(await response.text() || '上传失败');
  }

  return response.json();
};

// 获取个人信息
export const getUserProfile = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// 更新个人信息
export const updateUserProfile = async (userId: string, profile: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });
    if (!response.ok) {
      throw new Error('Failed to update user profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
};