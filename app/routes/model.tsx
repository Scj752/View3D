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
		<div class="h-full pt-30 bg-black">
		<div class="flex flex-col space-y-4 ml-30 mr-30 ring ring-pink-500 ring-offset-0
			xl:ml-80 xl:mr-80
		">
			<div class="
				ml-5 mr-5 h-100  bg-gray-300 rounded-lg
				xl:ml-10 xl:mr-10 xl:h-200
			">
				<Scene />
			</div>
			<div class="p-3 rounded-[50px] bg-[#e0e0e0] shadow-[20px_20px_20px_0_rgba(190,190,190,1)] shadow-[-20px_-20px_60px_0px_rgba(255,255,255,1)]">
				<h1 class="text-4xl font-bold">
					{model.name ? (
						<>
							{model.name}
						</>
					) : (
						<i>No Name</i>
					)}
				</h1>

				{model.description ? (
					<p>{model.description}</p>
				) : null}
				<p>Name: xxx</p>
				<p>Upload date: xxxx-xx-xx</p>
				<p>Download times: xxx</p>
				<i class=
						{like?"fa fa-heart text-red-500":"fa fa-heart-o hover:text-pink-300"}
						onClick={(e) => {
							if (!like) {
								setLike(true);
								setLikeNumber(likeNumber+1);
							} else {
								setLike(false);
								setLikeNumber(likeNumber-1);
							}
						}}
					>{likeNumber}</i>
				<i class="fa fa-share-square-o hover:text-pink-300">分享</i>
				<div class="">
					<Form>
						
						<button class="btn-primary" type="button"><i class="fa fa-download"> Download</i></button>
					</Form>
				</div>
			</div>
			<div class="bg-pink-50">
				<div class="h-20 bg-gray-50">
					<textarea class="w-full h-full" defaultvalue="write comment"/>
				</div>
				<button>发表评论</button>
				<div class="">
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p><p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p><p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
					<p>comment</p>
				</div>
			</div>
		</div>
		</div>
	);
}