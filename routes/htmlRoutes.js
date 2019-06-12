var db = require("../models");
const jwt = require('jsonwebtoken');

module.exports = function(app) {
  // Load index page
  
  app.get("/", function(req, res) {
    console.log("req.user at slash route: "+req.user);

  // if (!req.user) return res.sendStatus(401);
    if (!req.user) {
      res.render("login", {
      });
    }else{
      console.log('req.user exists');
    }
    
  });

  //route for a new user to register
  app.get("/register",function(req,res){
    
    // console.log("Register route hit by user with ID: " + req.user.id);
      res.render("register", {});
    });

  app.get("/index",function(req,res){
    if (!req.user){
      res.json(401);
    }
    console.log("Index route hit by user with ID: " + req.user.id);
    db.Jobs.findAll({
      attributes : ['job_id', 'UserId', 'company', 'title', 'description', 'close_by', 'active', 'created_on']
    }).then(function(dbJobs) {
      res.render("index", {
        msg: "",
        jobs: dbJobs
      });
    });  
  });
  
  // Load example page and pass in an example by id
 app.get("/job/:id", function(req, res) {
  db.Jobs.findOne({ where: { job_id: req.params.id } }).then(function(dbJob) {
    res.render("job", {
      job: dbJob
    });
  });
});

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
