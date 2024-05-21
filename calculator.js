let readline = require('readline-sync');
let messages = require('./calculator_messages.json');

let prompt = message => readline.question(`=> ${message}\n`);

let language = '';

let invalidLanguage = language => {
  if (!(language === 'en' || language === 'fr' || language === 'es')) {
    console.log('Please select a valid language.');
    return true;
  }
  return false;
};

while (invalidLanguage(language)) {
  language = prompt('What language would you like to use? (en/fr/es)? ')
    .toLowerCase()
    .trim();
}

let invalidNumber = number =>
  number.trimStart() === '' || Number.isNaN(Number(number));

let keepGoing = 'yes';

while (keepGoing === 'yes' || keepGoing === 'si' || keepGoing === 'oui') {
  console.clear();
  console.log(messages[language].welcome);
  let number1 = prompt(messages[language].firstNumber);

  while (invalidNumber(number1)) {
    console.log(messages[language].invalidNumber);
    number1 = prompt(messages[language].firstNumber);
  }

  let number2 = prompt(messages[language].secondNumber);

  while (invalidNumber(number2)) {
    console.log(messages[language].invalidNumber);
    number2 = prompt(messages[language].secondNumber);
  }

  let operation = prompt(messages[language].operation);

  while (!['1', '2', '3', '4'].includes(operation)) {
    operation = prompt(messages[language].operatorError);
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
      if (Number(number2) === 0) {
        output = "I don't think you can do that.";
      } else {
        output = Number(number1) / Number(number2);
      }
      break;
  }

  console.log(`${messages[language].result}: ${output}`);

  keepGoing = prompt(messages[language].continue).toLowerCase().trim();
}
