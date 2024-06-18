const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const VALID_SHORTHANDS = ['r', 'p', 'sc', 'l', 'sp'];

let prompt = message => {
  return readline.question(`=> ${message}\n`);
};

let convertChoice = choice => {
  if (VALID_SHORTHANDS.includes(choice)) {
    switch (choice) {
      case 'r':
        return 'rock';
      case 'p':
        return 'paper';
      case 'sc':
        return 'scissors';
      case 'l':
        return 'lizard';
      case 'sp':
        return 'spock';
    }
  }
  return choice;
};

let checkPlayerWin = (choice, computerChoice) => {
  return (
    (choice === 'rock' && computerChoice === 'scissors') ||
    (choice === 'rock' && computerChoice === 'lizard') ||
    (choice === 'paper' && computerChoice === 'rock') ||
    (choice === 'paper' && computerChoice === 'spock') ||
    (choice === 'scissors' && computerChoice === 'paper') ||
    (choice === 'scissors' && computerChoice === 'lizard') ||
    (choice === 'lizard' && computerChoice === 'paper') ||
    (choice === 'lizard' && computerChoice === 'spock') ||
    (choice === 'spock' && computerChoice === 'rock') ||
    (choice === 'spock' && computerChoice === 'scissors')
  );
};

let checkComputerWin = (choice, computerChoice) => {
  return (
    (choice === 'rock' && computerChoice === 'paper') ||
    (choice === 'rock' && computerChoice === 'spock') ||
    (choice === 'paper' && computerChoice === 'lizard') ||
    (choice === 'paper' && computerChoice === 'scissors') ||
    (choice === 'scissors' && computerChoice === 'rock') ||
    (choice === 'scissors' && computerChoice === 'spock') ||
    (choice === 'lizard' && computerChoice === 'scissors') ||
    (choice === 'lizard' && computerChoice === 'rock') ||
    (choice === 'spock' && computerChoice === 'paper') ||
    (choice === 'spock' && computerChoice === 'lizard')
  );
};

let getPlayerChoice = message => {
  console.clear();
  let choice = prompt(message).trim().toLowerCase();

  choice = convertChoice(choice);

  while (!VALID_CHOICES.includes(choice)) {
    console.clear();
    choice = getPlayerChoice(
      `That's not a valid choice. Choose one: ${VALID_CHOICES.join(', ')}`
    );
  }

  return choice;
};

let displayWinner = (choice, computerChoice) => {
  if (checkPlayerWin(choice, computerChoice)) {
    console.log('You win!');
  } else if (checkComputerWin(choice, computerChoice)) {
    console.log('Computer wins!');
  } else {
    console.log("It's a tie!");
  }
};

while (true) {
  let playerChoice = getPlayerChoice(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  console.log(`You chose ${playerChoice}, computer chose ${computerChoice}`);

  displayWinner(playerChoice, computerChoice);

  let answer = prompt('Do you want to play again (y/n)?').toLowerCase();
  while (answer[0] !== 'y' && answer[0] !== 'n') {
    answer = prompt('Please enter "y" or "n".').toLowerCase();
  }
  if (answer[0] !== 'y') {
    console.clear();
    console.log('Thanks for playing!');
    break;
  }
}
