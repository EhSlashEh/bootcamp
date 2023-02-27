function palindrome(str) {
    let cleaned = str.replace(/[^a-zA-Z0-9]/g, "");
    console.log("Clean: " + cleaned)

    let lowercase = cleaned.toLowerCase();
    console.log("Lower: " + lowercase);

    let reversed = lowercase.split("").reverse().join("");
    console.log("Reversed: " + reversed);

    return lowercase == reversed;
}