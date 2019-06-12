var db = require("../models");
const jwt = require('jsonwebtoken');

module.exports = function(app) {
  // Create a new user 
  app.post("/api/register",function(req,res){
    // console.log("/api/register hit, new user registering: " + req.body.user_name)
    // console.log("new password : "+ req.body.password);
    db.Users.findOne({
      where: {
        user_name : req.body.user_name
      }
      }).then(function(data){
        if(data){
          console.log("User already found in database, denying user name \r\n data returned from DB (apiRoutes.js): "+ data);
          //add logic to reroute to login page (hopefully with an error message displayed to the user)
        }
        else{
          //no user found in database, add them.  Then direct to /index
          db.Users.create(req.body)
          .then(function(dbUser) {
              console.log("New user not in database, adding them (apiRoutes.js)/r/n data returned from DB (apiRoutes.js): "+ dbUser.user_name);          
              res.json(dbUser)
          });
        }
    });
  })

  // Get all jobs  
  app.get("/api/jobs", function(req, res) {
    db.Jobs.findAll({
      where: {
        UserID: req.user.id
      }
    }).then(function(dbJobs) {
      res.json(dbJobs);      
    });
  });

  // Get job details for given id
  app.get("/api/job/:id", function(req, res) {
    db.Jobs.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbJob) {
      res.json(dbJob);      
    });
  });
  
  // Create a new job
  app.post("/api/jobs", function(req, res) {
    db.Jobs.create(req.body)
      .then(function(data) {
        res.json(data);
    });
  });

  // Delete an example by id
  app.delete("/api/job/:id", function(req, res) {
    db.Jobs.destroy({ 
        where: { 
          job_id: req.params.id,
          //extra layer of precaution so wrong job could not be deleted
          UserID:  req.user.id
        } 
      }).then(function(data) {
        res.json(data);
    });
  });  
};

