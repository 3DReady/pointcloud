import React, { useState, useEffect } from 'react';
import MainPointCloudRenderer from './MainPointCloud'; // Adjust path if necessary

const ModelViewerPage = ({ modelId }) => {
  const [glbPath, setGlbPath] = useState(null);

  // Backend API URL to fetch the model file
  const modelApiUrl = `https://api.pointcloud.3-dready.com:8001/models/${modelId}`;

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch(modelApiUrl);
        if (!response.ok) throw new Error("Failed to fetch model");
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setGlbPath(url);
      } catch (error) {
        console.error("Error fetching model:", error);
      }
    };

    fetchModel();
  }, [modelApiUrl]);

  return (
    <>

      {glbPath ? (
        <MainPointCloudRenderer 
          glbPath={glbPath} 
          filename={modelId} 
          title={`Model ${modelId}`} 
          description={`3D visualization of model ${modelId}`}
        />
      ) : (
        <p>Loading model...</p>
      )}
    </>
  );
};

export default ModelViewerPage;
