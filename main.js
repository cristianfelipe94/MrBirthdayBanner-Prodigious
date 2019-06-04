
let _loadedImages = 0;
const _imageArray = new Array(
    // Background
    // //////////
    'background.jpg',
    'ballons.png',

    // Character
    // /////////
    'body.png',

    // Character
    // /////////
    'openDoor.png',
    'nutmovil.png',
    'street.png',

    // Catch Phrases
    // /////////////
    'catchPhrase-final.png',
    'catchPhrase-intro.png',
    'catchPhrase-preFinal.png',
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

    // Title and show animation in and out.
    // /////////
    .from(['.main-title-position','.main-title-shade-position'], 1,{ top: ('-500')})
    .addLabel('bezierMovement')
    .to('.main-title-position', 2, {bezier:{curviness:2, values:[{x:('-5'), y:('-2')}, {x:('-5'), y:('10')}, {x:('0'), y:('-10')}, {x:('5'), y:('5')}]}, ease:Power1.easeInOut, yoyo: true, repeat: 1}, 'bezierMovement')
    .to('.main-title-shade-position', 2, {bezier:{curviness:2, values:[{x:('5'), y:('2')}, {x:('5'), y:('-10')}, {x:('0'), y:('10')}, {x:('-5'), y:('-5')}]}, ease:Power1.easeInOut, yoyo: true, repeat: 1}, 'bezierMovement')
    .to(['.main-title-position','.main-title-shade-position', '.juice-shadow-position', '.juice-details-position'], 2,{ top: ('-150'), opacity: ('0')})
    // /////////

    // Border and Deer animation in.
    // //////////
    .from(['.deer-body-position', '.deer-head-position'], 0.5, { top: ('300')})
    .from(['.border-line-width', '.orange-banner-position'], 0.5, { top: ('300')})
    // //////////

    // Deer moving Head animation.
    // ///////////
    .to('.deer-head-position', 1, {top: ('40'), left: ('76'), rotation: ('-21deg')}).delay(0.5)
    .to('.deer-head-position', 1, {top: ('38'), left: ('92'), rotation: ('1deg'),}).delay(0.5)
    // ///////////

    // Deer moving Head and Body animation.
    // ///////////
    .addLabel('movingWith')
    .to('.deer-body-position', 1, {top: ('120'), left: ('95'), rotation:('-4deg')}, 'movingWith')
    .to('.deer-head-position', 1, {top: ('40'), left: ('74'), rotation: ('-21deg'),}, 'movingWith')
    // ///////////

    // Falling product animation
    // ///////////////
    .addLabel('smashingTo', '+=0.2')
    .addLabel('shadowFalling')
    .from('.productbox-felt-position', 1,{
        ease: Bounce.easeOut,
        top: ('-1000'),
        height: ('160'),
        width: ('209'),
        top: ('-195'),
        bottom: ('0'),
        left: ('15'),
        rotation: ('4'),
        zIndex: ('4')      
    },'shadowFalling')
    .from('.product-shadow-blur', 0.5, {ease: Bounce.easeOut, top: ('-200'), opacity: ('0')}, 'shadowFalling')
    // ///////////////

    // Smashing Head and Body animation.
    // /////////////
    .set('.deer-head-position', {clip: headGone[0]}, 'smashingTo')
    .to('.deer-head-position', 0.1, {clip: headGone[1], opacity: ('0')}, 'smashingTo')
    .set('.deer-body-position', {clip: bodyGone[0]}, 'smashingTo')
    .to('.deer-body-position', 0.1, {clip: bodyGone[1], opacity: ('0')}, 'smashingTo')
    // /////////////

    // Character jumping from product.
    // /////////////////
    .addLabel('showingDeer', '+=0.2')
    .to('.charact-appear-position', 0.5, {clip: appearCharact[0]},'smashingTo')
    .to('.charact-appear-position', 0.5, {clip: appearCharact[1], opacity: ('1')},'showingDeer')

    .to('.wrapper-front-position', 0.5, {clip: frontWrap[0]},'smashingTo')
    .to('.wrapper-front-position', 0.5, {clip: frontWrap[1], opacity: ('1')},'showingDeer')

    .to('.wrapper-back-position', 0.5, {clip: backWrap[0]},'smashingTo')
    .to('.wrapper-back-position', 0.5, {clip: backWrap[1], opacity: ('1')},'showingDeer')

    .to('.wrapper-background-position', 0.5, {clip: insideWrap[0]},'smashingTo')
    .to('.shine-back-position', 0.2, {clip: shinningTo[0]},'smashingTo')
    .to('.wrapper-background-position', 0.5, {clip: insideWrap[1], opacity: ('1')},'showingDeer')

    .from('.charact-appear-position', 0.8, {ease: Back.easeOut.config(1), top: ('200')},'showingDeer')
    
    .to('.shine-back-position', 0.5, {clip: shinningTo[1], opacity: ('1')}, 'showingDeer')
    // /////////////////

    // Catchphrase appear animation.
    // ///////////
    .from('.catchphrase-text-position', 0.5, {opacity: ('0')}, 'smashingTo')
    .from('.catchphrase-shade-position', 0.5, {opacity: ('0')}, 'smashingTo')
    // ///////////

    .from('.final-productshot-position', 0.5, {left: ('350'), onComplete: actionsButton})
}

function actionsButton(){
    _btnExit.addEventListener('mouseover', () => {
        TweenMax.to(_btnExit, 1,{zIndex: ('100')})
        TweenMax.to('.charact-appear-position', 1,{top: ('-5')})
        TweenMax.to('.shine-back-position', 1,{top: ('-20')})
    });
    _btnExit.addEventListener('mouseout', () => {
        TweenMax.to(_btnExit, 1,{zIndex: ('100')})
        TweenMax.to('.charact-appear-position', 1,{top: ('0')})
        TweenMax.to('.shine-back-position', 1,{top: ('0')})
    });
    const looperBanner = function() {
        location.reload();
    }
    setTimeout(looperBanner, 5000);
}