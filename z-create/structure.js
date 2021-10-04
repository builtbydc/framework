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
            Button(submitButtonText,"NO_DIV", "qb-submit", "", "onclick=" + ttF("submit")),
            "qb-surround")
    );
}

function Answer(text, choice) {
    return (
        P(text, "NO_DIV", "qb-answer" + ttE(choices[index], choice, " chosen"), "", "onclick=" + ttF("choose", index, choice))
    );
}