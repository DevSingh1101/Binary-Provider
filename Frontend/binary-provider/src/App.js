// App.js
import React, { useState } from "react";
import FileUpload from "./Component/FileUpload";

const App = () => {
  const [message, setMessage] = useState("");

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("enctype", "multipart-form-data");

    console.log(file);

    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        setMessage("Error uploading file.");
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2>Upload File here!</h2>
      <FileUpload onFileUpload={handleFileUpload} />
      <p>{message}</p>
    </div>
  );
};

export default App;
