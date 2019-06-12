module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    // Giving the Author model a name of type STRING
    id:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
  });


  return Users;
};
