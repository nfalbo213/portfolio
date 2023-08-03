/*
Copyright 2022 Nick Falbo (https://nick.falbo.dev)
SPDX-License-Identifier: Apache-2.0
*/
////////////////
// Imports
import { canvasButton, canvasResize } from "./modules/canvasDisplay.js";
import { mainAnimation } from "./modules/animationDisplay.js";
import { hamburger, navZero, navOne, navTwo, navThree, navFour, navObject, burgerSpin } from "./modules/mobileNavBar.js";
import { heightSet } from "./modules/imgScroll.js";
import { form, handleSubmit } from "./modules/contactForm.js";

//////////////////////
// Event Listeners

// WINDOW EVENTS ///////////////////////////

// Set height for profile picture wrapper div
window.addEventListener ('load', (event) => {
    event.preventDefault();
    heightSet();
});
// Set height for profile picture wrapper div AND reset the canvas size
window.addEventListener ('resize', (event) => {
    event.preventDefault();
    heightSet();
    canvasResize();
});

// MOBILE NAVBAR /////////////////////////

// When mobile nav menu hamburger icon is clicked
hamburger.onmousedown = (event) => {  
    event.preventDefault();
    burgerSpin();
}
// When mobile nav menu item clicked
navZero.onpointerup = (event) => {
    event.preventDefault();
    navObject.navButtonClicked = true;
    burgerSpin();
    window.location.replace("#home");
}
navOne.onpointerup = (event) => {
    event.preventDefault();
    navObject.navButtonClicked = true;
    burgerSpin();
    window.location.replace("#about");
}
navTwo.onpointerup = (event) => {
    event.preventDefault();
    navObject.navButtonClicked = true;
    burgerSpin();
    window.location.replace("#skills");
}
navThree.onpointerup = (event) => {
    event.preventDefault();
    navObject.navButtonClicked = true;
    burgerSpin();
    window.location.replace("#sample-work");
}
navFour.onpointerup = (event) => {
    event.preventDefault();
    navObject.navButtonClicked = true;
    burgerSpin();
    window.location.replace("#contact");
}

// CANVAS BUTTON ///////////////////////////

canvasButton.onpointerover = (event) => {
    // change color of 'Come Shred!' button
    canvasButton.style.backgroundColor = 'black';
    canvasButton.style.color = 'white';
    event.preventDefault();
};
canvasButton.onpointerleave = (event) => {
    // change color of 'Come Shred!' button back to origional
    canvasButton.style.backgroundColor = '';
    canvasButton.style.color = '';
    event.preventDefault();
};

// CONTACT FORM ///////////////////////////

form.addEventListener('submit', handleSubmit);

///////////////////
// Invocations

// Run main animation
mainAnimation();