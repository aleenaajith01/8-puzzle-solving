let startTime; 
let stopwatchInterval; 
let pausedTime = 0; 
let stopwatchEnabled = true;

function startStopwatch() {
  if (!stopwatchInterval && stopwatchEnabled) {
      startTime = new Date().getTime() - pausedTime;
      stopwatchInterval = setInterval(updateStopwatch, 1000);
  }
}

function stopStopwatch() {
  if (stopwatchEnabled) {
      clearInterval(stopwatchInterval);
      pausedTime = new Date().getTime() - startTime;
      stopwatchInterval = null;
      return calculateTime(pausedTime);
  }
}

function resetStopwatch() {
  if (stopwatchEnabled) {
      stopStopwatch();
      pausedTime = 0;
      document.getElementById("stopwatch").innerHTML = "Duration: 00:00:00";
  } 
}


function updateStopwatch() {
  let currentTime = new Date().getTime();
  let elapsedTime = currentTime - startTime; 
  let displayTime = calculateTime(elapsedTime);
  document.getElementById("stopwatch").innerHTML = `Duration: ${displayTime}`;
}


let clickTimestamps = []; 
function getTimeStamp() {
  let currentTime = new Date().getTime();
  let elapsedTime = currentTime - startTime + pausedTime;
  return calculateTime(elapsedTime);
}


function calculateTime(elapsedTime) {
  let seconds = Math.floor(elapsedTime / 1000) % 60;
  let minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
  let hours = Math.floor(elapsedTime / 1000 / 60 / 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}


function pad(number) {
  return (number < 10 ? "0" : "") + number;
}

