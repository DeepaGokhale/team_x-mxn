var db = require("../models");

module.exports = function(app) {
  // Load index page
  
  app.get("/", function(req, res) {
    console.log("req.user at slash route: "+req.user);

  // if (!req.user) return res.sendStatus(401);
    if (!req.user) {
      res.render("login", {
        // msg: "Welcome!",
        // examples: dbExamples
      });
    }else{
      console.log('req.user exists');
    }
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
    
  });

  app.get("/index",function(req,res){
    if (!req.user){
      res.json(401);
    }
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
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
