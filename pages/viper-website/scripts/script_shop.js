let menuButton;

menuButton = document.querySelector('.fixed-footer button');
menuSection = document.querySelector('.footer-menu');
menuButton.addEventListener('click', menuButtonClick);

closeButton = document.querySelector('.footer-menu ul:first-of-type button');
closeButton.addEventListener('click', menuButtonClick)

bodyElement = document.querySelector('body');

let menuToggle = false;

function menuButtonClick(){
    if (menuToggle == false) {
        menuToggle = true;

        menuSection.classList.add('footer-menu-open');
        bodyElement.classList.add('stop-scroll')
    } else {
        menuToggle = false;

        menuSection.classList.remove('footer-menu-open');
        bodyElement.classList.remove('stop-scroll')
    }
}



basketIcon = document.querySelector('.fixed-footer span');
shopBasketIcon = document.querySelector('.shop-section button');

shopBasketIcon.addEventListener('click', addToBasket);

let basketItems = 0;

function addToBasket(){
    basketItems = basketItems + 1;
    basketIcon.textContent = basketItems;
}