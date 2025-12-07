import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useInView } from 'framer-motion'
import * as THREE from 'three'

function AnimatedMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Custom shader material with animated noise
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#6366f1') }, // Indigo
      uColor2: { value: new THREE.Color('#8b5cf6') }, // Purple
      uColor3: { value: new THREE.Color('#d946ef') }, // Fuchsia
    }),
    []
  )

  // Vertex shader - creates wave movement
  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      pos.z += sin(pos.x * 2.0 + uTime * 0.5) * 0.1;
      pos.z += cos(pos.y * 2.0 + uTime * 0.3) * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  // Fragment shader - creates animated gradient with noise
  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    // Simple noise function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Animated noise
      float n = noise(uv * 3.0 + uTime * 0.1);
      
      // Create gradient that moves over time
      float mixValue1 = sin(uTime * 0.2 + uv.x * 2.0) * 0.5 + 0.5;
      float mixValue2 = cos(uTime * 0.15 + uv.y * 2.0) * 0.5 + 0.5;
      
      vec3 color = mix(uColor1, uColor2, mixValue1);
      color = mix(color, uColor3, mixValue2);
      
      // Add noise
      color += n * 0.1;
      
      // Darken for background effect
      color *= 0.4;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.FrontSide}
      />
    </mesh>
  )
}

export function ShaderBackground() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(canvasRef, { amount: 0.1 })

  return (
    <div 
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      {/* Grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* React Three Fiber Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]} // Limit DPR for performance
        frameloop={isInView ? 'always' : 'never'} // Pause rendering when not in view
      >
        <AnimatedMesh />
      </Canvas>
    </div>
  )
}
