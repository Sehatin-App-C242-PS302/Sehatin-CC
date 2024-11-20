const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// Tambah data pengguna
const addUser = async (data) => {
  const userRef = db.collection("users").doc();
  await userRef.set(data);
};

// Ambil semua pengguna
const getUsers = async () => {
  const snapshot = await db.collection("users").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

module.exports = { addUser, getUsers };
