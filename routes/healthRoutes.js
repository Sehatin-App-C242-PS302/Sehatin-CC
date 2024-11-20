const express = require("express");
const { uploadFile, getFileUrl } = require("../services/storage");
const router = express.Router();

// Upload file
router.post("/upload", async (req, res) => {
  try {
    const { file, fileName } = req.body;
    const url = await uploadFile(file, fileName);
    res.status(201).json({ message: "File uploaded successfully", url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dapatkan URL file
router.get("/:fileName", async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const url = await getFileUrl(fileName);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
