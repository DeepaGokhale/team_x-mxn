module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING, //change to jobTitle: DataTypes.STRING,
    description: DataTypes.TEXT //change to company.DataTypes.TEXT,
    //add object - website: DataTypes.STRING,
    //add object - actionDate: DataTypes.DATE,
  });
  return Example;
};
