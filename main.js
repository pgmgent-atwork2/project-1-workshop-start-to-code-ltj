// Importeer beide functies uit de controller om toegang te krijgen tot de vragen in het JSON bestand (onze database)
import { getEasyQuestions, getMediumQuestions } from "./controllers/questions.controller.js";

let currentQuestionIndex = 0;
let questions = [];
let score = 0;

// Geef de vraag weer in de browser
function renderQuestion(question) {
    // Selecteer het element dat we gaan aanmaken of bewerken
    const $question = document.getElementById("question");

    // Plaats de vraag in de HTML
    $question.innerHTML = 
        `
            <h2 class="question">
                ${question.question}
            </h2>
        `;
}

// Haal de vraag op en start ze
async function initialiseQuestion() {
    // Dit is de URL die in de button zit die wordt aangeklikt
    const urlParams = new URLSearchParams(window.location.search);
    const difficulty = urlParams.get("difficulty") || "easy";

    // Afhankelijk van de moeilijkheidsgraad, haal de juiste vragen op
    questions = difficulty === "medium"
        ? await getMediumQuestions()
        : await getEasyQuestions();
    
    // Neemt de eerste vraag uit de lijst (index)
    const question = questions[0]

    // Laat de vraag zien in de browser
    renderQuestion(question);

    // Laat de antwoorden zien in de browser
    renderAnswer(question.answers);
}

// Roep de functie aan om ze uit te voeren
initialiseQuestion();

function renderAnswer(answers) {
    const $answerList = document.getElementById("answers-buttons");
    $answerList.innerHTML = "";

    for (const answer of answers) {
        const li = document.createElement("li");
        li.classList.add("answers-button");
        li.textContent = answer;

        // EVENT LISTENER
        li.addEventListener("click", () => {
            checkAnswer(answer);
        });

        $answerList.appendChild(li);
    }
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.answers[currentQuestion.correctAnswer]) {
        alert("Je antwoord is juist!");
        score++;
    } else {
        alert(`Het juiste antwoord was ${currentQuestion.answers[currentQuestion.correctAnswer]}`);
    }
    currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
        renderQuestion(questions[currentQuestionIndex]);
        renderAnswer(questions[currentQuestionIndex].answers);
        } else {
        alert(`Je hebt alle vragen beantwoord! Je score is: ${score}/${questions.length}`);
    }
}