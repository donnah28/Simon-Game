
var gamePattern = []
var userClickedPattern = []
var buttonColors = ["red", "blue", "green", "yellow"];
var start = false;
var level = 0;

$(document).keydown(function(){
    if(!start){
        $("#level-title").text("level " + level);
        nextSequence();
        start = true;
    }
})

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").on('click', function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
        console.log("success");
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over")
        $("#level-title").text("Game over, press any key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}