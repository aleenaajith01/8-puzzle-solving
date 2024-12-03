//success banner
const gameModal = document.getElementById("suceess-challenge");
let playAgain = document.getElementById("play-again");
let sucessContent = document.getElementById("heading1");
let remainTime = document.getElementById("remain-time");

function successBanner() {
    
    gameModal.style.display = 'flex';
    const shuffledArrayCanvas = document.getElementById("gridShuffleCanvas");
    const shuffledArrayContext = shuffledArrayCanvas.getContext("2d");
    applyMoves(initialShuffledArray, movesLog, shuffledArrayCanvas, shuffledArrayContext);

    let stoppingTime = stopStopwatch();
    sucessContent.innerHTML = `You did it within ${stoppingTime}`; 

    let timeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));  
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    remainTime.textContent = `Time left ${minutes}:${seconds}`;
}

//failure banner
const failureModal = document.getElementById("failure-modal");
let playAgainbutton = document.getElementById("playagain-button");
let failureContent = document.getElementById("heading2");

function failureBanner() {
    failureModal.style.display ='flex';
}


//start Banner
let startBanner = document.getElementById("start-banner");
let stopWatch = document.getElementById("stopwatch");

let normalMode = document.getElementById("normal");
let challengeMode = document.getElementById("challenge");
let currentMode = null;


normalMode.addEventListener('click', () => {
    currentMode = "normal"; // Set the current mode to normal
    startBanner.style.display = "none";
    countDown.style.display = "none";
    stopCountdown();
    countdownEnabled = false;

});

challengeMode.addEventListener('click', () => {
    currentMode = "challenge"; 
    startBanner.style.display = "none";

});




