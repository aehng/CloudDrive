import React, { useState } from 'react';
import cookie from "cookie";

// Most of this code was made with help from ChatGPT

const FileUploadForm = () => {
    const parsedCookie = cookie.parse(document.cookie)



    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('api/upload/', {
                method: 'POST',
                body: formData,
                headers: {
                    "X-CSRFToken": parsedCookie.csrftoken // protects against CSRF attacks
                },
            });

            if (response.ok) {
                console.log('File uploaded successfully');
            } else {
                console.error('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload File</button>
        </form>
    );
};

export default FileUploadForm;
