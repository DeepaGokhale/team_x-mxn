const Job = require('../models/jobs');

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
  });

  // Users.associate = function (models) {
  //   Users.hasMany(models.Jobs, {
  //     onDelete: "cascade"
  //   });
  // };

  return Users;
};
