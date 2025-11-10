$(document).ready(function () {
    console.log("Auth system is ready!");

    const $navLogin = $('#nav-login');
    const $navSignup = $('#nav-signup');
    const $navProfile = $('#nav-profile');
    const $navLogout = $('#nav-logout');

    const $signupForm = $('#signup-form');
    const $loginForm = $('#login-form');
    const $profileLogoutBtn = $('#profile-logout-btn');

    function getUsers() {
        return JSON.parse(localStorage.getItem('celeryUsers')) || [];
    }

    function saveUsers(users) {
        localStorage.setItem('celeryUsers', JSON.stringify(users));
    }

    function getCurrentUser() {
        return JSON.parse(localStorage.getItem('celeryCurrentUser'));
    }

    function setCurrentUser(user) {
        localStorage.setItem('celeryCurrentUser', JSON.stringify(user));
    }

    function clearCurrentUser() {
        localStorage.removeItem('celeryCurrentUser');
    }

    function updateNavbar() {
        const user = getCurrentUser();
        if (user) {
            $navLogin.addClass('d-none');
            $navSignup.addClass('d-none');
            $navProfile.removeClass('d-none');
            $navLogout.removeClass('d-none');
        } else {
            $navLogin.removeClass('d-none');
            $navSignup.removeClass('d-none');
            $navProfile.addClass('d-none');
            $navLogout.addClass('d-none');
        }
    }

    function handleSignUp(e) {
        e.preventDefault();
        e.stopPropagation();

        const $form = $(this);
        const $name = $('#signup-name');
        const $email = $('#signup-email');
        const $password = $('#signup-password');
        const $error = $('#signup-error');
        const $success = $('#signup-success');
        const $passwordFeedback = $('#password-feedback');

        let isValid = true;
        $error.addClass('d-none');
        $success.addClass('d-none');

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if ($password.val().length < 8) {
            $password[0].setCustomValidity('Password must be at least 8 characters long.');
            $passwordFeedback.text('Password must be at least 8 characters long.');
            isValid = false;
        } else if (!passwordRegex.test($password.val())) {
            $password[0].setCustomValidity('Password must contain at least one letter and one number.');
            $passwordFeedback.text('Password must contain at least one letter and one number.');
            isValid = false;
        } else {
            $password[0].setCustomValidity('');
            $passwordFeedback.text('Password is required.');
        }

        if ($form[0].checkValidity() === false || isValid === false) {
            $form.addClass('was-validated');
            return;
        }

        const users = getUsers();
        const emailExists = users.some(user => user.email === $email.val());

        if (emailExists) {
            $error.removeClass('d-none');
        } else {
            const newUser = {
                name: $name.val(),
                email: $email.val(),
                password: $password.val()
            };
            users.push(newUser);
            saveUsers(users);

            $success.removeClass('d-none');
            $form[0].reset();
            $form.removeClass('was-validated');
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        e.stopPropagation();

        const $form = $(this);
        const $email = $('#login-email');
        const $password = $('#login-password');
        const $error = $('#login-error');

        $error.addClass('d-none');

        if ($form[0].checkValidity() === false) {
            $form.addClass('was-validated');
            return;
        }

        const users = getUsers();
        const foundUser = users.find(user => user.email === $email.val() && user.password === $password.val());

        if (foundUser) {
            setCurrentUser({
                name: foundUser.name,
                email: foundUser.email
            });
            window.location.href = 'profile.html';
        } else {
            $error.removeClass('d-none');
            $form.removeClass('was-validated');
        }
    }

    function handleLogout() {
        clearCurrentUser();
        updateNavbar();
        window.location.href = 'index.html';
    }

    function displayProfileInfo() {
        const $profileWelcome = $('#profile-welcome');
        const $profileName = $('#profile-name');
        const $profileEmail = $('#profile-email');

        const user = getCurrentUser();

        if (user) {
            $profileWelcome.text(`Welcome, ${user.name}!`);
            $profileName.text(user.name);
            $profileEmail.text(user.email);
        }
    }

    function protectPage() {
        if (!getCurrentUser()) {
            window.location.href = 'login.html';
        }
    }

    updateNavbar();

    $navLogout.on('click', handleLogout);

    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'signup.html') {
        $signupForm.on('submit', handleSignUp);
    }

    if (currentPage === 'login.html') {
        $loginForm.on('submit', handleLogin);
    }

    if (currentPage === 'profile.html') {
        protectPage();
        displayProfileInfo();
        $profileLogoutBtn.on('click', handleLogout);
    }
});