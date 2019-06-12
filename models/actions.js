// var sequelize = require("Sequelize");
// const Job = require('../models/jobs');

module.exports = function(sequelize, DataTypes) {
    var Actions = sequelize.define("Actions", {
        job_action_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        //sequelize creates JobJobId column automatically  
        // job_id: { 
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        action_type:  { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        action_date:
        { 
            type:  DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
         },
         //the comments can be empty? possibly
        comments: DataTypes.STRING, 
    });

    // Add a belongsTo association to Jobs here
    // if deleted the list of actions for that jobs should go
    Actions.associate = function(models) {
        models.Actions.belongsTo(models.Jobs, {
            OnDelete: "CASCADE",
            foreignKey: {
            allowNull: false
            }
        });
    }

     
    // Add a belongsTo association to ActionTypes here
    //This is not userful for the scope of this version but ideally would associate and cascade delete
    // Actions.associate = function(models) {
    //     models.Actions.belongsTo(models.ActionTypes, {
    //         OnDelete: "CASCADE",
    //         foreignKey: {
    //         allowNull: false
    //         }
    //     })
    // }

    return Actions;
};
