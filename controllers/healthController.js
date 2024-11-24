const { HealthProfile } = require('../models');
const { verifyToken } = require('../utils/jwtUtils');

// Method untuk membuat Health Profile baru
const createHealthProfile = async (req, res, next) => {
  try {
    const { gender, age, height, weight, date, userId } = req.body;

    // Hitung BMI
    const bmi = weight / (height * height);

    // Simpan data ke database
    const healthProfile = await HealthProfile.create({
      gender,
      age,
      height,
      weight,
      bmi,
      userId,
      createdAt: date || new Date(), // Gunakan `date` atau tanggal sekarang
    });

    res.status(201).json(healthProfile);
  } catch (error) {
    next(error);
  }
};

// Method untuk mendapatkan health profile berdasarkan ID
const getHealthProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const healthProfile = await HealthProfile.findByPk(id);
    if (!healthProfile) {
      return res.status(404).json({ message: 'Health profile not found' });
    }
    res.status(200).json(healthProfile);
  } catch (error) {
    next(error);
  }
};

// Method untuk memperbarui health profile berdasarkan ID
const updateHealthProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { gender, age, height, weight } = req.body;

    // Hitung ulang BMI
    const bmi = weight / (height * height);

    // Update profil kesehatan
    const [updated] = await HealthProfile.update(
      { gender, age, height, weight, bmi },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Health profile not found' });
    }
    const updatedHealthProfile = await HealthProfile.findByPk(id);
    res.status(200).json(updatedHealthProfile);
  } catch (error) {
    next(error);
  }
};

// Method untuk mendapatkan semua health profiles berdasarkan userId
const getHealthProfilesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const healthProfiles = await HealthProfile.findAll({
      where: { userId },
    });

    if (!healthProfiles || healthProfiles.length === 0) {
      return res.status(404).json({ message: 'No health profiles found for this user.' });
    }

    // Tambahkan BMI ke setiap profil kesehatan
    const profilesWithBmi = healthProfiles.map((profile) => ({
      ...profile.toJSON(),
      bmi: profile.weight / (profile.height * profile.height),
    }));

    res.status(200).json(profilesWithBmi);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHealthProfile,
  getHealthProfileById,
  updateHealthProfile,
  getHealthProfilesByUserId,
};
