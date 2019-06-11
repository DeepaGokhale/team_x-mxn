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

  app.get("/index",function(req,res){
    if (!req.user){
      res.json(401);
    }
    
    db.Jobs.findAll({
      attributes : ['job_id', 'UserId', 'company', 'title', 'description', 'close_by', 'active', 'created_on']
    }).then(function(dbJobs) {
      res.render("index", {
        msg: "Welcome to Jobs!",
        jobs: dbJobs
      });
    });  
  });
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
