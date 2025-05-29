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
export default function Preview() {
  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8">
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