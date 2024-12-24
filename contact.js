document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let fields = ['firstName', 'lastName', 'mobile', 'address', 'age', 'hobbies', 'country', 'message'];
    fields.forEach(function (field) {
        let input = document.getElementById(field);
        if (input) {
            input.classList.remove('error');
        }
    });

    let missingFields = [];
    fields.forEach(function (field) {
        let input = document.getElementById(field);
        if (input && input.value.trim() === '') {
            missingFields.push(field.charAt(0).toUpperCase() + field.slice(1));
            input.classList.add('error');
        }
    });

    const mobile = document.getElementById('mobile').value.trim();
    if (mobile && !/^\d{10}$/.test(mobile)) {
        missingFields.push('Valid Mobile (10 digits)');
        document.getElementById('mobile').classList.add('error');
    }

    const age = document.getElementById('age').value.trim();
    if (age && (isNaN(age) || age < 1 || age > 120)) {
        missingFields.push('Valid Age (1-120)');
        document.getElementById('age').classList.add('error');
    }

    if (missingFields.length > 0) {
        let message = 'Please fill in or correct the following fields:\n' + missingFields.join(', ');
        showModal(message);
    } else {
        showModal('Thank you for your message!');
        this.reset();
    }
});

function showModal(message) {
    document.getElementById('modal-text').textContent = message;
    const modal = document.getElementById('custom-modal');
    modal.classList.add('show');
}

document.getElementById('close-modal').addEventListener('click', function () {
    const modal = document.getElementById('custom-modal');
    modal.classList.remove('show');
});

window.addEventListener('click', function (event) {
    const modal = document.getElementById('custom-modal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});
