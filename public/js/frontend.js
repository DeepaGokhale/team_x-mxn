// $(document).ready(function(){




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
            console.warn("Got Data:",response);

            $("#jwt-token").text(response.token);
            localStorage.setItem('token', response.token);
            
            // testToken(response.token);
            attachToken(localStorage.getItem('token'));
            console.log('just before API.getExamples()')
            // refreshExamples();
            testTokenAttached();
            $("#jwt-token").append("<a href='/index'> GO TO SITE</a>");
        })
    });
// })


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