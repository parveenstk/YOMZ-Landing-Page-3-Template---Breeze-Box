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

const messageBox = document.getElementById('status-message-box');
const innerMsg = document.getElementById('status-message');

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
        innerMsg.classList.add('hide');
    }, 4000)
};

// handle classes
const toggleClass = ({ elem1, addCls1, elem2, removeCls2 }) => {
    elem1 && addCls1 && elem1.classList.add(addCls1);
    elem2 && removeCls2 && elem2.classList.remove(removeCls2);
};

// according to status content
const messageContent = {
    success: {
        backgroundColor: '#d1f4da',
        color: '#4d7e40',
        innerText: 'Thank you for contacting us. We’ll respond within 1–2 business days.'
    },
    error: {
        backgroundColor: '#f9eded',
        color: '#db4c6b',
        innerText: 'Something went wrong, please try again later.'
    }
};

// dynamic update message
const updatedMessage = (status) => {
    const content = messageContent[status];

    if (!content) {
        console.warn(`Message content not found for status: "${status}"`);
        return; // Exit if invalid status provided
    }

    messageBox.classList.remove('hide');

    innerMsg.innerText = content.innerText;
    innerMsg.style.color = content.color;
    innerMsg.style.backgroundColor = content.backgroundColor;
};

// API implemented
const updateSheet = async (formData) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        formData: formData,
        sheetName: "Funnel Page - 3",
        column: "!I4:O4"
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort(); // Cancel the fetch request after 30 seconds
    }, 30000); // 30000 ms = 30 seconds

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        signal: controller.signal  // attach abort signal here
    };

    try {
        const response = await fetch("https://yomz-pages-data.vercel.app/api/contactUs", requestOptions);
        clearTimeout(timeoutId);  // Clear the timeout if fetch completes on time

        const result = await response.json();
        if (result.status === 'SUCCESS') {
            toggleClass({ elem1: loader, addCls1: 'hide', elem2: submitBtn, removeCls2: 'hide' });
            updatedMessage('success');
            hideMessage();
            formReset();
        } else {
            console.error("Server returned error:", result.message);
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            toggleClass({ elem1: loader, addCls1: 'hide', elem2: submitBtn, removeCls2: 'hide' });
            formReset();
            hideMessage();
            updatedMessage('error');
            console.warn("Request timed out after 30 seconds and was cancelled.");
        } else {
            console.warn("Fetch failed:", error);
        }
    }
};
