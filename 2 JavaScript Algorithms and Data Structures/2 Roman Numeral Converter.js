function convertToRoman(num) {
  console.log("Number given: " + num);

  let romanResult = "";

  /* Set up dictionary of Roman numbers  */
  const romanNumeral = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  /* Check each usable numeral  */
  for (let romanKey in romanNumeral) {

    /* While there is still value to add, use the biggest roman numeral  */
    while (num >= romanNumeral[romanKey]) {
      romanResult += romanKey;
      num -= romanNumeral[romanKey];
      console.log("Running result: " + romanResult);
      console.log("Value left: " + num);
    }
  }

  console.log("String giving: " + romanResult);
  return romanResult;
}