module.exports = function (sequelize, DataTypes) {
  var Jobs = sequelize.define("Jobs", {
    job_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    company: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    close_by: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

  });

  //add the has many for actions
  Jobs.associate = function (models) {
    models.Jobs.hasMany(models.Actions, {
      onDelete: "cascade"
    }),
      models.Jobs.belongsTo(models.Users, {
        onDelete: "cascade",
        foreignKey: {
          allowNull: false
        }
      });
  };
  // Jobs.associate = function(models) {
  //     models.Jobs.belongsTo(models.Users, {
  //         OnDelete: "CASCADE",
  //         foreignKey: {
  //         allowNull: false
  //         }
  //     });
  // }



  //add the has many for actions


  return Jobs;
};
