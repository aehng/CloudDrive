import React, { useState } from 'react';

const FileDownloadForm = () => {
  const [fileId, setFileId] = useState('');

  const handleFileIdChange = (e) => {
    setFileId(e.target.value);
  };

  const handleDownload = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`api/download/${fileId}/`);
  
      if (response.ok) {
        const contentDisposition = response.headers.get('Content-Disposition');
        console.log(contentDisposition)
        const fileName = contentDisposition.split(';')[1].trim().split('=')[1].replace(/"/g, '');
  
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error('Failed to download file');
      }
    } catch (error) {
      console.error('Error downloading file', error);
    }
  };
  

  return (
    <form onSubmit={handleDownload}>
      <input type="number" placeholder="Enter file ID" value={fileId} onChange={handleFileIdChange} />
      <button type="submit">Download File</button>
    </form>
  );
};

export default FileDownloadForm;
