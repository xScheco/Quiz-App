let questions = []; // array white question from data.js
let currentQuestion; // the current question
let rightAnswer = 0; // number of correct questions

// Help functions //
function getID(id) {
    return document.getElementById(id); // returns the document methode wihte the id 
}

function newGame() {
    currentQuestion = 0; // set the current question to 0 
    getID('welcome').classList.remove('d-none'); // remove the class (d-none) to html element with the id welcome
    getID('quiz-card').classList.add('d-none'); // add the class (d-none) to html element with the id quiz-card
    getID('next').setAttribute('onclick', 'nextQuestion(0)'); // set the attribute (onclick and nextQuestion(0)) in to the html element with id next
}

function removeActive() {
    getID('html').classList.remove('active'); // remove the class (active) form html element with id html
    getID('css').classList.remove('active'); // remove the class (active) form html element with id css
    getID('js').classList.remove('active'); // remove the class (active) form html element with id js
}

function removeBackgroundColor() {
    getID('reply_0').style.removeProperty('background-color'); //remove the style attribute (background-color) form html element with id reply_0
    getID('reply_1').style.removeProperty('background-color'); //remove the style attribute (background-color) form html element with id reply_1
    getID('reply_2').style.removeProperty('background-color'); //remove the style attribute (background-color) form html element with id reply_2
    getID('reply_3').style.removeProperty('background-color'); //remove the style attribute (background-color) form html element with id reply_3
}

function resetProgressBar() {
    getID('progress-bar').style = 'width: 25%;'; // change the style attribute width to 25% 
    getID('progress-bar').innerHTML = '25%'; // write the 25% in to html element with id progress-bar
    rightAnswer = 0; // set the variable rigthAnswer to 0
}
// ************************ //

// Category //
function setHtml() {
    questions = questionsHTML; // fill the variable questions with the Question of the data.js (json questionsHTML)
    newGame(); // calls the newGame() function (line 10)
    removeActive(); // calls the removeActive() function (line 17)
    renderQuestion(); // calls the renderQuestion() function (line 91)
    removeBackgroundColor(); // calls the removeBackgroundColor() function (line 23)
    getID('html').classList.add('active'); // add the class (active) to html element with id html
    getID('transparent').classList.add('d-none'); // add the class (d-none) to html element with id transparent
    getID('end').classList.add('d-none'); // add the class (d-none) to html element with id end
    getID('category').innerHTML = 'HTML'; // write the text 'HTML' in to the html element with id category
    resetProgressBar(); // calls the restProgesBar() function (line 147)
}

function setCss() {
    questions = questionsCSS; // fill the variable questions with the Question of the data.js (json questionsCSS)
    newGame(); // calls the newGame() function (line 10)
    removeActive(); // calls the removeActive() function (line 17)
    renderQuestion(); // calls the renderQuestion() function (line 91)
    removeBackgroundColor(); // calls the removeBackgroundColor() function (line 23)
    getID('css').classList.add('active'); // add the class (active) to html element with id css
    getID('transparent').classList.add('d-none'); // add the class (d-none) to html element with id transparent
    getID('end').classList.add('d-none'); // add the class (d-none) to html element with id end
    getID('category').innerHTML = 'CSS'; // write the text 'CSS' in to the html element with id category
    resetProgressBar(); // calls the restProgesBar() function (line 147)
}

function setJs() {
    questions = questionsJS; // fill the variable questions with the Question of the data.js (json questionsJS)
    newGame(); // calls the newGame() function (line 10)
    removeActive(); // calls the removeActive() function (line 17)
    renderQuestion(); // calls the renderQuestion() function (line 91)
    removeBackgroundColor(); // calls the removeBackgroundColor() function (line 23)
    getID('js').classList.add('active'); // add the class (active) to html element with id js
    getID('transparent').classList.add('d-none'); // add the class (d-none) to html element with id transparent
    getID('end').classList.add('d-none'); // add the class (d-none) to html element with id end
    getID('category').innerHTML = 'JavaScript'; // write the text 'JavaScript' in to the html element with id category
    resetProgressBar(); // calls the restProgesBar() function (line 147)
}
// ************************ //

// check the category has been selected //
function checkCategory() {
    if (questions.length == 0) { // if the length of questions same 0 ->
        alert('Bitte Kategorie auswählen'); // show alert 
    } else { // is the if command not true ->
        getID('welcome').classList.add('d-none'); // add the class (d-none) form html element with id welcome
        getID('quiz-card').classList.remove('d-none'); //remove the class (d-none) form html element with id quiz-card
        getID('all-questions').innerHTML = questions.length; // write the length of questions in to the html element with id all-questions
    }
}
// ************************ //

// show the Question //
function renderQuestion() {
    let ask = questions[currentQuestion]; // declared the variable ask with value questions[currentQuestion]
    getID('next').setAttribute('onclick', `nextQuestion(${currentQuestion})`); // set the attribute (onclick and nextQuestion(${currentQuestion})) in to the html element with id next
    getID('question-title').innerHTML = ask.question; // write the question form the array ask.question in the html element with id current-question
    getID('current-question').innerHTML = currentQuestion + 1; // the currentQuestion increased by one and write this result in the html element with id current-question
    getID('next').disabled = true; // disabled the butten with id next
    getID('transparent').classList.add('d-none'); // add the class(d-none) to the html element with id transparent
    removeBackgroundColor(); // calls the removeBackgroundColor() function (line 23)
    for (let i = 0; i < 4; i++) { // declacred the i variable with value 0; is i less then 4; i is increased by one; the for loop runs until i is less then 4
        getID(`answer_${i}`).innerHTML = ask[`answer_${i}`]; // write the question form ask in to the html element with id answer_i (answer_1, answer_2 ...)
    }
}
// ************************ //

// show the next question //
function nextQuestion(i) {
    if (i == 3) { // is i same 3 ->
        getID('end').classList.remove('d-none'); // remove the class (d-none) form html element with id end
        getID('quiz-card').classList.add('d-none'); // add the class (d-none) to html element with id quiz-card
        getID('right-answer').innerHTML = rightAnswer; // write the value of rightAnswer in html element with id right-answer
        currentQuestion = 0; // variable currentQuestion gets the value 0
    } else { // is i not same 3 ->
        currentQuestion = i + 1; // variable currentQuestion increased by one
        renderQuestion(currentQuestion); // calls the function redenderQuestion() with value currentQuestion (line 91)
        progessbar(); // calls the progressbar() function (line 147)
    }
}
// ************************ //

// checks the correct answer //
function answer(selction) {
    if (selction.slice(-1) == questions[currentQuestion].right_answer) { // is the last sign form the selection same the right answer ->
        getID(`reply_${questions[currentQuestion].right_answer}`).style.backgroundColor = 'rgba(0, 128, 0, 0.2)'; // add the style background color to the html elemnt with id reply_(number of right answer) (right answer)
        getID('next').disabled = false; // activate the button with id next
        rightAnswer++;
    } else { // is not the last sign form the selection same of right answer ->
        getID(selction).style.backgroundColor = 'rgba(255, 0, 0, 0.2)'; // add the style background color to html element with id form selction (wrong answer)
        getID(`reply_${questions[currentQuestion].right_answer}`).style.backgroundColor = 'rgba(0, 128, 0, 0.2)'; // add the style background Color to html element with id replay_(number of right answer) (right answer)
        getID('next').disabled = false; // disabled the button with id next
    }
    getID('transparent').classList.remove('d-none'); // remove the class (d-none) form html element with id transparent
}
// ************************ //

// restart the Game // 
function restartQuiz() {
    getID('end').classList.add('d-none'); // add the class (d-none) to html element with id end
    getID('welcome').classList.remove('d-none'); // remove the class (d-none) form html element with id welcome 
    getID('category').innerHTML = ''; // write empty text in the html element with id category 
    questions = []; // empties the array questions 
    removeActive(); // calls the reomveActie() function (line 17)
    resetProgressBar(); // calls the resetProgessBar() function (line 30)
}
// ************************ //

// render the progessbar // 
function progessbar() {
    currentAnswer = currentQuestion + 1; // variable currentAnswer fill with value form currentQuestion an then increase one
    let sum = currentAnswer / questions.length * 100; // declared the variable sum. calculate the percentages
    getID('progress-bar').style = `width: ${sum}%;`; // add the style width with with the content form sum in to the html element with id progess-bar 
    getID('progress-bar').innerHTML = `${sum}%`; // write the value of sum in to the html element with id progress-bar
}
// ************************ //