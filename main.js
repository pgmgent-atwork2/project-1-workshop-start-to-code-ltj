import { getEasyQuestions, getMediumQuestions } from "./controllers/questions.controller.js";

function renderQuestion(question) {
    const $question = document.getElementById("question");
    $question.innerHTML = 
        `
            <h2 class="question">
                ${question.question}
            </h2>
        `;
}

async function initialiseQuestion() {
    const questions = await getEasyQuestions();
    const question = questions[0]

    renderQuestion(question);
    renderAnswer(question.answers);
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