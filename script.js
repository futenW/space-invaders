var canvas = document.getElementById("canvas");
var player = document.getElementById("player");
let score = document.getElementById("score");
let lives = document.getElementById("lives");

let positionLeft = 0;
let currentLives = 10;
let currentScore = 0;

let currentLasers = [];
let currentAliens = [];
var alienList = ["url(./alien1.png)", "url(./alien2.png)", "url(./alien3.png)", "url(./alien4.png)", "url(./alien5.png)"];

function move(e) {
    if (e.keyCode == 32) {
        startScreen.remove();
        score.innerHTML = "Score: 0";
        lives.innerHTML = "Lives: " + currentLives;
        setInterval(dropAlien, 1000);
        setInterval(alienShot, 10);
        setInterval(alienBreached, 500);
    }

    // moving left and right
    if (e.keyCode == 65) {
        positionLeft -= 100;
        if (positionLeft <= -1)
            positionLeft += 100;
        player.style.left = positionLeft + "px";
    }
    if (e.keyCode == 68) {
        positionLeft += 100;
        if (positionLeft >= 1400)
            positionLeft -= 100;
        player.style.left = positionLeft + "px";
    }

    // shooting lasers
    if (e.keyCode == 83) {
        var laser = document.createElement("div");
        laser.classList.add("laser");
        canvas.appendChild(laser);
        laser.style.left = positionLeft + 47 + "px";
        currentLasers.push(laser);
        setTimeout(function() {laser.remove();}, 1000);
    }
}

function dropAlien() {
    var alien = document.createElement("div");
    alien.classList.add("alien");
    canvas.appendChild(alien);
    alien.style.backgroundImage = alienList[(Math.floor(Math.random() * 5))];
    alien.style.left = Math.floor(Math.random() * 14) * 100 + "px";
    currentAliens.push(alien);
    setTimeout(function() {alien.remove();}, 5500);
}

function alienBreached() {
    for (var i = 0 ; i < currentAliens.length; i++) {
        let alienY = parseInt(window.getComputedStyle(currentAliens[i]).getPropertyValue("top"));
        if (alienY >= 660) {
            currentLives--;
            lives.innerHTML = "Lives: " + currentLives;
            if (currentLives == 0) {
                setTimeout(function() {alert("You lost");}, 100);
            }
        }
    }
}

function alienShot() {
    for (let i = 0; i < currentAliens.length; i++) {
        let alienX = parseInt(window.getComputedStyle(currentAliens[i]).getPropertyValue("left"));
        let alienY = parseInt(window.getComputedStyle(currentAliens[i]).getPropertyValue("top"));
        for (let j = 0; j < currentLasers.length; j++) {
            let laserX = parseInt(window.getComputedStyle(currentLasers[j]).getPropertyValue("left"));
            let laserY = parseInt(window.getComputedStyle(currentLasers[j]).getPropertyValue("top"));
            if ((laserX > alienX && laserX < alienX + 100 && laserY > alienY && laserY < alienY + 100) ||
                (laserX + 15 > alienX && laserX + 15 < alienX + 100 && laserY > alienY && laserY < alienY + 100) ||
                (laserX > alienX && laserX < alienX + 100 && laserY + 15 > alienY && laserY + 15 < alienY + 100) ||
                (laserX + 15 > alienX && laserX + 15 < alienX + 100 && laserY + 15 > alienY && laserY + 15 < alienY + 100)) {
                currentAliens[i].remove();
                currentLasers[j].remove();
                currentScore++
                score.innerHTML = "Score: " + currentScore;
            }
        }
    }
}

document.onkeydown = move;