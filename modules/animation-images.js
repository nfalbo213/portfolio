/*
Copyright 2022 Nick Falbo (https://nick.falbo.dev)
SPDX-License-Identifier: Apache-2.0
*/

let riderUpImg;
let riderDownImg;
let treeImg;
let snowmanImg;
let logImg;
let rockImg;

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