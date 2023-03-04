function rot13(str) {
  console.log("Given string: " + str)
  // Convert the string to an array
  let myArray = str.split("");
  
  // Convert array of strings into array of numbers
  myArray = myArray.map(function(char) {return char.charCodeAt(0) -65;});

  // Add 13 to each number, but only if it is A-Z
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i] >= 0 & myArray[i] <= 65) {
    myArray[i] += 13;
    }
    // If past Z, subtract 26
    if (myArray[i] >= 26) {
      myArray[i] -= 26;
    }
  } 
  
  // Convert array of numbers into array of strings
  myArray = myArray.map(function(num) {return String.fromCharCode(num + 65);});

  // Convert the array back to a string
  str = myArray.join("");         
  
  // Return it
  console.log("Returned string: " + str);
  return str;
}

rot13("SERR PBQR PNZC");