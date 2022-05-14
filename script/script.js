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
tiles.forEach((tile) => tile.addEventListener("click", playGame));

function playGame() {
  const userChoice = this.getAttribute("id");
  animateBtn(userChoice);
  const monChoice = getMonChoice();
  const winner = getWinner(userChoice, monChoice);
}

function getMonChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

function getWinner(userChoice, monChoice) {
  const x = choices.indexOf(userChoice);
  const y = choices.indexOf(monChoice);

  if (x == y) {
    return null; //Tie
  }

  if (mod(x - y, choices.length) < choices.length / 2) {
    return userChoice;
  } else {
    return monChoice;
  }
}

function mod(a, b) {
  const c = a % b;
  return c < 0 ? c + b : c;
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
