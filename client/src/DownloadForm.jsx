import React, { useState } from 'react';

// Most of this code was made with help from ChatGPT

function FileDownloadForm(props) {
  const {
    file_id
  } = props;


  const handleDownload = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`api/download/${file_id}/`);
  
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
      <button type="submit">Download File</button>
    </form>
  );
};

export default FileDownloadForm;
