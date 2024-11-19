const firestore = require('../config/database');

const getRecommendations = async (req, res) => {
    try {
        // Contoh fetch dari Firestore
        const snapshot = await firestore.collection('recommendations').get();
        const recommendations = snapshot.docs.map(doc => doc.data());

        res.status(200).json({ success: true, data: recommendations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addUserData = async (req, res) => {
    try {
        const { userId, healthData } = req.body;

        if (!userId || !healthData) {
            return res.status(400).json({ success: false, message: 'Missing userId or healthData' });
        }

        await firestore.collection('user-data').doc(userId).set(healthData);
        res.status(201).json({ success: true, message: 'User data added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getRecommendations, addUserData };
