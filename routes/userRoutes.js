const express = require("express");
const { addUser, getUsers } = require("../services/firestore");
const router = express.Router();

// Tambah pengguna
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    await addUser(data);
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ambil semua pengguna
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
