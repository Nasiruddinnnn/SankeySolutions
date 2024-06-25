const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');



    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value)) {
            emailError.innerHTML = ''; // Clear error message
        } else {
            emailError.innerHTML = 'Please enter a valid email address.'; // Display error message
        }
    }

    function validatePassword() {
        if (passwordInput.value.length >= 8) {
            passwordError.innerHTML = ''; // Clear error message
        } else {
            passwordError.innerHTML = 'Password must be at least 8 characters long.'; // Display error message
        }
    }

    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        validateEmail(); 
        validatePassword(); 
        if (emailError.innerHTML !== '' || passwordError.innerHTML !== '') {
            event.preventDefault(); 
        }
    });


const validEmail = "nasir@gmail.com";
const validPassword = "password123";

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Check email and password
    if (emailInput.value === validEmail && passwordInput.value === validPassword) {
        loginResult.style.color = 'green';
        loginResult.innerHTML = 'Login successful! Redirecting...';
        // Perform redirection
        setTimeout(() => {
            window.location.href = 'welcome.html'; 
        }, 4000); 
    } else {
        loginResult.style.color = 'red';
        loginResult.innerHTML = 'Invalid email or password.';
    }

}
)

