// form elements
const form = document.getElementById('cancellation-form');
const fullName = document.getElementById('full-name');
const emailAddress = document.getElementById('email-address');
const phoneNumber = document.getElementById('phone-number');
const orderId = document.getElementById('order-id');
const commentBox = document.getElementById('comments-box');

const allFields = [fullName, emailAddress, phoneNumber, orderId, commentBox];

// handle form submit
form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Form submit triggered.");

    let isFormValid = true;
    allFields.forEach((field) => {
        const isValid = checkValue(field);
        if (!isValid) {
            isFormValid = false;
        }
    });

    // if values are not filled then form will not submit
    if (!isFormValid) {
        console.error('Please, fill the required fields.')
        return;
    }

    const formData = {};
    allFields.forEach((field) => {
        formData[field.id] = field.value;
    });

    console.log('✅ submitted details:', formData);
    resetForm();

});

// check input fields while input
allFields.forEach((field) => {
    field.addEventListener('input', () => checkValue(field))
});

// reset forms
const resetForm = () => {
    allFields.forEach((field) => {
        field.value = '';
        field.classList.remove('is-valid', 'is-invalid');
    })
};

// check input values
const checkValue = (field) => {
    const value = field.value;
    const errorSpan = document.getElementById(`${field.id}-error`);

    if (value) {
        handleClass(field, 'is-valid', field, 'is-invalid');
        errorSpan.classList.add('hide');
        errorSpan.innerText = '';
        return true;
    } else {
        handleClass(field, 'is-invalid', field, 'is-valid');
        errorSpan.classList.remove('hide');
        errorSpan.innerText = 'This field is required';
        return false;
    }
};

// handle class
const handleClass = (elem1, class1, elem2, class2) => {
    elem1.classList.add(class1);
    if (elem2 && class2) {
        elem2.classList.remove(class2);
    }
};
