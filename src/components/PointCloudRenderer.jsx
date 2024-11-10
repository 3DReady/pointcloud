import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds } from '@react-three/drei';
import './PointCloudRenderer.css';  // Make sure the CSS is imported

function PointCloudRenderer({ glbPath, title, description }) {
  // Load GLB point cloud model using useGLTF hook
  const { scene } = useGLTF(glbPath);

  return (
    <div className="pointcloud-island">
      <div className="feature flex flex-col gap-4">
        <div style={{ width: '100%', height: '400px' }}>
          <Canvas>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Bounds fit clip observe margin={0.5}>  {/* Ensures the model fits the view */}
                <primitive object={scene} />
              </Bounds>
              <OrbitControls enableZoom={true} enablePan={false} />
            </Suspense>
          </Canvas>
        </div>
        {/* <h3>{title}</h3>
        <p>{description}</p>*/}
      </div>
    </div>
  );
}

export default PointCloudRenderer;
