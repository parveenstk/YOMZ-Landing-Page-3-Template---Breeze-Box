// form elements
const form = document.getElementById('checkout-form');

// shipping elements
const email = document.getElementById('email-address');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const address = document.getElementById('shipping-address');
const optionalAddress = document.getElementById('apt-suite-optional');
const city = document.getElementById('city');
const zipCode = document.getElementById('zip-code');
const phoneNumber = document.getElementById('phone-number');

// credit card elements
const cardNumber = document.getElementById('card-number');
const cardExpiry = document.getElementById('card-expiry');
const securityCode = document.getElementById('card-security-code');
const cardHolderName = document.getElementById('cardholder-name');

// billing details
const nameOnCard = document.getElementById('name-on-card');
const billingAddress = document.getElementById('billing-address');
const billingOptAddress = document.getElementById('billing-apt-optional');
const billingCity = document.getElementById('billing-city');
const billingZipCode = document.getElementById('billing-zip-code');

// billing section
const sameShippingBilling = document.getElementById('sameShippingBilling');
const billingSection = document.getElementById('billing-section');

const submitBtn = document.getElementById('complete-purchase');
const loader = document.getElementById('spinner-box');

const allFields = [
    email, firstName, lastName, address, optionalAddress, city, zipCode, phoneNumber,
    cardNumber, cardExpiry, securityCode, cardHolderName,
    nameOnCard, billingAddress, billingOptAddress, billingCity, billingZipCode
];

const billingFields = [nameOnCard, billingAddress, billingOptAddress, billingCity, billingZipCode];
const shippingFeilds = allFields.filter(feild => !billingFields.includes(feild));

const validationRules = {

    'email-address': {
        pattern: /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
        message: 'Enter a valid email address (e.g. name@example.com)'
    },

    'first-name': {
        pattern: /^[A-Za-z\s'-]{2,15}$/,
        message: 'first name contain only letters'
    },

    'last-name': {
        pattern: /^[A-Za-z\s'-]{2,15}$/,
        message: 'last name contain only letters'
    },

    'shipping-address': {
        pattern: /^[A-Za-z0-9\s.,#'-]{5,50}$/,
        message: 'Enter a valid street address'
    },

    'apt-suite-optional': {
        pattern: /^[A-Za-z0-9\s.,#'-]{0,50}$/,
        message: 'Apt/Suite must be a valid optional address'
    },

    'city': {
        pattern: /^[A-Za-z\s'-]{2,50}$/,
        message: 'City name only contain letters'
    },

    'zip-code': {
        pattern: /^\d{5}(-\d{4})?$/,
        message: 'Enter a valid ZIP code (e.g. 12345 or 12345-6789)'
    },

    'phone-number': {
        pattern: /^\d{10,15}$/,
        message: 'phone number (10–15 digits)'
    },

    'card-number': {
        pattern: /^(\d{4} ?){3,4}\d{3,4}$/,
        message: 'Card number must be 15–19 digits with spaces every 4 digits'
    },

    'card-expiry': {
        pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
        message: 'Expiry must be in MM/YY format and not expired.'
    },

    'card-security-code': {
        pattern: /^\d{3,4}$/,
        message: 'Enter a 3 or 4-digit CVV'
    },

    'cardholder-name': {
        pattern: /^[A-Za-z\s'-]{2,25}$/,
        message: 'Cardholder name only contain letters'
    },

    'name-on-card': {
        pattern: /^[A-Za-z\s'-]{2,25}$/,
        message: 'Name on card contain only letters'
    },

    'billing-address': {
        pattern: /^[A-Za-z0-9\s.,#'-]{5,50}$/,
        message: 'Enter a valid billing street address'
    },

    'billing-apt-optional': {
        pattern: /^[A-Za-z0-9\s.,#'-]{0,50}$/,
        message: 'Enter a valid optional billing address'
    },

    'billing-city': {
        pattern: /^[A-Za-z\s'-]{2,50}$/,
        message: 'Billing city contain only letters'
    },

    'billing-zip-code': {
        pattern: /^\d{5}(-\d{4})?$/,
        message: 'Enter a valid ZIP code (e.g. 12345 or 12345-6789)'
    }
};

// form handling
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (sameShippingBilling.checked) {
        sameBilling();
    }

    let isFormValid = true;

    // Validate non-billing fields always
    shippingFeilds.forEach((elem) => {
        const isValid = checkValue(elem);
        if (!isValid) {
            isFormValid = false;
        }
    });

    // Validate billing fields only if checkbox is NOT checked
    if (!sameShippingBilling.checked) {
        billingFields.forEach((elem) => {
            const isValid = checkValue(elem);
            if (!isValid) {
                isFormValid = false;
            }
        });
    }

    if (!isFormValid) {
        console.log("Form not submitted. Some fields are empty.");
        return;
    }

    // saved data on condition
    let formData = {};
    allFields.forEach(elem => {
        formData[elem.id] = elem.value.trim();
    });

    hideToggle(submitBtn, loader); // toggling loader & submitBtm

    // Save to localStorage
    console.log("Form submitted successfully!");
    localStorage.setItem('checkoutFormData', JSON.stringify(formData));
    const savedData = JSON.parse(localStorage.getItem('checkoutFormData'));
    console.log("saved Data:", savedData);

    updateSheet(savedData);
});

// same billing details
const sameBilling = () => {
    nameOnCard.value = cardHolderName.value;
    billingAddress.value = address.value;
    billingOptAddress.value = optionalAddress.value;
    billingCity.value = city.value;
    billingZipCode.value = zipCode.value;
};

sameShippingBilling.addEventListener('click', sameBilling);

// handle hide toggle
const hideToggle = (elem, elem2) => {
    elem.classList.add('hide');
    elem2.classList.remove('hide');
};

// handle card number
cardNumber.addEventListener('input', () => {
    let value = cardNumber.value.replace(/\D/g, '').slice(0, 19); // digits only
    let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    cardNumber.value = formatted;
    checkValue(cardNumber);
});

// handle card expiry 
cardExpiry.addEventListener('input', () => {
    // let value = replaceChar(cardExpiry, /\D/g);
    let value = cardExpiry.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length >= 3) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }

    cardExpiry.value = value;
    checkValue(cardExpiry);
});

// check values on input
allFields.forEach(elem => {
    elem.addEventListener('input', () => checkValue(elem));
});

// toggle billing section
sameShippingBilling.addEventListener('change', function () {
    if (sameShippingBilling.checked) {
        billingSection.classList.add('hide');

        // Clear validation styles and errors for billing fields
        billingFields.forEach((elem) => {
            elem.classList.remove('is-valid', 'is-invalid');
            const errorSpan = document.getElementById(`${elem.id}-error`);
            if (errorSpan) {
                errorSpan.classList.add('hide');
                errorSpan.innerText = '';
            }
        });
    } else {
        billingSection.classList.remove('hide');
    }
});

// reset form
const resetForm = () => {
    const allFields = [
        email, firstName, lastName, address, optionalAddress, city, zipCode, phoneNumber,
        cardNumber, cardExpiry, securityCode, cardHolderName,
        nameOnCard, billingAddress, billingOptAddress, billingCity, billingZipCode
    ];
    allFields.forEach((elem) => {
        elem.value = '';
        elem.classList.remove('is-valid', 'is-invalid');
    });
};

// helper: show error message and styling
const showError = (elem, errorSpan, message) => {
    elem.classList.add('is-invalid');
    elem.classList.remove('is-valid');
    if (errorSpan) {
        errorSpan.classList.remove('hide');
        errorSpan.innerText = message;
    }
};

// check input values & regax
const checkValue = (elem) => {
    const value = elem.value.trim();
    const errorSpan = document.getElementById(`${elem.id}-error`);
    const rule = validationRules[elem.id];

    if (!value) {
        showError(elem, errorSpan, 'This field is required');
        return false;
    }

    if (rule && !rule.pattern.test(value)) {
        showError(elem, errorSpan, rule.message);
        return false;
    }

    // ✅ Card Expiry Extra Logic
    if (elem.id === 'card-expiry') {
        const [monthStr, yearStr] = value.split('/');
        const inputMonth = parseInt(monthStr, 10);
        const inputYear = parseInt(yearStr, 10);

        if (isNaN(inputMonth) || isNaN(inputYear) || inputMonth < 1 || inputMonth > 12) {
            showError(elem, errorSpan, 'Enter a valid month (01–12).');
            return false;
        }

        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        const maxYear = currentYear + 10;

        if (inputYear < currentYear || inputYear > maxYear) {
            showError(elem, errorSpan, `Year must be between ${currentYear} and ${maxYear}`);
            return false;
        }

        if (inputYear === currentYear && inputMonth < currentMonth) {
            showError(elem, errorSpan, `Expiry month must not be in the past.`);
            return false;
        }
    }

    elem.classList.add('is-valid');
    elem.classList.remove('is-invalid');
    if (errorSpan) {
        errorSpan.classList.add('hide');
        errorSpan.innerText = '';
    }
    return true;
};

// Call API to save data in excel sheet
const updateSheet = async (formData) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        formData: formData,
        sheetName: "F.P - 3 checkout",
        column: "!B4:S4"
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
            resetForm();
            hideToggle(loader, submitBtn);
            window.location = './offer1.html';
        } else {
            console.error("Server returned error:", result.message);
        }
    } catch (error) {
        console.warn("Fetch failed:", error);
    }
};