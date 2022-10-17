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
const scrollWrapper = document.getElementById('about-scroll-wrapper');
const textWrapper =document.getElementById('about-text-wrapper');

////////////////////////
// Exported Functions
// Invoked in main.js
function heightSet() {
    // Check to see if mobile browser
    let width = window.innerWidth;
    // For Desktop browser
    if (width >= 600) {
        // ****READ*** Might want to set styling with media queries at max-width 600px instead in order to keep styling all in one place
        // Set bottom of about section to be lower
        textWrapper.style.marginBlockEnd = '-4.5em';
        scrollWrapper.style.marginBlockEnd = '-4.5em';
        // Measure height of text div
        let fixedHeight = textWrapper.getBoundingClientRect();
        // Set height of profile pic div to match text div
        scrollWrapper.style.height = `${fixedHeight.height}px`;
    // For Mobile browser
    } else {
        scrollWrapper.style.height = '100%';
        scrollWrapper.style.marginBlockEnd = '0';
        textWrapper.style.marginBlockEnd = '0';
    }
}

////////////////////////
// Exports
export { heightSet };