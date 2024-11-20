const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const bucketName = process.env.BUCKET_NAME;

// Upload file
const uploadFile = async (file, fileName) => {
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(fileName);
  const buffer = Buffer.from(file, "base64");
  await blob.save(buffer, { contentType: "application/octet-stream" });
  return blob.publicUrl();
};

// Dapatkan URL file
const getFileUrl = async (fileName) => {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);
  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};

module.exports = { uploadFile, getFileUrl };
