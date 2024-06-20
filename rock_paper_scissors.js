const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const VALID_SHORTHANDS = ['r', 'p', 'sc', 'l', 'sp'];

let score = { player: 0, computer: 0 };

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

let determineGameWinner = (playerChoice, computerChoice) => {
  if (checkPlayerWin(playerChoice, computerChoice)) return 'player';
  if (checkComputerWin(playerChoice, computerChoice)) return 'computer';
  else return 'tie';
};

let calculateScore = (winner, score) => {
  if (winner === 'player') {
    return { player: score.player + 1, computer: score.computer };
  } else if (winner === 'computer') {
    return { player: score.player, computer: score.computer + 1 };
  } else {
    return score;
  }
};

let displayWinner = winner => {
  if (winner === 'player') {
    console.log('You win!');
  } else if (winner === 'computer') {
    console.log('Computer wins!');
  } else {
    console.log("It's a tie!");
  }
};

let displayScore = score => {
  console.log(`\nPlayer: ${score.player}\nComputer: ${score.computer}\n`);
};

let determineMatchWinner = score => {
  if (score.player === 3 || score.computer === 3) {
    console.log(
      `The match has ended. ${score.player === 3 ? 'You' : 'Computer'} won!\n`
    );
    return true;
  } else return false;
};

let resetGame = () => {
  console.clear();
  score = { player: 0, computer: 0 };
};

console.clear();

while (true) {
  while (!determineMatchWinner(score)) {
    let playerChoice = getPlayerChoice(
      `Choose one: ${VALID_CHOICES.join(', ')}`
    );
    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    console.clear();
    console.log(
      `You chose ${playerChoice}, computer chose ${computerChoice}\n`
    );

    let winner = determineGameWinner(playerChoice, computerChoice);
    displayWinner(winner);
    score = calculateScore(winner, score);
    displayScore(score);
  }

  let answer = prompt('Do you want to play again (y/n)?').toLowerCase();
  while (answer[0] !== 'y' && answer[0] !== 'n') {
    console.clear();
    answer = prompt(
      'Invalid selection.\nDo you want to play again? Please enter "y" or "n".'
    ).toLowerCase();
  }
  if (answer[0] !== 'y') {
    console.clear();
    console.log('Thanks for playing. Goodbye!');
    break;
  } else resetGame();
}
