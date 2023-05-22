let positionX = 0;
const gameField = document.querySelector('.game_field');
const ratChar = document.querySelector('.rat_idle');
let isMovingRight = false;
let isMovingLeft = false;

let keyController = {};

const levelDoor = document.querySelector('.door');
const healthBar = document.querySelector('.healthbar');
const healthBarIcon = document.querySelector('.rat_icon');
const healthBarText = document.querySelector('.health');
const healthBarEnemy = document.querySelector('.enemy_health');
const healthBarEnemy2 = document.querySelector('.enemy_health2');
let health = 100;
let healthEnemy = 100;
let healthEnemy2 = 100;



// Event listener en key logger

document.addEventListener('keydown', (e) => {
    keyController[e.key] = true;
    // console.log(keyController);
    if (keyController['ArrowLeft']) {
        if (isMovingLeft === false) {
            moveRatLeft();
            moveLeft();
            gameControllerLvl2();
        }
        leftButtonIcon.src = './images/icons/arrowleft_icon_pressed.png';

        isMovingLeft = true;
    }
    if (keyController['ArrowRight']) {
        if (isMovingRight === false) {
            moveRatRight();
            moveRight();
            gameControllerLvl2();
        }
        rightButtonIcon.src = './images/icons/arrowright_icon_pressed.png';

        isMovingRight = true;
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
        document.querySelector('p').textContent = gameField.style.left;
    }
    if (keyController['d']) {
        health -= 10;
        healthBar.style.background = "conic-gradient(rgb(173, 9, 9) " + health + "%,rgba(122, 122, 122, 0) 0%)";
    }
    if (keyController[' ']) {
        attack();
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

    isMovingLeft = false;
    isMovingRight = false;
    ratChar.style.left = '46%';

    runningAudio.pause();

    ratChar.src = './images/ratChar/rat_char_idle.gif'
    if (health > 0) {
        healthBarIcon.src = './images/icons/rat_icon.png'
    }

}

function moveRatLeft() {
    ratChar.style.left = '43%';
    ratChar.src = './images/ratChar/rat_char_running.gif';
    ratChar.style.scale = '-1 1';

    runningAudio.play();
    audio.loop = 'loop';

    if (health > 0) {
        healthBarIcon.src = './images/icons/rat_running_icon.gif';
        healthBarIcon.style.scale = '-1 1'
    }
}

function moveRatRight() {
    ratChar.style.left = '43%';
    ratChar.src = './images/ratChar/rat_char_running.gif';
    ratChar.style.scale = '1 1';

    runningAudio.play();
    audio.loop = 'loop';

    if (health > 0) {
        healthBarIcon.src = './images/icons/rat_running_icon.gif';
        healthBarIcon.style.scale = '1 1'
    }

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

// ---------==GAME CONTROLLER==---------


function gameControllerLvl2() {
    controllerInterval = setInterval(() => {

        // const rect = gameField.getBoundingClientRect();
        // console.log(rect.left); 

        const playerPos = gameField.style.left.split('px')[0]

        // Map edge
        if (playerPos == 650) {
            positionX = 625;
        }

        if (playerPos == -7375) {
            positionX = -7350;
        }

        // Hole
        if (!isJumping) {
            if (playerPos <= -4000 && playerPos >= -4100) {
                ratFall();

            }
        }

        if (!isJumping) {
            if (playerPos <= -6000 && playerPos >= -6100) {
                ratFall();
            }
        }

        // Door
        if (playerPos <= -6725 && playerPos >= -6850) {
            document.addEventListener('keydown', (e) => {
                keyController[e.key] = true;
                if (keyController['ArrowDown']) {
                    openDoor();
                }
            })
        }

        // Enemy
        if (playerPos == -1375) {
            if (healthEnemy > 0) {
                ratHurt();
            }
        }
        if (playerPos <= -1300 && playerPos >= -1350) {
            enemyHurt();
        }

        // Enemy 2

        if (playerPos == -3050) {
            if (healthEnemy2 > 0) {
                ratHurt();
            }
        }
        if (playerPos <= -2975 && playerPos >= -3025) {
            enemyHurt2();
        }

        // Cockroach

        if (playerPos == -2275) {
            healthReg();
            console.log("pos check");
        }
    }, 25);
}

let deathAudioSound = false;

function ratFall() {
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
        ratChar.classList.remove('rat_fall');
        health = 100;
        resetPosition();
        deathAudioSound = false;
    }, 2000)

}

function resetPosition() {
    gameField.style.left = 0;
    positionX = 0;
    healthBarIcon.src = './images/icons/rat_icon.png';
    healthBar.style.background = "conic-gradient(rgb(169, 0, 0) " + health + "%,rgba(122, 122, 122, 0) 0%)";
    healthBarText.textContent = "HP " + health + "/100";
}

function openDoor() {
    levelDoor.src = './images/background/door_open.png'
    doorSound.play();
    doorSound.volume = 0.1;
    ratChar.classList.add('rat_enter');
    setTimeout(() => {
        window.location = './tobecontinued.html';
    }, 3000)
    setTimeout(() => {
        ratChar.classList.remove('rat_enter');
    }, 10000)
}


let isAttacking = false;
const enemyTrap = document.querySelector('.trap');
const enemyTrap2 = document.querySelector('.trap2');

function attack() {

    if (!isAttacking && !isJumping) {

        isAttacking = true;
        ratChar.classList.add('rat_attack');

        setTimeout(() => {
            isAttacking = false;
            ratChar.classList.remove('rat_attack');

        }, 300)
    }
}

let isBeingAttacked = false;
let trapDeathAudioPlaying = false;

function enemyHurt() {

    if (healthEnemy <= 0) {
        setTimeout(() => {
            enemyTrap.classList.add('rat_fall');
            if (!trapDeathAudioPlaying) {
                trapDeathAudio.play()
                trapDeathAudio.volume = 0.3;
                trapDeathAudioPlaying = true;
            }
        }, 500)

        setTimeout(() => {
            enemyTrap.style.display = 'none';
        }, 1500)
    } else if (keyController[' '] && !isBeingAttacked) {
        isBeingAttacked = true;

        setTimeout(() => {
            healthEnemy -= 20;
            healthBarEnemy.style.width = healthEnemy + "%";
            enemyTrap.classList.add('enemy_hurt');
            attackAudio.play();
        }, 60)

        setTimeout(() => {
            isBeingAttacked = false
            enemyTrap.classList.remove('enemy_hurt');
        }, 560)
    }
}

function enemyHurt2() {

    if (healthEnemy2 <= 0) {
        setTimeout(() => {
            enemyTrap2.classList.add('rat_fall');
            if (!trapDeathAudioPlaying) {
                trapDeathAudio.play()
                trapDeathAudio.volume = 0.3;
                trapDeathAudioPlaying = true;
            }
        }, 500)

        setTimeout(() => {
            enemyTrap2.style.display = 'none';
        }, 1500)
    } else if (keyController[' '] && !isBeingAttacked) {
        isBeingAttacked = true;

        setTimeout(() => {
            healthEnemy2 -= 20;
            healthBarEnemy2.style.width = healthEnemy2 + "%";
            enemyTrap2.classList.add('enemy_hurt');
            attackAudio.play();
            trapDeathAudioPlaying = false;
        }, 60)

        setTimeout(() => {
            isBeingAttacked = false
            enemyTrap2.classList.remove('enemy_hurt');
        }, 560)
    }
}


function ratHurt() {
    health -= 10;
    healthBar.style.background = "conic-gradient(rgb(169, 0, 0) " + health + "%,rgba(122, 122, 122, 0) 0%)";
    if (health <= 0) {
        healthBarText.textContent = "HP 0/100";
    } else {
        healthBarText.textContent = "HP " + health + "/100";
    }
    ratChar.classList.add('rat_hurt');
    gameField.style.left = positionX + 150 + "px";
    positionX += 150;
    gameField.style.transition = "all 250ms"
    hurtAudio.play();
    hurtAudio.volume = 0.2;
    setTimeout(() => {
        ratChar.classList.remove('rat_hurt')
        gameField.style.transition = "all 100ms"
    }, 500)
    if (health <= 0) {
        ratFall();
    }
}

const cockRoach = document.querySelector(".cockroach");

function healthReg() {
    if (health == 100) {
        cockRoach.style.display = "none";
    } else {
        health += 5;
        healthBarText.textContent = "HP " + health + "/100";
        healthBar.style.background = "conic-gradient(rgb(169, 0, 0) " + health + "%,rgba(122, 122, 122, 0) 0%)";
    }
}


// Audio enzo

const audioButton = document.querySelector(".audio_butt");
const jumpSound = new Audio('audio/jump_effect.mp3');
const doorSound = new Audio('audio/door_opening.mp3');
const hurtAudio = new Audio('audio/rat_hurt_audio.mp3');
const attackAudio = new Audio('audio/wood_sound.mp3');
const deathAudio = new Audio('audio/rat_death_sound.mp3');
const runningAudio = new Audio('audio/rat_running.mp3');
const audio = new Audio('audio/ambient_1.mp3');
const trapDeathAudio = new Audio('audio/trap_death_sound.mp3');
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