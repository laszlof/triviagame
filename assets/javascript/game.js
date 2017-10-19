

// game will start when you select the "start" button on the center of the page.
// After start is pressed it will reveal the questions and the timer starts.
// User reads through questions and answers them selecting radio buttons.
// After time is up program goes through and adds up right and wrong answers from array of questions and corresponding answers.

// questions and answers



// QUESTION AND ANSWER OBJECT

var questions = [
    'In order to defeat the final boss in the original Legend of Zelda you had to use a...',
    'Before its North Amerrican release this famous game was featured in the film "The Wizard".',
    'In the Legend of Zelda - A Link to the Past. In order to travel between the dark world and light world Link used a...',
    'In Super Mario Bros 2. The first boss you encounter was defeated by...',
    'The NES Power Pad was bundled with which game?'
];

var answers = [];

answers[0] = [
  'Magic Sword',
  'Ocarina',
  'Magic Spell Scepter',
  'Silver Arrow'
];

answers[1] = [
  'Ninja Gaiden',
  'Double Dragon',
  'Savage Freddy',
  'Super Mario Bros 3',
]

answers[2] = [
  'Magic Wand',
  'Magic Mirror',
  'Magic Scepter',
  'Old Shoe'
];

answers[3] = [
  'Jumping on it',
  'Shooting fireballs at it',
  'Throwing darts at it',
  'Egging it'
];

answers[4] = [
  'Stadium Events',
  'Super Mario Bros',
  'Track and Field',
  'World Class Track Meet'
];

var correct_answers = [3, 3, 1, 3, 3];

function drawQuestions() {
  var $container = $('#questions-container');
  for (var idx=0; idx < questions.length; idx++) {
    var q = questions[idx];
    var ans = answers[idx];
    var $div = $('<div>');
    $div.append($('<p>').addClass('questions').text(q));
    $container.append($div);
    for (var aidx = 0; aidx < ans.length; aidx++) {
      var $answer = $('<input>').attr('type', 'radio').attr('name', 'question-' + idx).val(aidx);
      $container.append($answer);
      $container.append(' ' + ans[aidx]);
      $container.append($('<br>'));
    }
    $container.append($('<br>'));
  }
}

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
  drawQuestions();
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
    for (var i = 0; i < questions.length; i++) {
      var a = $('input[name=question-' + i + ']:checked').val();
      if (a == correct_answers[i]) {
        correct++;
      }
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
