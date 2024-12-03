let timerInterval;
let endTime;
let duration = 60; 
let countDown = document.getElementById('count-Down');
let countdownStarted = false; 
let countdownEnabled = true;

function startCountdown() {
    if (!countdownEnabled || countdownStarted) return;
    countdownStarted = true;

    endTime = Date.now() + duration * 1000;

    timerInterval = setInterval(() => {
        let timeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
        const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const seconds = String(timeLeft % 60).padStart(2, '0');
        countDown.textContent = `Remaining Time: ${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 100);
}

function stopCountdown() {
    clearInterval(timerInterval);
    countdownStarted = false;
}

function endGame() {
    failureBanner();
}


function resetGame() {
    duration = 60;
    if (countdownEnabled) {
        countDown.textContent = 'Remaining: 01:00';
    } 
    countdownStarted = false;
}


playAgainbutton.addEventListener('click', () => {
    failureModal.style.display = 'none';
    arrayElementsShuffle();
    resetGame(); 
    countdownStarted = false;
    resetStopwatch();
});