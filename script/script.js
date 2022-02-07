/* Assignment
 * 1. Start a new Git repo for your project (done)
 * 2. Create a blank HTML document with a script tag (done)
 * 3. Begin with a function called computerPlay that will randomly return either 'Rock', 'Paper' or
 *    'Scissors'
 * 4. Write a fucntion that plays a single round of Rock Paper Scissors. The function should take
 *    two parameters - the playerSelection and computerSelection - and then return a string that
 *    declares the  winner of the round like so: "You lose! Paper beats Rock!"
 *    a. Make your function's playerSelection parameter case-insensitive
 * 5. Return the results of this funtion call, not console.log() them
 * 6. Write a new function called game() to play a 5 round game that keeps score and reports a
 *    winner or loser at the end
 *    a. Feel free to use loop to call playRound() function 5 times in a row
 *    b. Use console.log() to dispaly the results of each round and the winner at the end
 *    c. Use prompt() to get input from the user
 */

function computerPlay() {
  let options = ["rock", "paper", "scissors"];

  return options[Math.floor(Math.random() * options.length)];
}

function playerPlay() {
  return prompt("Rock, paper or scissors? Or press 'X' to exit.").toLowerCase();
}

function playRound(computerSelection, playerSelection) {
  return checkWinner(computerSelection, playerSelection);
}

function game() {
  let compScore = 0;
  let playScore = 0;
  let quit = false;

  for (let i = 0; i < 5; i++) {
    let computerSelection = computerPlay();
    let playerSelection = playerPlay();

    if (playerSelection === "x") {
      i = 5;
      quit = true;
    } else if (playerSelection != "rock" && playerSelection != "paper" && playerSelection != "scissors") {
      console.log("Please type in either: rock, paper or scissors");
      i--;
    } else {
      let outcome = playRound(computerSelection, playerSelection);

      if (outcome === "cwin") {
        compScore++;
        computerSelection = formatSelection(computerSelection);
        console.log(`Your selection: ${playerSelection}\n
                  You lose! ${computerSelection} beats ${playerSelection}!`);
      } else if (outcome === "pwin") {
        playScore++;
        playerSelection = formatSelection(playerSelection);
        console.log(`Your selection: ${playerSelection}\n
                  You win! ${playerSelection} beats ${computerSelection}!`);
      } else if (outcome === "draw") {
        playerSelection = formatSelection(playerSelection);
        console.log(`Your selection: ${playerSelection}\n
                  It's a draw!`);
      }
    }
  }
  countScore(compScore, playScore, quit);
}

function countScore(compScore, playScore, quit) {
  switch (true) {  
    case quit === true:
      console.log(`Thanks for playing! The score was ${playScore}-${compScore}`);
      break;
    case compScore > playScore:
      console.log(`Score: ${playScore}-${compScore}\nThe computer wins!`);
      break;
    case playScore > compScore:
      console.log(`Score: ${playScore}-${compScore}\nYou win!`);
      break;
    case compScore === playScore:
      console.log(`Score: ${playScore}-${compScore}\nYou tied with a computer!`);
  }
}

function checkWinner(computerSelection, playerSelection) {
  if (computerSelection === "rock" && playerSelection === "scissors") {
    return "cwin";
  } else if (computerSelection === "rock" && playerSelection === "paper") {
    return "pwin";
  } else if (computerSelection === "rock" && playerSelection === "rock") {
    return "draw";
  } else if (computerSelection === "scissors" && playerSelection === "paper") {
    return "cwin";
  } else if (computerSelection === "scissors" && playerSelection === "scissors") {
    return "null";
  } else if (computerSelection === "scissors" && playerSelection === "rock") {
    return "pwin";
  } else if (computerSelection === "paper" && playerSelection === "scissors") {
    return "pwin";
  } else if (computerSelection === "paper" && playerSelection === "paper") {
    return "draw";
  } else if (computerSelection === "paper" && playerSelection === "rock") {
    return "cwin";
  }
}

function formatSelection(selection) {
  return selection.replace(selection.charAt(0), selection.charAt(0).toUpperCase());
}
