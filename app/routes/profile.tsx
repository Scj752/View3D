import React from "react";
import { Link } from "react-router";

// 模拟个人信息和上传的模型数据
const profile = {
    name: "John Doe",
    avatar: localStorage.getItem("userAvatar"),
    uploadedModels: [
        { id: 1, name: "Model 1", preview: "https://placehold.co/300x200" },
        { id: 2, name: "Model 2", preview: "https://placehold.co/300x200" },
        // 可以添加更多模型数据
    ],
};

export default function Profile() {
    return (
        <div className="h-full pt-24 bg-gray-100">
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
                <div className="flex items-center space-x-4">
                    <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-full" />
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">{profile.name}</h1>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {profile.uploadedModels.map((model) => (
                        <Link to={`/models/${model.id}`} key={model.id} className="block bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={model.preview} alt={model.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-gray-800">{model.name}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
// import React from 'react';

// export default function Profile() {
//     const userAvatar = localStorage.getItem('userAvatar');
//     return (
//         <div className="pt-24 px-4 sm:px-6 lg:px-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">个人资料</h2>
//             <img src={userAvatar} alt="用户头像" className="w-20 h-20 rounded-full mb-4" />
//             <p>这里可以显示用户的其他信息</p>
//         </div>
//     );
// }