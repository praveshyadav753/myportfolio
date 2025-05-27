import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import Particle from "./ilustrationspline";

// Main Background Component
export default function ThreeJSBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full  ">
      
      <div className="star absolute top-0 left-0 w-full h-full z-1">
        
      </div>

      {/* Canvas Background – on top of Spline */}
      {mounted && (
        <div className="absolute  top-0 left-0 w-full h-full z-10">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl }) => {
              gl.setClearColor(new THREE.Color("#020207"), 0); // Transparent background
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[0, 5, 5]} intensity={0.5} />

            

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>
      )}
    </div>
  );
}
