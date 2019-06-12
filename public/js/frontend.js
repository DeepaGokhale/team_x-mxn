//functions to implement the sign in page, used by login.handlebars

$("#sign-in-button").on("click", function() {
    const body = {
        user_name: $("#user_name-input").val(),
        password: $("#password-input").val(),
    }
    $.ajax({
        url: "/token",
        data: body,
        method: "post"
    })
    .then(function(response) {
        console.warn("Got Data:",response); //Tells user their token (username ), not for production
        // $("#jwt-token").text(response.token);  displays the token for testing
        $("#jwt-token").text("Logged in");

        //saves json token to localstorage (likely unecessary as the token is also stored as a cookie)
        localStorage.setItem('token', response.token);
        
        //Code to attach token with each ajax request
        // testToken(response.token);
        attachToken(localStorage.getItem('token'));
        
        // testTokenAttached();  //test route to verify authetication is working
        // $("#jwt-token").append("<a href='/index'> GO TO SITE</a>");
        location.href = "/index";
        // $.get( "/index" )
        // .then(function(response) {
        //     console.warn("[attached] Got Data from protected route '/index' :",response);
        // });
    })
    .fail(function(err){
        console.log(err.status);
    });
});

$("#new-user-button").on("click",function(){
    location.href = "/register";    
})


//method to demonstrate a test auth route
function testToken(token) {
    $.ajax({
        url: "/test",
        headers: {
            "Authorization": "Bearer " + token //this is how you add the token to an individual request
        },
        method: "get"
    })
    .then(function(response) {
        console.warn("Got Data from protected route:",response);
    });
}

// IF you "attach" the token to every request, 
// then you don't have to set the Authorization header every time you make a request
function testTokenAttached() {
    $.get( "/test" )
        .then(function(response) {
            console.warn("[attached] Got Data from protected route:",response);
        });
}
function attachToken(token) {
    //the attachToken function adds the token to EVERY ajax request
    $.ajaxSetup({
        headers: {
          Authorization: "Bearer " + token
        }
      });
}