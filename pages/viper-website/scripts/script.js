// ======
// NAVIGATION MENU
// ======

let menuButton;

menuButton = document.querySelector('nav li:nth-of-type(2) a');
menuSection = document.querySelector('.menu-section');
staticSection = document.querySelector('.static-section')

menuButton.addEventListener('click', menuButtonClick);

let menuToggle = false;

function menuButtonClick(){
    if (menuToggle == false) {
        menuToggle = true;
        menuButton.innerHTML = "Sluiten";

        menuSection.classList.add('menu-section-open');
        staticSection.classList.add('static-section-hide');
    } else {
        menuToggle = false;
        menuButton.innerHTML = "Menu";

        menuSection.classList.remove('menu-section-open');
        staticSection.classList.remove('static-section-hide');
        
    }
}

// ======
// CAROUSEL
// ======

nextBtn = document.querySelector('.carousel-button-next');
prevBtn = document.querySelector('.carousel-button-prev');

carouselContainer = document.querySelector('.carousel-container');
carouselSlide = document.querySelector('.carousel-slide');

let slidePosition = 0;

nextBtn.addEventListener("click", (e) => {
    const slideWidth = carouselSlide.clientWidth;
    carouselContainer.scrollLeft += slideWidth;



    if (slidePosition === 4) {
        slidePosition = 0;
        carouselContainer.scrollLeft -= slideWidth * 5;
    } else {
        slidePosition += 1;
    }
    
    // const rectLastLiElement = document.querySelector('.carousel-container li:last-child').getBoundingClientRect();

    // if (rectLastLiElement.x === 0) {
    //     carouselContainer.scrollLeft = 0
    // }
});

prevBtn.addEventListener("click", (e) => {
    const slideWidth = carouselSlide.clientWidth;
    carouselContainer.scrollLeft -= slideWidth;
    


    if (slidePosition === 0) {
        slidePosition = 4;
        carouselContainer.scrollLeft += slideWidth * 5;
    } else {
        slidePosition -= 1;
    }

    // const rectFirstLiElement = document.querySelector('.carousel-container li:first-child').getBoundingClientRect(),
    //     rectLastLiElement = document.querySelector('.carousel-container li:last-child').getBoundingClientRect();

    // if (rectFirstLiElement.x === 0) {
    //     carouselContainer.scrollLeft = rectLastLiElement.x;
    // }
});