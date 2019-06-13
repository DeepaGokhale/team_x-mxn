$("#email-button").on("click", function() {
    console.log("email");
    console.log(moment().format());

    var value = $(this).val();

    var action = {
        action_type : "Email",
        job_id : value,
        JobJobId: value,
        action_date : Date.now()
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
        job_id : value,
        JobJobId: value,
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
        job_id : value,
        JobJobId: value,
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

$(".jobActionDelete").on("click", function() {
  // console.log($(this).attr('id'));
  var job_actionId = $(this).attr('id');
  console.log(job_actionId);
  $.ajax({
      type: "DELETE",
      url: "/api/jobactionid/" + job_actionId   //"api/job/" + id,
    }).then(function(data) {
      console.log(data);
      window.location.reload();
    });
});