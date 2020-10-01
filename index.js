var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function(){
   var userClickedColor = $(this).attr("id");
   userClickedPattern.push(userClickedColor);
   playSound(userClickedColor);
   animatePress(userClickedColor);
   checkAnswer(userClickedPattern.length-1)

   /* console.log(userClickedColor);
      console.log(userClickedPattern.push(userClickedColor)),
      console.log(userClickedPattern);*/
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
        nextSequence();
        }, 1000);
    }
 } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("game over, press any key to restart");
        setTimeout(function(){
        $("body").removeClass("game-over")
        }, 200);
        
        startOver()
    }
}
function nextSequence(){ 
    userClickedPattern=[];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    // console.log(randomChosenColor);
    // console.log(gamePattern.push(randomChosenColor));

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function(){
    $("#" + currentColor).removeClass("pressed"); 
    }, 100);
}
function playSound(name) {
    var audio1 = new Audio("sounds/" + name + ".mp3");
    audio1.play();
}

function startOver(){
        level = 0;
        gamePattern = [];
        started = false;
}