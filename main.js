import { getEasyQuestions, getMediumQuestions } from "./controllers/questions.controller.js";

function renderQuestion(questions) {
    const $question = document.getElementById("question");
    $question.innerHTML = "";

    for (const question of questions) {
        $question.innerHTML += 
        `
            <h2 class="question">
                ${question.question}
            </h2>
        `
    }
}

async function initialiseQuestion() {
    const questions = await getEasyQuestions();
    renderQuestion(questions)
}

initialiseQuestion();

function renderAnswer(answers) {
    const $answerList = document.getElementById("answers-buttons");
    $answerList.innerHTML = "";

    for (const answer of answers) {
        $answerList.innerHTML += 
        `
            <li class="answers-button">
            ${answer}
            </li>
        `
    }
}

async function initialiseAnswers() {
    const questions = await getEasyQuestions();
    const answers = questions[0].answers
    renderAnswer(answers)
}

initialiseAnswers();