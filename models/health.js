const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const HealthProfile = sequelize.define('HealthProfile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    umur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    tinggi: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    berat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    BMI: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Nilai default sekarang
    },
  });

  HealthProfile.associate = (models) => {
    HealthProfile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return HealthProfile;
};
