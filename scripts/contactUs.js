// form elemetns
const form = document.getElementById('contactUs-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const phoneNumber = document.getElementById('phone-number');
const email = document.getElementById('email-address');
const subject = document.getElementById('subject');
const comments = document.getElementById('comments-box');

const allFields = [firstName, lastName, phoneNumber, email, subject, comments];
const requiredFields = [firstName, phoneNumber, email, comments];

const regexPatters = {

    "first-name": {
        pattern: /^[A-Za-z\s'-]{2,15}$/,
        message: 'first name contain only letters'
    },

    "phone-number": {
        pattern: /^\d{10,15}$/,
        message: 'phone number (10–15 digits)'
    },

    "email-address": {
        pattern: /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
        message: 'Enter a valid email address (e.g. name@example.com)'
    },

    "comments-box": {
        pattern: /^.{10,500}$/,
        message: 'Comments should be between 10 and 500 characters'
    },
};

// form handling
form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("form submit triggered.");

    let isValid = true;
    requiredFields.forEach((field) => {
        if (!checkValue(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        console.warn("Please, fill the required fields.");
        return;
    };

    const formData = {};
    allFields.forEach((field) => {
        formData[field.id] = field.value.trim();
    });

    // saving data in localStorage
    localStorage.setItem('contactUsData', JSON.stringify(formData));
    const submittedData = JSON.parse(localStorage.getItem('contactUsData'));
    console.log('submittedData:', submittedData);

    formReset(); // reset all fields
});

// checking while input
requiredFields.forEach((field) => {
    field.addEventListener('input', () => checkValue(field))
});

// reset form
const formReset = () => {
    allFields.forEach((field) => {
        const errorSpan = document.getElementById(`${field.id}-error`);
        field.value = '';
        field.classList.remove('is-valid', 'is-invalid');
        errorSpan && errorSpan.classList.add('hide');
    })
};

// helping function
const showError = (elem, errorSpan, message) => {
    elem.classList.add('is-invalid');
    elem.classList.remove('is-valid');
    if (errorSpan) {
        errorSpan.classList.remove('hide');
        errorSpan.innerText = message;
    }
};

// check input value
const checkValue = (elem) => {
    const value = elem.value;
    const errorSpan = document.getElementById(`${elem.id}-error`);
    const regex = regexPatters[elem.id];

    if (!value) {
        showError(elem, errorSpan, 'This field is required')
        return false;
    };

    if (regex && !regex.pattern.test(value)) {
        showError(elem, errorSpan, regex.message)
        return false;
    };

    elem.classList.remove('is-invalid');
    elem.classList.add('is-valid');
    errorSpan.classList.add('hide');
    errorSpan.innerText = '';
    return true;
};
