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

const fields = [email, firstName, lastName, address, optionalAddress, city, zipCode, phoneNumber,
    cardNumber, cardExpiry, securityCode, cardHolderName,
    nameOnCard, billingAddress, billingOptAddress, billingCity, billingZipCode];

// form handling
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Run validation for all fields and collect results
    let isFormValid = true;
    fields.forEach((elem) => {
        const isValid = checkValue(elem);
        if (!isValid) {
            isFormValid = false;
        }
    });

    // If any field is invalid, do not proceed
    if (!isFormValid) {
        console.log("Form not submitted. Some fields are empty.");
        return;
    }

    // Collect form data into an object
    const formData = {};
    fields.forEach(elem => {
        formData[elem.name || elem.id] = elem.value.trim();
    });

    // Save to localStorage
    console.log("Form submitted successfully!");
    localStorage.setItem('checkoutFormData', JSON.stringify(formData));
    const savedData = localStorage.getItem('checkoutFormData');
    console.log("saved Data:", JSON.parse(savedData));

    resetForm();
});

// check values on input
fields.forEach(elem => {
    elem.addEventListener('input', () => checkValue(elem))
})

// toggle billing section
sameShippingBilling.addEventListener('change', function () {
    if (sameShippingBilling.checked) {
        billingSection.classList.add('hide');
    } else {
        billingSection.classList.remove('hide');
    }
})

// reset form
const resetForm = () => {
    fields.forEach((elem) => {
        elem.value = ''
        elem.classList.remove('is-valid', 'is-invalid')
    });
};

// check input value
const checkValue = (elem) => {
    const value = elem.value.trim();
    const errorSpan = document.getElementById(`${elem.id}-error`)

    if (value) {
        elem.classList.add('is-valid');
        elem.classList.remove('is-invalid');
        errorSpan.classList.add('hide');
        errorSpan.innerText = ''
        // console.log(`${elem.id}:`, elem.value.trim());
        return true;
    } else {
        // console.log(elem.id, 'feild is empty.');
        elem.classList.add('is-invalid');
        elem.classList.remove('is-valid');
        errorSpan.classList.remove('hide');
        errorSpan.innerText = 'This field is required';
        return false;
    }
};