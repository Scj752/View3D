import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Html, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import React from 'react';
import styled from 'styled-components';
import { ModelComments } from './ModelComments';
import Loader from '../layouts/components/loader';

export function Scene() {

	const [active1, setActive1] = useState(false);
	const [active2, setActive2] = useState(false);
	const [hovered1, setHover1] = useState(false);
	const [hovered2, setHover2] = useState(false);
	return (
		<>
		<Canvas frameloop="demand" camera={{position: [0,3,5]}}>
			<ambientLight intensity={Math.PI / 2} />
			<spotLight 
				position={10, 10, 10} 
				angle={0.15} 
				penumbra={1} 
				decay={0} 
				intensity={Math.PI} />
			<pointLight 
				position={[-10, -10, -10]} 
				decay={0} 
				intensity={Math.PI} />

			<Suspense fallback={<ModelLoader />}>
				<ModelPrimitive scale={100}/>
				<OrbitControls />
			</Suspense>
		</Canvas>
		</>
	);
}

function ModelPrimitive(props) {

	const gltf = useLoader(GLTFLoader, '/2020_porsche_718_cayman_gt4/scene.gltf');
	return <primitive {...props} object={gltf.scene} />
}

function ModelLoader() {
	const { progress } = useProgress();
	return (
		<Html center>
			<Loader class=""/>
			<p class=""><br/>{progress} % loaded</p>
		</Html>
	);
}