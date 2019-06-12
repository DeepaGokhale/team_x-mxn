//functions to register a new user account, used by register.handlebars

$("#create-new-user-button").on("click",function(){
    event.preventDefault();
    password_verify = $("#new-password-verify-input").val();
    const body = {
        user_name: $("#new-user_name-input").val().trim(),
        password: $("#new-password-input").val(),
    }
    console.log("verifying password (register.js) pw1pw2 = "+ body.password + password_verify);
    if(password_verify == body.password){
        $.ajax({
            headers: {
                "Content-Type": "application/json"
              },
            url: "api/register",
            data: JSON.stringify(body),
            method: "post"
        }).then(function(data){
            if (!data.user_name){
                $("#message-div").append("<h5>Username already exists, please choose another</h5>");
                setTimeout(function(){
                    $("#message-div").empty();
                }, 3000);
            }
            else{
                $("#message-div").append("<h5>Success!</h5>");
                setTimeout(function(){
                    location.href = "/"
                }, 1000);
                
            }
            
        });
    }
    

});


// var API = {
//     saveJob: function(job) {
//       return $.ajax({
//         headers: {
//           "Content-Type": "application/json"
//         },
//         type: "POST",
//         url: "api/jobs",
//         data: JSON.stringify(job)
//       });
//     },
  