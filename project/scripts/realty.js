const storageKey = 'havenGridVisitCount';

function setCurrentYear() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

function setLastModifiedDate() {
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
}

function updateVisitCounter() {
    const visitMessageElement = document.getElementById('visit-message');
    if (!visitMessageElement) {
        return;
    }

    const currentCountText = localStorage.getItem(storageKey);
    const visitCount = currentCountText ? parseInt(currentCountText, 10) + 1 : 1;

    localStorage.setItem(storageKey, visitCount);

    if (visitCount === 1) {
        visitMessageElement.textContent = 'Welcome to HavenGrid Properties! This is your first visit.';
    } else {
        visitMessageElement.textContent = `Welcome back to HavenGrid Properties! You have visited ${visitCount} times.`;
    }
}

function initializeInquiryTypeFields() {
    const inquiryTypeSelect = document.getElementById('inquiry-type');
    const buyerFields = document.getElementById('buyer-fields');
    const sellerFields = document.getElementById('seller-fields');
    const investorFields = document.getElementById('investor-fields');
    const conditionalFieldsets = [buyerFields, sellerFields, investorFields];

    if (!inquiryTypeSelect) {
        return;
    }

    function hideAllFieldsets() {
        conditionalFieldsets.forEach((fieldset) => {
            if (fieldset) {
                fieldset.style.display = 'none';
            }
        });
    }

    function updateFormFields() {
        hideAllFieldsets();

        if (inquiryTypeSelect.value === 'buyer' && buyerFields) {
            buyerFields.style.display = 'block';
        } else if (inquiryTypeSelect.value === 'seller' && sellerFields) {
            sellerFields.style.display = 'block';
        } else if (inquiryTypeSelect.value === 'investor' && investorFields) {
            investorFields.style.display = 'block';
        }
    }

    updateFormFields();
    inquiryTypeSelect.addEventListener('change', updateFormFields);
}

function initializeContactForm() {
    const contactForm = document.getElementById('dynamic-contact-form');
    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const formDetails = {};

        formData.forEach((value, key) => {
            formDetails[key] = value;
        });

        localStorage.setItem('userInquiry', JSON.stringify(formDetails));
        window.location.href = 'thank-you.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    setLastModifiedDate();
    updateVisitCounter();
    initializeInquiryTypeFields();
    initializeContactForm();

    console.log('HavenGrid JS: HTML loaded, ready to execute functions');
});
