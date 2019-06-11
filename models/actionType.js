//Action_Type

module.exports = function(sequelize, DataTypes) {
    var ActionTypes = sequelize.define("ActionTypes", {
        action_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        action_type: DataTypes.STRING,
    });

    //Not going to associate the table this could ideally be Enum
    return ActionTypes;
  };
  