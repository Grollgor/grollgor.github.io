// CONFIG
let UpdatesPerSecond = 4;

// SAVED STUFF
let hourObject = null;
let minutesObject = null;
let secondsObject = null;
let bIsPlaying = false;
let timerObject = null;
let startObject = null;

let miliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

let LastTime = 0;

function OnInit() {
    hourObject = document.getElementById("hours_input");
    minutesObject = document.getElementById("minutes_input");
    secondsObject = document.getElementById("seconds_input");
    
    startObject = document.getElementById("start");

    timerObject = document.getElementById("timerText");
    timerObject.style.display = "block";

    jswarningObj = document.getElementsByClassName("jswarning");
    jswarningObj[0].style.display = "none";

    setInterval(OnTick, 1000 / UpdatesPerSecond);
}

function NumberToTime(number) {
    if(number < 10) {
        return "0" + number;
    } else {
        return number;
    }
}

function SetTimerText() {
    if(miliseconds >= 1000) {
        seconds += parseInt(miliseconds / 1000);
        miliseconds = miliseconds % 1000;
    }
    if(seconds >= 60)
    {
        minutes += parseInt(seconds / 60);
        seconds = seconds % 60;
    }
    if(minutes >= 60) {
        hours += parseInt(minutes / 60);
        minutes = minutes % 60;
    }

    if(hours > 0) {
        timerObject.textContent = hours + ":" + NumberToTime(minutes) + ":" + NumberToTime(seconds);
    }
    else {
        timerObject.textContent = NumberToTime(minutes) + ":" + NumberToTime(seconds);
    }
}

function OnTick() {
    if(bIsPlaying === true) {
        let date = new Date();
        let CurrentTime = date.getTime()
        let Difference = CurrentTime - LastTime;
        LastTime = CurrentTime;
        miliseconds += Difference;
        SetTimerText();
    }
}

function ResetInput() {
    hourObject.value = 0;
    minutesObject.value = 0;
    secondsObject.value = 0;
}

function OnAddTime() {
    hours += parseInt(hourObject.value);
    minutes += parseInt(minutesObject.value);
    seconds += parseInt(secondsObject.value);
    ResetInput();
    SetTimerText();
}

function OnRemoveTime() {
    hours -= parseInt(hourObject.value);
    if(hours < 0) {
        hours = 0;
    }
    minutes -= parseInt(minutesObject.value);
    if(minutes < 0) {
        minutes = 0;
    }
    seconds -= parseInt(secondsObject.value);
    if(seconds < 0) {
        seconds = 0;
    }
    ResetInput();
    SetTimerText();
}

function OnSetTime() {
    hours = parseInt(hourObject.value);
    if(hours < 0) {
        hours = 0;
    }
    minutes = parseInt(minutesObject.value);
    if(minutes < 0) {
        minutes = 0;
    }
    seconds = parseInt(secondsObject.value);
    if(seconds < 0) {
        seconds = 0;
    }
    let date = new Date();
    LastTime = date.getTime();
    miliseconds = 0;
    ResetInput();
    SetTimerText();
}

function OnStartPause() {
    let date = new Date();
    LastTime = date.getTime();
    bIsPlaying = !bIsPlaying;
    startObject.textContent = bIsPlaying === true ? "pause" : "start";
}