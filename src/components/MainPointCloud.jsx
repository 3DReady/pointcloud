import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds } from '@react-three/drei';
import './PointCloudRenderer.css';  // Make sure the CSS is imported

function MainPointCloudRenderer({ glbPath, filename, title, description }) {
    // Load GLB point cloud model using useGLTF hook
    const { scene } = useGLTF(glbPath);
    // Function to handle download
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = glbPath;
        link.download = 'pointcloud.glb';
        link.click();
    };


    // Function to handle sharing the link
    const handleShare = () => {
        const shareURL = `https://pointcloud.3-dready.com/model/${filename}`;
        navigator.clipboard.writeText(shareURL).then(() => {
            alert('URL copied to clipboard!');
            alert(`GLB Path: ${glbPath}`);
        }).catch((err) => {
            console.error('Failed to copy URL: ', err);
        });
    };

    return (
        <div className="pointcloud-island">
            <div className="feature flex flex-col gap-4">
                <div style={{ width: '80%', height: '600px' }}>
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
            {/* Download and Share Buttons */}
            <div className="button-group" style={{ display: "flex", justifyContent: "center", gap: "10px",  marginTop: "20px"}}>
                <button onClick={handleDownload} style={{ padding: "10px 20px", fontSize: "16px" }}>Download</button>
                <button onClick={handleShare} style={{ padding: "10px 20px", fontSize: "16px" }}>Share</button>
            </div>
        </div>
    );
}

export default MainPointCloudRenderer;
