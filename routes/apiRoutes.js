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
        id: req.params.id
      }
    }).then(function(dbJob) {
      res.json(dbJob);      
    });
  });
  
  // Create a new job
  app.post("/api/jobs", function(req, res) {
    db.Jobs.create(req.body)
      .then(function() {
        res.redirect("/");
    });
  });

  // Delete an example by id
  app.delete("/api/job/:id", function(req, res) {
    db.Jobs.destroy({ where: { job_id: req.params.id } })
      .then(function() {
        res.redirect("/");
    });
  });
};

