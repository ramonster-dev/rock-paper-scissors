//Game logic
const choices = ['sword', 'bow', 'magic'];
const userScore = document.getElementById('user-score');
const computerScore = document.getElementById('computer-score');
const result = document.getElementsByClassName('result')[0];
const userChoices = document.querySelectorAll('.user-choice');
userChoices.forEach(userChoice => userChoice.addEventListener('click', playGame));

function playGame() {
  const userChoice = this.textContent.toLowerCase();
  const computerChoice = getComputerChoice();
  const winner = selectWinner(userChoice, computerChoice);
  result.textContent = `The winner is ${winner}`;
}

function getComputerChoice() {
  let choiceIndex = Math.floor(Math.random() * 3);
  return choices[choiceIndex];
}

function selectWinner(userChoice, computerChoice) {
  const x = choices.indexOf(userChoice);
  const y = choices.indexOf(computerChoice);

  if (x == y) {
    return null;
  }

  if (mod(x - y, choices.length) < choices.length / 2) {
    userScore.textContent++;
    return userChoice;
  } else {
    computerScore.textContent++;
    return computerChoice;
  }
}

function mod(a, b) {
  const c = a % b;
  return c < 0 ? c + b : c;
}

function displayWinner(userChoice, computerChoice, winner) {
  console.log(`User choice: ${userChoice} : Computer choice: ${computerChoice}`);
  if (winner == null) {
    console.log('No one wins! The battle was a tie!');
  } else if (userChoice === winner) {
    console.log('You have bested this beast this time... Will you survive next time?');
  } else {
    console.log('You have been defeated and your inventory has been ransacked');
  }
}

//Toggle play button
$('.play-btn a').click(function(event) {
  event.preventDefault();
  $('#play-inactive').toggle();
  $('#play-active').toggle();
});
