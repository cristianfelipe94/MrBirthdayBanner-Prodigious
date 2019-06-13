
let _loadedImages = 0;
const _imageArray = new Array(
    // Background
    // //////////
    'background.jpg',
    'ballons.png',

    // Character
    // /////////
    'eye.png',
    'body.png',

    // Car
    // /////////
    'openDoor.png',
    'nutmovil.png',
    'street.png',

    // Catch Phrases
    // /////////////
    'catchPhrase-final.png',
    'catchPhrase-intro.png',
    'catchPhrase-preFinal.png',
    'catchPhrase-action.png',
);

// Rect Values (0px: Top Value, 0px: Right Value, 0px: Bottom Value, 0px: Left Value).
// Arrays with starting values and ending values for transitions.
const x = ['rect(0px, 0px, 0px, 0px)', 'rect(0px, 0px, 0px, 0px)'];

this.addEventListener('DOMContentLoaded', preloadImages);

function preloadImages() {
    for (let i = 0; i < _imageArray.length; i++) {
        const _tempImage = new Image();
        _tempImage.addEventListener('load', trackProgress);
        _tempImage.src = _imageArray[i];
    }
}

function trackProgress(){
    _loadedImages++;
    if(_loadedImages == _imageArray.length) init();
}

function init(){
    const css = document.createElement( 'link' );
    css.setAttribute( 'rel', 'stylesheet' );
    css.setAttribute( 'type', 'text/css' );
    css.setAttribute( 'href', "style.css" );
    document.getElementsByTagName('head')[0].appendChild(css);
    css.addEventListener('load', initAnimations);
}

function initAnimations(){
    const _tlShowing = new TimelineMax();
    _tlShowing
    .set('.banner',{display: 'block'})

    // Intro car.
    // //////////
    .to('.first-phrase-position', 1, {opacity: ('0')}, '+=1.5')
    .from('.nutmovile-position', 1, {left: ('300'), top: ('-16'), rotation: ('5')}, '-=1')
    .to('.nutmovile-position', 1, {ease: Bounce.easeOut ,rotation: ('-2')})
    // Intro car.
    // //////////

    // Catch Phrase.
    // /////////////
    .addLabel('fallingConfeti')
    .to('.second-phrase-position', 1, {opacity: ('1')})
    .staggerTo('.first-confeti-falling', 4, {y: ('400'), rotationX: ('1000'), rotationZ: ('1000')}, 0.1,'fallingConfeti')
    .staggerTo('.second-confeti-falling', 3, {y: ('400'), rotationX: ('-1100'), rotationZ: ('-1100')}, 0.2,'fallingConfeti')
    .staggerTo('.third-confeti-falling', 4, {y: ('400'), rotationX: ('1200'), rotationZ: ('1200')}, 0.1,'fallingConfeti')
    .staggerTo('.fourth-confeti-falling', 3, {y: ('400'), rotationX: ('-1300'), rotationZ: ('-1300')}, 0.2,'fallingConfeti')
    
    // Catch Phrase.
    // /////////////

    // Mr.Peanut appears.
    // //////////////////
    .to('.door-opened-position', 0.2, {opacity: ('1')}, 'fallingConfeti')
    .to(['.ballons-position', '.mrPeanut-body-position'], 0.5, {opacity: ('1')}, 'fallingConfeti')
    // Mr.Peanut appears.
    // //////////////////

    // Zooming.
    // ////////
    .addLabel('zooming', '-=1.5')
    .to('.mrPeanut-body-position', 0.5, {top: ('21'), left: ('13'), scale: ('1.1')}, 'zooming')
    .to('.ballons-position', 0.5, {top: ('-102'), left: ('-54'), scale: ('1.1')}, 'zooming')
    .to(['.street-lines-position', '.nutmovile-position', '.door-opened-position', '.second-phrase-position'], 0.5, {opacity: ('0')}, 'zooming')
    .to('.third-phrase-position', 1, {opacity: ('1')}, 'zooming')
    // Zooming.
    // ////////

    .from('.final-productshot-position', 0.5, {left: ('350'), onComplete: actionsButton})
}

function actionsButton(){
    TweenMax.to(_btnExit, 1,{zIndex: ('100')})
    _btnExit.addEventListener('mouseover', () => {
        TweenMax.to('.call-action-banner', 1, {opacity: ('1')})
        TweenMax.to('.mrPeanut-eye-position', 0.2, {opacity: ('1')})
    });
    _btnExit.addEventListener('mouseout', () => {
        TweenMax.to('.call-action-banner', 0.5, {opacity: ('0')})
        TweenMax.to('.mrPeanut-eye-position', 0.2, {opacity: ('0')})
    });
    const looperBanner = function() {
        location.reload();
    }
    setTimeout(looperBanner, 10000);
}


function generateRandomValue (maxValue) {
    let maxNumb = maxValue;
    let randomNumb = parseInt(Math.random() * maxNumb);
    return randomNumb;
}

// Generate confeti.
// This functionality is working properly.
// /////////////////

const maxRandNumb = 100;

const colorsConfeti = [
    'blue',
    'red',
    'pink',
    'green',
    'deepPink',
    'lightBlue',
    'yellow',
    'orange',
];

function confetiColorGenerator() {
    return colorsConfeti[generateRandomValue (colorsConfeti.length)];
}

function confetiSizeGenerator() {
    let sizer = generateRandomValue (20);
    return sizer + 'px';
}

function confetiLetfPosition() {
    return generateRandomValue (maxRandNumb)+ '%';
}

function confetiBorder(maxBorderNumb) {
    return (generateRandomValue (maxBorderNumb)+ 'px',generateRandomValue (maxBorderNumb)+ 'px',generateRandomValue (maxBorderNumb)+ 'px',generateRandomValue (maxBorderNumb)+ 'px');
}

function confetiTemplate( bodyColorKey, widthBodyKey, positionBodyKey, topInitKey, leftInitKey, indexKey, opacityKey, classKey, roundBorderKey) {
    this.bodyColorKey = bodyColorKey;
    this.widthBodyKey = widthBodyKey;
    this.positionBodyKey = positionBodyKey;
    this.topInitKey = topInitKey;
    this.leftInitKey = leftInitKey;
    this.indexKey = indexKey;
    this.opacityKey = opacityKey;
    this.classKey = classKey;
    this.roundBorderKey = roundBorderKey;

    const confetiWrapper = document.getElementById('js-confeti-bucket');
    const confeti = document.createElement('div');
    confeti.setAttribute('class', this.classKey)

    confeti.style.backgroundColor = this.bodyColorKey;

    confeti.style.width = this.widthBodyKey,
    confeti.style.height = this.widthBodyKey,

    confeti.style.position = this.positionBodyKey,
    confeti.style.top = this.topInitKey,
    confeti.style.left = this.leftInitKey,

    confeti.style.zIndex = this.indexKey,
    confeti.style.opacity = this.opacityKey;

    confeti.style.borderRadius = this.roundBorderKey;

    confetiWrapper.appendChild(confeti);
}

function firstConfetiGroup() {
    for(let e = 0; e < 25; e++) {
        new confetiTemplate( confetiColorGenerator(), confetiSizeGenerator(), 'absolute', '-50px', confetiLetfPosition(), '5', '0.7', 'first-confeti-falling', confetiBorder(3))
    }
}
function secondConfetiGroup() {
    for(let e = 0; e < 25; e++) {
        new confetiTemplate( confetiColorGenerator(), confetiSizeGenerator(), 'absolute', '-50px', confetiLetfPosition(), '5', '0.7', 'second-confeti-falling', confetiBorder(4))
    }
}
function thirdConfetiGroup() {
    for(let e = 0; e < 25; e++) {
        new confetiTemplate( confetiColorGenerator(), confetiSizeGenerator(), 'absolute', '-50px', confetiLetfPosition(), '5', '0.7', 'third-confeti-falling', confetiBorder(5))
    }
}
function fourthConfetiGroup() {
    for(let e = 0; e < 25; e++) {
        new confetiTemplate( confetiColorGenerator(), confetiSizeGenerator(), 'absolute', '-50px', confetiLetfPosition(), '5', '0.7', 'fourth-confeti-falling', confetiBorder(3))
    }
}

secondConfetiGroup();
firstConfetiGroup();
thirdConfetiGroup();
fourthConfetiGroup();
