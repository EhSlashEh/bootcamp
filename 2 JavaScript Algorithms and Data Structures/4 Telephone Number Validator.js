function telephoneCheck(str) {
  // Check if valid way to enter number
  // First standardized number by replacing all numbers with 0
  var check = str.replace(/\d/g, 0);
  if (check == "000-000-0000" ||
      check == "(000)000-0000" ||
      check == "(000) 000-0000" ||
      check == "000 000 0000" ||
      check == "0000000000" ||
      check == "0 000 000 0000" ||
      check == "0 000-000-0000" ||
      check == "0 (000) 000-0000" ||
      check == "0(000)000-0000"
      ) {}
  else {
    return false;
  }
  
  // Remove characters that are not numbers
  str = str.replace(/\D/g, "");

  // If it has 10 numbers, it's good
  if (str.length == 10) {
    return true;
  }

  // If it has 11 numbers, make sure first number is 1 (one)
  else if (str.length == 11) {
    if (str[0] == 1){
      return true;
    }
    if (str[0] != 1) {
      return false;
    }
  }

  // It's bad otherwise
  else {
    return false;
  }
}

telephoneCheck("1(555)555-5555");