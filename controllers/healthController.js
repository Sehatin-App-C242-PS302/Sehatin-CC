const { HealthProfile } = require('../models');
const { verifyToken } = require('../utils/jwtUtils');

// Method untuk membuat Health Profile baru
const createHealthProfile = async (req, res, next) => {
  try {
    const { date, ...data } = req.body; // Ambil field `date` dari input
    const healthProfile = await HealthProfile.create({
      ...data,
      createdAt: date || new Date(), // Gunakan `date` sebagai `createdAt` atau tanggal sekarang
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
    const [updated] = await HealthProfile.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: 'Health profile not found' });
    }
    const updatedHealthProfile = await HealthProfile.findByPk(id);
    res.status(200).json(updatedHealthProfile);
  } catch (error) {
    next(error);
  }
};

// Method baru untuk mendapatkan semua health profiles berdasarkan userId
const getHealthProfilesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params; // Ambil userId dari parameter URL

    // Ambil token dari header Authorization
    const token = req.headers.authorization?.split(' ')[1]; // Mengambil token Bearer dari header
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required.' });
    }

    // Verifikasi token dan ambil user ID dari token
    let decodedUser;
    try {
      decodedUser = verifyToken(token); // Verifikasi token menggunakan fungsi dari jwtutils
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    // Cek apakah userId dari token sesuai dengan userId di parameter URL
    if (decodedUser.id !== parseInt(userId)) {
      return res.status(403).json({ message: 'You are not authorized to access this data.' });
    }

    // Ambil health profiles berdasarkan userId
    const healthProfiles = await HealthProfile.findAll({
      where: { userId }, // Filter berdasarkan userId
    });

    // Jika tidak ada data untuk userId tersebut
    if (healthProfiles.length === 0) {
      return res.status(404).json({ message: 'Health profiles not found for this user.' });
    }

    // Kirimkan response dengan data health profiles
    res.status(200).json(healthProfiles);
  } catch (error) {
    next(error); // Jika ada error, kirimkan ke error handler
  }
};

module.exports = {
  createHealthProfile,
  getHealthProfileById,
  updateHealthProfile,
  getHealthProfilesByUserId,
};
