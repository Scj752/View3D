import React from "react";
import { Link } from "react-router";

// 模拟模型数据
// const models = [
//     { id: 1, name: "Model 1", preview: "https://placehold.co/300x200" },
//     { id: 2, name: "Model 2", preview: "https://placehold.co/300x200" },
//     // 可以添加更多模型数据
// ];
  const models = [
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },
    
  ];
const topLikers = [
  {
    username: "john",
    avatar: "https://api.multiavatar.com/john.png",
    likeCount: "1000",
  },
];
export default function Preview() {
  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8">
      {topLikers && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">本周点赞达人</h3>
          <ol className="space-y-3">
            {topLikers.map((user, index) => (
              <li key={user.id} className="flex items-center">
                <span className="text-sm font-semibold text-pink-500">{index + 1}.</span>
                <img 
                  src={user.avatar} 
                  alt={user.username} 
                  className="w-6 h-6 rounded-full ml-2"
                />
                <span className="ml-1 text-gray-600">{user.username}</span>
                <span className="ml-auto text-sm text-gray-500">点赞数：{user.likeCount}</span>
              </li>
            ))}
          </ol>
        </div>)
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {models.map((model) => (
          <Link
            to={`/models/${model.id}`}
            key={model.id}
            className="block bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            <img src={model.url} alt={model.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{model.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}