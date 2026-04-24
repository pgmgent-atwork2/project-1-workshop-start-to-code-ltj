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
