// Wait for page to load
document.addEventListener("DOMContentLoaded", function () {

    function SetUpPage() {

        // Starting values
        const breakLength = document.getElementById("break-length");
        const sessionLength = document.getElementById("session-length");
        const clockLabel = document.getElementById("timer-label");
        const clockTimeDisplay = document.getElementById("time-left");
        let playing = false;
        // Time
        let clockTime = parseInt(sessionLength.textContent) * 60;
        let minutes;
        let seconds;
        let formattedTime;
        // Play icons
        let playIcon = document.getElementById("play-icon");
        let pauseIcon = document.getElementById("pause-icon");
        // Remember initial load state
        var originalDiv = document.getElementById('center-container').cloneNode(true);
        // Get all icons on the page
        let icons = document.getElementsByTagName("i");

        // Functions
        // Function for reseting the timer
        function resetTimer() {
            console.log("Reset");

            // Stop the timer if one
            if (typeof timerInterval === 'number') {
                clearInterval(timerInterval);
            }

            // Replace current div with starting div
            var currentDiv = document.getElementById('center-container');
            currentDiv.parentNode.replaceChild(originalDiv, currentDiv);

            // Reassign all buttons
            SetUpPage();
        }
        // Update session time
        function UpdateTimer() {
            minutes = Math.floor(clockTime / 60);
            seconds = clockTime % 60;
            formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            clockTimeDisplay.textContent = formattedTime;
        }
        // Countdown function
        function CountDown() {
            clockTime -= 1;
            console.log(clockTimeDisplay.textContent);
            UpdateTimer();
        }
        // Function for starting and stopping the timer
        function startStopTimer() {
            playing = !playing;

            if (playing) {
                console.log("Started");
                playIcon.style.display = "none";
                pauseIcon.style.display = "block";
                timerInterval = setInterval(CountDown, 1000);
            }
            else {
                console.log("Paused");
                playIcon.style.display = "block";
                pauseIcon.style.display = "none";
                clearInterval(timerInterval);
            }
        }
        // Clicksound
        function ClickSound(temp) {
            if (temp == 1) {
                var audio = new Audio('https://cdn.pixabay.com/audio/2022/10/30/audio_f5dbe8213e.mp3');
                audio.volume = 0.2;
                audio.play();
            }
            if (temp == 2) {
                var cantAudio = new Audio('https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1a/Ui_magic_immune.mp3/revision/latest?cb=20190923095351.mp3');
                cantAudio.play();
            }
        }

        // Loop through all icons and attach a click event listener to each one
        for (var i = 0; i < icons.length; i++) {
            icons[i].addEventListener("click", function () {

                // Do something when an icon is clicked

                // Get the parent element's id
                let parentID = this.parentElement.id;

                // Time Settings
                if (parentID == 'break-decrement') {
                    if (parseInt(breakLength.textContent) > 1) {
                        breakLength.textContent = parseInt(breakLength.textContent) - 1;
                        ClickSound(1);
                    }
                    else {
                        ClickSound(2);
                    }
                }
                if (parentID == 'break-increment') {
                    if (parseInt(breakLength.textContent) < 60) {
                        breakLength.textContent = parseInt(breakLength.textContent) + 1;
                        ClickSound(1);
                    }
                    else {
                        ClickSound(2);
                    }                }
                if (parentID == 'session-decrement') {
                    if (parseInt(sessionLength.textContent) > 1) {
                        sessionLength.textContent = parseInt(sessionLength.textContent) - 1;
                        if (!playing) {
                            clockTime = parseInt(sessionLength.textContent) * 60;
                            UpdateTimer()
                            ClickSound(1);
                        }
                        else {
                            ClickSound(2);
                        }                    }
                }
                if (parentID == 'session-increment') {
                    if (parseInt(sessionLength.textContent) < 60) {
                        sessionLength.textContent = parseInt(sessionLength.textContent) + 1;
                        if (!playing) {
                            clockTime = parseInt(sessionLength.textContent) * 60;
                            UpdateTimer()
                            ClickSound(1);
                        }
                        else {
                            ClickSound(2);
                        }
                    }
                    else {
                        ClickSound(2);
                    }

                }                

                // Play, stop, and reset Buttons
                if (parentID == 'start-stop') {
                    startStopTimer();
                }
                if (parentID == 'reset') {
                    resetTimer();
                }

            });
        }
    }

    SetUpPage();

});