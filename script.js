const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the largest country in the world?",
        answers: [
            {text: "Uzbekistan", correct: false},
            {text: "Russia", correct: false},
            {text: "The USA", correct: true},
            {text: "Japan", correct: false},
        ]
    },
    {
        question: "2+2*2=?",
        answers: [
            {text: "6", correct: true},
            {text: "8", correct: false},
            {text: "10", correct: false},
            {text: "2", correct: false},
        ]
    },
    {
        question: "What is themost difficult language in the world?",
        answers: [
            {text: "Uzbek", correct: false},
            {text: "Korean", correct: false},
            {text: "English", correct: false},
            {text: "Chinese", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answerButtons")
const nextBtnElement = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtnElement.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswers)
    })
}

function resetState(){
    nextBtnElement.style.display= "none";
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswers(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    } 
    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
           button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtnElement.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}!`;
    nextBtnElement.innerHTML = "Play Again"
    nextBtnElement.style.display = "block"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
        showScore()
    }
}


nextBtnElement.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})



startQuiz()