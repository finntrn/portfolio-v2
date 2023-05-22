let positionX = 0;
const gameField = document.querySelector('.game_field');
const ratChar = document.querySelector('.rat_idle');
let isMovingRight = false;
let isMovingLeft = false;
let isDead = false

let keyController = {};

const levelDoor = document.querySelector('.door');

const healthBar = document.querySelector('.healthbar');
const healthBarIcon = document.querySelector('.rat_icon');

document.addEventListener('keydown', (e) => {
    keyController[e.key] = true;
    // console.log(keyController);
    if (keyController['ArrowLeft'] == true) {
        if (isMovingLeft === false) {
            moveRatLeft();
            moveLeft();
            gameControllerLvl1();
        }

        isMovingLeft = true;
        leftButtonIcon.src = './images/icons/arrowleft_icon_pressed.png';
    }
    if (keyController['ArrowRight'] == true) {
        if (isMovingRight === false) {
            moveRatRight();
            moveRight();
            gameControllerLvl1();
        }

        isMovingRight = true;
        rightButtonIcon.src = './images/icons/arrowright_icon_pressed.png';
    }
    if (keyController['ArrowUp']) {
        jumpRat();
        upButtonIcon.src = './images/icons/arrowup_icon_pressed.png';
    }
    if (keyController['ArrowDown']) {
        downButtonIcon.src = './images/icons/arrowdown_icon_pressed.png';
    }
    if (keyController['p']) {
        console.log(gameField.style.left);
    }
    if (keyController[' ']) {
        spacebarButton.src = "./images/icons/spacebar_icon_pressed.png";
    }
});

document.addEventListener('keyup', (e) => {
    delete keyController[e.key];

    if (e.key === 'ArrowLeft') {
        stopMoving();
        leftButtonIcon.src = './images/icons/arrowleft_icon.png';
    }
    if (e.key === 'ArrowRight') {
        stopMoving();
        rightButtonIcon.src = './images/icons/arrowright_icon.png';
    }
    if (e.key === "ArrowUp") {
        upButtonIcon.src = './images/icons/arrowup_icon.png';
    }
    if (e.key === "ArrowDown") {
        downButtonIcon.src = './images/icons/arrowdown_icon.png';
    }
    if (e.key === ' ') {
        spacebarButton.src = "./images/icons/spacebar_icon.png";
    }
});

// FUNCTION LIJST

let moveInterval = null;
const speed = 25;

const upButtonIcon = document.querySelector('.button-up');
const leftButtonIcon = document.querySelector('.button-left');
const downButtonIcon = document.querySelector('.button-down');
const rightButtonIcon = document.querySelector('.button-right');
const spacebarButton = document.querySelector(".spacebar_butt");

function moveLeft() {
    clearInterval(moveInterval);

    moveInterval = setInterval(function () {
        positionX += speed;
        gameField.style.left = positionX + "px";
    }, 50);
}

function moveRight() {
    clearInterval(moveInterval);

    moveInterval = setInterval(function () {
        positionX -= speed;
        gameField.style.left = positionX + "px";
    }, 50);
}

function stopMoving() {
    clearInterval(moveInterval);

    runningAudio.pause();


    isMovingLeft = false;
    isMovingRight = false;
    ratChar.style.left = '46%';
    ratChar.src = './images/ratChar/rat_char_idle.gif'
    healthBarIcon.src ='./images/icons/rat_icon.png'
}

function moveRatLeft() {
    ratChar.style.left = '43%';
    ratChar.src = './images/ratChar/rat_char_running.gif';
    ratChar.style.scale = '-1 1';
    healthBarIcon.src = './images/icons/rat_running_icon.gif';
    healthBarIcon.style.scale = '-1 1'

    runningAudio.play();
    audio.loop = 'loop';
}

function moveRatRight() {
    ratChar.style.left = '43%';
    ratChar.src = './images/ratChar/rat_char_running.gif';
    ratChar.style.scale = '1 1';
    healthBarIcon.src = './images/icons/rat_running_icon.gif';
    healthBarIcon.style.scale = '1 1'

    runningAudio.play();
    audio.loop = 'loop';
}

let isJumping = false

function jumpRat() {

    if (!isJumping) {
        isJumping = true

        ratChar.src = './images/ratChar/rat_jump.gif';
        ratChar.classList.add('rat_jump');

        runningAudio.pause();

        setTimeout(function () {
            isJumping = false
            ratChar.classList.remove('rat_jump');
            if (isMovingLeft || isMovingRight) {
                ratChar.src = './images/ratChar/rat_char_running.gif';
            } else {
                ratChar.src = './images/ratChar/rat_char_idle.gif';
            }
            runningAudio.play();
        }, 800)
    }
}

function gameControllerLvl1() {
    controllerInterval = setInterval(() => {

        const playerPos = gameField.style.left.split('px')[0]

        // Map edge
        if (playerPos == 650) {
            positionX = 625;
        }

        if (playerPos == -4800) {
            positionX = -4775;
        }

        // Hole
        if (!isJumping) {
            if (playerPos <= -3425 && playerPos >= -3525 && !isDead) {
                ratFall();
            }
        }

        // Door
        if (playerPos <= -4125 && playerPos >= -4200) {
            document.addEventListener('keydown', (e) => {
                keyController[e.key] = true;
                if (keyController['ArrowDown']) {
                    openDoor();
                }
            })
        }
    }, 50);
}

let deathAudioSound = false;

function ratFall() {
    isDead = true
    ratChar.classList.add('rat_fall');
    healthBarIcon.src = './images/icons/rat_icon_dead.png';
    healthBar.style.background = "conic-gradient(rgb(169, 0, 0) 0%,rgba(122, 122, 122, 0) 0%)";
    healthBarText.textContent = "HP 0/100";

    if (!deathAudioSound) {
        deathAudioSound = true;
        deathAudio.play();
        deathAudio.volume = 0.05;
    }

    setTimeout(function () {
        isDead = false;
        ratChar.classList.remove('rat_fall');
        resetPosition();
        health = 100;
    }, 2000)

}

function resetPosition() {
    gameField.style.left = 0;
    positionX = 0;
    healthBarIcon.src = './images/icons/rat_icon.png';
    healthBar.style.background = "conic-gradient(rgb(169, 0, 0) " + health + "%,rgba(122, 122, 122, 0) 0%)";
}

function openDoor() {
    levelDoor.src = './images/background/door_open.png'
    doorSound.play();
    doorSound.volume = 0.1;
    ratChar.classList.add('rat_enter');
    setTimeout( () => {
        window.location = './level2.html';
    }, 3000)
    setTimeout( () => {
        ratChar.classList.remove('rat_enter');
    }, 10000)
}

function getPos() {
    console.log(gameField.style.left);
    document.querySelector('p').textContent = gameField.style.left;
}


// Audio enzo

const jumpSound = new Audio('audio/jump_effect.mp3');
const doorSound = new Audio('audio/door_opening.mp3');
const trapDeathAudio = new Audio('audio/trap_death_sound.mp3');
const hurtAudio = new Audio('audio/rat_hurt_audio.mp3');
const attackAudio = new Audio('audio/wood_sound.mp3');
const deathAudio = new Audio('audio/rat_death_sound.mp3');
const runningAudio = new Audio('audio/rat_running.mp3');
const audioButton = document.querySelector(".audio_butt");
const audio = new Audio('audio/ambient_1.mp3');
let audioIsPlaying = false;
audioButton.addEventListener('click', playAudio)

window.addEventListener('load', playAudio)

function playAudio() {

    if (!audioIsPlaying) {
        audio.loop = 'loop';
        audio.volume = 0.02;
        audioIsPlaying = true;
        audioButton.src = "./images/icons/audio_on.png";
        jumpSound.muted = false;
        doorSound.muted = false;
        hurtAudio.muted = false;
        attackAudio.muted = false;
        deathAudio.muted = false;
        runningAudio.muted = false;
        audioButton.muted = false;
        audio.muted = false;
    } else {
        audioIsPlaying = false;
        audioButton.src = "./images/icons/audio_off.png";
        jumpSound.muted = true;
        doorSound.muted = true;
        hurtAudio.muted = true;
        attackAudio.muted = true;
        deathAudio.muted = true;
        runningAudio.muted = true;
        audioButton.muted = true;
        audio.muted = true;
    }
}