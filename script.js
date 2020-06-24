//declaring variables
var score = 0;
var questionCurrent = -1;
var timeRemaining = 0;
var timer;

//question array
var questions = [{
        title: "What does CSS stand for?",
        choices: ["Chart Style Sheet","Cascading Style Sheet","Computer Styling Styles","Continuous Style Sheet"],
        answer: "Cascading Style Sheet"
    },
    {
       title: "What does var stand for?",
        choices: ["varsity lacrosse","varied", "valued at radical", "variable"],
        answer: "variable"
    },
    {
       title: "What HTML are we currently using?",
        choices: ["HTML 11","HTML OSX", "HTML 5", "HTML III"],
        answer: "HTML 5"
    },
    {
       title: "What famous company created Bootstrap?",
        choices: ["Facebook","Instagram", "Linked'In", "Twitter"],
        answer: "Twitter"
    },
    {
       title: "How do you identify a class selector?",
        choices: [".","#","&","$"],
        answer: "."
    }
    ,
    {
        title: "How do you identify a javascript filetype?",
         choices: [".java",".javascript",".jason",".js"],
         answer: ".js"
     }
]

//when user clicks start, timer begings to countdown
//end game if timer is at 0

function start() {
    timeRemaining = 75;
    document.getElementById("timeRemaining").innerHTML = timeRemaining;

//what to do and when, function will run in every 1000 ms
//if time left is at 0, clear the timer interval and end the game.
//clear interval you have to give it the thing that it is clearing

    timer = setInterval(function () {
        timeRemaining--;
        document.getElementById("timeRemaining").innerHTML = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    next();
}

//function to stop the timer to end the game
function endGame() {
    clearInterval(timer);

//if game ends, user can input their name as their score reveals.
//using template literal (interpolation: put this in there)
//math ceiling to round up

    var quizContent = `
<h2>Game over!</h2>
<h3>You got a ${Math.ceil(score/ questions.length *100)} /100!</h3>
<h3>That means you got ${score} questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Score</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//storing scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    setScore();
}

function getScore() {
    var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem ("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//clears score and name if user selects clear score 
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");
    
    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    questionCurrent = -1;
    timeRemaining = 0;
    timer = null;

    document.getElementById("timeRemaining").innerHTML = timeRemaining;

    var quizContent = `
<h1>
    Coding Quiz!
</h1>
<h3>
    Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//if user answers incorrectly deduct 10 points
function incorrect() {
    timeRemaining -= 10;
    next();
}

//increases score if answered correctly
function correct() {
    score += 1;
    next();
}

//loops through the questions 
function next() {
    questionCurrent++;

    if (questionCurrent > questions.length - 1) {
        endGame();
        return;
    }
//ending next function with return.
    var quizContent = "<h2>" + questions[questionCurrent].title + "</h2>"

    for (var x = 0; x < questions[questionCurrent].choices.length; x++) {
        //ternary operator (true/false)
        var answerFunction = (questions[questionCurrent].choices[x] == questions[questionCurrent].answer)?"correct()":"incorrect()";
        var html = `<button onclick="${answerFunction}"> ${questions[questionCurrent].choices[x]}</button>`
        quizContent += html
    }
    document.getElementById("quizBody").innerHTML = quizContent;
}