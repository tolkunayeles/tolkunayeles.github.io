// Create a function that gives a personalized greeting. 
//This function takes two parameters: name and owner.

// Use conditionals to return the proper message:

// case    return
// name equals owner    'Hello boss'
// otherwise    'Hello guest'
// function personalizedGreeting(name, owner) {
//     if (name === owner) {
//       return 'Hello boss';
//     } else {
//       return 'Hello guest';
//     }
//   };
// console.log(personalizedGreeting('John', 'John')); 
// console.log(personalizedGreeting('Jane', 'John')); 

// // For example: month 2 (February), is part of the first quarter; 
// // month 6 (June), is part of the second quarter; 
// // and month 11 (November), is part of the fourth quarter.

// function getQuarter(month) {
//     if (month >= 1 && month <= 3) {
//       return '1st Quarter';
//     } else if (month >= 4 && month <= 6) {
//       return '2nd Quarter';
//     } else if (month >= 7 && month <= 9) {
//       return '3rd Quarter';
//     } else if (month >= 10 && month <= 12) {
//       return '4th Quarter';
//     } else {
//       return 'Invalid month';
//     }
//   };
  
//   console.log(getQuarter(3));  
//   console.log(getQuarter(5));  
//   console.log(getQuarter(7)); 
//   console.log(getQuarter(10)); 
//   console.log(getQuarter(15));

  
  // function findMissingNumber(...numbers) {
  //   let sum = 0;
  // for (let i = 0; i <= length.arr; i++) {
  //   sum += i;
  // }
  // return sum;
  
  // let result = sum
  //   const sequenceSum = sequence.reduce((acc, num) => acc + num, 0);
    
  //   return totalSum - sequenceSum;
  // }
  
  // // Example usage:
  // console.log(findMissingNumber([0, 5, 1, 3, 2, 9, 7, 6, 4])); // Output: 8
  // console.log(findMissingNumber([9, 2, 4, 5, 7, 0, 8, 6, 1])); // Output: 3  

 const str = ""; 
  function accum(str) {
    return str
        .split('')
        .map((letter, i) => letter.toUpperCase() + letter.toLowerCase().repeat(i))
        .join('-');
}

// Test cases
console.log(accum("abcd"));    // Output: "A-Bb-Ccc-Dddd"
console.log(accum("RqaEzty")); // Output: "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
console.log(accum("cwAt"));    // Output: "C-Ww-Aaa-Tttt"