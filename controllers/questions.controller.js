async function getAllQuestions() {
    const result = await fetch("/data/data.json");
    const data = await result.json();
    return data
}

async function getRandomQuestion(array, count) {
    return array.sort(() => Math.random() - 0.5).slice(0, count)
}

export async function getEasyQuestions() {
    const questions = await getAllQuestions();
    const easyQuestions = questions.filter(question => question.difficulty === "easy");

    return getRandomQuestion(easyQuestions, 5);

}

export async function getMediumQuestions() {
    const questions = await getAllQuestions();
    const mediumQuestions = questions.filter(question => question.difficulty === "medium");

    return getRandomQuestion(mediumQuestions, 5);
}

export async function getHardQuestions() {
    const questions = await getAllQuestions();
    const hardQuestions = questions.filter(question => question.difficulty === "hard");

    return getRandomQuestion(hardQuestions, 5);
}

function showAnswers(question) {
    const answersContainer = document.getElementById("answers-buttons");
    answersContainer.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const li = document.createElement("li");
        li.textContent = answer;

        li.addEventListener("click", () => {
            // alles disablen na klik
            const allAnswers = answersContainer.querySelectorAll("li");
            allAnswers.forEach(el => el.style.pointerEvents = "none");

            if (index === question.correctAnswer) {
                li.classList.add("correct");
            } else {
                li.classList.add("wrong");

                // juiste antwoord ook tonen
                allAnswers[question.correctAnswer].classList.add("correct");
            }
        });

        answersContainer.appendChild(li);
    });
}
