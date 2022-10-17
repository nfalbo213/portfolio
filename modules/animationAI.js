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
// *** riderAvoidObjects still needs work; isn't occuring
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

///////////////////////
// Exported Functions
function animationAI() {
    let i = objectArr.length - 1;
    do {

        if (objectArr[i].isTree || objectArr[i].isSnowman || objectArr[i].isRock || objectArr[i].isLog) {

            // Add velocity to object's coordinates to create appearence of movement
            objectArr[i].x += objectArr[i].velocityX;
            objectArr[i].y += objectArr[i].velocityY;
            objectArr[i].lowerY += objectArr[i].velocityY;

            // Remove object from Array if off screen and generate new one
            // Remove object from objectArr if it's either past the screen width, or it's lowerY is off the top of the screen (0; canvas Y is inversed)
            if (objectArr[i].x >= canvas.width || objectArr[i].lowerY < 0) {
                objectArr.splice(i, 1);
                generateRandomObject();
            }

        }
        else if (objectArr[i].isRider) {

            // Make rider turn depending on length of traverse across screen
            if (objectArr[i].traverseNum <= 9) {
    
                if (objectArr[i].y === ((canvas.height / 2) - (riderDownImg.height / 2))) {
                    objectArr[i].velocityY = 0;
                    objectArr[i].velocityY += 1;
                    objectArr[i].velocityX = 0;
                    objectArr[i].velocityX -= 1;
                    objectArr[i].movingDown = true;
                    objectArr[i].traverseNum += 1;

                    objectArr[i].lowerY = objectArr[i].y + riderDownImg.height / 1.1;

                }
                else if (objectArr[i].y === ((canvas.height / 2) + 17)) {
                    objectArr[i].velocityY = 0;
                    objectArr[i].velocityY -= 1;
                    objectArr[i].velocityX = 0;
                    objectArr[i].velocityX += .5;
                    objectArr[i].movingDown = false;
                    objectArr[i].traverseNum += 1;

                    objectArr[i].lowerY = objectArr[i].y + riderDownImg.height / 1.05;

                }
            }
            if (objectArr[i].traverseNum >= 10 && objectArr[i].traverseNum <= 19) {
                if (objectArr[i].y <= ((canvas.height / 2) - (riderDownImg.height / 2))) {
                    objectArr[i].velocityY = 0;
                    objectArr[i].velocityY += 1;
                    objectArr[i].velocityX = 0;
                    objectArr[i].velocityX -= .5;
                    objectArr[i].movingDown = true;
                    objectArr[i].traverseNum += 1;

                    objectArr[i].lowerY = objectArr[i].y + riderDownImg.height / 1.2;

                }
                else if (objectArr[i].y >= ((canvas.height / 2) + 17)) {
                    objectArr[i].velocityY = 0;
                    objectArr[i].velocityY -= 1;
                    objectArr[i].velocityX = 0;
                    objectArr[i].velocityX += 1;
                    objectArr[i].movingDown = false;
                    objectArr[i].traverseNum += 1;

                    objectArr[i].lowerY = objectArr[i].y + riderDownImg.height / 1.05;

                }
            }
            if (objectArr[i].traverseNum === 19) {
                objectArr[i].traverseNum = 0;
            }

            // AvoidObjects function doesn't work yet - no need to invoke
            //riderAvoidObjects();
            
            // Add velocity to rider object's coordinates to create appearence of movement
            objectArr[i].x += objectArr[i].velocityX;
            objectArr[i].y += objectArr[i].velocityY;
            objectArr[i].lowerY += objectArr[i].velocityY;

            // Remove from Array if off screen and generate new one
            // Not currently nessecary if isRider (save for possible game or if make animation w/ rider moving)
            if (objectArr[i].x > canvas.width) {
                objectArr.splice(i, 1);
                generateRandomObject();
            }

        }

        i--;

    } while (i >= 0);

}

//////////////////
// Exports
export { animationAI };