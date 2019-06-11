const router        = require('express').Router()
const jwt           = require('jsonwebtoken');
const db            = require('../models')
// this is just a fancy way of making 3 variables. 
const {JWT_OPTIONS, JWT_SECRET_KEY, TEST_USER}            = require('../config/jwt')

//this is an example route that only a signed-in user can access
router.get('/test', function(req, res) {
    //JWT-Express autofills req.user, we can use that to 
    if (!req.user) return res.sendStatus(401);
    console.log("Test route hit by user with ID: " + req.user.id)
    res.json(req.user);
});


router.post('/token', function(req,res) {
    //Fetch the user from the database:
    db.Users.findOne({
        where: {
            user_name: req.body.user_name,
        }
    })
        .then(function(result) {
            console.log (result.id + "was id found in databse, d-r.js");
            if (!result) return res.sendStatus(404).send(); //user wasn't found in the database, send a 404


            // do some sort of check that the user/password is correct:
            //in this case, we just have a password to check against. This is bad security. 
            // for better security, use something like bcrypt
            else if ( result.password === req.body.password) {
                const userDetails = {
                    user_name: result.user_name,
                    id: result.id,
                    created_at: result.created_at
                };
                return jwt.sign(userDetails, JWT_SECRET_KEY, JWT_OPTIONS, 
                    function(err, token) {
                        if (err) return res.sendStatus(500).json(err) //do some error checking
                        //test auth
                        console.log("jwt sign database-routes.js : user_name: " + result.user_name);
                        res.cookie('token', token);
                        res.json({
                            user: userDetails,
                            token: token,
                        })
            
                    })
            }
            else {
                res.sendStatus(401).send(); //password incorrect, send a 401 [Unauthorized]
            }
        })
        .catch(function(err) {
            return res.sendStatus(500).json(err) 
        })


});


module.exports = router;