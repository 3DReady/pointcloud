// import React, { Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import './PointCloudRenderer.css';

// function PointCloudRenderer({ glbPath, title, description }) {
//   // Load GLB point cloud model using useGLTF hook
//   const fullPath = glbPath; 
//   const { scene } = useGLTF(fullPath);

//   return (
//     <div style={{ width: '100%', height: '400px' }}>
//       <Canvas>
//         <Suspense fallback={null}>
//           <ambientLight intensity={0.5} />
//           <pointLight position={[10, 10, 10]} />
//           <primitive object={scene} />
//           <OrbitControls enableZoom={true} />
//         </Suspense>
//       </Canvas>
//       <h3>{title}</h3>
//       <p>{description}</p>
//     </div>
//   );
// }

// export default PointCloudRenderer;


import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
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
              <primitive object={scene} />
              <OrbitControls enableZoom={true} />
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
