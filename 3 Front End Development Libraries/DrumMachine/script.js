// Volume control
var volumeRange = document.getElementById("volume-range");

if (volumeRange) {
    volumeRange.addEventListener("input", function () {
        var volumeValue = this.value;
        console.log(volumeValue);
    });
}

// Sick beats function
function playSound(letter) {
    console.log("Received: " + letter);

    var audio = document.getElementById(letter);
    var soundLevel = document.getElementById("volume-range");

    // sound level
    console.log(soundLevel.value);
    audio.volume = soundLevel.value / 100;
    audio.play();

    // Press button effect
    var parentDiv = audio.parentNode;
    parentDiv.style.backgroundColor = "red";
    parentDiv.style.boxShadow = "0 0 4px rgba(0,0,0,0.4)";
    setTimeout(function () {
        parentDiv.style.backgroundColor = "";
        parentDiv.style.boxShadow = "";
    }, 200);

    // Tell user what key was pressed
    var keyDisplay = document.getElementById("key-display");
    var soundName = parentDiv.getAttribute("id").replace(/-/g, " ");
    keyDisplay.innerHTML = `${soundName}`;

}

// Keyboard works too
document.addEventListener("keydown", function (event) {
    var key = event.key.toUpperCase();
    playSound(key);
});
