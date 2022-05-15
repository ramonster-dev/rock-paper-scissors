//-----------------------------Home--------------------------------------------
//Home screen audio
$(document).ready(function () {
  $("#home").get(0).play();
});

//Toggle play button
$(".play-btn a").click(function (event) {
  const audio = document.querySelector("#click-play");
  if (!audio) return;

  event.preventDefault();
  $("#play-inactive").toggle();
  $("#play-active").toggle();
  audio.currentTime = 0;
  audio.play();
  window.location.href = "game.html";
});

//---------------------------GAME---------------------------------------------
//Adding functionality to attack tiles
const tiles = document.querySelectorAll(".tile");
const choices = ["sword", "bow", "magic"];
const monsterFill = document.querySelector('.healthbar_fill');
const battleMsg = document.querySelector('.monster-choice p');
let monsterHp = 5;
let userHp = 5;
const maxHp = 5;
tiles.forEach((tile) => tile.addEventListener("click", playGame));

function playGame() {
  const userChoice = this.getAttribute("id");
  if (userChoice === 'run') {
    let prob = Math.random();
    if (prob > 0.7) {
      displayMessage('run', 'run-success');
      return;
    } else {
      displayMessage('run', 'run-fail');
      renderHealth('monster');
      checkHealth();
      return;
    }
  }

  animateBtn(userChoice);
  const monChoice = getMonChoice();
  const winner = getWinner(userChoice, monChoice);

  displayMessage(winner, userChoice, monChoice);
  renderHealth(winner);
  checkHealth(); //If health reaches 0, end game
}

function getMonChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

function getWinner(userChoice, monChoice) {
  if (userChoice === 'run') {
    return 'monster';
  }

  const x = choices.indexOf(userChoice);
  const y = choices.indexOf(monChoice);

  if (x == y) {
    return null; //Tie
  }

  if (mod(x - y, choices.length) < choices.length / 2) {
    return 'monster';
  } else {
    return 'user';
  }
}

function mod(a, b) {
  const c = a % b;
  return c < 0 ? c + b : c;
}

function checkHealth() {
  if (monsterHp === 0 || userHp === 0) {
    endGame()
  } else {
    return;
  }
}

function endGame() {

  let p = document.createElement('p');

  if (userHp > 0) {
    $('.monster').toggle();
    $('.monster-dead').toggle();
    p.textContent = "Look like you have defeated Cakie! Would you like to play again?";
  } else {
    p.textContent = "Looks like you were beaten by a cake. That's kinda embarrassing... Play again?";
  }

  addRestartMessage(p);
}

function addRestartMessage(p) {
  const tileContainer = document.querySelector('.tile-container');
  let main = document.querySelector('main');
  let restartBtn = document.createElement("a");
  let restartBtnImg = document.createElement("img");
  let restartContainer = document.createElement("div");

  tileContainer.style.display = 'none';

  p.style.textAlign = 'center';
  p.style.fontSize = 2 + 'rem';
  restartBtn.setAttribute("href", "game.html"); 
  restartBtnImg.setAttribute("src", "assets/images/btn-play.svg");
  restartBtnImg.style.height = 4 + 'rem';
  restartBtn.appendChild(restartBtnImg);

  restartContainer.style.display = 'flex';
  restartContainer.style.flexDirection = 'column';
  restartContainer.style.justifyContent = 'center';
  restartContainer.style.alignItems = 'center';
  restartContainer.style.gap = 15 + 'px';
  restartContainer.style.paddingTop = 1.5 + 'rem';
  restartContainer.setAttribute("class", "restart");
  restartContainer.appendChild(p);
  restartContainer.appendChild(restartBtn);

  main.appendChild(restartContainer);
}

function displayMessage(winner, userChoice, monChoice) {
  if (winner === 'user') {
    battleMsg.textContent = `You have dealt a decisive blow with your ${userChoice}. Cakie regrets using ${monChoice}.`;
  } else if (winner === 'monster') {
    battleMsg.textContent = `Cakie cackles as it destroys your ${userChoice} with its ${monChoice}.`; 
  } else if (winner === 'run' && userChoice === 'run-success') {
    battleMsg.textContent = 'Looks like you managed to run away safely and have skipped this turn.';
  } else if (winner === 'run' && userChoice === 'run-fail') {
    battleMsg.textContent = 'Even the gluttonous cake monster is faster than you and you have failed to run away. Take some damage.';
  } else {
    battleMsg.textContent = `Seems like you both were overthinking and played ${userChoice}.`;
  }
}

//Rendering healthbars
function renderHealth(winner) {
  if (winner === 'user') {
    monsterHp--;
    let percent = monsterHp / maxHp * 100;
    monsterFill.style.width = percent + "%";
  } else if (winner === 'monster') {
    userHp--;
    $(`.user-fill-${userHp}`).toggle();
  }
}

//Button animations
function animateBtn(userChoice) {
  let delayInMS = 350;
  $(`#${userChoice}-inactive`).toggle();
  $(`#${userChoice}-active`).toggle();

  //Insert a delay here to make button reset to position
  setTimeout(function () {
    $(`#${userChoice}-active`).toggle();
    $(`#${userChoice}-inactive`).toggle();
  }, delayInMS);
  console.log("button clicked");
}
