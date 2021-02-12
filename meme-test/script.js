const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const imageElement = document.getElementById('image-container')
const myList = document.getElementById('myList')


var order = 0;
var chaotic = 0;
var noob = 0;
var strategist = 0;
var currentEffect = 0;


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
  showQuestion(shuffledQuestions[currentQuestionIndex])
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
    var node = document.createElement("LI");   
    var node2 = document.createElement("LI");             
    var node3 = document.createElement("LI");             
    var node4 = document.createElement("LI");                       
    var textnodeThree = document.createTextNode("Order: " +order+"");
    var textnodeFour = document.createTextNode("Chaotic: " +chaotic+"");
    var textnodeOne = document.createTextNode("Noob: " +noob+"");         
    var textnodeTwo = document.createTextNode("Strategist: " +strategist+"");         
    node.appendChild(textnodeOne);      
    node2.appendChild(textnodeTwo);   
    node3.appendChild(textnodeThree);      
    node4.appendChild(textnodeFour);     
    myList.appendChild(node);
    myList.appendChild(node2);        
    myList.appendChild(node3);        
    myList.appendChild(node4); 
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