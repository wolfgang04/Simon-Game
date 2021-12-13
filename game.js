var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

// Detects if a key has been pressed
$(document).keypress(function () {

    // If started == false, then do the ff
    if (!started) {

        // Changes the text to lvl 0
        $("#level-title").text(`Level ${level}`);

        // Calls the function to start the game
        nextSequence();

        // Change the started var to true, stopping this chunk of code after once
        started = true;

    }

});


// Identifies the clicked button by the user
$(".btn").click(function () {

    // Identifies what button the user clicked
    var userChosenColor = $(this).attr("id");

    // Adds the identified button to the userClickedPattern array
    userClickedPattern.push(userChosenColor);

    // Plays the dedicated audio for the clicked button
    playSound(userChosenColor);

    // Adds animation when clicked
    animatePress(userChosenColor);

    // Checks your current progress
    checkAnswer(userClickedPattern.length - 1);

})


// Selects a random color and adds it to the gamePattern array
function nextSequence() {

    // Empties the array
    userClickedPattern = []

    // Iterates your level
    level++;

    // Changes the text to your current level
    $("#level-title").text(`Level ${level}`);

    // Generates a random Number from 0 - 3
    randomNumber = Math.floor(Math.random() * 4);

    // Selects a random Color
    var randomChosenColor = buttonColors[randomNumber];

    // Adds the selected random color to the gamePattern array
    gamePattern.push(randomChosenColor)

    // Adds animation to the selected button
    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

    // Plays the dedicated audio when randomly selected
    playSound(randomChosenColor);

}


// Plays audio for each color
function playSound(name) {

    // Plays each dedicated audio to each button when selected
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();

}


// Adds animation when pressed
function animatePress(currentColor) {

    // Adds the animation when pressed
    $(`#${currentColor}`).addClass("pressed");

    // Removes the animation after milliseconds
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);

}


// Checks your current progress
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // If your current level is the same as the number of buttons you clicked, then
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {

                // Calls the function to proceed to the next level
                nextSequence();

            }, 1000);

        }

    } else {

        // If the sequence is wrong
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }

}

function startOver() {

    level = 0;

    gamePattern = [];

    started = false;


}