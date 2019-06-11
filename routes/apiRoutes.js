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

  app.get("/api/actions/:id", function(req, res) {
    // 2. Add a join here to include the Author who wrote the Post
    var query = {};
    if (req.query.job_action_id) {
      query.job_id = req.query.job_id;
    }
    // 1. Add a join here to include all of the Authors to these posts
    db.Actions.findAll({
      include: [db.Jobs],
      where: query
    }).then(function(dbActions) {
      res.json(dbActions);
    });
  });

  //get all actions
  app.get("/api/actions/", function(req, res) {
    // 2. Add a join here to include the Author who wrote the Post
    db.Actions.findOne({
      include: [db.Jobs],
      where: {
        job_id: req.params.job_id
      }
    }).then(function(dbActions) {
      console.log(dbActions);
      res.json(dbActions);
    });
  });

};

