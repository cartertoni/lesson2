const readline = require('readline-sync');
const messages = require('./calculator_messages.json');

let prompt = message => readline.question(`=> ${message}\n`);

let language = prompt('What language would you like to use? (en/fr/es)? ')
  .toLowerCase()
  .trim();

console.log(messages[language].welcome);

let invalidNumber = number =>
  number.trimStart() === '' || Number.isNaN(Number(number));

let keepGoing = 'yes';

while (keepGoing === 'yes' || keepGoing === 'si' || keepGoing === 'oui') {
  let number1 = prompt("What's the first number?");

  while (invalidNumber(number1)) {
    console.log(messages[language].invalidNumber);
    number1 = prompt("What's the first number?");
  }

  let number2 = prompt("What's the second number?");

  while (invalidNumber(number2)) {
    console.log(messages[language].invalidNumber);
    number2 = prompt("What's the second number?");
  }

  let operation = prompt(
    'What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide'
  );

  while (!['1', '2', '3', '4'].includes(operation)) {
    operation = prompt('You must select 1, 2, 3, or 4');
  }

  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  console.log(`The result is: ${output}`);

  keepGoing = prompt(messages[language].continue).toLowerCase().trim();
}
