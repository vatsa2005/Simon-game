startGame();

//predefined functions.
function animateBefore(cls) {
    var temp = document.querySelector("." + cls);
    temp.classList.add("opacity");
    setTimeout(function() {
        temp.classList.remove("opacity")
    }, 200);
    
}
function animateOnClick(cls){
    var temp = document.querySelector("." + cls);
    temp.classList.add("white");
    setTimeout(function() {
        temp.classList.remove("white");
    }, 200);
}
var levelNo = 1;
var flag = true;
function startGame() {
    $(document).on("keydown", function() {
        if(flag) {
            playingAnimation();
            while(clickedElems > 0) {
                clickedElems.pop();
            }
            flag = false;
        }
        // else if(checkingFlag) {
        //     playingAnimation();
        //     // playingAnimationWrong();
        //     checkingFlag = false;
        // }
    });
}

function playingAnimation() {
    $("h1").text("Level " + levelNo);     
    pattern();
    click();
}
// function playingAnimationWrong() {
//     $("h1").text("Level " + levelNo);
//     pattern();
//     click();   
// }

var memory = [];

function pattern() {
    var elems = ["red", "yellow", "blue", "green"];
    var randomNum = Math.floor(Math.random() * elems.length);
    animateBefore(elems[randomNum]);
    memory.push(elems[randomNum]);
    $("h1").text("Level " + levelNo ++);
    
}
var clickedElems = [];
function wrong() {
    audioWrong();
        $("h1").text("Game Over, Press Any Key to Restart")
        $(".game").addClass("wrong");
        setTimeout(function() {
            $(".game").removeClass("wrong");
        }, 500);
        while(memory.length > 0) {
            memory.pop();
        }
        while(clickedElems.length > 0) {
            clickedElems.pop();
        }
        levelNo = levelNo - (levelNo - 1);
}
// var checkingFlag = false;
function checking() {
    for(i = 0; i < clickedElems.length; i++) {
        if(clickedElems[i] === memory[i]) {
            if(i === (memory.length) - 1) {
                while(clickedElems.length > 0) {
                    clickedElems.pop();
                }
                setTimeout(function() {
                    pattern();
                }, 1000);
            }
        }else if(clickedElems[i] !== memory[i]) {
            wrong();
            flag = true;
            
        }
    }
}   
function click() {
    $(".red").unbind("click").bind("click", function(e) {
        animateOnClick("red");
        audioRed();
        var gettingTheClass = e.target.className.split(" ")
        clickedElems.push(gettingTheClass[0]);
        checking();
    });
    $(".blue").unbind("click").bind("click", function(e) {
        animateOnClick("blue");
        audioBlue();
        var gettingTheClass = e.target.className.split(" ")
        clickedElems.push(gettingTheClass[0]);
        checking();
    });
    $(".green").unbind("click").bind("click", function(e) {
        animateOnClick("green");
        audioGreen();
        var gettingTheClass = e.target.className.split(" ")
        clickedElems.push(gettingTheClass[0]);
        checking();
    });
    $(".yellow").unbind("click").bind("click", function(e) {
        animateOnClick("yellow");
        audioYellow();
        var gettingTheClass = e.target.className.split(" ")
        clickedElems.push(gettingTheClass[0]);
        checking();
    });
}

function audioRed() { 
    var audio = new Audio("./sounds/red.mp3");
    audio.play();
}
function audioBlue() {
    var audio = new Audio("./sounds/blue.mp3");
    audio.play();
}
function audioGreen() {
    var audio = new Audio("./sounds/green.mp3");
    audio.play();
}
function audioYellow() {
    var audio = new Audio("./sounds/yellow.mp3");
    audio.play();
}
function audioWrong() {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
}



