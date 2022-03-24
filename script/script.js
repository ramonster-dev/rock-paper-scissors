const choices = ['sword', 'bow', 'magic'];
const userChoices = document.querySelectorAll('.user-choice');
userChoices.forEach(userChoice => userChoice.addEventListener('click', playGame));

function playGame() {
  const userChoice = this.textContent;
  const computerChoice = getComputerChoice();
  const winner = selectWinner(userChoice, computerChoice);
  console.log(`The winner is ${winner}`);
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
    return userChoice;
  } else {
    return computerChoice;
  }
}

function mod(a, b) {
  const c = a % b;
  return c < 0 ? c + b : c;
}
