require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3007;

//auth test
const jwt_express   = require('express-jwt');
const JWT_SECRET_KEY            = require('./config/jwt').JWT_SECRET_KEY
const TEST_USER                 = require('./config/jwt').TEST_USER

// Put this in server.js
var cookieParser = require('cookie-parser')
app.use(cookieParser())

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//auth test
app.use(jwt_express({ secret: JWT_SECRET_KEY,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  }

}).unless({path: ['/','/login','/token', '/favicon.ico','/api/register']}));



// app.use(jwt({
//     secret: 'hello world !',
//     credentialsRequired: false,
//   }));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
app.use(require('./routes/database-routes'));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions)
.then(function(){
  console.log('creating user in db : '+ TEST_USER.user_name);
  return db.Users.create({
      user_name: TEST_USER.user_name,
      password: TEST_USER.password
  })
})
.then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;