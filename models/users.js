module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    // Giving the Author model a name of type STRING
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
  });


  return Users;
};