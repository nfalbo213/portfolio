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

////////////
// Imports
import { canvas, canvas_ctx, drawCanvas, initialCanvasSize } from "./canvasDisplay.js";
import { riderUpImg, riderDownImg, treeImg, snowmanImg, logImg, rockImg } from "./animation-images.js";
import { animationAI } from "./animationAI.js";

///////////////
// Global Variables
let objectArr = [];
// Structure of each object in objectArr = {x: number, y: number, velocity: number, isRider: boolean, isTree: boolean, isSnowman: boolean, isLog: boolean, isRock: boolean, movingDown: boolean traverseNum: number}
let animationObject = {haveObjectsReset: false};

/////////////////////
// Local Functions

// Invoked in drawObjects
function drawRider(i) {
    if (objectArr[i].movingDown) {
        canvas_ctx.drawImage(riderDownImg, objectArr[i].x, objectArr[i].y, riderDownImg.width, riderDownImg.height);
        // Below are dots used for positioning
        /*
        canvas_ctx.fillStyle = 'red';
        canvas_ctx.strokestyle = 'red';
        canvas_ctx.fillRect(objectArr[i].x, objectArr[i].lowerY, 2, 2);
        canvas_ctx.strokeRect(objectArr[i].x, objectArr[i].lowerY, 2, 2);
        */
    } else if (!objectArr[i].movingDown) {
        canvas_ctx.drawImage(riderUpImg, objectArr[i].x, objectArr[i].y, riderUpImg.width, riderUpImg.height);
    }
}

// Invoked in drawObjects
function sortObjects() {
    // Sort objectArr so that objecsts with the smallest lowerY are at the beginning of the array
    objectArr.sort(function (a, b) {
        return a.lowerY - b.lowerY;
    });
    // Reverse order becasue objects do... while loop in drawObjects starts at end of array
    objectArr.reverse();
}

// Invoked in mainAnimation
function drawObjects() {
    // Sort objects so anything 'downhill' gets drawn last
    sortObjects();
    let i = objectArr.length - 1;
    // Loop through objectArr and draw each object
    do {
        if (objectArr[i].isRider) {
            drawRider(i);
        }
        else if (objectArr[i].isTree) {
            canvas_ctx.drawImage(treeImg, objectArr[i].x, objectArr[i].y, treeImg.width, treeImg.height);
        }
        else if (objectArr[i].isSnowman) {
            canvas_ctx.drawImage(snowmanImg, objectArr[i].x, objectArr[i].y, snowmanImg.width, snowmanImg.height);
        }
        else if (objectArr[i].isRock) {
            canvas_ctx.drawImage(rockImg, objectArr[i].x, objectArr[i].y, rockImg.width, rockImg.height);
        }
        else if (objectArr[i].isLog) {
            canvas_ctx.drawImage(logImg, objectArr[i].x, objectArr[i].y, logImg.width, logImg.height);
        }
        i--;
    } while (i >= 0);
}

// Invoked in mainAnimation
function generateManyObjects() {

    // Bigger i = more objects; good for smaller animation sizes and/or larger screens
    let i;
    // Check for screen size
    if (canvas.width >= 800) {
        i = 18;
    } else if (canvas.width < 800) {
        i = 8;
    }
    do {
        generateRandomObject();
        i--;
    } while (i > 0);
    if (i === 0) {
        // X and Y coordinates can now be set off canvas after removed from objectArr
        animationObject.haveObjectsReset = true;
    }
}

// Invoked in generateRandomObject()
function objApprover(arr) {
    // Compare object in arr to objects in objectArr and ensure they aren't generated too close to each other
    for (let i = objectArr.length - 1; i >= 0; i--) {
        if (objectArr[i] === arr[0]) {
            // if exact match
            i = -1;
            arr.splice(0);
            generateRandomObject();
            return;
        }
        if ((objectArr[i].x + treeImg.width / 2) >= arr[0].x - treeImg.width && (objectArr[i].x + treeImg.width / 2) <= arr[0].x + treeImg.width && objectArr[i].y >= arr[0].y - treeImg.height && objectArr[i].y <= +treeImg.height) {
            // if similar match
            i = -1;
            arr.splice(0);
            generateRandomObject();
            return;
        }
    }
    // Push object to objectArr if 'passed' comparison
    if (arr.length > 0) {
        objectArr.push(arr[0]);
        arr.splice(0);
        return;
    }
}

////////////////////////
// Exported Functions
function mainAnimation() {
    // Set set up canvas
    initialCanvasSize();
    // Populate objectArr with rider and objects (invoke generateRider first for objApprover to function correctly in generateManyObjects)
    generateRider();
    generateManyObjects();
    // Run animation loop
    const timer = setInterval(function () {
        drawCanvas();
        drawObjects();
        animationAI();
    }, 20);
}

// Invoked in mainAnimation, removeObjects and canvasDisplay.js (as riderDisplay())
function generateRider() {
    // Establish properites
    let x;
    let y;
    let lowerY;
    let velocityX;
    let velocityY;
    let isRider;
    let isTree;
    let isSnowman;
    let isLog;
    let isRock;
    let movingDown;
    let traverseNum = 0;
    // Assign coordinates and properties
    x = canvas.width / 2 + (riderDownImg.width);
    y = canvas.height / 2 - (riderDownImg.height / 2);
    lowerY = y + riderDownImg.height;
    velocityX = -1;
    velocityY = 1;
    movingDown = true;
    isTree = false;
    isSnowman = false;
    isRider = true;
    isLog = false;
    isRock = false;
    // Push to objectArr
    objectArr.push({ x: x, y: y, lowerY: lowerY, velocityX: velocityX, velocityY: velocityY, isRider: isRider, isTree: isTree, isSnowman: isSnowman, isLog: isLog, isRock: isRock, movingDown: movingDown, traverseNum: traverseNum });
}

// Invoked in generateRandomObject
function randomCoordinateX(max) {
    // Generate cooridinates
    if (!animationObject.haveObjectsReset) {
        // Generate initial coordinates
        // Objects should start with positive X coordinate to visibily start anywhere
        return Math.floor(Math.random() * max);
    } 
    else if (animationObject.haveObjectsReset) {
        // Generate coordinates after objects have been cleared from objectArr at least once
        // Objects should start with a negative X coordinate to start off not visible to screen (but not too far off; divide by 2 and account for widest image width of 195)
        return Math.floor(Math.random() * -max) / 2 - 196;
    }
}

// Invoked in generateRandomObject
function randomCoordinateY(max) {
    // figure out if cooridnates will be over or under canvas.height
    // **TODO** Can probably refactor this section
    let overUnder;
    let num = Math.floor(Math.random() * 100);
    if (num <= 50) {
        // 50% chance of under canvas.height
        overUnder = 1.2;
    } else if (num >= 51) {
        // 50% chance of over canvas.height 
        overUnder = 1.3;
    }
    // Generate cooridinates
    if (!animationObject.haveObjectsReset) {
        // Generate initial coordinates
        return Math.floor(Math.random() * max);
    } 
    else if (animationObject.haveObjectsReset) {
        // Generate coordinates after objects have been cleared from objectArr at least once
        return Math.floor(Math.random() * (max * overUnder));
    }
}

// Invoked in generateManyObjects and animationAI.js
function generateRandomObject() {
    // Object parameters 
    let x;
    let y;
    let lowerY;
    let velocityX;
    let velocityY;
    let isRider;
    let isTree;
    let isSnowman;
    let isLog;
    let isRock;
    let movingDown;
    // Generate x and y coordinates
    x = randomCoordinateX(canvas.width);
    y = randomCoordinateY(canvas.height);
    // Define object type
    let num = Math.floor(Math.random() * 100);
    // 85% chance of tree
    if (num <= 84) {
        isTree = true;
        isSnowman = false;
        isRider = false;
        isLog = false;
        isRock = false;
        movingDown = false;
    }
    // 5% chance of snowman
    else if (num >= 85 && num <= 89) {
        isTree = false;
        isSnowman = true;
        isRider = false;
        isLog = false;
        isRock = false;
        movingDown = false;
    }
    // 5% chance of log
    else if (num >= 90 && num <= 94) {
        isTree = false;
        isSnowman = false;
        isRider = false;
        isLog = true;
        isRock = false;
        movingDown = false;
    }
    // 5% chance of rock
    else if (num >= 95 && num <= 99) {
        isTree = false;
        isSnowman = false;
        isRider = false;
        isLog = false;
        isRock = true;
        movingDown = false;
    }
    // Generate x and y velocities
    if (isTree || isSnowman || isLog || isRock) {
        velocityX = 7;
        velocityY = -2;
    }
    // Assign lowerY coordinates
    if (isTree) {
        lowerY = y + treeImg.height;
    }
    else if (isSnowman) {
        lowerY = y + snowmanImg.height;
    }
    else if (isLog) {
        lowerY = y + logImg.height;
    }
    else if (isRock) {
        lowerY = y + rockImg.height;
    }
    // Ensure objects aren't stacked too close to each other
    if (objectArr.length > 0) {
        // Create array of current object
        let arr = [];
        arr.push({ x: x, y: y, lowerY: lowerY, velocityX: velocityX, velocityY: velocityY, isRider: isRider, isTree: isTree, isSnowman: isSnowman, isLog: isLog, isRock: isRock, movingDown: movingDown });
        // Send object out for 'approval'
        objApprover(arr);
        arr.splice(0);
    }
}

/////////////////////
// Exports
export { objectArr, generateRider, generateRandomObject, mainAnimation };
