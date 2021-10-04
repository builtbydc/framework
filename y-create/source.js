const numberOfQuestions = 10;
var index = 0;

var submitButtonText = "Submit";

var choices = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

const correctAnswers = [0,1,2,3,0,1,2,3,0,1];

const questions = [
    "What is NoHTML?",
    "Do you like cheese?",
    "What is 9+10?",
    "What is your cat's name?",
    "What year did John Travolta become President?",
    "Is it cool to take a bath in an Airbnb?",
    "Who is the developer of this framework?",
    "Are you happy?",
    "Are you having fun?",
    "What day is it?",
    ""
];

const answers = [
    ["a js framework", "b js framework", "c js framework", "d js framework"],
    ["yes", "absolutely", "of course", "isn't everyone"],
    ["18", "19", "20", "21"],
    ["Harold", "gerald", "Meryld", "Barryld"],
    ["1994", "2045", "1832", "987"],
    ["yes", "no", "yes", "no"],
    ["daniel", "a moron", "potato chip", "boy"],
    [";)", ":)", "smile", "yes"],
    ["yes", "yes", "yes", "yes"],
    ["Today", "the third", "tuesday", "mind your own business"],
    ["","","",""]
];

function questionTitle() {
    if(index < numberOfQuestions) return "Question " + (index+1);
    else return "Results";
}

function updateInfo() {
    if(index < numberOfQuestions-1) submitButtonText = "Submit";
    if(index===numberOfQuestions-1) submitButtonText="Submit Quiz";
    if(index===numberOfQuestions){
        questions[numberOfQuestions] = ("Congrats! You got " + score() + " out of " + numberOfQuestions + " correct!");
        submitButtonText="Share";
    }
}

function allAnswered() {
    var out = true;
    for(var i = 0; i < numberOfQuestions; i++) 
        if(choices[i]===-1) out = false;
    return out;
}

function previousQuestion() {
    if (index > 0) index--;
    updateInfo();
    loadPage();
}

function nextQuestion() {
    if (index < numberOfQuestions-1 || (index===numberOfQuestions-1 && allAnswered())) index++;
    updateInfo();
    loadPage();
}

function choose(index, choice) {
    choices[index] = choice;
    loadPage();
}

function submit() {
    if(choices[index]!==-1) 
        nextQuestion();
}

function score() {
    var out = 0;
    for(var i = 0; i < 10; i++)
        if(choices[i]===correctAnswers[i]) out++;
    return out;
}