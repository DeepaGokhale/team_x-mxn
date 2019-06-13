$("#email-button").on("click", function() {
    console.log("email");
    console.log(moment().format());

    var value = $(this).val();

    var action = {
        action_type : "Email",
        JobJobId : value,
        action_date : moment().format("YYYY-MM-DD HH:mm:ss")
      };

    $.ajax({
        type: "POST",
        url: "/api/actions/",
        data: action
      }).then(function(data) {
        console.log(data);
        window.location.reload();
      });
});

$("#phone-button").on("click", function() {
    console.log("phone");
    console.log(moment().format());

    var value = $(this).val();

    var action = {
        action_type : "Call",
        JobJobId : value,
        action_date : moment().format("YYYY-MM-DD HH:mm:ss")
      };

    $.ajax({
        type: "POST",
        url: "/api/actions/",
        data: action
      }).then(function(data) {
        console.log(data);
        window.location.reload();
      });
});

$("#interview-button").on("click", function() {
    console.log("interview");
    console.log(moment().format());

    var value = $(this).val();

    var action = {
        action_type : "Interview",
        JobJobId : value,
        action_date : moment().format("YYYY-MM-DD HH:mm:ss")
      };

    $.ajax({
        type: "POST",
        url: "/api/actions/",
        data: action
      }).then(function(data) {
        console.log(data);
        window.location.reload();
      });
});
