function validateRegisterForm() {
    let name = document.getElementById("full_name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm_password").value;

    let errors = [];

    if (name === "") errors.push("Full name is required");
    if (email === "" || !email.includes("@")) errors.push("Valid email required");
    if (password.length < 6) errors.push("Password must be at least 6 characters");
    if (password !== confirm) errors.push("Passwords do not match");

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

    alert("Registration successful");
    return true;
}

function validateLoginForm() {
    let email = document.getElementById("login_email").value;
    let password = document.getElementById("login_password").value;

    let errors = [];

    if (email === "") errors.push("Email required");
    if (password === "") errors.push("Password required");

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

    alert("Login successful");
    return true;
}