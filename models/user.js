module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });


  return User;
};