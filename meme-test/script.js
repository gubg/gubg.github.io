const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const imageElement = document.getElementById('image-container')
const myList = document.getElementById('myList')
const progressBar = document.getElementById('progress-bar')
const progressBarTwo = document.getElementById('progress-bar-two')



var order = 0;
var chaotic = 0;
var noob = 0;
var strategist = 0;
var currentEffect = 0;
var chaoticOverall = 50;
var chaoticPercentage = 0;
var strategistOverall = 50;
var strategistPercentage = 0;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    button.dataset.effect = answer.effect
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
  question.sources.forEach(source => {
    var img = document.createElement('img')
    img.src = source.meme
    img.style.width = "350px"
    imageElement.appendChild(img)
  })

}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
  while (imageElement.firstChild) {
    imageElement.removeChild(imageElement.firstChild)
  }
  while (myList.firstChild) {
    myList.removeChild(myList.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  const effect = selectedButton.dataset.effect
  setStatusClass(document.body, correct)
  currentEffect = effect
  do_effect()
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  }) 
    progressBar.value = chaoticOverall;
    progressBarTwo.value = strategistOverall;
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {               
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function do_effect() {
  if (currentEffect ==1){noob++}
  if (currentEffect ==2){strategist++}
  if (currentEffect ==3){order++}
  if (currentEffect ==4){chaotic++}
  if (chaotic!=0 || order !=0){
  chaoticPercentage = 100.0/(chaotic+order)
  chaoticOverall = chaotic*chaoticPercentage}
  if (strategist!=0 || noob !=0){
  strategistPercentage = 100.0/(strategist+noob)
  strategistOverall = strategist*strategistPercentage}
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which meme is better?',
    answers: [
      { text: 'Left', correct: false, effect: 1 },
      { text: 'Right', correct: true, effect: 2 }
    ],
    sources: [
      { meme: "images/strategy/1/luck.jpg"},
      { meme: "images/strategy/1/win.png"},
    ],
  },
  {
    question: 'Which meme is better?',
    answers: [
      { text: 'Left', correct: false, effect: 1 },
      { text: 'Right', correct: true, effect: 2 }
    ],
    sources: [
      { meme: "images/strategy/2/sloth.jpg"},
      { meme: "images/strategy/2/catan.jpg"},
    ]
  },
  {
    question: 'Which meme is better?',
    answers: [
      { text: 'Left', correct: false, effect: 3 },
      { text: 'Right', correct: true, effect: 4 }
    ],
    sources: [
      { meme: "images/chaos/1/mess.jpg"},
      { meme: "images/chaos/1/snacks.jpg"},
    ]
  },
  {
    question: 'Which meme is better?',
    answers: [
      { text: 'Left', correct: false, effect: 3 },
      { text: 'Right', correct: true, effect: 4 }
    ],
    sources: [
      { meme: "images/chaos/2/rulebook.jpg"},
      { meme: "images/chaos/2/default.jpg"},
    ]
  }
]