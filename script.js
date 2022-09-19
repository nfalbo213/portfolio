
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


// Global Variables

const canvas = document.getElementById('canvas');
const canvas_ctx = canvas.getContext("2d");

const canvasBackground = 'white';
canvas.width = window.innerWidth;
canvas.style.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.height = window.innerHeight;
//const canvasHeight = 900;
//const canvasWidth

// {x: number, y: number, velocity: number, isRider: boolean, isTree: boolean, isSnowman: boolean, isLog: boolean, isRock: boolean, movingDown: boolean traverseNum: number}
let objectArr = [];
/*let snowboardArr = [];
let obstacleArr = [];*/

let animationObject = {isWindowResizing: false, haveObjectsReset: false};

let riderImg;
let riderUpImg;
let riderDownImg;
let treeImg;
let snowmanImg;
let logImg;
let rockImg;

riderImg = new Image((canvas.width * .05), (canvas.height * .05));
riderImg.src = "./Resources/images/GoofyRider.png"

riderUpImg = new Image(/*120, 160*/100, 140);
//riderUpImg = new Image(17, 17);
//riderUpImg = new Image((canvas.width * .05), (canvas.height * .05));
riderUpImg.src = "./Resources/images/RiderUp2.png"

//riderDownImg = new Image(17, 17);
riderDownImg = new Image(100, 140/*50, 65*/);
//riderDownImg = new Image((canvas.width * .05), (canvas.height * .05));
riderDownImg.src = "./Resources/images/RiderDown.png"

treeImg = new Image(/*65, 85*//*140, 165*/195, 225);
//treeImg = new Image(20, 20);
//treeImg = new Image((canvas.width * .05), (canvas.height * .05));
treeImg.src = "./Resources/images/PineTree.png"

snowmanImg = new Image(70, 80)
//snowmanImg = new Image(45, 55);
//snowmanImg = new Image(17, 17);
//snowmanImg = new Image((canvas.width * .05), (canvas.height * .05));
snowmanImg.src = "./Resources/images/Snowman.png"

logImg = new Image(50, 65);
//logImg = new Image(30, 40);
//logImg = new Image(15, 15);
//logImg = new Image((canvas.width * .05), (canvas.height * .05));
logImg.src = "./Resources/images/Logs.png"

rockImg = new Image(110, 130);
//rockImg = new Image(60, 70);
//rockImg = new Image(20, 20);
//rockImg = new Image((canvas.width * .05), (canvas.height * .05));
rockImg.src = "./Resources/images/Rock.png"

// Main Functions

const mainAnimation = () => {

    /*
    canvas_ctx.scale(2, 2);
    canvas_ctx.mozImageSmoothingEnabled = false;  // firefox
    canvas_ctx.imageSmoothingEnabled = false;
    */

    // Wrapping in this statement or clearing interval (see below) both work
    //if (!animationObject.isWindowResizing) {

    const timer = setInterval(function(){

        //const heightRatio = 1.5;
        canvas_ctx.fillStyle = canvasBackground;
        canvas_ctx.fillRect(0, 0, canvas.width, canvas.height);
        //canvas_ctx.fillRect(0, 0, canvas.width, canvas.width * heightRatio);

        drawObjects();
        animationAI();

        /*if (animationObject.isWindowResizing) {
            clearInterval(timer);
            return;
        }*/

    }, /*60*/20);

    if (animationObject.isWindowResizing) {
        clearInterval(timer);
        return;
    }

    //}
    
}

const generateRandomObject = () => {

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

    // Help spread out objects from each other
    //let randomX = Math.floor(Math.random() * 100);
    //let randomPosY = Math.floor(Math.random() * 35)
    //let randomNegY = Math.floor(Math.random() * 40)
    
    // Below for -1 velocityY
    /*
    let randomPosY = Math.floor(Math.random() * 60)
    let randomNegY = Math.floor(Math.random() * 200)
    */
    // Below for -2 velocityY
    //let randomPosY = Math.floor(Math.random() * 60)
    //let randomNegY = Math.floor(Math.random() * 400)

    const randomCoordinate = (min, max) => {
        return Math.round((Math.random() * (max-min) + min) / 10) * 10;
      }
    
      //console.log(random_X());
    
    if (!animationObject.haveObjectsReset) {

        x = randomCoordinate(-canvas.width / 2, canvas.width);
        y = randomCoordinate(0, canvas.height * 2);
        //animationObject.haveObjectsReset = true;
        //console.log('reset hasnt happened');

    }
    else if (animationObject.haveObjectsReset) {

        x = randomCoordinate(-canvas.width * 2, 0 - (canvas.width / 2));
        y = randomCoordinate(canvas.height / 4, canvas.height * 1.5);
        //console.log('reset has happened');

    }

    //implicated in generateManyObjects
    //animationObject.haveObjectsReset = true;
    

    // Start x 100-500px behind 0

    // Start x 100-500px behind 0
    
    // ***** x = 0 - ((100 + randomX) + (Math.floor(Math.random() * 5) * 100));
    
    //console.log(x);
    // Keep y in/near the center; 300 <= y <= 600
    //y = 0 + (300 + Math.floor(Math.random() * 3) * 100);
    
    // ******** y = 0 + (((canvas.height) - (randomPosY - randomNegY)) + Math.floor(Math.random() * 3));
    //console.log(y);

    // Generate x and y velocities
    /*
    velocityX = 5;
    velocityY = 0;
    */

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
        //velocityX = 5;
        velocityX = 7;
        //velocityY = 0;
        //velocityY = -3;
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
        arr.push({x: x, y: y, velocityX: velocityX, velocityY: velocityY, isRider: isRider, isTree: isTree, isSnowman: isSnowman, isLog: isLog, isRock: isRock, movingDown: movingDown});

        //console.log('initial happened');

        for (let i = objectArr.length - 1; i >= 0; i--) {

            if (objectArr[i] === arr[0]) {
                arr.splice(0, 1);
                generateRandomObject();
                i = -1;
                return;
            } 
            //else if (objectArr[i].x <= arr[0].x - 5 && objectArr[i].x >= arr[0].x + 30 && objectArr[i].y <= arr[0].y - 5 && objectArr[i].y >= + 30) {
            if ((objectArr[i].x + treeImg.width / 2) >= arr[0].x - treeImg.width && (objectArr[i].x + treeImg.width / 2) <= arr[0].x + treeImg.width && objectArr[i].y  >= arr[0].y - treeImg.height && objectArr[i].y <= + treeImg.height) {
                arr.splice(0, 1);
                //console.log('happened');
                generateRandomObject();
                i = -1;
                return;
            }

        }

    }

    if (isTree) {
        //lowerY = y; //+ /*treeImg.height*//*50*/2;
        //lowerY = y + treeImg.height;
        //lowerY = y + riderDownImg.height;
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

    objectArr.push({x: x, y: y, lowerY: lowerY, velocityX: velocityX, velocityY: velocityY, isRider: isRider, isTree: isTree, isSnowman: isSnowman, isLog: isLog, isRock: isRock, movingDown: movingDown});

}

const generateManyObjects = () => {
    
    //if (!animationObject.haveObjectsReset) {
        //console.log('this happened');
        
    

    // Bigger i = more objects, good for smaller animation sizes
    let i;
    if (canvas.width >= 800) {
        i = 18;
    } else if (canvas.width < 800) {
        i = 8;
    }
    //let i = 18;
    
    do {
        
        /*if (animationObject.haveObjectsReset) {
            console.log('this happened');
            break;
        }*/
        generateRandomObject();
        i--;

    } while (i > 0);

    if (i === 0) {
        animationObject.haveObjectsReset = true;
    }

    //} else {
        //animationObject.haveObjectsReset = true;
   // }

}

const generateRider = () => {

    // Below is needed only if you only want to regenerate rider coordinates upon resizing
    /*if (animationObject.isWindowResizing) {

        let i = objectArr.length - 1;

        while (i > -1) {

            if (objectArr[i].isRider) {
                objectArr.splice(i, 1);
                // May no longer need haveObjectsReset
                animationObject.haveObjectsReset = true;
                break
            }
            i--;

        }

    }*/
    
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
    let traverseNum = 0

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

    //lowerY = y - /*riderDownImg.height*/50;
    //lowerY = y;
    //lowerY = y + treeImg.height;
    lowerY = y + riderDownImg.height /* /1.2 when !movingDown*/;

    objectArr.push({x: x, y: y, lowerY: lowerY, velocityX: velocityX, velocityY: velocityY, isRider: isRider, isTree: isTree, isSnowman: isSnowman, isLog: isLog, isRock: isRock,  movingDown: movingDown, traverseNum: traverseNum});

}

const sortObjects = () => {

    //console.log('sortObjects happened');
    // Sort objects so anything 'downhill' gets drawn last; accomplish this by sorting array so that the objects with the smallest y are at beginning of the array
    objectArr.sort(function (a, b) {
        //console.log('sort happened');
        //return a.y - b.y;
        return a.lowerY - b.lowerY;
      });
    objectArr.reverse();

    
    let riderArr = [];
    let treeArr = [];

    let riderObjIndex;
    //let arr = [];

    for (let i = objectArr.length - 1; i >= 0; i--) {
        //console.log('for loop happened');
        //console.log(i);
        if (objectArr[i].isRider) {
            riderArr.push(objectArr[i]);
            //objectArr.splice(i, 1);
            console.log(riderArr[0]);
            //i--;

            riderObjIndex = i;
            //console.log('riderIndex loop happened');
            //i = -1;
            //return;
            
        } 
        
        else if (objectArr[i].isTree) {
            treeArr.push(objectArr[i]);
           // i--;
        } 
        
        /*else {
            console.log('else happened');
        } */

    }

    for (let i = objectArr.length - 1; i >= 0; i--) {

        /*if (objectArr[i] === objectArr[riderObjIndex]) {
            //console.log('i and index === happened');
            //return;
        }
        else */if (objectArr[i].isTree) {
            //if (objectArr[i].y + treeImg.height >= objectArr[riderObjIndex].y + riderImg.height && objectArr[i].y <= objectArr[riderObjIndex].y) {
                if (objectArr[i].y + treeImg.height >= objectArr[riderObjIndex].y + riderDownImg.height && objectArr[i].y <= objectArr[riderObjIndex].y + riderDownImg.height && objectArr[i].x + treeImg.width >= objectArr[riderObjIndex].x - riderDownImg.width && objectArr[i].x - treeImg.width >= objectArr[riderObjIndex].x - riderDownImg.width/* && objectArr[i].y <= objectArr[riderObjIndex].y*/) {
                //if (objectArr[i].y + treeImg.height > riderArr[0].y + riderImg.height && objectArr[i].y < riderArr[0].y) {
                //console.log('1 '+objectArr);
                riderArr.push(objectArr[riderObjIndex]);
                treeArr.push(objectArr[i]);
                //objectArr.reverse();
                objectArr.splice(objectArr[i], 1, riderArr[0]);
                objectArr.splice(objectArr[riderObjIndex], 1, treeArr[0]);
                riderObjIndex = i;
                //objectArr.reverse();

                riderArr.splice(0, riderArr.length);
                treeArr.splice(0, treeArr.length);
                //console.log('2 '+objectArr[riderObjIndex].y)
                //return;
            } /*else {
                return;
            }*/

        }

    }

}

const drawObjects = () => {
    
    // Ensure error doesn't occur
    if (objectArr.length > 0) {

        // Sort objects so anything 'downhill' gets drawn last; accomplish this by sorting array so that the objects with the smallest y are at beginning of the array
        /*
        objectArr.sort(function (a, b) {
            return a.y - b.y;
          });
        objectArr.reverse();
        console.log(objectArr);
        */

       //sortObjects();

       objectArr.sort(function (a, b) {
            //console.log('sort happened');
            //return a.y - b.y;
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

// *** riderAvoidObjects still needs work; isn't occuring
const riderAvoidObjects = () => {

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
    
                if (objectArr[i].x + (treeImg.width) >= objectArr[riderObjIndex].x && objectArr[i].x <= objectArr[riderObjIndex].x && objectArr[i].lowerY - (treeImg.height/2) === objectArr[riderObjIndex].y + riderDownImg.height) {
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
    
                if (objectArr[i].x + (treeImg.width) >= objectArr[riderObjIndex].x && objectArr[i].x <= objectArr[riderObjIndex].x && objectArr[i].lowerY + 10 === objectArr[riderObjIndex].y + riderUpImg.height/1.5) {
                    objectArr[riderObjIndex].movingDown = true;
                    objectArr[riderObjIndex].velocityY += 4;
                }

            }
            else if (objectArr[i].isSnowman) {
    
                if (objectArr[i].x + (snowmanImg.width) >= objectArr[riderObjIndex].x && objectArr[i].x <= objectArr[riderObjIndex].x && objectArr[i].lowerY + 10 === objectArr[riderObjIndex].y + riderUpImg.height/1.5) {
                    objectArr[riderObjIndex].movingDown = true;
                    objectArr[riderObjIndex].velocityY += 4;
                }

            }
            else if (objectArr[i].isRock) {
    
                if (objectArr[i].x + (rockImg.width) >= objectArr[riderObjIndex].x && objectArr[i].x <= objectArr[riderObjIndex].x && objectArr[i].lowerY + 10 === objectArr[riderObjIndex].y + riderUpImg.height/1.5) {
                    objectArr[riderObjIndex].movingDown = true;
                    objectArr[riderObjIndex].velocityY += 4;
                }

            }

        }
        

    }
}

const animationAI = () => {

    let i = objectArr.length - 1;

    do {

        if (objectArr[i].isTree || objectArr[i].isSnowman || objectArr[i].isRock || objectArr[i].isLog) {

            objectArr[i].x += objectArr[i].velocityX;
            objectArr[i].y += objectArr[i].velocityY;

        /* *** Added during lowerY testing; 8/29/21 *** */
            objectArr[i].lowerY += objectArr[i].velocityY;

            // Remove from Array if off screen and generate new one
            if (objectArr[i].x >= canvas.width + 200) {
                objectArr.splice(i, 1);
                generateRandomObject();
                //i = -1;
            }

        }
        else if (objectArr[i].isRider) {

            if (objectArr[i].traverseNum <= 9) {
                if (objectArr[i].y === ((canvas.height / 2) - (riderDownImg.height / 2))) {
                    objectArr[i].velocityY = 0;
                    objectArr[i].velocityY += 1;
                    objectArr[i].velocityX = 0;
                    objectArr[i].velocityX -= 1;
                    objectArr[i].movingDown = true;
                    objectArr[i].traverseNum += 1;

                    objectArr[i].lowerY = objectArr[i].y + riderDownImg.height/1.1;

                }
                else if (objectArr[i].y === ((canvas.height / 2) + 17)) {
                    objectArr[i].velocityY = 0;
                    objectArr[i].velocityY -= 1;
                    objectArr[i].velocityX = 0;
                    objectArr[i].velocityX += .5;
                    objectArr[i].movingDown = false;
                    objectArr[i].traverseNum += 1;

                    objectArr[i].lowerY = objectArr[i].y + riderDownImg.height/1.05;

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

                    objectArr[i].lowerY = objectArr[i].y + riderDownImg.height/1.2;
                    
                }
                else if (objectArr[i].y >= ((canvas.height / 2) + 17)) {
                    objectArr[i].velocityY = 0;
                    objectArr[i].velocityY -= 1;
                    objectArr[i].velocityX = 0;
                    objectArr[i].velocityX += 1;
                    objectArr[i].movingDown = false;
                    objectArr[i].traverseNum += 1;

                    objectArr[i].lowerY = objectArr[i].y + riderDownImg.height/1.05;

                }
            }
            if (objectArr[i].traverseNum === 19) {
                objectArr[i].traverseNum = 0;
            }


            /*
            if (objectArr[i].y === ((canvas.height / 2) - 3)) {
                objectArr[i].velocityY = 0;
                objectArr[i].velocityY += 1;
                objectArr[i].velocityX = 0;
                objectArr[i].velocityX -= 1;
                objectArr[i].movingDown = true;
                objectArr[i].traverseNum += 1;
            }
            else if (objectArr[i].y === ((canvas.height / 2) + 17)) {
                objectArr[i].velocityY = 0;
                objectArr[i].velocityY -= 1;
                objectArr[i].velocityX = 0;
                objectArr[i].velocityX += .9;
                objectArr[i].movingDown = false;
                objectArr[i].traverseNum += 1;
            }
            */

            riderAvoidObjects();

            objectArr[i].x += objectArr[i].velocityX;
            objectArr[i].y += objectArr[i].velocityY;

            /* *** Added during lowerY testing; 8/29/21 *** */
            objectArr[i].lowerY += objectArr[i].velocityY;

            //riderAvoidObjects();

            // Remove from Array if off screen and generate new one
                // Not currently nessecary if isRider (save for possible game or if make animation w/ rider moving)
            if (objectArr[i].x >= canvas.width + 200) {
                objectArr.splice(i, 1);
                generateRandomObject();
                //i = -1;
            }

        }

        i--;

    } while (i >= 0);

}

// Canvas display

window.onresize = function() {

    // Stop animation (also clears canvas)
    animationObject.isWindowResizing = true;
    // Reset proper coordinate-parameters for objects (see generateRandomObjects())
    animationObject.haveObjectsReset = false;

    // Resize canvas
    canvas.width = window.innerWidth;
    canvas.style.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.height = window.innerHeight;
    
    // Reset canvas object parameters 
    // 1) Clear objectArr
    objectArr.splice(0, objectArr.length);
    // 2) Repopulate objectArr
    generateRider();
    generateManyObjects();

    // invoking generateRider() keeps rider in center of screen
    //generateRider();

    // Reset .isWindowResizing
    //animationObject.isWindowResizing = false;

    // Restart Animation
    mainAnimation();

    // Reset .isWindowResizing
    animationObject.isWindowResizing = false;

}

////////////////////////////////
/* ********
* Should be in responsive.js *
**********
*/


////////////////////
// Global Variables

const navBar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const topSpan = document.getElementById('top-span');
const middleSpan = document.getElementById('middle-span');
const bottomSpan = document.getElementById('bottom-span');
const navList = document.getElementById('nav-list');
const navOne = document.getElementById('nav1');
const navTwo = document.getElementById('nav2');
const navThree = document.getElementById('nav3');
const navFour = document.getElementById('nav4');
let hamburgerClicked = false;

const canvasButton = document.getElementById('canvas-welcome-button');

//NOT BEING USED YET: 
/*
const contactForm = document.getElementById('contact-form');
const sendButton = document.getElementById('send-button');
const submittedButton = document.getElementById('submitted-button');
*/
////


/////////////
// Functions


// NAVBAR FUNCTIONS ///////////////////////////////////////////

hamburger.onpointerup = (event) => {

    if (!hamburgerClicked) {
        topSpan.style.transform = 'rotate(405deg)';
        topSpan.style.position = 'absolute';
        middleSpan.style.transform = 'rotate(405deg)';
        middleSpan.style.position = 'absolute';
        bottomSpan.style.transform = 'rotate(315deg)';
        bottomSpan.style.position = 'absolute';
        hamburger.style.justifyContent = 'center';
        
        navBar.style.opacity = '.98';

        navBar.style.height = '50%';
        navList.style.display = 'flex';
        

        hamburgerClicked = true;
    } else {
        topSpan.style.transform = 'rotate(-360deg)';
        topSpan.style.position = '';
        middleSpan.style.position = '';
        middleSpan.style.transform = 'rotate(-360deg)';
        bottomSpan.style.transform = 'rotate(-360deg)';
        bottomSpan.style.position = '';
        hamburger.style.justifyContent = '';
        navBar.style.opacity = '';
        navBar.style.height = '';
        navList.style.display = '';

        hamburgerClicked = false;
    }
    
    event.preventDefault();

}

navOne.onpointerup = (event) => {

    topSpan.style.transform = 'rotate(-360deg)';
    topSpan.style.position = '';
    middleSpan.style.position = '';
    middleSpan.style.transform = 'rotate(-360deg)';
    bottomSpan.style.transform = 'rotate(-360deg)';
    bottomSpan.style.position = '';
    hamburger.style.justifyContent = '';
    navBar.style.opacity = '';
    navBar.style.height = '';
    navList.style.display = '';

    hamburgerClicked = false;

    event.preventDefault();

}

navTwo.onpointerup = (event) => {

    topSpan.style.transform = 'rotate(-360deg)';
    topSpan.style.position = '';
    middleSpan.style.position = '';
    middleSpan.style.transform = 'rotate(-360deg)';
    bottomSpan.style.transform = 'rotate(-360deg)';
    bottomSpan.style.position = '';
    hamburger.style.justifyContent = '';
    navBar.style.opacity = '';
    navBar.style.height = '';
    navList.style.display = '';

    hamburgerClicked = false;

    event.preventDefault();

}

navThree.onpointerup = (event) => {

    topSpan.style.transform = 'rotate(-360deg)';
    topSpan.style.position = '';
    middleSpan.style.position = '';
    middleSpan.style.transform = 'rotate(-360deg)';
    bottomSpan.style.transform = 'rotate(-360deg)';
    bottomSpan.style.position = '';
    hamburger.style.justifyContent = '';
    navBar.style.opacity = '';
    navBar.style.height = '';
    navList.style.display = '';

    hamburgerClicked = false;

    event.preventDefault();

}

navFour.onpointerup = (event) => {

    topSpan.style.transform = 'rotate(-360deg)';
    topSpan.style.position = '';
    middleSpan.style.position = '';
    middleSpan.style.transform = 'rotate(-360deg)';
    bottomSpan.style.transform = 'rotate(-360deg)';
    bottomSpan.style.position = '';
    hamburger.style.justifyContent = '';
    navBar.style.opacity = '';
    navBar.style.height = '';
    navList.style.display = '';

    hamburgerClicked = false;

    event.preventDefault();

}

// CANVAS BUTTON FUNCTIONS ///////////////////////////

canvasButton.onpointerover = (event) => {

    // change color of 'Come Shred!' button
    canvasButton.style.backgroundColor = 'black';
    canvasButton.style.color = 'white';
    event.preventDefault();

}

canvasButton.onpointerleave = (event) => {

    // change color of 'Come Shred!' button back to origional
    canvasButton.style.backgroundColor = '';
    canvasButton.style.color = '';
    event.preventDefault();

}

/* ********
* Should be in responsive.js *
**********
*/
////////////////////////////////

// Invocations

generateRider();
generateManyObjects();
/*
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
generateRandomObject();
*/

//canvas_ctx.scale(3, 3);
//canvas_ctx.scale(1.1, 1.1);
//canvas_ctx.mozImageSmoothingEnabled = false;  // firefox
//canvas_ctx.imageSmoothingEnabled = false;

mainAnimation();
