const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");

const app = express();
const PORT = 8000;
// const corsOptions = {
//   origin: "http://localhost:3000",
// };

// app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

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
            'attachment; filename="binaryfile.bin"',
        );

        // Send the binary data
        res.send(data);
    });
});

// Endpoint to handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileContent = fs.readFileSync(req.file.path);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        fs.writeFileSync(filePath, fileContent);

        fs.unlinkSync(req.file.path);

        res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error handling file upload:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
