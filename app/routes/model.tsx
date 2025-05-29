import React, { useRef, useState } from "react";
import { Form } from "react-router";
import { Scene } from "../scene/scene";

export default function Model() {
  const model = {
    name: "cat",
    description: "Meow~",
    avatar: "https://placecats.com/millie/300/150",
  };

  const [like, setLike] = useState(false);
  const [likeNumber, setLikeNumber] = useState(1000);

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 模型展示区域 */}
          <div className="h-96 relative">
            <Scene />
          </div>
          {/* 模型信息区域 */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {model.name ? (
                <>
                  {model.name}
                </>
              ) : (
                <i>No Name</i>
              )}
            </h1>
            {model.description ? (
              <p className="text-gray-600 mb-4">{model.description}</p>
            ) : null}
            <div className="flex items-center space-x-4 mb-4">
              <p className="text-gray-600">Name: xxx</p>
              <p className="text-gray-600">Upload date: xxxx-xx-xx</p>
              <p className="text-gray-600">Download times: xxx</p>
            </div>
            <div className="flex items-center space-x-4">
              <i
                className={`fa ${like ? "fa-heart text-red-500" : "fa-heart-o hover:text-pink-300"} text-2xl cursor-pointer`}
                onClick={(e) => {
                  if (!like) {
                    setLike(true);
                    setLikeNumber(likeNumber + 1);
                  } else {
                    setLike(false);
                    setLikeNumber(likeNumber - 1);
                  }
                }}
              >
                {likeNumber}
              </i>
              <i className="fa fa-share-square-o hover:text-pink-300 text-2xl cursor-pointer">分享</i>
              <Form>
                <button
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md"
                  type="button"
                >
                  <i className="fa fa-download mr-2"></i> Download
                </button>
              </Form>
            </div>
          </div>
          {/* 评论区域 */}
          <div className="bg-gray-50 p-8">
            <div className="mb-4">
              <textarea
                className="w-full h-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                defaultValue="write comment"
              />
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md mt-2">
                发表评论
              </button>
            </div>
            <div className="space-y-4">
              {Array.from({ length: 15 }).map((_, index) => (
                <p key={index} className="text-gray-600">
                  comment
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
