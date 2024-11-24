const { HealthProfile } = require('../models');

// Fungsi untuk membuat Health Profile baru
const createHealthProfile = async (healthData) => {
  // Hitung BMI sebelum menyimpan data
  const { weight, height, ...otherData } = healthData;
  const bmi = weight / (height * height);

  // Gabungkan BMI dengan data lainnya
  const completeData = { ...otherData, weight, height, bmi };

  // Simpan ke database
  return await HealthProfile.create(completeData);
};

// Fungsi untuk mengambil semua Health Profiles berdasarkan userId
const getAllHealthProfiles = async (userId) => {
  return await HealthProfile.findAll({ where: { userId } });
};

// Fungsi untuk memperbarui Health Profile
const updateHealthProfile = async (id, healthData) => {
  const { weight, height, ...otherData } = healthData;
  const bmi = weight / (height * height); // Hitung BMI lagi saat data diperbarui

  // Gabungkan BMI dengan data lainnya
  const updatedData = { ...otherData, weight, height, bmi };

  // Update ke database
  const [updated] = await HealthProfile.update(updatedData, { where: { id } });
  if (!updated) {
    throw new Error('Health profile not found');
  }

  // Kembalikan data yang sudah diperbarui
  return await HealthProfile.findByPk(id);
};

module.exports = { createHealthProfile, getAllHealthProfiles, updateHealthProfile };
