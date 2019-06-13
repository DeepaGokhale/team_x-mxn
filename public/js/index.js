// var moment = require("moment");

//function copied from frontend.js
function attachToken(token) {
  //the attachToken function adds the token to EVERY ajax request
  $.ajaxSetup({
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

// Get references to page elements
var $jobsTitle = $("#job_title");
var $jobsCompany = $("#job_company");
var $jobDescription = $("#job_description");
var $jobsList = $("#jobs_list");
var $submitBtn = $("#submit");
var $actionDate = $('#action_datepicker');
var $jobItem = $("#list-group-item");  //all job items (for on hover stylying)

// var userId = localStorage.token.userId; //  after the merge from the authentication

// The API object contains methods for each kind of request we'll make

var API = {
  saveJob: function (job) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/jobs",
      data: JSON.stringify(job)
    });
  },

  getJobs: function () {
    return $.ajax({
      url: "api/jobs",
      type: "GET"
    });
  },

  deleteJob: function (id) {
    return $.ajax({
      url: "api/job/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshJobs = function () {
  API.getJobs().then(function (data) {
    var $jobs = data.map(function (job) {

      var $a = $("<a>")
        .text(job.jobTitle)
        .attr("href", "/job/" + job.job_id);
      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": job.job_id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $jobsList.empty();
    $jobsList.append($jobs);
  });
};


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  console.log("Reached in handleSubmit");
  event.preventDefault();
  console.log("ReCHED IN SAVE ");

  var closeBy = $actionDate.val().trim();
  var closeByConvert = moment(closeBy).format("dddd, MMMM Do YYYY");

  var job = {
    UserId: 1, //gettting on ApiRoutes from JWT until then dummy
    company: $jobsCompany.val().trim(), //dummy for now
    close_by: closeByConvert,
    active: true, //always true on creation
    created_on: Date.now(),
    title: $jobsTitle.val().trim(),
    description: $jobDescription.val().trim()
  };

  //console.log(job);

  if (!(job.title && job.description)) {
    alert("You must enter an job title and description!");
    return;
  }

  console.log("save job:", job);
  API.saveJob(job).then(function (data) {
    console.log(data);
    window.location.reload();
  });

  $jobsTitle.val("");
  $jobDescription.val("");
  $jobsCompany.val("");
  $actionDate.val("");

};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function (event) {
  event.preventDefault();
  console.log("Reached the delete");
  var idToDelete = $(this)
    .parent()
    .attr("data-id");
  console.log("IdToDelete: ", idToDelete);
  API.deleteJob(idToDelete)
    .then(function (data) {
      console.log(data);
      window.location.reload();
    });

};

// // Add event listeners to the submit and delete buttons
$(document).ready(function () {
  $submitBtn.on("click", handleFormSubmit);
  $jobsList.on("click", ".delete", handleDeleteBtnClick);
  $("#jobs_list > li").hover(function(){
    // console.log($(this).children("a").attr("href"))
    $(this).toggleClass("border border-info rounded")
    $(this).click(function(){
      location.href = $(this).children("a").attr("href");
    });
    
  });
});
