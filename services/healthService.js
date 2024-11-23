const { Health } = require('../models');

const createHealth = async (healthData) => {
  return await Health.create(healthData);
};

const getAllHealthRecords = async (userId) => {
  return await Health.findAll({ where: { userId } });
};

module.exports = { createHealth, getAllHealthRecords };
