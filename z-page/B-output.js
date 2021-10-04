function loadPage() {
    document.getElementById("page-title").innerHTML = pageTitle;
    document.getElementById("contents").innerHTML = Structure();
}

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

function Structure() {
    return (
        QuestionHeader() +
        QuestionBox(questions[index], answers[index])
    );
}

const pageTitle = "Quiz App";

function QuestionHeader() {
    return (
        Div(
            Div("", "arrow arrow-left", "", "onclick=" + ttF("previousQuestion")) +
            P(questionTitle(), "NO_DIV") +
            Div("", "arrow arrow-right", "", "onclick=" + ttF("nextQuestion")),
            "header")
    );
}

function QuestionBox(question, answers) {
    return (
        Div(
            Div(
                H(1, question, "NO_DIV", "qb-question-title") +
                Div(
                    Answer(answers[0], 0) +
                    Answer(answers[1], 1) +
                    Answer(answers[2], 2) +
                    Answer(answers[3], 3),
                    "qb-question-choices"),
                "qb-section") +
            Button(submitButtonText, "NO_DIV", "qb-submit", "", "onclick=" + ttF("submit")),
            "qb-surround")
    );
}

function Answer(text, choice) {
    return (
        P(text, "NO_DIV", "qb-answer" + (choices[index] === choice ? " chosen" : ""), "",
            "onclick=" + ttF("choose", index, choice))
    );
}

/*

function Tag(attributes, contents, divClassName, className, id, other) {
    id = pu(id); other = pu(other);

    if(divClassName === "NO_DIV") {
        className = pcn(className);

        return(
            op("tag",
                //attributes
                waNE(id, "", "id", id) +   
                wa("class", ("tag++" + className)) +
                other

            ) + contents + cl("tag")
        );

    } else {
        divClassName = pcn(divClassName);

        return( Div(
            Tag(attributes, contents, "NO_DIV", className, id, other),
            "Tag"+ divClassName)
        );

    }
}

*/

//space, open tag, close tag
function sp() {
    return ' ';
}
function op(tag, attributes) {
    return '<' + tag + sp() + attributes + '>';
}
function cl(tag) {
    return '</' + tag + '>';
}
//text transfer
function ttL(text) {
    return "'" + text + "'";
}
function ttE(ttE_a, ttE_b, text) {
    if (ttE_a === ttE_b) return text;
    else return '';
}
function ttNE(ttNE_a, ttNE_b, text) {
    if (ttNE_a !== ttNE_b) return text;
    else return '';
}
//up to 16 parameters!
function ttF(functionName, ttF_a, ttF_b, ttF_c, ttF_d, ttF_e, ttF_f, ttF_g, ttF_h, ttF_i, ttF_j, ttF_k, ttF_l, ttF_m, ttF_n, ttF_o, ttF_p) {
    return ttL(functionName + '(' + ttNE(ttF_a, undefined, ttF_a) +
        ttNE(ttF_b, undefined, ', ' + ttF_b) + ttNE(ttF_c, undefined, ', ' + ttF_c) +
        ttNE(ttF_d, undefined, ', ' + ttF_d) + ttNE(ttF_e, undefined, ', ' + ttF_e) +
        ttNE(ttF_f, undefined, ', ' + ttF_f) + ttNE(ttF_g, undefined, ', ' + ttF_g) +
        ttNE(ttF_h, undefined, ', ' + ttF_h) + ttNE(ttF_i, undefined, ', ' + ttF_i) +
        ttNE(ttF_j, undefined, ', ' + ttF_j) + ttNE(ttF_k, undefined, ', ' + ttF_k) +
        ttNE(ttF_l, undefined, ', ' + ttF_l) + ttNE(ttF_m, undefined, ', ' + ttF_m) +
        ttNE(ttF_n, undefined, ', ' + ttF_n) + ttNE(ttF_o, undefined, ', ' + ttF_o) +
        ttNE(ttF_p, undefined, ', ' + ttF_p) + ');');
}
//write attribute
function wa(attr, text) {
    return attr + '=' + ttL(text) + sp();
}
function waE(waE_a, waE_b, attr, text) {
    if (waE_a === waE_b) return wa(attr, text);
    else return '';
}
function waNE(waNE_a, waNE_b, attr, text) {
    if (waNE_a !== waNE_b) return wa(attr, text);
    else return '';
}
//parse undefined
function pu(attr) {
    if (attr === undefined) attr = '';
    return attr;
}

function Div(contents, className, id, other) {
    className = pu(className); id = pu(id); other = pu(other);
    return (
        op("div",
            waNE(id, "", "id", id) +
            waNE(className, "", "class", className) +
            other

        ) + contents + cl("div")
    );
}

function A(href, target, contents, divClassName, className, id, other) {
    id = pu(id); other = pu(other);

    if (divClassName === "NO_DIV") {
        className = pu(className);

        return (
            op("a",
                wa("href", href) +
                waNE(target, "download", "target", target) +
                waNE(id, "", "id", id) +
                waNE(className, "", "class", className) +
                other +
                ttE(target, "download", "download")

            ) + contents + cl("a")
        );

    } else {
        divClassName = pu(divClassName);

        return (Div(
            A(href, target, contents, "NO_DIV", className, id, other),
            divClassName)
        );

    }
}
function H(size, text, divClassName, className, id, other) {
    id = pu(id); other = pu(other);

    if (divClassName === "NO_DIV") {
        className = pu(className);

        return (
            op("h" + size,
                waNE(id, "", "id", id) +
                waNE(className, "", "class", className) +
                other

            ) + text + cl("h" + size)
        );

    } else {
        divClassName = pu(divClassName);

        return (Div(
            H(size, text, "NO_DIV", className, id, other),
            divClassName)
        );

    }
}
function Img(src, alt, width, height, divClassName, className, id, other) {
    id = pu(id); other = pu(other);

    if (divClassName === "NO_DIV") {
        className = pu(className);

        return (
            op("img",
                wa("src", src) +
                wa("alt", alt) +
                wa("width", width) +
                wa("height", height) +
                waNE(id, "", "id", id) +
                waNE(className, "", "class", className) +
                other

            )
        );

    } else {
        divClassName = pu(divClassName);

        return (Div(
            Img(src, alt, width, height, "NO_DIV", className, id, other),
            divClassName)
        );

    }
}
function P(text, divClassName, className, id, other) {
    id = pu(id); other = pu(other);

    if (divClassName === "NO_DIV") {
        className = pu(className);

        return (
            op("p",
                //attributes
                waNE(id, "", "id", id) +
                waNE(className, "", "class", className) +
                other

            ) + text + cl("p")
        );

    } else {
        divClassName = pu(divClassName);

        return (Div(
            P(text, "NO_DIV", className, id, other),
            divClassName)
        );

    }
}
function Button(contents, divClassName, className, id, other) {
    id = pu(id); other = pu(other);

    if (divClassName === "NO_DIV") {
        className = pu(className);

        return (
            op("button",
                wa("type", "button") +
                waNE(id, "", "id", id) +
                waNE(className, "", "class", className) +
                other

            ) + contents + cl("button")
        );

    } else {
        divClassName = pu(divClassName);

        return (Div(
            Button(contents, "NO_DIV", className, id, other),
            divClassName)
        );

    }
}
