import React, { useState } from "react";
import { Link } from "react-router";
import { UserProfile } from "../layouts/components/userprofile";
import { UserModels } from "../layouts/components/usermodels";



export default function Profile() {
    // 模拟个人信息和上传的模型数据
    const [userProfile, setUserProfile] = useState({
        name: "John Doe",
        location: "Nanjing",
        registerTime: "2025-05-30",
        followers: "32",
        followees: "89",
        introduction: "there is nothing to introduce",
        avatar: localStorage.getItem("userAvatar"),
        uploadedModels: [
            { id: 1, name: "Model 1", preview: "https://placehold.co/300x200", isPublic: true},
            { id: 2, name: "Model 2", preview: "https://picsum.photos/40/40", isPublic: false},
            
            { id: 1, name: "Model 1", preview: "https://placehold.co/300x200", isPublic: true},
            { id: 2, name: "Model 2", preview: "https://picsum.photos/40/40", isPublic: false},
            
            { id: 1, name: "Model 1", preview: "https://placehold.co/300x200", isPublic: true},
            { id: 2, name: "Model 2", preview: "https://picsum.photos/40/40", isPublic: false},
            
            { id: 1, name: "Model 1", preview: "https://placehold.co/300x200", isPublic: true},
            { id: 2, name: "Model 2", preview: "https://picsum.photos/40/40", isPublic: false},
            // 可以添加更多模型数据
        ],
        isVerified: true,
        isPremium: false,
        isOnline: true,
    });
     const handleUpdateProfile = (updatedProfile) => {
        // 调用API保存到后端
        // 保存成功后更新本地状态
        setUserProfile(updatedProfile);
      };
    return (
        <div className="h-full pt-24 bg-gray-100">
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
                <UserProfile 
                    profile={userProfile} 
                    isCurrentUser={true}
                    onUpdateProfile={handleUpdateProfile}
                />
				<UserModels profile={userProfile}/>
            </div>
        </div>
    );
}