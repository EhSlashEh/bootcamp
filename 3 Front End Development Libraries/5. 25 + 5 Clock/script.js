"use strict";

// Wait for page to load
document.addEventListener("DOMContentLoaded", function () {

    function SetUpPage() {

        // Starting values
        const breakLength = document.getElementById("break-length");
        const sessionLength = document.getElementById("session-length");
        const clockLabel = document.getElementById("timer-label");
        const clockTimeDisplay = document.getElementById("time-left");
        const playIcon = document.getElementById("play-icon");
        const pauseIcon = document.getElementById("pause-icon");
        const icons = document.querySelectorAll("i");
        const originalDiv = document.querySelector("#center-container").cloneNode(true);

        // Time
        let clockTime = parseInt(sessionLength.textContent) * 60;
        let playing = false;
        let timerInterval;

        // Functions
        function resetTimer() {
            // Stop the timer if one
            if (typeof timerInterval === 'number') {
                clearInterval(timerInterval);
            }

            // Replace current div with starting div
            const currentDiv = document.querySelector("#center-container");
            currentDiv.parentNode.replaceChild(originalDiv, currentDiv);

            // Reassign all buttons
            SetUpPage();
        }

        // Update session time
        function UpdateTime() {
            const minutes = Math.floor(clockTime / 60);
            const seconds = clockTime % 60;
            const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            clockTimeDisplay.textContent = formattedTime;
        }

        // Countdown function
        function CountDownTime() {
            clockTime -= 1;
            UpdateTime();
            if (clockTime === 0) {
                clearInterval(timerInterval);
                ClickSound(3);
                if (clockLabel.textContent === "Session") {
                    clockLabel.textContent = "Break";
                    clockTime = parseInt(breakLength.textContent) * 60;
                } else {
                    clockLabel.textContent = "Session";
                    clockTime = parseInt(sessionLength.textContent) * 60;
                }
                UpdateTime();
                playing = true;
                startStopTimer();
            }
        }

        // start Session
        function startSessionTime() {
            clockLabel.textContent = "Session";
            clockTime = parseInt(sessionLength.textContent) * 60;
            UpdateTime();
            playing = true;
            startStopTimer();
        }

        // Break timer
        function startBreakTime() {
            clockLabel.textContent = "Break";
            clockTime = parseInt(breakLength.textContent) * 60;
            UpdateTime();
            playing = true;
            startStopTimer();
        }

        // Function for starting and stopping the timer
        function startStopTimer() {
            if (!timerInterval) {
                timerInterval = setInterval(CountDownTime, 1000);
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';

            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';

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
            if (temp == 3) {
                var alarmAudio = new Audio('https://static.wikia.nocookie.net/leagueoflegends/images/9/92/Mordekaiser_DarkStar_R_Hit_SFX.ogg/revision/latest?cb=20221120144840');
                alarmAudio.play();
            }
            if (temp == 4) {
                var breakEndAudio = new Audio('https://static.wikia.nocookie.net/leagueoflegends/images/d/d0/Mordekaiser_Original_Kill_0.ogg/revision/latest?cb=20200501192707');
                breakEndAudio.play();
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
                            UpdateTime()
                            ClickSound(1);
                        }
                    }
                    else {
                        ClickSound(2);
                    }

                }
                if (parentID == 'session-increment') {
                    if (parseInt(sessionLength.textContent) < 60) {
                        sessionLength.textContent = parseInt(sessionLength.textContent) + 1;
                        if (!playing) {
                            clockTime = parseInt(sessionLength.textContent) * 60;
                            UpdateTime()
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