// Wait for page to load
document.addEventListener("DOMContentLoaded", function () {

    // Starting value
    const breakLength = document.getElementById("break-label");
    const sessionLength = document.getElementById("session-label");
    const clockLabel = document.getElementById("timer-label");
    const clockTime = document.getElementById("time-left");

    // Get all icons on the page

    let icons = document.getElementsByTagName("i");

    // Loop through all icons and attach a click event listener to each one
    for (var i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", function () {
            // Do something when an icon is clicked
            console.log("Icon clicked!");
        });
    }

    /*
    buttons.addEventListener("click",
        function (event) {
            const button = event.target;
            const buttonId = button.id;

            if (button.id == "break-decrement") {
                console.log("nice");
            }
        }
    );
    */

});