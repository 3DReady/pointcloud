import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PointCloudRenderer from './PointCloudRenderer'; // Import PointCloudRenderer component


const DragAndDrop = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState(null);
  const [glbPath, setGlbPath] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);


  const handleButtonClick = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('photos', file); // Append each file under the same 'photos' key
    });

    try {
      const response = await fetch('https://api.pointcloud.3-dready.com:8001/upload-photos', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Get the GLB file blob from the response
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setGlbPath(url); // Set the GLB path for PointCloudRenderer
      } else {
        setMessage('Failed to upload photos');
      }
    } catch (error) {
      console.error('Error uploading photos:', error);
      setMessage('Error uploading photos');
    }
  };

  // const handleButtonClick = async () => {
  //   try {
  //     const response = await fetch('https://api.pointcloud.3-dready.com:8001/');

  //     if (response.ok) {
  //       const data = await response.json();
  //       setMessage(data.message); // Display the message from the server
  //     } else {
  //       setMessage('Failed to retrieve message from server');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching message:', error);
  //     setMessage('Error fetching message');
  //   }
  // };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });



  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          width: '800px', // Adjust width as needed
          height: '200px', // Adjust height as needed
          margin: '0 auto', // Centers the rectangle horizontally
          border: '2px dashed #aaa',
          padding: '20px 40px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#f0f4f8' : '#f9fafb',
          borderRadius: '8px',
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the images here ...</p>
        ) : (
          <p>Drag & drop some images here, or click to select files</p>
        )}
      </div>

      {/* Display image previews */}
      {selectedFiles.length > 0 && (
        <div className="preview-container" style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {selectedFiles.map((file, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <img
                  src={file.preview}
                  alt="preview"
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Button to fetch data and display message */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleButtonClick}
          style={{
            marginTop: '100px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Fetch Model
        </button>
      </div>
      {/* Display fetched message */}
      {/* {message && (
        <div style={{ marginTop: '20px', color: '#333', fontSize: '1.2em' }}>
          <strong>Message:</strong> {message}
        </div>
      )} */}
      {/* Render the PointCloudRenderer when glbPath is available */}
      {glbPath && (
        <div style={{ marginTop: '20px' }}>
          <PointCloudRenderer glbPath={glbPath} title="3D Model" description="Rendered point cloud model." />
        </div>
      )}

    </div>
  );
};

export default DragAndDrop;

