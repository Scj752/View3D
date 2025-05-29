import React, { useRef, useState } from "react";
import { Form } from "react-router";
import { Scene } from "../scene/scene";
import { Comments } from "../layouts/components/comments";
import { ModelDetails } from "../layouts/components/modeldetails";

export default function Model() {
  const model = {
    name: "cat",
    description: "Meow~",
    avatar: "https://placecats.com/millie/300/150",
    likes: 1000,
    likers: [
      {
        id: '001',
        username: 'john',
        avatar: 'https://multiavatar.com/a',
      }
    ]
  };
  const comments = [
  	{
  		avatar: "https://ts1.tc.mm.bing.net/th/id/OIP-C.5hemK99GC2sI6GEP3pYJmwAAAA?w=177&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
  		username: "john",
  		content: "good",
  	}
  ]
  const [comment, setComment] = useState(null);

  const [like, setLike] = useState(false);
  const [likeNumber, setLikeNumber] = useState(1000);

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-200 relative">
            <Scene />
          </div>
          <ModelDetails model={model} />
          <Comments />
        </div>
      </div>
    </div>
  );
}
