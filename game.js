var buttonColours = ["red","blue","green","yellow"];

var gameStarted = false;
var level = 0;

// Arrays to store values

var gamePattern = [];
var userClickedPattern = [];

// jQuery for click Handles

$(document).on("keydown", function(event){
  var inputValue = event.which;
  if((!gameStarted) &&(inputValue >= 65 && inputValue <= 120)){
    nextSequence();
    gameStarted = true;
  }
  console.log(event);
});

$(".btn").on("click", function(){

  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  var success = checkAnswer(userClickedPattern.length-1);
});

// function to check answer!!
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      userChosenColor = [];
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("failed");
    playSound("wrong");
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
  gameStarted = false;
  userClickedPattern = [];
}

// Computer Genrated Sequence

function nextSequence() {

  userClickedPattern = [];
  level++; $("h1").text("level "+level);

  var random_val = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[random_val];
  gamePattern.push(randomChosenColour);


  $("."+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Fucntions for animation and sounds

function playSound(name){
  var sound = new Audio('sounds/'+ name +'.mp3');
  sound.play();
}

function animatePress(currentColor) {
  $("."+currentColor).addClass("pressed");

  setTimeout(function() {
       $("."+currentColor).removeClass("pressed");
   }, 100);
}
