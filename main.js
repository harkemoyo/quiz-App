const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const quizEl = document.getElementById('quiz');
const answerEl = document.getElementById('quiz-answer');


let shuffledQuestions, currentQuestionIndex 

const questions = [
    {
        question: 'what is 2 + 2 =',
        answers:[

            {text:'4', correct:true},
            {text: '22',  correct:false}
        ]
    },
    {
        question: 'what is 2 / 2 =',
        answers:[

            {text:'1', correct:true},
            {text: '2',  correct:false}
        ]
    },
    {
        question: 'what is 4 * 2 =',
        answers:[

            {text:'4', correct:false},
            {text: '8',  correct:true}
        ]
    }
]

function startGame(){
   startBtn.classList.add('hide');
   quizContainer.classList.remove('hide');
   shuffledQuestions = questions.sort(() => Math.random() - .5);
   currentQuestionIndex = 0;
   setNextQuiz();
}

// container-Quiz
function setNextQuiz(){
    resetState()
    showNextQuiz(shuffledQuestions[currentQuestionIndex]);
}

// Nxt-quiz
function showNextQuiz(question){
quizEl.textContent = question.question;
question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener('click',selectAnswer);
    answerEl.appendChild(button)
});
}
// reset Quiz
function resetState(){
    clearStatusClass(document.body)
    nextBtn.classList.add('hide');
    while (answerEl.firstChild){
        answerEl.removeChild(answerEl.firstChild);
    }
}

// select nxt quiz
function selectAnswer(e){
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct;
    setStatusClass(document.body,correct);
    Array.from(answerEl.children).forEach(button =>{
        setStatusClass(button,button.dataset.correct)
    });
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextBtn.classList.remove('hide');
} else{
    startBtn.textContent = 'Restart';
    startBtn.classList.remove('hide');
}

}
// set status class
function setStatusClass(element, correct){
 clearStatusClass(element)
 if(correct){
    element.classList.add('correct');

 }else {
    element.classList.add('wrong');
 }
}

// clearStatusClass
function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
// Event listeners
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click' , ()=>{
    currentQuestionIndex++;
    setNextQuiz();
});