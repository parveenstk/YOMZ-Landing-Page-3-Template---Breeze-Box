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
const submitBtn = document.getElementById('submit-button');
const loader = document.getElementById('loader-box');
const successMsg = document.getElementById('contactUs-success');

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
    // console.log("form submit triggered.");

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

    toggleClass({ elem1: submitBtn, addCls1: 'hide', elem2: loader, removeCls2: 'hide' });
    updateSheet(submittedData); // sending data to API
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

// hide message funtion
const hideMessage = () => {
    setTimeout(() => {
        successMsg.classList.add('hide');
    }, 4000)
};

const toggleClass = ({ elem1, addCls1, elem2, removeCls2 }) => {
    elem1 && addCls1 && elem1.classList.add(addCls1);
    elem2 && removeCls2 && elem2.classList.remove(removeCls2);
};

// Call API to save data in excel sheet
const updateSheet = async (formData) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        formData: formData,
        sheetName: "Funnel Page - 3",
        column: "!I4:O4"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://yomz-pages-data.vercel.app/api/contactUs", requestOptions);
        const result = await response.json(); // Now this works properly

        if (result.status === 'SUCCESS') {
            toggleClass({ elem1: loader, addCls1: 'hide', elem2: submitBtn, removeCls2: 'hide' });
            successMsg.classList.remove('hide');
            hideMessage();
            formReset();
        } else {
            console.error("Server returned error:", result.message);
        }
    } catch (error) {
        console.warn("Fetch failed:", error);
    }
};