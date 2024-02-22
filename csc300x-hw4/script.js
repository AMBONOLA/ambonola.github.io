const imgArray = document.querySelectorAll('img');
let computerTurn = false;
let computerChoice = null;
let userChoice = null

imgArray.forEach(img => {
  if (img.parentElement.classList.contains('image-container')) {
    img.addEventListener('click', addRedBorder);
  }
})

function addRedBorder(event) {
  const img = event.currentTarget;
  img.style.border = "5px solid red";
  userChoice = img.dataset.value;
  // after a selection is made we can make it so other items can't be clicked

  imgArray.forEach(otherImg => {
    if (otherImg.parentElement.classList.contains('image-container')) {
      otherImg.removeEventListener('click', addRedBorder)
      otherImg.style.cursor = "auto"
    }
  })

  computerThrow()
}

function computerThrow() {

  if (!computerTurn) {
    computerTurn = true;
  }
  const compImg = document.querySelector('.computer-throw img')
  const throwOptions = Array.from(document.querySelectorAll('.image-container img'))
  const questionMark = "./resources/question-mark.PNG"

  compImg.style.border = "5px solid blue"

  let throwCounter = 0;
  const throwInterval = setInterval(() => {
    const randIndex = Math.floor(Math.random() * throwOptions.length)
    const selectedOption = throwOptions[randIndex].src
    compImg.src = selectedOption

    throwCounter++;
    if (throwCounter === 6) {
      clearInterval(throwInterval)
      compImg.src = selectedOption

      computerChoice = throwOptions[randIndex].dataset.value;

      determineWinner();
    }
  }, 200)
}

function determineWinner() {
  const resultsDiv = document.getElementById('results')

  if (userChoice === 'rock') {
    switch (computerChoice) {
      case 'rock':
        resultsDiv.textContent = "It's a Tie!"

        break;
      case 'paper':
        resultsDiv.textContent = "Computer Wins!"

        break;
      case 'scissors':
        resultsDiv.textContent = "You Won!"

        break;
      default:
        resultsDiv.textContent = "Error Occured"
        console.log('Error')
    }
  }

  if (userChoice === 'paper') {
    switch (computerChoice) {
      case 'rock':
        resultsDiv.textContent = "You Won!"

        break;
      case 'paper':
        resultsDiv.textContent = "It's a tie!"

        break;
      case 'scissors':
        resultsDiv.textContent = "Computer Wins!"

        break;
      default:
        resultsDiv.textContent = "Error Occured"
        console.log('Error')
    }
  }

  if (userChoice === 'scissors') {
    switch (computerChoice) {
      case 'rock':
        resultsDiv.textContent = "Computer Wins!"

        break;
      case 'paper':
        resultsDiv.textContent = "You won!"

        break;
      case 'scissors':
        resultsDiv.textContent = "It's a Tie!"

        break;
      default:
        resultsDiv.textContent = "Error Occured"
        console.log('Error')
    }
  }
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  resetButton.id = 'reset-button';
  resetButton.addEventListener('click', resetGame);
  resultsDiv.parentNode.appendChild(resetButton);
}

function resetGame() {
  const resetButton = document.getElementById('reset-button')


  imgArray.forEach(img => {
    img.style.border = "2px solid black"
    img.addEventListener('click', addRedBorder)
    img.style.cursor = "pointer"
  })
  const compImg = document.querySelector('.computer-throw img')
  compImg.src = "./resources/question-mark.PNG"
  computerTurn = false;
  userChoice = null;
  computerChoice = null;
  const resultsDiv = document.getElementById('results')
  resultsDiv.textContent = "";
  resetButton.parentNode.removeChild(resetButton)
}

