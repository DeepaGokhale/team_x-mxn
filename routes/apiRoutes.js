var db = require("../models");

module.exports = function(app) {
  // Get all jobs
  app.get("/api/jobs", function(req, res) {
    db.Jobs.findAll({}).then(function(dbJobs) {
      res.json(dbJobs);      
    });
  });

  // Get job details for given id
  app.get("/api/job/:id", function(req, res) {
    db.Jobs.findOne({
      where: {
        job_id: req.params.id
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
    db.Jobs.destroy({ where: { job_id: req.params.id } })
      .then(function(data) {
        res.json(data);
    });
  });

  app.get("/api/actions/:id", function(req, res) {
  
    db.Actions.findOne({
      include: [db.Jobs],
      where: {
        job_action_id: req.params.id
      }
    }).then(function(dbActions) {
      console.log(dbActions);
      res.json(dbActions);
    });
  });

  //get all actions
  app.get("/api/actions", function(req, res) {
    var query = {};
    console.log("req");
    console.log(req.body);


    db.Actions.findAll({
      include: [db.Jobs],
      where: {
        job_id : req.body.job_id
      }
    }).then(function(dbActions) {
      console.log(dbActions);
      res.json(dbActions);
    });
  });

  //create new action
  app.post("/api/actions", function(req, res) {
    db.Actions.create(req.body)
      .then(function() {
        res.redirect("/");
    });
  });

};

