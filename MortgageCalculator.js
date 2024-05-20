const rlSync = require('readline-sync');

const prompt = message => rlSync.question(`${message} \n`);

let loanAmount = prompt('What is the loan amount?');
let annualPercentageRate = parseFloat(
  prompt('What is the Annual Percentage Rate of this loan? Example: 5.85%')
);
let monthlyPercentageRate = annualPercentageRate / 100 / 12;

let loanYears = parseInt(prompt('How many years remain on this loan?'), 10);

let loanMonths = parseInt(prompt('How many months remain on this loan?'), 10);

let lengthOfLoan = loanYears * 12 + loanMonths;

let monthlyPayment =
  loanAmount *
  (monthlyPercentageRate /
    (1 - Math.pow(1 + monthlyPercentageRate, -lengthOfLoan)));

console.log(
  `You must make ${lengthOfLoan} monthly payments of $${monthlyPayment.toFixed(
    2
  )}`
);
