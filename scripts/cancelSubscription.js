// Get form elements
const form = document.getElementById('cancellation-form');
const fullName = document.getElementById('full-name');
const emailAddress = document.getElementById('email-address');
const phoneNumber = document.getElementById('phone-number');
const orderId = document.getElementById('order-id');
const commentBox = document.getElementById('comments-box');

// Group all input fields
const allFields = [fullName, emailAddress, phoneNumber, orderId, commentBox];

// Validation rules
const regexPatterns = {

    'full-name': {
        regex: /^[A-Za-zÀ-ÿ\s'-]{2,50}$/,
        clean: /[^A-Za-zÀ-ÿ\s'-]/g,
        error: 'Name should contain only letters (2–50 characters)'
    },

    'email-address': {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        clean: /[^a-zA-Z0-9@._%+-]/g,
        error: 'Please enter a valid email address'
    },

    'phone-number': {
        regex: /^\d{10,15}$/,
        clean: /[^\d]/g,
        error: 'Phone number must be 10–15 digits'
    },

    'order-id': {
        regex: /^[A-Z0-9\-]{5,20}$/,
        clean: /[^A-Z0-9\-]/g,
        error: 'Order ID mentioned on the bill'
    },

    'comments-box': {
        regex: /^.{10,800}$/,
        clean: null,
        error: 'Comment must be between 10 and 800 characters'
    }
};

// Event listener: input validation
allFields.forEach((field) => {
    field.addEventListener('input', handleChange)
});

// Event listener: form submission
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

    if (!isFormValid) {
        console.error('❌ Please correct the highlighted fields.');
        return;
    }

    const formData = {};
    allFields.forEach((field) => {
        formData[field.id] = field.value;
    });

    console.log('✅ Details Submitted Successfully');
    localStorage.setItem('cancelSubsctiption', JSON.stringify(formData));
    const submitedData = JSON.parse(localStorage.getItem('cancelSubsctiption'));
    console.log('submitedData:', submitedData);

    resetForm();
});

// Validate on change
function handleChange(e) {
    const field = e.target;
    const { id, value } = field;
    const pattern = regexPatterns[id];

    if (pattern) {
        let cleanedValue = value;
        if (pattern.clean) {
            cleanedValue = value.replace(pattern.clean, '');
            field.value = cleanedValue; // update field value
        }

        const isValid = pattern.regex.test(cleanedValue);
        const errorSpan = document.getElementById(`${id}-error`);

        if (!isValid) {
            showError(field, errorSpan, pattern.error);
        } else {
            field.classList.add('is-valid');
            field.classList.remove('is-invalid');
            if (errorSpan) {
                errorSpan.classList.add('hide');
                errorSpan.innerText = '';
            }
        }
    }
}

// Validate single field
function checkValue(field) {
    const value = field.value;
    const patternData = regexPatterns[field.id];
    const errorSpan = document.getElementById(`${field.id}-error`);

    if (!value) {
        showError(field, errorSpan, 'This field is required');
        return false;
    }

    if (patternData && !patternData.regex.test(value)) {
        showError(field, errorSpan, patternData.error);
        return false;
    }

    field.classList.add('is-valid');
    field.classList.remove('is-invalid');
    if (errorSpan) {
        errorSpan.classList.add('hide');
        errorSpan.innerText = '';
    }

    return true;
}

// Show error on field
function showError(elem, errorSpan, message) {
    elem.classList.add('is-invalid');
    elem.classList.remove('is-valid');
    if (errorSpan) {
        errorSpan.classList.remove('hide');
        errorSpan.innerText = message;
    }
}

// Reset form and styles
function resetForm() {
    allFields.forEach((field) => {
        field.value = '';
        field.classList.remove('is-valid', 'is-invalid');
        const errorSpan = document.getElementById(`${field.id}-error`);
        if (errorSpan) {
            errorSpan.classList.add('hide');
            errorSpan.innerText = '';
        }
    });
}
