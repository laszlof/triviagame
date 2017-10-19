

// game will start when you select the "start" button on the center of the page.
// After start is pressed it will reveal the questions and the timer starts.
// User reads through questions and answers them selecting radio buttons.
// After time is up program goes through and adds up right and wrong answers from array of questions and corresponding answers.

// questions and answers



// QUESTION AND ANSWER OBJECT


// Launch Start Modal when page loads and vertically center on any screen size.
$(document).ready(function () {
    $("#myModal").modal('show');


    function alignModal() {
        var modalDialog = $(this).find(".modal-dialog");
        // Applying the top margin on modal dialog to align it vertically center
        modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
    }
    // Align modal when it is displayed
    $(".modal").on("shown.bs.modal", alignModal);

    // Align modal when user resize the window
    $(window).on("resize", function () {
        $(".modal:visible").each(alignModal);
    });
});


// Timer to start on clicking START.
$("#start").click(function () {
  var time = 60;
  var interval = setInterval(function () {
    // Reduce timer by 1 second
    time--;
    // Calculate minutes and seconds from time left
    var minutes = Math.floor(time / 60);
    var seconds = time - (minutes * 60);
    // Convert seconds to a string and pad it with zeros on the front
    seconds = seconds.toString().padStart(2, '0');
    // Update UI
    $('#timer').html(minutes + ':' + seconds);
    // When our timer reaches zero, the game is over.
    if (time === 0) {
      clearInterval(interval);
      $('#timesUpModal').modal('show');
    }
  }, 1000);
});


// Reload page upon closeout of answer modal.
$("#reload").click(function () {
    location.reload();
});


// Logic for anwers.
function checkAnswers() {

    var correct = 0;
    var question1 = document.quiz.question1.value;
    var question2 = document.quiz.question2.value;
    var question3 = document.quiz.question3.value;
    var question4 = document.quiz.question4.value;
    var question5 = document.quiz.question5.value;

    if (question1 == "silver-arrow") {
        correct++;
    }
    if (question2 == "smb3") {
        correct++;
    }
    if (question3 == "magic-mirror") {
        correct++;
    }
    if (question4 == "egging-it") {
        correct++;
    }
    if (question5 == "world-class") {
        correct++;
    }

    var messages = ["Good job!", "You did ok...", "Better luck next time!"];
    var images = ["./assets/img/winner-is-you.jpg", "./assets/img/congrats.jpg", "./assets/img/another-castle.jpg"];

    var range;

    if (correct < 1) {
        range = 2;
    }

    if (correct > 0 && correct < 5) {
        range = 1
    }

    if (correct > 2) {
        range = 0;
    }

    document.getElementById("on-submit").style.visibility = "visible";

    document.getElementById("message").innerHTML = messages[range];
    document.getElementById("number-correct").innerHTML = "You got " + correct + " correct!";
    document.getElementById("images").src = images[range];
}
