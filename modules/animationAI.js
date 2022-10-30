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

/////////////////
// Imports
import { objectArr, generateRandomObject, generateRider } from "./animationDisplay.js";
import { canvas } from "./canvasDisplay.js";
import { riderDownImg } from "./animation-images.js";

///////////////////////
// Local Functions

// Invoked in riderAI()
function riderTraverse(i, isFirstTrvs) {
    // Determine whether rider is going up or down (initial state is down), and if they need to 'turn' back up/down
    if (objectArr[i].y === ((canvas.height / 2) - (riderDownImg.height / 2))) {
        objectArr[i].movingDown = true;
        // Reset velocity
        objectArr[i].velocityY = 0;
        // Assign new velocity
        objectArr[i].velocityY += 1;
        // Add to traverse
        objectArr[i].traverseNum += 1;
        // Assign lowerY of image
        objectArr[i].lowerY = objectArr[i].y + riderDownImg.height / 1.2 /*/ 1.2*/;
    }
    if (objectArr[i].y === ((canvas.height / 2) + 17)) {
        objectArr[i].movingDown = false;
        objectArr[i].velocityY = 0;
        objectArr[i].velocityY -= 1;
        objectArr[i].traverseNum += 1;
        objectArr[i].lowerY = objectArr[i].y + riderDownImg.height / 1.1 /*/ 1.05*/;
    }
    // Determine which direction rider is traveling across screen (R to L or L to R), and adjust velocityX accordingly
    if (isFirstTrvs && objectArr[i].movingDown) {
        // Reset and assign new x velocity
        objectArr[i].velocityX = 0;
        objectArr[i].velocityX -= 1;
    }
    if (isFirstTrvs && !objectArr[i].movingDown) {
        objectArr[i].velocityX = 0;
        objectArr[i].velocityX += .5;
    }
    if (!isFirstTrvs && objectArr[i].movingDown) {
        objectArr[i].velocityX = 0;
        objectArr[i].velocityX -= .5;
    }
    if (!isFirstTrvs && !objectArr[i].movingDown) {
        objectArr[i].velocityX = 0;
        objectArr[i].velocityX += 1;
    }
}

// Invoked in animationAI()
function moveObject(i) {
    // Add velocity to object's coordinates to create appearence of movement
    objectArr[i].x += objectArr[i].velocityX;
    objectArr[i].y += objectArr[i].velocityY;
    objectArr[i].lowerY += objectArr[i].velocityY;
}

// Invoked in animationAI()
function riderAI(i) {
    let isFirstTrvs;
    if (objectArr[i].traverseNum <= 9) {
        // Rider object making 'traverse' from RIGHT to LEFT across screen (this is also the initial condition)
        isFirstTrvs = true;
        riderTraverse(i, isFirstTrvs);
    }
    if (objectArr[i].traverseNum >= 10 && objectArr[i].traverseNum <= 19) {
        // Rider object making 'traverse' from LEFT to RIGHT across screen 
        isFirstTrvs = false;
        riderTraverse(i, isFirstTrvs);
    }
    if (objectArr[i].traverseNum === 19) {
        // Reset traverseNum
        objectArr[i].traverseNum = 0;
    }
}

// Invoked in animationAI()
function removeObject(i) {
    // Remove object from objectArr if it's either past the screen width, or it's lowerY is off the top of the screen (0; canvas Y is inversed)
    if (objectArr[i].x >= canvas.width || objectArr[i].lowerY < 0 && !objectArr[i].isRider) {
        objectArr.splice(i, 1);
        generateRandomObject();
    }
    // Remove rider object from objectArr if it's under the the screen width
    if (objectArr[i].x + riderDownImg.width <= 0 && objectArr[i].isRider) {
        objectArr.splice(i, 1);
        generateRider();
    } else {
        return;
    }
}

///////////////////////
// Exported Functions
function animationAI() {
    let i = objectArr.length - 1;
    // Loop through objectArr and update coordinates
    do {
        if (objectArr[i].isRider) {
            riderAI(i);
        }
        moveObject(i);
        removeObject(i);
        i--;
    } while (i >= 0);
}

//////////////////
// Exports
export { animationAI };