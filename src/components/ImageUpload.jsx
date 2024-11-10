import React, { useState } from 'react';
import DragAndDrop from './DragAndDrop';

const ImageUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFilesSelected = (selectedFiles) => {
    setFiles(selectedFiles);
    // Add logic to handle files, e.g., upload to server
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <DragAndDrop onFilesSelected={handleFilesSelected} />
      <div>
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
