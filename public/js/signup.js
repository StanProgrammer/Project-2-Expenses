const myForm = document.getElementById('myform');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('cnf-password');
const loginbtn = document.getElementById('loginbtn');

function showError(input, message) {
    const formGroup = input.parentElement;
    let error = formGroup.querySelector('.error-text');

    if (!error) {
        error = document.createElement('small');
        error.className = 'error-text text-danger';
        formGroup.appendChild(error);
    }

    error.innerText = message;
    input.classList.add('is-invalid');
}

function clearError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-text');
    
    if (error) {
        error.remove();
    }
    
    input.classList.remove('is-invalid');
}

function validateInput() {
    let isValid = true;

    if (name.value.trim() === '') {
        showError(name, 'Name is required.');
        isValid = false;
    } else {
        clearError(name);
    }

    if (email.value.trim() === '') {
        showError(email, 'Email is required.');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        showError(email, 'Email is not valid.');
        isValid = false;
    } else {
        clearError(email);
    }

    if (phone.value.trim() === '') {
        showError(phone, 'Phone number is required.');
        isValid = false;
    } else if (!/^\d{10}$/.test(phone.value)) {
        showError(phone, 'Phone number must be 10 digits.');
        isValid = false;
    } else {
        clearError(phone);
    }

    if (password.value.trim() === '') {
        showError(password, 'Password is required.');
        isValid = false;
    } else {
        clearError(password);
    }

    if (confirmPassword.value.trim() === '') {
        showError(confirmPassword, 'Confirm Password is required.');
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match.');
        isValid = false;
    } else {
        clearError(confirmPassword);
    }

    return isValid;
}

myForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (validateInput()) {
        try {
            const response = await fetch('http://localhost:3000/signup', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    password: password.value
                })
            });

            if (response.status === 200) {
                const data = await response.json();
                // eslint-disable-next-line no-alert
                alert(data.message);

                if (data.statusCode === 200) {
                    // Clear the form fields after successful submission
                    window.location.href = "http://localhost:3000/loginPage";
                }
                else {
                    
                    name.value = '';
                    email.value = '';
                    phone.value = '';
                    password.value = '';
                    confirmPassword.value = '';
                }
            } 
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
});


loginbtn.addEventListener('click', () => {
    window.location.href = "http://localhost:3000/loginPage";
});
