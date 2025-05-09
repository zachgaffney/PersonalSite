var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence () {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/" + randomChosenColor + ".mp3");
    audio.play();
    $("h1").text("Level " + level);
    level ++;
}

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    var audio = new Audio("./sounds/" + userChosenColor + ".mp3");
    audio.play();
    $("." + userChosenColor).addClass("pressed");
    setTimeout(function() {
        $("." + userChosenColor).removeClass("pressed");
    }, 100);
    checkAnswer(userClickedPattern.length -1);
});

$(document).on("keypress", function() {
    nextSequence();
    $("h1").text("Level " + level);
    level ++;
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = []
              }, 1000);
        } 
    }
        else {
            console.log("YOU SUCK!");
            $("body").addClass("game-over"); 
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }