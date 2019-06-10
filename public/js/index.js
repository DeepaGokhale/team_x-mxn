// Get references to page elements
<<<<<<< HEAD
var $jobsTitle = $("#job_title");
var $jobsCompany = $("#job_company");
var $jobDescription = $("#job_description");
var $jobsList = $("#jobs_list");
=======
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");

var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
>>>>>>> 8eb902a335583666a74797de242016becdd48411

// The API object contains methods for each kind of request we'll make

var API = {
<<<<<<< HEAD
  saveJob: function(job) {
=======
  saveExample: function (example) {
>>>>>>> 8eb902a335583666a74797de242016becdd48411
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/jobs",
      data: JSON.stringify(job)
    });
  },
<<<<<<< HEAD
  getJobs: function() {
=======
  getExamples: function () {
>>>>>>> 8eb902a335583666a74797de242016becdd48411
    return $.ajax({
      url: "api/jobs",
      type: "GET"
    });    
  },
<<<<<<< HEAD
  deleteJob: function(id) {
=======
  deleteExample: function (id) {
>>>>>>> 8eb902a335583666a74797de242016becdd48411
    return $.ajax({
      url: "api/job/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
<<<<<<< HEAD
var refreshJobs = function() {
  API.getJobs().then(function(data) {
    var $jobs = data.map(function(job) {
=======
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
>>>>>>> 8eb902a335583666a74797de242016becdd48411
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
var handleFormSubmit = function(event) {
  console.log("Reached in handleSubmit");
  event.preventDefault();

  var job = {
    UserId: 1, //dummy for now
    company: $jobsCompany.val().trim(), //dummy for now
    close_by: '1/1/2020',
    active: true, //always true on creation
    created_on: Date.now(),
    title: $jobsTitle.val().trim(),
    description: $jobDescription.val().trim()
  };

  if (!(job.title && job.description)) {
    alert("You must enter an job title and description!");
    return;
  }

  console.log("save job:", job);
  API.saveJob(job).then(function(data) {
    refreshJobs;
  });

  $jobsTitle.val("");
  $jobDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  console.log("Reached the delete");
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteJob(idToDelete).then(function() {
    refreshJobs;
  });
};

// // Add event listeners to the submit and delete buttons
 $(document).ready(function() {
  var $submitBtn = $("#submit");

    $submitBtn.on("click", handleFormSubmit);
    $jobsList.on("click", ".delete", handleDeleteBtnClick);
 });

