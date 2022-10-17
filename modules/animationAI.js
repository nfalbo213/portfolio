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
import { objectArr, generateRandomObject } from "./animationDisplay.js";
import { canvas } from "./canvasDisplay.js";
import { riderDownImg } from "./animation-images.js";

///////////////////////
// Local Functions
// *** riderAvoidObjects still needs work; isn't occuring (was invoking in riderAI before moveObject velocity parameters)
function riderAvoidObjects() {
    //let riderArr = [];
    let riderObjIndex;
    for (let i = objectArr.length - 1; i >= 0; i--) {
        if (objectArr[i].isRider) {
            //riderArr.push(objectArr[i]);
            riderObjIndex = i;
            i = -1;
            return;
        } else {
            return;
        }
    }
    for (let n = objectArr.length - 1; n >= 0; n--) {
        if (objectArr[i].movingDown) {
            if (objectArr[i].isRider) {
                return;
            }
            else if (objectArr[i].isTree) {
                if (objectArr[i].x + (treeImg.width) >= objectArr[riderObjIndex].x && objectArr[i].x <= objectArr[riderObjIndex].x && objectArr[i].lowerY - (treeImg.height / 2) === objectArr[riderObjIndex].y + riderDownImg.height) {
                    objectArr[riderObjIndex].movingDown = false;
                    objectArr[riderObjIndex].velocityY -= 4;
                    console.log('happened');
                }
            }
            else if (objectArr[i].isSnowman) {
                if (objectArr[i].x + (snowmanImg.width) >= objectArr[riderObjIndex].x && objectArr[i].x <= objectArr[riderObjIndex].x && objectArr[i].lowerY - 10 === objectArr[riderObjIndex].y + riderDownImg.height) {
                    objectArr[riderObjIndex].movingDown = false;
                    objectArr[riderObjIndex].velocityY -= 4;
                }
            }
            else if (objectArr[i].isRock) {
                if (objectArr[i].x + (rockImg.width) >= objectArr[riderObjIndex].x && objectArr[i].x <= objectArr[riderObjIndex].x && objectArr[i].lowerY - 10 === objectArr[riderObjIndex].y + riderDownImg.height) {
                    objectArr[riderObjIndex].movingDown = false;
                    objectArr[riderObjIndex].velocityY -= 4;
                }
            }
        }
        else if (!objectArr[i].movingDown) {
            if (objectArr[i].isRider) {
                return;
            }
            else if (objectArr[i].isTree) {
                if (objectArr[i].x + (treeImg.width) >= objectArr[riderObjIndex].x && objectArr[i].x <= objectArr[riderObjIndex].x && objectArr[i].lowerY + 10 === objectArr[riderObjIndex].y + riderUpImg.height / 1.5) {
                    objectArr[riderObjIndex].movingDown = true;
                    objectArr[riderObjIndex].velocityY += 4;
                }
            }
            else if (objectArr[i].isSnowman) {
                if (objectArr[i].x + (snowmanImg.width) >= objectArr[riderObjIndex].x && objectArr[i].x <= objectArr[riderObjIndex].x && objectArr[i].lowerY + 10 === objectArr[riderObjIndex].y + riderUpImg.height / 1.5) {
                    objectArr[riderObjIndex].movingDown = true;
                    objectArr[riderObjIndex].velocityY += 4;
                }
            }
            else if (objectArr[i].isRock) {
                if (objectArr[i].x + (rockImg.width) >= objectArr[riderObjIndex].x && objectArr[i].x <= objectArr[riderObjIndex].x && objectArr[i].lowerY + 10 === objectArr[riderObjIndex].y + riderUpImg.height / 1.5) {
                    objectArr[riderObjIndex].movingDown = true;
                    objectArr[riderObjIndex].velocityY += 4;
                }
            }
        }
    }
}

// Invoked in riderAI()
function firstTraverse(i) {
    // Determine whether rider is going up or down (initial state is down)
    if (objectArr[i].y === ((canvas.height / 2) - (riderDownImg.height / 2))) {
        objectArr[i].movingDown = true;
        // Reset velocity
        objectArr[i].velocityY = 0;
        // Assign new velocity
        objectArr[i].velocityY += 1;
        objectArr[i].velocityX = 0;
        objectArr[i].velocityX -= 1;
        // Add to traverse
        objectArr[i].traverseNum += 1;
        // Assign lowerY of image
        objectArr[i].lowerY = objectArr[i].y + riderDownImg.height / 1.1;
    }
    else if (objectArr[i].y === ((canvas.height / 2) + 17)) {
        objectArr[i].movingDown = false;
        objectArr[i].velocityY = 0;
        objectArr[i].velocityY -= 1;
        objectArr[i].velocityX = 0;
        objectArr[i].velocityX += .5;
        objectArr[i].traverseNum += 1;
        objectArr[i].lowerY = objectArr[i].y + riderDownImg.height / 1.05;
    }
}

// Invoked in riderAI()
function secondTraverse(i) {
    if (objectArr[i].y <= ((canvas.height / 2) - (riderDownImg.height / 2))) {
        objectArr[i].movingDown = true;
        objectArr[i].velocityY = 0;
        objectArr[i].velocityY += 1;
        objectArr[i].velocityX = 0;
        objectArr[i].velocityX -= .5;
        objectArr[i].traverseNum += 1;
        objectArr[i].lowerY = objectArr[i].y + riderDownImg.height / 1.2;
    }
    else if (objectArr[i].y >= ((canvas.height / 2) + 17)) {
        objectArr[i].movingDown = false;
        objectArr[i].velocityY = 0;
        objectArr[i].velocityY -= 1;
        objectArr[i].velocityX = 0;
        objectArr[i].velocityX += 1;
        objectArr[i].traverseNum += 1;
        objectArr[i].lowerY = objectArr[i].y + riderDownImg.height / 1.05;
    }
}

// Invoked in riderAI() and animationAI()
function moveObject(i) {
    // Add velocity to object's coordinates to create appearence of movement
    objectArr[i].x += objectArr[i].velocityX;
    objectArr[i].y += objectArr[i].velocityY;
    objectArr[i].lowerY += objectArr[i].velocityY;
}

// Invoked in animationAI()
function riderAI(i) {
    if (objectArr[i].traverseNum <= 9) {
        // Rider object making 'traverse' from RIGHT to LEFT across screen (this is also the initial condition)
        firstTraverse(i);
    }
    if (objectArr[i].traverseNum >= 10 && objectArr[i].traverseNum <= 19) {
        // Rider object making 'traverse' from LEFT to RIGHT across screen 
        secondTraverse(i);
    }
    if (objectArr[i].traverseNum === 19) {
        // Reset traverseNum
        objectArr[i].traverseNum = 0;
    }
    // Update velocity coordinates
    moveObject(i);
}

// Invoked in animationAI()
function removeObject(i) {
    // Remove object from objectArr if it's either past the screen width, or it's lowerY is off the top of the screen (0; canvas Y is inversed)
    if (objectArr[i].x >= canvas.width || objectArr[i].lowerY < 0 && !objectArr[i].isRider) {
        objectArr.splice(i, 1);
        generateRandomObject();
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
        if (objectArr[i].isTree || objectArr[i].isSnowman || objectArr[i].isRock || objectArr[i].isLog) {
            moveObject(i);
            removeObject(i);
        }
        else if (objectArr[i].isRider) {
            riderAI(i);
        }
        i--;
    } while (i >= 0);
}

//////////////////
// Exports
export { animationAI };