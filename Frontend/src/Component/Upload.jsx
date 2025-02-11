import React, { useState } from 'react'

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");

    function handleFileChange(event) {
        setSelectedFile(event.target.files[0]);
        setMessage("");
    }

    function handleFileUpload() {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("enctype", "multipart-form-data");

        fetch("/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => setMessage(data.message))
            .catch((error) => setMessage(`Error uploading file: ${error.name} - ${error.message}`));
    }

    return (
        <div className='container'>
            <h1> Upload file here! </h1>
            <div className='upload'>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}> Upload </button>
            </div>
            <p>{ message }</p>
    </div>
    )
}

export default Upload
