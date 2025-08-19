// Get form elements
const form = document.getElementById('cancellation-form');
const fullName = document.getElementById('full-name');
const emailAddress = document.getElementById('email-address');
const phoneNumber = document.getElementById('phone-number');
const orderId = document.getElementById('order-id');
const commentBox = document.getElementById('comments-box');
const loader = document.getElementById('loader-box');
const submitBtn = document.getElementById('submit-button');
const successMsg = document.getElementById('success-message');

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

// Validate on input change
const handleChange = (e) => {
    const field = e.target;
    const { id, value } = field;
    const pattern = regexPatterns[id];

    if (pattern) {
        let cleanedValue = value;
        if (pattern.clean) {
            cleanedValue = value.replace(pattern.clean, '');
            field.value = cleanedValue;
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
};

// Input validation listener
allFields.forEach((field) => {
    field.addEventListener('input', handleChange);
});

// Form submission
form.addEventListener('submit', (event) => {
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
    localStorage.setItem('cancelSubscription', JSON.stringify(formData));
    const submittedData = JSON.parse(localStorage.getItem('cancelSubscription'));
    console.log('submittedData:', submittedData);

    submitBtn.classList.add('hide');
    loader.classList.remove('hide');

    updateSheet(submittedData);
});

// Validate single field
const checkValue = (field) => {
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
};

// Show error on field
const showError = (elem, errorSpan, message) => {
    elem.classList.add('is-invalid');
    elem.classList.remove('is-valid');
    if (errorSpan) {
        errorSpan.classList.remove('hide');
        errorSpan.innerText = message;
    }
};

// Reset form
const resetForm = () => {
    allFields.forEach((field) => {
        field.value = '';
        field.classList.remove('is-valid', 'is-invalid');
        const errorSpan = document.getElementById(`${field.id}-error`);
        if (errorSpan) {
            errorSpan.classList.add('hide');
            errorSpan.innerText = '';
        }
    });
};

// hide message
const hideMessage = () => {
    setTimeout(() => {
        successMsg.classList.add('hide');
    }, 4000)
};

// Call API to save data in excel sheet
const updateSheet = async (formData) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        formData: formData,
        sheetName: "Funnel Page - 3",
        column: "!B4:G4"
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
            loader.classList.add('hide');
            submitBtn.classList.remove('hide');
            successMsg.classList.remove('hide');
            hideMessage();
            resetForm();
            console.log("submitted response");
        } else {
            console.error("Server returned error:", result.message);
        }
    } catch (error) {
        console.warn("Fetch failed:", error);
    }
};