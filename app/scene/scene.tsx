import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Html, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import React from 'react';
import styled from 'styled-components';
import { ModelComments } from './ModelComments';

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

			<Suspense fallback={<Loader />}>
				<ModelPrimitive scale={100}/>
				<OrbitControls />
			</Suspense>
		</Canvas>
		</>
	);
}

function Box(props:ThreeElements['mesh']) {
	const meshRef = useRef<Mesh>(null!);
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	useFrame((state, delta) => (meshRef.current.rotation.x += delta));
	return (
		<mesh
			{...props}
			ref={meshRef}
			scale={active ? 1.5 : 1}
			onClick={(e) => setActive(!active)}
			onPointerOver={(e) => setHover(true)}
			onPointerOut={(e) => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "yellow" : "hotpink"} />
		</mesh>
	);
}

function ModelPrimitive(props) {

	const gltf = useLoader(GLTFLoader, '/2020_porsche_718_cayman_gt4/scene.gltf');
	return <primitive {...props} object={gltf.scene} />
}

function Loader() {
	const { progress } = useProgress();
	return (
		<Html center>
			<BoxLoader class=""/>
			<p class=""><br/>{progress} % loaded</p>
		</Html>
	);
}

const BoxLoader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="box box-1">
          <div className="side-left" />
          <div className="side-right" />
          <div className="side-top" />
        </div>
        <div className="box box-2">
          <div className="side-left" />
          <div className="side-right" />
          <div className="side-top" />
        </div>
        <div className="box box-3">
          <div className="side-left" />
          <div className="side-right" />
          <div className="side-top" />
        </div>
        <div className="box box-4">
          <div className="side-left" />
          <div className="side-right" />
          <div className="side-top" />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* 3D tower loader made by: csozi | Website: www.csozi.hu*/

  .loader {
    scale: 3;
    height: 50px;
    width: 40px;
  }

  .box {
    position: relative;
    opacity: 0;
    left: 10px;
  }

  .side-left {
    position: absolute;
    background-color: #286cb5;
    width: 19px;
    height: 5px;
    transform: skew(0deg, -25deg);
    top: 14px;
    left: 10px;
  }

  .side-right {
    position: absolute;
    background-color: #2f85e0;
    width: 19px;
    height: 5px;
    transform: skew(0deg, 25deg);
    top: 14px;
    left: -9px;
  }

  .side-top {
    position: absolute;
    background-color: #5fa8f5;
    width: 20px;
    height: 20px;
    rotate: 45deg;
    transform: skew(-20deg, -20deg);
  }

  .box-1 {
    animation: from-left 4s infinite;
  }

  .box-2 {
    animation: from-right 4s infinite;
    animation-delay: 1s;
  }

  .box-3 {
    animation: from-left 4s infinite;
    animation-delay: 2s;
  }

  .box-4 {
    animation: from-right 4s infinite;
    animation-delay: 3s;
  }

  @keyframes from-left {
    0% {
      z-index: 20;
      opacity: 0;
      translate: -20px -6px;
    }

    20% {
      z-index: 10;
      opacity: 1;
      translate: 0px 0px;
    }

    40% {
      z-index: 9;
      translate: 0px 4px;
    }

    60% {
      z-index: 8;
      translate: 0px 8px;
    }

    80% {
      z-index: 7;
      opacity: 1;
      translate: 0px 12px;
    }

    100% {
      z-index: 5;
      translate: 0px 30px;
      opacity: 0;
    }
  }

  @keyframes from-right {
    0% {
      z-index: 20;
      opacity: 0;
      translate: 20px -6px;
    }

    20% {
      z-index: 10;
      opacity: 1;
      translate: 0px 0px;
    }

    40% {
      z-index: 9;
      translate: 0px 4px;
    }

    60% {
      z-index: 8;
      translate: 0px 8px;
    }

    80% {
      z-index: 7;
      opacity: 1;
      translate: 0px 12px;
    }

    100% {
      z-index: 5;
      translate: 0px 30px;
      opacity: 0;
    }
  }`;
