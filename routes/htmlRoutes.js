var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
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
  app.get("/job/:id", function(req, res) {
    db.Jobs.findOne({
      include: [db.Actions], 
      where: { job_id: req.params.id } }).then(function(dbJob) {
      console.log("RES!" + JSON.stringify(dbJob));
      res.render("job", {
        job: dbJob,
        action: dbJob.Actions

      });
    });

  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

};
