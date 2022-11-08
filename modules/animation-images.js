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

//////////////////
// Imports
//import { canvas } from "./canvasDisplay.js";

//let riderImg;
let riderUpImg;
let riderDownImg;
let treeImg;
let snowmanImg;
let logImg;
let rockImg;


// new Image(width, height)

/*
riderImg = new Image((canvas.width * .05), (canvas.height * .05));
riderImg.src = "./images/GoofyRider.png";
*/

riderUpImg = new Image(100, 140);
riderUpImg.src = "./images/compressed/c_RiderUp2.png";

riderDownImg = new Image(100, 140);
riderDownImg.src = "./images/compressed/c_RiderDown.png";

treeImg = new Image(195, 225);
treeImg.src = "./images/compressed/c_PineTree.png";

snowmanImg = new Image(70, 80);
snowmanImg.src = "./images/compressed/c_Snowman.png";

logImg = new Image(50, 65);
logImg.src = "./images/compressed/c_Logs.png";

rockImg = new Image(110, 130);
rockImg.src = "./images/compressed/c_Rock.png";

//////////////
// Exports
export { riderUpImg, riderDownImg, treeImg, snowmanImg, logImg, rockImg };