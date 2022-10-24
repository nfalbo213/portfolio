////////////////////////////////////////////////////////////////////////////
/*
Copyright 2022 Nick Falbo
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
////////////////////////////////////////////////////////////////////////////

////////////////////
// Local Variables
const topSpan = document.getElementById('top-span');
const middleSpan = document.getElementById('middle-span');
const bottomSpan = document.getElementById('bottom-span');
const mobileNavList = document.getElementById('mobile-nav-list');
////////////////////
// Global Variables
const hamburger = document.getElementById('hamburger');
const navZero = document.getElementById('nav0');
const navOne = document.getElementById('nav1');
const navTwo = document.getElementById('nav2');
const navThree = document.getElementById('nav3');
const navFour = document.getElementById('nav4');
let navObject = {hamburgerClicked: false, navButtonClicked: false};

/////////////////////////
// Local Functions
const delayedAnimation = () => {
    // Close navbar extension
    mobileNavList.style.display = '';
}

const checkIfNavButton = () => {
    if (!navObject.navButtonClicked) {
        $("#navbar").animate({
            height: "70px",
            opacity: ".95"
        }, 200);
        setTimeout(delayedAnimation, 100);
    } else {
        $("#navbar").animate({
            height: "70px",
            opacity: ".95"
        }, 100);
        setTimeout(delayedAnimation, 50);
        navObject.navButtonClicked = false;
    }
}

/////////////////////////
// Exported Functions
// Invoked in main.js
function burgerSpin() {
    if (!navObject.hamburgerClicked) {
        // Animate top of burger
        topSpan.style.transform = 'rotate(405deg)';
        topSpan.style.position = 'absolute';
        // Animate middle of burger
        middleSpan.style.transform = 'rotate(405deg)';
        middleSpan.style.position = 'absolute';
        // Animate bottom of burger
        bottomSpan.style.transform = 'rotate(315deg)';
        bottomSpan.style.position = 'absolute';
        // Drop down navbar extension
        mobileNavList.style.display = 'flex';
        $("#navbar").animate({
            height: "60%",
            opacity: ".98"
        }, 200);
        // Set burger as clicked
        navObject.hamburgerClicked = true;
    } else {
        // Animate top of burger
        topSpan.style.transform = 'rotate(-360deg)';
        topSpan.style.position = '';
        // Animate middle of burger
        middleSpan.style.transform = 'rotate(-360deg)';
        middleSpan.style.position = '';
        // Animate bottom of burger
        bottomSpan.style.transform = 'rotate(-360deg)';
        bottomSpan.style.position = '';
        // Check to see if navbutton clicked, then animate navbar accordingly
        checkIfNavButton();
        // Set burger as 'not-clicked'
        navObject.hamburgerClicked = false;
    }
}

////////////////////////
// Exports
export { hamburger, navZero, navOne, navTwo, navThree, navFour, navObject, burgerSpin };