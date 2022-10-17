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

////////////////
// Imports
import { objectArr, generateRider as riderDisplay } from "./animationDisplay.js";

//////////////////////
// Global Variables
const canvas = document.getElementById('canvas');
const canvas_ctx = canvas.getContext("2d");
// Canvas Button Variable (invoked in touch events in main.js)
const canvasButton = document.getElementById('canvas-welcome-button');

/////////////////////
// Local Functions
function findRider() {
    // riderIndex = index for rider object inside objectArr; assigned when found
    let riderIndex;
    // Find rider object
    for (let i = objectArr.length - 1; i >= 0; i--) {
        if (objectArr[i].isRider) {
            // assign riderIndex
            riderIndex = i;
            // stop loop
            i = 0;
        } 
    }
    // Remove rider object (and all of it's coordinates) from objectArr
    objectArr.splice(riderIndex, 1);
}

////////////////////////
// Exported Functions
function initialCanvasSize() {
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.style.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.height = window.innerHeight;
}

// Runs in mainAnimation()
function drawCanvas() {
    // Set Canvas Color
    canvas_ctx.fillStyle = 'white';
    canvas_ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// For window resize events
function canvasResize() {
    // Resize canvas
    initialCanvasSize();
    // Reset canvas object parameters 
    // 1) Find rider object in objectArr
    findRider();
    // 2) Repopulate objectArr w/ a new rider object at the center of the screen
    riderDisplay();
}

////////////////
// Exports
export { canvas, canvas_ctx, canvasButton, initialCanvasSize, drawCanvas, canvasResize };