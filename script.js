let questions = [];
let currentQuestion;
let rightAnswer = 0;

// Help functions //
function getID(id) {
    return document.getElementById(id);
}

function newGame() {
    currentQuestion = 0;
    getID('welcome').classList.remove('d-none');
    getID('quiz-card').classList.add('d-none');
    getID('next').setAttribute('onclick', 'nextQuestion(0)');
}

function removeActive() {
    getID('html').classList.remove('active');
    getID('css').classList.remove('active');
    getID('js').classList.remove('active');
}

function removeBackgroundColor() {
    getID('reply_0').style.removeProperty('background-color');
    getID('reply_1').style.removeProperty('background-color');
    getID('reply_2').style.removeProperty('background-color');
    getID('reply_3').style.removeProperty('background-color');
}
// ***************** //

// set Category //
function setHtml() {
    questions = questionsHTML;
    newGame();
    removeActive();
    renderQuestion();
    removeBackgroundColor();
    getID('html').classList.add('active');
    getID('transparent').classList.add('d-none');
    getID('end').classList.add('d-none');
    getID('category').innerHTML = 'HTML';
    resetProgressBar();
}

function setCss() {
    questions = questionsCSS;
    newGame();
    removeActive();
    renderQuestion();
    removeBackgroundColor();
    getID('css').classList.add('active');
    getID('transparent').classList.add('d-none');
    getID('end').classList.add('d-none');
    getID('category').innerHTML = 'CSS';
    resetProgressBar();
}

function setJs() {
    questions = questionsJS;
    newGame();
    removeActive();
    renderQuestion();
    removeBackgroundColor();
    getID('js').classList.add('active');
    getID('transparent').classList.add('d-none');
    getID('end').classList.add('d-none');
    getID('category').innerHTML = 'JavaScript';
    resetProgressBar();
}
// ***************** //

// check the category //
function checkCategory() {
    if (checkQuestionLength()) {
        alert('Bitte Kategorie auswählen');
    } else {
        getID('welcome').classList.add('d-none');
        getID('quiz-card').classList.remove('d-none');
        getID('all-questions').innerHTML = questions.length;
    }
}

function checkQuestionLength() {
    return questions.length == 0;
}
// ***************** //

// show questions //
function renderQuestion() {
    let ask = questions[currentQuestion];
    getID('next').setAttribute('onclick', `nextQuestion(${currentQuestion})`);
    getID('question-title').innerHTML = ask.question;
    getID('current-question').innerHTML = currentQuestion + 1;
    getID('next').disabled = true;
    getID('transparent').classList.add('d-none');
    removeBackgroundColor();
    for (let i = 0; i < 4; i++) {
        getID(`answer_${i}`).innerHTML = ask[`answer_${i}`];
    }
}
// ***************** //

// show the next questions //
function nextQuestion(i) {
    if (i == 3) {
        getID('end').classList.remove('d-none');
        getID('quiz-card').classList.add('d-none');
        getID('right-answer').innerHTML = rightAnswer;
        currentQuestion = 0;
    } else {
        currentQuestion = i + 1;
        renderQuestion(currentQuestion);
        progressbar();
    }
}
// ***************** //

// check the answer // 
function answer(selction) {
    let sound_correct = new Audio('sounds/correct.mp3');
    let sound_wrong = new Audio('sounds/wrong.mp3');
    if (selction.slice(-1) == questions[currentQuestion].right_answer) {
        getID(`reply_${questions[currentQuestion].right_answer}`).style.backgroundColor = 'rgba(0, 128, 0, 0.2)';
        getID('next').disabled = false;
        rightAnswer++;
        sound_correct.play();
    } else {
        getID(selction).style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        getID(`reply_${questions[currentQuestion].right_answer}`).style.backgroundColor = 'rgba(0, 128, 0, 0.2)';
        getID('next').disabled = false;
        sound_wrong.play();
    }
    getID('transparent').classList.remove('d-none');
}
// ***************** //

// restart the Quiz //
function restartQuiz() {
    getID('end').classList.add('d-none');
    getID('welcome').classList.remove('d-none');
    getID('category').innerHTML = '';
    questions = [];
    removeActive();
    resetProgressBar();
}
// ***************** //

// show the progressbar // 
function progressbar() {
    currentAnswer = currentQuestion + 1;
    let sum = currentAnswer / questions.length * 100;
    getID('progress-bar').style = `width: ${sum}%;`;
    getID('progress-bar').innerHTML = `${sum}%`;
}
// ***************** //

// Reset progress bar // 
function resetProgressBar() {
    getID('progress-bar').style = 'width: 25%;';
    getID('progress-bar').innerHTML = '25%';
    rightAnswer = 0;
}
// ***************** //