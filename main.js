// Importeer functies uit de controller om toegang te krijgen tot de vragen in het JSON bestand (onze database)
import { getEasyQuestions, getMediumQuestions, getHardQuestions } from "./controllers/questions.controller.js";

// Houdt bij welke vraag we momenteel tonen
let currentQuestionIndex = 0;

// Hier worden alle vragen opgeslagen
let questions = [];

// Houdt de score van de speler bij
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

    // Haal de difficulty parameter op (of gebruik "easy" als standaard)
    const difficulty = urlParams.get("difficulty") || "easy";

    // Afhankelijk van de moeilijkheidsgraad, haal de juiste vragen op
    if (difficulty === "medium") {
        questions = await getMediumQuestions();
    } else if (difficulty === "hard") {
        questions = await getHardQuestions();
    } else {
        questions = await getEasyQuestions();
    }

    // Neemt de eerste vraag uit de lijst (index 0)
    const question = questions[0];

    // Laat de vraag zien in de browser
    renderQuestion(question);

    // Laat de antwoorden zien in de browser
    renderAnswer(question.answers);
}

// Roep de functie aan om ze uit te voeren
initialiseQuestion();

// Toon alle antwoorden als klikbare knoppen
function renderAnswer(answers) {
    // Selecteer de lijst waar de antwoorden in komen
    const $answerList = document.getElementById("answers-buttons");

    // Maak de lijst leeg voordat we nieuwe antwoorden toevoegen
    $answerList.innerHTML = "";

    // Loop door alle antwoorden
    for (const answer of answers) {
        // Maak een nieuw lijstitem aan
        const li = document.createElement("li");

        // Voeg een class toe voor styling
        li.classList.add("answers-button");

        // Zet de tekst van het antwoord
        li.textContent = answer;

        // EVENT LISTENER: wat gebeurt er als je op een antwoord klikt
        li.addEventListener("click", () => {
            checkAnswer(answer);
        });

        // Voeg het antwoord toe aan de lijst in de HTML
        $answerList.appendChild(li);
    }
}

// Controleer of het gekozen antwoord juist is
function checkAnswer(selectedAnswer) {
    // Haal de huidige vraag op
    const currentQuestion = questions[currentQuestionIndex];

    // Vergelijk het gekozen antwoord met het juiste antwoord
    if (selectedAnswer === currentQuestion.answers[currentQuestion.correctAnswer]) {
        alert("Je antwoord is juist!");
        score++; // Verhoog de score
    } else {
        alert(`Het juiste antwoord was ${currentQuestion.answers[currentQuestion.correctAnswer]}`);
    }

    // Ga naar de volgende vraag
    currentQuestionIndex++;

    // Controleer of er nog vragen over zijn
    if (currentQuestionIndex < questions.length) {
        // Toon de volgende vraag
        renderQuestion(questions[currentQuestionIndex]);

        // Toon de bijhorende antwoorden
        renderAnswer(questions[currentQuestionIndex].answers);
    } else {
        // Als alle vragen beantwoord zijn, toon de eindscore
        alert(`Je hebt alle vragen beantwoord! Je score is: ${score}/${questions.length}`);
    }
}