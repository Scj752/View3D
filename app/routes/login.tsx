// View3D/app/routes/login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 这里简单模拟登录成功，实际应用中需要验证用户名和密码
        if (username && password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userAvatar', 'https://ts1.tc.mm.bing.net/th/id/OIP-C.5hemK99GC2sI6GEP3pYJmwAAAA?w=177&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'); // 模拟用户头像
            navigate('/');
        } else {
            alert('请输入用户名和密码');
        }
    };

    return (
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">登录</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <button
                    type="submit"
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md"
                >
                    登录
                </button>
            </form>
        </div>
    );
}