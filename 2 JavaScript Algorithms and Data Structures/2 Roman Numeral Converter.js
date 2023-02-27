function convertToRoman(num) {

    var tempNum = 0;
    var i = 0;

    while (i < num.length) {
        print(tempNum);

        if (num[i] == "I") {
            if (i < num.length - 1 & num[i + 1] == "V") {
                tempNum += 4;
                i = i + 1;
                console.log("IV");
            }
            else if((i < (num.length - 1)) & num[i + 1] == "X") {
                tempNum += 9;
                i = i + 1;
                console.log("IX");
            }
            else {
                tempNum += 1;
                console.log("I");
            }
        }
    }
}

convertToRoman(36);



