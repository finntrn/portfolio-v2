const audioContext = new AudioContext();

const instrumentBtn1 = document.getElementById("inst-1"),
    instrumentBtn2 = document.getElementById("inst-2"),
    instrumentBtn3 = document.getElementById("inst-3"),
    instrumentBtn4 = document.getElementById("inst-4"),
    instrumentBtn5 = document.getElementById("inst-5"),
    instrumentBtn6 = document.getElementById("inst-6"),
    instrumentBtn7 = document.getElementById("inst-7");

const barInside1 = document.querySelector(".bar-ins-1"),
    barInside2 = document.querySelector(".bar-ins-2"),
    barInside3 = document.querySelector(".bar-ins-3"),
    barInside4 = document.querySelector(".bar-ins-4"),
    barInside5 = document.querySelector(".bar-ins-5"),
    barInside6 = document.querySelector(".bar-ins-6"),
    barInside7 = document.querySelector(".bar-ins-7");

const audioControlDiv1 = document.getElementById('control1'),
    removeButton1 = document.getElementById('remove1'),
    muteButton1 = document.getElementById('mute1'),
    audioControlDiv2 = document.getElementById('control2'),
    removeButton2 = document.getElementById('remove2'),
    muteButton2 = document.getElementById('mute2'),
    audioControlDiv3 = document.getElementById('control3'),
    removeButton3 = document.getElementById('remove3'),
    muteButton3 = document.getElementById('mute3'),
    audioControlDiv4 = document.getElementById('control4'),
    removeButton4 = document.getElementById('remove4'),
    muteButton4 = document.getElementById('mute4'),
    audioControlDiv5 = document.getElementById('control5'),
    removeButton5 = document.getElementById('remove5'),
    muteButton5 = document.getElementById('mute5'),
    audioControlDiv6 = document.getElementById('control6'),
    removeButton6 = document.getElementById('remove6'),
    muteButton6 = document.getElementById('mute6'),
    audioControlDiv7 = document.getElementById('control7'),
    removeButton7 = document.getElementById('remove7'),
    muteButton7 = document.getElementById('mute7');

let removeButtons = [removeButton1, removeButton2, removeButton3, removeButton4, removeButton5, removeButton6, removeButton7];
let muteButtons = [muteButton1, muteButton2, muteButton3, muteButton4, muteButton5, muteButton6, muteButton7];

const audio1 = new Audio('./audio/drums2.wav'),
    audio2 = new Audio('./audio/guitar.wav'),
    audio3 = new Audio('./audio/bass.wav'),
    audio4 = new Audio('./audio/keys.wav'),
    audio5 = new Audio('./audio/trumpet.wav'),
    audio6 = new Audio('./audio/solo_synth_1.wav'),
    audio7 = new Audio('./audio/solo_guitar_5.wav'),
    metronome = new Audio('./audio/metronome.wav');

let audioArray = [audio1, audio2, audio3, audio4, audio5, audio6, audio7];

const track1 = audioContext.createMediaElementSource(audio1),
    track2 = audioContext.createMediaElementSource(audio2),
    track3 = audioContext.createMediaElementSource(audio3),
    track4 = audioContext.createMediaElementSource(audio4),
    track5 = audioContext.createMediaElementSource(audio5),
    track6 = audioContext.createMediaElementSource(audio6),
    track7 = audioContext.createMediaElementSource(audio7);

track1.connect(audioContext.destination);
track2.connect(audioContext.destination);
track3.connect(audioContext.destination);
track4.connect(audioContext.destination);
track5.connect(audioContext.destination);
track6.connect(audioContext.destination);
track7.connect(audioContext.destination);

const monster1 = document.getElementById('monster-1'),
    monster2 = document.getElementById('monster-2'),
    monster3 = document.getElementById('monster-3'),
    monster4 = document.getElementById('monster-4'),
    monster5 = document.getElementById('monster-5'),
    monster6 = document.getElementById('monster-6'),
    monster7 = document.getElementById('monster-7'),
    barOutside1 = document.getElementById('bar-out-1'),
    barOutside2 = document.getElementById('bar-out-2'),
    barOutside3 = document.getElementById('bar-out-3'),
    barOutside4 = document.getElementById('bar-out-4'),
    barOutside5 = document.getElementById('bar-out-5'),
    barOutside6 = document.getElementById('bar-out-6'),
    barOutside7 = document.getElementById('bar-out-7');

// Event listener voor de knoppen

instrumentBtn1.addEventListener('click', () => {
    timeController(barInside1, audio1, monster1, barOutside1, audioControlDiv1);
})
instrumentBtn2.addEventListener('click', () => {
    timeController(barInside2, audio2, monster2, barOutside2, audioControlDiv2);
})
instrumentBtn3.addEventListener('click', () => {
    timeController(barInside3, audio3, monster3, barOutside3, audioControlDiv3);
})
instrumentBtn4.addEventListener('click', () => {
    timeController(barInside4, audio4, monster4, barOutside4, audioControlDiv4);
})
instrumentBtn5.addEventListener('click', () => {
    timeController(barInside5, audio5, monster5, barOutside5, audioControlDiv5);
})
instrumentBtn6.addEventListener('click', () => {
    timeController(barInside6, audio6, monster6, barOutside6, audioControlDiv6);
})
instrumentBtn7.addEventListener('click', () => {
    timeController(barInside7, audio7, monster7, barOutside7, audioControlDiv7);
})

// Timing en check of iets aan het afspelen is.

let timing = 341;
let isPlaying = false;
let currentTime = 0;
let metronomeClick = false;

let amountOfMonsters = 0;

let audioPaused = false;

function timeController(barInside, audioElement, monster, barOutside, audioControlDiv) {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    if (amountOfMonsters < 5) {
        if (isPlaying) {
            monsterAppearance();
            setInterval(() => {
                if (currentTime === 100) {
                    audioElement.muted = false;
                    monster.style.opacity = 1;
                    timer2();
                }
            })
        } else if (!isPlaying) {
            isPlaying = true;
            monsterAppearance();
            startPlayingAudio();
            monster.style.opacity = 1;
            audioElement.muted = false;
            timer();
        }
    }


    function startPlayingAudio() {
        audioArray.forEach(audio => {
            audio.muted = true;
            audio.play();
            audio.loop = true;
        })
        audio1.volume = 0.5;
        audio2.volume = 0.5;
        audio7.volume = 0.3;
    }

    function timer() {
        currentTime += 6.25;
        barInside.style.left = currentTime + 'px';
        if (currentTime === 100) {
            setTimeout(() => {
                currentTime = 0;
                barInside.style.left = currentTime + 'px';
            }, 100)

        }
        // console.log(currentTime)
        // metronome.play();
        setTimeout(timer, timing);

    }

    function timer2() {
        barInside.style.left = currentTime + 'px';
        setTimeout(() => {
            barInside.style.left = currentTime + 'px';
        }, 100)

        setTimeout(timer2, timing);
    }

    function monsterAppearance() {
        if (monster.style.display == "" || monster.style.display == "none") {
            amountOfMonsters += 1;
            monster.style.display = "inline";
            barOutside.style.display = "inline";
            audioControlDiv.style.display = "inline"
            audioElement.volume = 1;
        }
    }
}

removeButton1.addEventListener('click', () => {
    removeMonster(monster1, barOutside1, audioControlDiv1, audio1);
})
removeButton2.addEventListener('click', () => {
    removeMonster(monster2, barOutside2, audioControlDiv2, audio2);
})
removeButton3.addEventListener('click', () => {
    removeMonster(monster3, barOutside3, audioControlDiv3, audio3);
})
removeButton4.addEventListener('click', () => {
    removeMonster(monster4, barOutside4, audioControlDiv4, audio4);
})
removeButton5.addEventListener('click', () => {
    removeMonster(monster5, barOutside5, audioControlDiv5, audio5);
})
removeButton6.addEventListener('click', () => {
    removeMonster(monster6, barOutside6, audioControlDiv6, audio6);
})
removeButton7.addEventListener('click', () => {
    removeMonster(monster7, barOutside7, audioControlDiv7, audio7);
})

let deleteInterval1 = null,
    deleteInterval2 = null,
    deleteInterval3 = null,
    deleteInterval4 = null,
    deleteInterval5 = null,
    deleteInterval6 = null,
    deleteInterval7 = null;

function removeMonster(monster, barOutside, audioControlDiv, audioElement) {
    amountOfMonsters -= 1;
    monster.style.display = "none";
    barOutside.style.display = "none";
    audioControlDiv.style.display = "none";
    audioElement.volume = 0;
}

const drumP = document.getElementById('drum-p'),
gitaarP = document.getElementById('gitaar-p'),
bassP = document.getElementById('bass-p'),
keysP = document.getElementById('keys-p'),
trompetP = document.getElementById('trompet-p'),
synthP = document.getElementById('synth-p');

instrumentBtn1.addEventListener('mouseover', () => {
    infoDisplayer(drumP);
})
instrumentBtn2.addEventListener('mouseover', () => {
    infoDisplayer(gitaarP);
})
instrumentBtn3.addEventListener('mouseover', () => {
    infoDisplayer(bassP);
})
instrumentBtn4.addEventListener('mouseover', () => {
    infoDisplayer(keysP);
})
instrumentBtn5.addEventListener('mouseover', () => {
    infoDisplayer(trompetP);
})
instrumentBtn6.addEventListener('mouseover', () => {
    infoDisplayer(synthP);
})
instrumentBtn7.addEventListener('mouseover', () => {
    infoDisplayer(gitaarP);
})



instrumentBtn1.addEventListener('mouseleave', () => {
    infoUndisplayer(drumP);
})
instrumentBtn2.addEventListener('mouseleave', () => {
    infoUndisplayer(gitaarP);
})
instrumentBtn3.addEventListener('mouseleave', () => {
    infoUndisplayer(bassP);
})
instrumentBtn4.addEventListener('mouseleave', () => {
    infoUndisplayer(keysP);
})
instrumentBtn5.addEventListener('mouseleave', () => {
    infoUndisplayer(trompetP);
})
instrumentBtn6.addEventListener('mouseleave', () => {
    infoUndisplayer(synthP);
})
instrumentBtn7.addEventListener('mouseleave', () => {
    infoUndisplayer(gitaarP);
})


function infoDisplayer(pBlock) {
    pBlock.style.display = 'block';
}


function infoUndisplayer(pBlock) {
    pBlock.style.display = 'none';
}

const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', () => {
    location.reload();
})