const myform = document.getElementById('myform');
const password = document.getElementById('password');
const email = document.getElementById('email');
const passwordError = document.createElement('div'); // Create a div for the error message
passwordError.style.color = 'red'; // Style the error message
passwordError.style.marginTop = '5px';
passwordError.style.fontSize = '0.9em';
password.parentElement.appendChild(passwordError); // Append it right after the password input

myform.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Password validation logic
    const passwordValue = password.value;
    const passwordValid = validatePassword(passwordValue);

    if (!passwordValid) {
        passwordError.textContent = 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.';
        return;
    } else {
        passwordError.textContent = ''; // Clear any previous error messages
    }

    try {
        const user1 = await axios.post('http://localhost:3000/check', {
            email: email.value,
            password: passwordValue
        });
        alert(user1.data.message);
        const token = user1.data.token;
        localStorage.setItem('token', token);
        if (user1.status === 200) {
            window.location.href = "http://localhost:3000/home";
        }
    } catch (error) {
        console.log(error);
    }
});

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
