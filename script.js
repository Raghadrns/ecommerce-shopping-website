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

// Shopping Cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "page4.html";
}

function renderCart() {
    const cartBody = document.getElementById("cart-body");
    const cartTotal = document.getElementById("cart-total");

    if (!cartBody || !cartTotal) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartBody.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td>${itemTotal.toFixed(2)}</td>
            <td>
                <button class="btn" onclick="removeFromCart(${index})">Remove</button>
            </td>
        `;

        cartBody.appendChild(row);
    });

    cartTotal.textContent = total.toFixed(2);
}

function changeQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let newOrder = {
        id: orders.length + 1,
        total: total,
        date: new Date().toLocaleString()
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("Order placed successfully!");

    window.location.href = "page5.html";
}

function renderOrders() {
    const ordersBody = document.getElementById("orders-body");
    const noOrders = document.getElementById("no-orders");

    if (!ordersBody || !noOrders) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    ordersBody.innerHTML = "";

    if (orders.length === 0) {
        noOrders.style.display = "block";
        return;
    }

    noOrders.style.display = "none";

    orders.forEach(order => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.total.toFixed(2)}</td>
            <td>${order.date}</td>
        `;

        ordersBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderCart();
    renderOrders();
});
