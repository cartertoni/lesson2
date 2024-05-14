let rlSync = require('readline-sync');

let maxNum = rlSync.question('What number would you like odds printed up to? ');

let num = 1;
while (num <= maxNum) {
  console.log(num);
  num += 2;
}
