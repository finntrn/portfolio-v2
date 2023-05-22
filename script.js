const indexContainer = document.querySelector('.index-container'),
    lineDivLeft = document.querySelector('.lines-left'),
    lineDivRight = document.querySelector('.lines-right'),
    lineDiv = document.querySelector('.line-div'),
    ball = document.querySelector('.ball'),
    scrollText = document.querySelector('.scroll-h2');

let scrollPos;
let pageOneDone = false;
let pageTwoDone = false;

history.scrollRestoration = 'manual';

window.addEventListener('scroll', () => {
    console.log(scrollPos);
    scrollPos = window.scrollY;

    indexWindowScroll();
    pageTwo();
})

function indexWindowScroll() {
    let lineWidenerLeft = scrollPos / 2 + 16;
    let lineWidenerMid = scrollPos / 2 + 8;
    let lineDivWidener = scrollPos / 2 * 10 + 400;
    let opacityChanger = (100 - scrollPos) / 100;
    if (scrollPos <= 1100) {
        lineDivLeft.style.background = 'repeating-linear-gradient(270deg,black,black 8px,transparent 8px,transparent ' + lineWidenerLeft + 'px)';
        lineDivLeft.style.width = lineDivWidener + 'px';
        lineDivRight.style.width = lineDivWidener + 'px';
        lineDivLeft.style.height = scrollPos / 10 + 600 + 'px';
        lineDivRight.style.height = scrollPos / 10 + 600 + 'px';
        lineDivRight.style.background = 'repeating-linear-gradient(90deg,black,black 8px,transparent 8px,transparent ' + lineWidenerLeft + 'px)';
        lineDiv.style.gap = lineWidenerMid + 'px';
        scrollText.style.opacity = opacityChanger;
    } else if (scrollPos > 1100) {
        lineDiv.classList.add('index-animation');
        setTimeout(() => {
            ball.style.display = 'none';
            lineDiv.style.display = 'none';
            window.scrollTo(0, 0);
            scrollText.style.display = 'none';
            pageOneDone = true;
        }, 1500)
    }
}

// PAGE TWO

const pageTwoContainer = document.querySelector('.page-two-container');
const pButton = document.querySelectorAll('.p-button');

function pageTwo() {
    if (pageOneDone && !pageTwoDone) {
        pageTwoContainer.style.display = 'block';
    }
}

pButton.forEach(p => {
    p.addEventListener('click', () => {
        setTimeout(() => {
            h2Text = p.textContent
            pageTwoContainer.style.display = 'none';
            pageTwoDone = true;
            pageThree();
        }, 500)

    })
})