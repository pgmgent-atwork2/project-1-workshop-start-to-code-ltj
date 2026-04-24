// Importeer beide functies uit de controller om toegang te krijgen tot de vragen in het JSON bestand (onze database)
import { getEasyQuestions, getMediumQuestions } from "./controllers/questions.controller.js";

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
    const questions = difficulty === "medium"
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

    // Itereer over de antwoorden en plaats ze in de HTML
    for (const answer of answers) {
        // += betekent dat we de bestaande inhoud behouden en er nieuwe inhoud aan toevoegen
        $answerList.innerHTML += 
        `
            <li class="answers-button">
            ${answer}
            </li>
        `
    }
}