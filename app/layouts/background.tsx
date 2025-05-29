import styled from 'styled-components';

export function MultiSquaresBackground() {
  document.addEventListener('DOMContentLoaded', () => {
        const scene = document.querySelector('.cube-scene');
        const cubeCount = 12; // 立方体数量
        
        // 创建多个立方体
        for (let i = 0; i < cubeCount; i++) {
          const cube = document.createElement('div');
          cube.className = `cube absolute w-32 h-32 transform-style-preserve-3d animate-spin-slow-${i % 3}`;
          
          // 随机位置和深度
          const x = Math.random() * 100 - 50; // -50% 到 50%
          const y = Math.random() * 100 - 50;
          const z = Math.random() * 2000 - 1000; // -1000px 到 1000px
          
          cube.style.left = `${50 + x}%`;
          cube.style.top = `${50 + y}%`;
          cube.style.transform = `translate3d(-50%, -50%, ${z}px)`;
          
          // 随机大小
          const size = Math.random() * 0.5 + 0.5; // 0.5 到 1.0 倍
          cube.style.width = `${size * 128}px`;
          cube.style.height = `${size * 128}px`;
          
          // 立方体面
          const colors = [
            'bg-red-500/70', 'bg-blue-500/70', 'bg-green-500/70',
            'bg-yellow-500/70', 'bg-purple-500/70', 'bg-pink-500/70'
          ];
          
          // 创建6个面
          for (let j = 0; j < 6; j++) {
            const face = document.createElement('div');
            face.className = `absolute w-full h-full ${colors[j]} border border-white/30`;
            
            // 根据面类型设置不同的变换
            switch(j) {
              case 0: // 前面
                face.style.transform = 'rotateY(0deg) translateZ(64px)';
                break;
              case 1: // 背面
                face.style.transform = 'rotateY(180deg) translateZ(64px)';
                break;
              case 2: // 右面
                face.style.transform = 'rotateY(90deg) translateZ(64px)';
                break;
              case 3: // 左面
                face.style.transform = 'rotateY(-90deg) translateZ(64px)';
                break;
              case 4: // 顶面
                face.style.transform = 'rotateX(90deg) translateZ(64px)';
                break;
              case 5: // 底面
                face.style.transform = 'rotateX(-90deg) translateZ(64px)';
                break;
            }
            
            cube.appendChild(face);
          }
          
          scene.appendChild(cube);
        }
      });
  return (
    <MultiSquaresStyledWrapper>
    <div>
      <div class="relative h-screen w-full overflow-hidden bg-gray-900">
        
        <div class="cube-scene absolute inset-0 perspective-1000 transform-style-preserve-3d">
          
        </div>
      </div>
    </div>
    </MultiSquaresStyledWrapper>
  );
}

const MultiSquaresStyledWrapper = styled.div`
  /* 基础3D样式 */
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        /* 不同的旋转动画速度 */
        .animate-spin-slow-0 {
          animation: spin-0 25s linear infinite;
        }
        .animate-spin-slow-1 {
          animation: spin-1 30s linear infinite reverse;
        }
        .animate-spin-slow-2 {
          animation: spin-2 20s linear infinite;
        }
        
        @keyframes spin-0 {
          from { transform: translate3d(-50%, -50%, var(--z)) rotateX(0) rotateY(0); }
          to { transform: translate3d(-50%, -50%, var(--z)) rotateX(360deg) rotateY(180deg); }
        }
        
        @keyframes spin-1 {
          from { transform: translate3d(-50%, -50%, var(--z)) rotateX(0) rotateY(0); }
          to { transform: translate3d(-50%, -50%, var(--z)) rotateX(180deg) rotateY(360deg); }
        }
        
        @keyframes spin-2 {
          from { transform: translate3d(-50%, -50%, var(--z)) rotateX(0) rotateY(0); }
          to { transform: translate3d(-50%, -50%, var(--z)) rotateX(360deg) rotateY(360deg); }
        }
        
        /* 视差滚动效果 */
        .cube-scene {
          transform: translateZ(0);
          will-change: transform;
        }
`;

export function SquareBackground() {
  return (
    <SquareStyledWrapper>
    <div class="relative h-screen w-full overflow-hidden">
      <div class="cube-container absolute inset-0 perspective-[1000]">
      
        <div class="cube relative w-64 h-64 mx-auto mt-32 transform-3d animate-[spin_20s_linear_infinite]">
          
          <div class="absolute w-full h-full bg-blue-500/50 border-2 border-blue-300 translate-z-[80px]"></div>
          
          <div class="absolute w-full h-full bg-purple-500/50 border-2 border-purple-300 rotate-y-180 translate-z-[0px]"></div>
          
          <div class="absolute w-full h-full bg-green-500/50 border-2 border-green-300 rotate-y-90 translate-z-[16px]"></div>
          
          <div class="absolute w-full h-full bg-red-500/50 border-2 border-red-300 rotate-y-270 translate-z-[32px]"></div>
          
          <div class="absolute w-full h-full bg-yellow-500/50 border-2 border-yellow-300 rotate-y-90 translate-z-[48px]"></div>
          
          <div class="absolute w-full h-full bg-pink-500/50 border-2 border-pink-300 rotate-y-270 translate-z-[64px]"></div>
        </div>
      </div>
    </div>
    </SquareStyledWrapper>
  );
}

const SquareStyledWrapper = styled.div`
  /* 自定义动画和3D变换 */
      @keyframes spin {
        from { transform: rotateX(0) rotateY(0); }
        to { transform: rotateX(360deg) rotateY(360deg); }
      }
      /* 其他变换类... */
`;

export function ParticleBackground() {
        document.addEventListener('DOMContentLoaded', () => {
          const container = document.getElementById('particles');
          const particleCount = 100;
          
          for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full bg-white/20';
            
            // 随机大小
            const size = Math.random() * 10 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // 随机位置
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // 3D深度
            const depth = Math.random() * 1000;
            particle.style.transform = `translateZ(${depth}px)`;
            
            // 动画
            particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(particle);
          }
        });
  return (
    <ParticleStyledWrapper>
      <div class="relative h-screen w-full overflow-hidden bg-gray-900">

        <div id="particles" class="absolute inset-0"></div>
        
        <div class="relative z-10 flex items-center justify-center h-full text-white">
          <h1 class="text-4xl font-bold">炫酷3D背景</h1>
        </div>
      </div>
    </ParticleStyledWrapper>
  );
}

const ParticleStyledWrapper=styled.div`
  @keyframes float {
    0% {
      transform: translate3d(0, 0, 0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translate3d(
        calc(var(--random-x) * 100px),
        calc(var(--random-y) * 100px),
        1000px
      ) rotate(360deg);
      opacity: 0;
    }
  }
`;

