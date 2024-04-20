const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Define the path to the binary file
const filePath = path.join(__dirname, "command.bin");

// Endpoint to serve the binary file
app.get("/", (req, res) => {
  // Read the binary file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading binary file:", err);
      return res.status(500).send("Error during reading binaries!!");
    }

    // Set response headers
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="binaryfile.bin"'
    );

    // Send the binary data
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
