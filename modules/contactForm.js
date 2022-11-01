/*
////////////////////////////////////
Copyright 2022 Nick Falbo
SPDX-License-Identifier: Apache-2.0
////////////////////////////////////
*/

// HTML Variables
const targetUrl = 'https://formspree.io/f/mgeqobag';
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Async Functions
async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    try {
        const response = await fetch(targetUrl, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            formStatus.innerHTML = "🙋🏻‍♂️ Message recieved - I'll get back to you ASAP! 👨🏻‍💻";
            form.reset();
        } else {
            formStatus.innerHTML = "🤷🏻‍♂️ Oops! There was a problem submitting your form - give it another try 👨🏻‍💻";
        }
    } catch (error) {
        formStatus.innerHTML = "🤷🏻‍♂️ Oops! There was a problem submitting your form - give it another try 👨🏻‍💻";
        console.error(error);
    }
};

// Exports
export { form, handleSubmit };