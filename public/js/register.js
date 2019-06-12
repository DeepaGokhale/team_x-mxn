//functions to register a new user account, used by register.handlebars

$("#create-new-user-button").on("click",function(){
    event.preventDefault();
    password_verify = $("#new-password-verify-input").val();
    const body = {
        user_name: $("#new-user_name-input").val().trim(),
        password: $("#new-password-input").val(),
    }
    // console.log("verifying password (register.js) pw1 pw2 = "+ body.password +" "+ password_verify);
    if(password_verify == body.password){
        //password correctly typed twice but is it long enough?
        if (body.password.length < 6){
            $("#message-div").append("<h5 class='alert alert-warning' role='alert'>Password must be 6 characters or longer.</h5>");
            setTimeout(function(){
                $("#message-div").empty();
            }, 3000);
        }else{
            //check database to see if user exists already
            $.ajax({
                headers: {
                    "Content-Type": "application/json"
                },
                url: "api/register",
                data: JSON.stringify(body),
                method: "post"
            }).then(function(data){
                //database found user with same user name, so it didn't return anything
                if (!data.user_name){
                    $("#message-div").append("<h5 class='alert alert-warning' role='alert'>Username already exists, please choose another</h5>");
                    setTimeout(function(){
                        $("#message-div").empty();
                    }, 3000);
                }
                else{
                    $("#message-div").append("<h5 class='alert alert-success' role='alert'>Welcome in!</h5>");
                    setTimeout(function(){
                        location.href = "/"
                    }, 700);
                    
                }
                
            });
        }
    }//if password fields don't match...
    else{
        $("#message-div").append("<h5 class='alert alert-warning' role='alert'>Password fields don't match.</h5>");
        setTimeout(function(){
            $("#message-div").empty();
        }, 3000);
    }
    

});
