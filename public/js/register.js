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
            console.log(data);  //figure out if anything else needs to go here
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
  