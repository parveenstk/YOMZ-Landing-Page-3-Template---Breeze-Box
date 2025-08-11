// timer function
let seconds = 59;
let minutes = 59;
let hours = 23;

// Elements
const secs = document.getElementById('seconds-desktop');
const mins = document.getElementById('minutes-desktop');
const hrs = document.getElementById('hours-desktop');

const secs2 = document.getElementById('seconds-mobile');
const mins2 = document.getElementById('minutes-mobile');
const hrs2 = document.getElementById('hours-mobile');

document.addEventListener('DOMContentLoaded', function () {
    const timer = setInterval(() => {
        seconds--;

        // After showing 0, now adjust time
        if (seconds < 0) {
            seconds = 59;
            minutes--;

            if (minutes < 0) {
                minutes = 59;
                hours--;

                if (hours < 0) {
                    // Time’s up
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                    clearInterval(timer);
                }
            }
        }

        // console.log(`Timer: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);

        // desktop timer
        secs.innerText = String(seconds).padStart(2, '0');
        mins.innerText = String(minutes).padStart(2, '0');
        hrs.innerText = String(hours).padStart(2, '0');

        // mobile timer
        secs2.innerText = String(seconds).padStart(2, '0');
        mins2.innerText = String(minutes).padStart(2, '0');
        hrs2.innerText = String(hours).padStart(2, '0');
    }, 1000);
});
