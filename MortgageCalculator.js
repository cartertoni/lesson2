let messages = require('./MortgageCalculator_Messages.json');
let rlSync = require('readline-sync');

let prompt = message => {
  return rlSync.question(`=> ${message} \n`);
};

let invalidChoice = input => console.log(`Please enter a valid ${input}`);

let getLoanAmount = () => {
  let loanAmount;
  do {
    if (loanAmount !== undefined) {
      invalidChoice('loan amount');
    }
    loanAmount = parseFloat(prompt(messages.loanAmount).replace(/,/g, ''), 10);
  } while (!(loanAmount > 0));
  return loanAmount;
};

let getAnnualPercentageRate = () => {
  let annualPercentageRate;
  do {
    if (annualPercentageRate !== undefined) {
      invalidChoice('annual percentage rate');
    }
    annualPercentageRate = parseFloat(prompt(messages.annualPercentageRate));
  } while (!(annualPercentageRate >= 0));
  return annualPercentageRate;
};

let getLoanLength = () => {
  let loanMonths, loanYears;
  do {
    if (loanYears !== undefined) {
      invalidChoice('number of years');
    }
    loanYears = parseInt(prompt(messages.loanYears), 10);
  } while (!(loanYears >= 0));

  do {
    if (loanMonths !== undefined) {
      invalidChoice('number of months');
    }
    loanMonths = parseInt(prompt(messages.loanMonths), 10);
  } while (!(loanMonths >= 0 && loanMonths <= 11));

  return { years: loanYears, months: loanMonths };
};

let calculateLoan = (amount, annualPercentageRate, loanYears, loanMonths) => {
  let monthlyPercentageRate = annualPercentageRate / 100 / 12;
  let lengthOfLoan = (loanYears * 12) + loanMonths;
  let monthlyPayment;

  if (!lengthOfLoan) return console.log(`You must immediately pay $${amount}.`);

  if (monthlyPercentageRate !== 0) {
    monthlyPayment =
      amount *
      (monthlyPercentageRate /
        (1 - Math.pow(1 + monthlyPercentageRate, -lengthOfLoan)));
  } else {
    monthlyPayment = amount / lengthOfLoan;
  }
  console.clear();
  return console.log(
    `To repay the $${amount} loan at ${annualPercentageRate}%, you must make ${lengthOfLoan} monthly ${
      lengthOfLoan === 1 ? 'payment' : 'payments'
    } of $${monthlyPayment.toFixed(2)}`
  );
};

let calculateAgain = () => {
  let userInput;
  do {
    if (userInput !== undefined) {
      invalidChoice('choice: Yes/No');
    }
    userInput = prompt('Would you like to do another loan calculation? Yes/No')
      .toLowerCase()
      .trim();
  } while (!(userInput === 'yes' || userInput === 'no'));
  if (userInput === 'yes') return true;
  else return false;
};

let runCalculator = () => {
  console.clear();
  console.log(messages.welcome);
  let loanAmount = getLoanAmount();
  let annualPercentageRate = getAnnualPercentageRate();
  let loanLength = getLoanLength();
  return calculateLoan(
    loanAmount,
    annualPercentageRate,
    loanLength.years,
    loanLength.months
  );
};

do {
  runCalculator();
} while (calculateAgain());

console.log(messages.goodbye);
