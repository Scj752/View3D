// View3D/app/routes/login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    // 检查是否有记住的用户名和密码
    useEffect(() => {
        const storedUsername = localStorage.getItem('rememberedUsername');
        const storedPassword = localStorage.getItem('rememberedPassword');
        if (storedUsername && storedPassword) {
            setUsername(storedUsername);
            setPassword(storedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 简单的表单验证
        if (!username || !password) {
            setError('请输入用户名和密码');
            return;
        }

        // 模拟与后端交互
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('userAvatar', data.avatar);

                // 处理记住密码
                if (rememberMe) {
                    localStorage.setItem('rememberedUsername', username);
                    localStorage.setItem('rememberedPassword', password);
                } else {
                    localStorage.removeItem('rememberedUsername');
                    localStorage.removeItem('rememberedPassword');
                }

                navigate('/');
            } else {
                const errorData = await response.json();
                setError(errorData.message || '登录失败，请重试');
            }
        } catch (err) {
            setError('网络错误，请稍后重试');
        }
    };

    return (
        <div className="pt-24 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">登录</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="用户名"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 mb-2 w-full focus:ring-pink-500 focus:border-pink-500"
                    />
                    <input
                        type="password"
                        placeholder="密码"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 mb-2 w-full focus:ring-pink-500 focus:border-pink-500"
                    />
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="mr-2"
                        />
                        <label>记住密码</label>
                    </div>
                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md w-full"
                    >
                        登录
                    </button>
                </form>
            </div>
        </div>
    );
}
// // View3D/app/routes/login.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';

// export default function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // 这里简单模拟登录成功，实际应用中需要验证用户名和密码
//         if (username && password) {
//             localStorage.setItem('isLoggedIn', 'true');
// 			localStorage.setItem('username', username);
//             localStorage.setItem('userAvatar', 'https://ts1.tc.mm.bing.net/th/id/OIP-C.5hemK99GC2sI6GEP3pYJmwAAAA?w=177&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'); // 模拟用户头像
//             navigate('/');
//         } else {
//             alert('请输入用户名和密码');
//         }
//     };

//     return (
//         <div className="pt-24 px-4 sm:px-6 lg:px-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">登录</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="用户名"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="border border-gray-300 rounded-md p-2 mb-2 w-full"
//                 />
//                 <input
//                     type="password"
//                     placeholder="密码"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="border border-gray-300 rounded-md p-2 mb-2 w-full"
//                 />
//                 <button
//                     type="submit"
//                     className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md"
//                 >
//                     登录
//                 </button>
//             </form>
//         </div>
//     );
// }