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

////////////
// Imports
import { canvas, canvas_ctx, drawCanvas, initialCanvasSize } from "./canvasDisplay.js";
import { riderUpImg, riderDownImg, treeImg, snowmanImg, logImg, rockImg } from "./animation-images.js";
import { animationAI } from "./animationAI.js";

///////////////
// Global Variables
let objectArr = [];
// Structure of each object in objectArr = {x: number, y: number, velocity: number, isRider: boolean, isTree: boolean, isSnowman: boolean, isLog: boolean, isRock: boolean, movingDown: boolean traverseNum: number}
// **TODO** Can probably get rid of isWindowResizing
let animationObject = {isWindowResizing: false, haveObjectsReset: false};

/////////////////////
// Local Functions

// Invoked in mainAnimation
function drawObjects() {

    // Ensure error doesn't occur
    if (objectArr.length > 0) {

        // Sort objects so anything 'downhill' gets drawn last; accomplish this by sorting array so that the objects with the smallest y are at beginning of the array
        objectArr.sort(function (a, b) {
            return a.lowerY - b.lowerY;
        });
        objectArr.reverse();


        let i = objectArr.length - 1;

        do {

            if (objectArr[i].isRider) {
                if (objectArr[i].movingDown) {
                    canvas_ctx.drawImage(riderDownImg, objectArr[i].x, objectArr[i].y, riderDownImg.width, riderDownImg.height);

                    // Below are dots used for positioning
                    /*
                    canvas_ctx.fillStyle = 'red';
                    // Set the border colour of the round
                    canvas_ctx.strokestyle = 'red';
                    // Draw a "filled" rectangle to represent the round at the coordinates the round is located
                    canvas_ctx.fillRect(objectArr[i].x, objectArr[i].lowerY, 2, 2);
                    // Draw a border around the round
                    canvas_ctx.strokeRect(objectArr[i].x, objectArr[i].lowerY, 2, 2);
                    */
                }
                else if (!objectArr[i].movingDown) {
                    canvas_ctx.drawImage(riderUpImg, objectArr[i].x, objectArr[i].y, riderUpImg.width, riderUpImg.height);

                    // Below are dots used for positioning
                    /*
                    canvas_ctx.fillStyle = 'red';
                    // Set the border colour of the round
                    canvas_ctx.strokestyle = 'red';
                    // Draw a "filled" rectangle to represent the round at the coordinates the round is located
                    canvas_ctx.fillRect(objectArr[i].x, objectArr[i].lowerY, 2, 2);
                    // Draw a border around the round
                    canvas_ctx.strokeRect(objectArr[i].x, objectArr[i].lowerY, 2, 2);
                    */
                }
                //canvas_ctx.drawImage(riderImg, objectArr[i].x, objectArr[i].y, riderImg.width, riderImg.height);
            }
            else if (objectArr[i].isTree) {
                canvas_ctx.drawImage(treeImg, objectArr[i].x, objectArr[i].y, treeImg.width, treeImg.height);

                // Below are dots used for positioning
                /*
                canvas_ctx.fillStyle = 'red';
                // Set the border colour of the round
                canvas_ctx.strokestyle = 'red';
                // Draw a "filled" rectangle to represent the round at the coordinates the round is located
                canvas_ctx.fillRect(objectArr[i].x, objectArr[i].lowerY, 2, 2);
                // Draw a border around the round
                canvas_ctx.strokeRect(objectArr[i].x, objectArr[i].lowerY, 2, 2);
                */
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

    } else {
        return;
    }

}

// Invoked in mainAnimation
function generateManyObjects() {

    // Bigger i = more objects, good for smaller animation sizes
    let i;

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
        animationObject.haveObjectsReset = true;
    }

}

////////////////////////
// Exported Functions
function mainAnimation() {

    // Set set up canvas
    initialCanvasSize();
    // Populate objectArr with rider and objects
    generateRider();
    generateManyObjects();

    // Run animation loop
    const timer = setInterval(function () {

        drawCanvas();
        drawObjects();
        animationAI();

    }, 20);

}

// Invoked in mainAnimation and canvasDisplay.js
function generateRider() {

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

    x = canvas.width / 2 + (riderDownImg.width);
    y = canvas.height / 2 - (riderDownImg.height / 2);
    //x = canvas.width / 4;
    //y = canvas.height / 2 - 60;
    // ^ above two in conjunction w/ canvas_scale(2,2)
    velocityX = -1;
    velocityY = 1;
    movingDown = true;
    isTree = false;
    isSnowman = false;
    isRider = true;
    isLog = false;
    isRock = false;
    lowerY = y + riderDownImg.height;

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
    /*const randomCoordinate = (min, max) => {
        //return Math.round((Math.random() * (max - min) + min) / 10) * 10;
        Math.floor(Math.random() * max);
    };*/

        x = randomCoordinateX(canvas.width);
        y = randomCoordinateY(canvas.height);

        //console.log(canvas.width);
        //console.log(canvas.height);

        //console.log('x: '+ x);
        //console.log('y: '+ y);

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
    // Redundent unless want to add extra riders later on
    /*else if (isRider) {
        velocityX = 0;
        velocityY = 0;
        x = canvas.width / 2;
        y = canvas.height / 2;
    }*/
    // Ensure objects aren't stacked on top of each other/created on the same/close to the same spot
    if (objectArr.length > 0) {

        let arr = [];
        arr.push({ x: x, y: y, velocityX: velocityX, velocityY: velocityY, isRider: isRider, isTree: isTree, isSnowman: isSnowman, isLog: isLog, isRock: isRock, movingDown: movingDown });

        for (let i = objectArr.length - 1; i >= 0; i--) {

            if (objectArr[i] === arr[0]) {
                arr.splice(0, 1);
                generateRandomObject();
                i = -1;
                return;
            }
            if ((objectArr[i].x + treeImg.width / 2) >= arr[0].x - treeImg.width && (objectArr[i].x + treeImg.width / 2) <= arr[0].x + treeImg.width && objectArr[i].y >= arr[0].y - treeImg.height && objectArr[i].y <= +treeImg.height) {
                arr.splice(0, 1);
                generateRandomObject();
                i = -1;
                return;
            }

        }

    }

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

    objectArr.push({ x: x, y: y, lowerY: lowerY, velocityX: velocityX, velocityY: velocityY, isRider: isRider, isTree: isTree, isSnowman: isSnowman, isLog: isLog, isRock: isRock, movingDown: movingDown });

}

/////////////////////
// Exports
export { objectArr, generateRider, generateRandomObject, mainAnimation };