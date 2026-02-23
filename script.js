const signinBtn = document.querySelector(".signin-btn");
const loginContainer = document.getElementById("loginContainer");
const closeLogin = document.getElementById("closeLogin");
const loginBtn = document.getElementById("loginBtn");

let isLoggedIn = false;

signinBtn.addEventListener("click", () => {
    loginContainer.style.display = "flex";
});

closeLogin.addEventListener("click", () => {
    loginContainer.style.display = "none";
});

loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        isLoggedIn = true;
        localStorage.setItem("user", username);
        signinBtn.innerHTML = `Logout`;
        loginContainer.style.display = "none";
        alert("Login Successful!");
    } else {
        alert("Please enter username and password");
    }
});

signinBtn.addEventListener("dblclick", () => {
    if (isLoggedIn) {
        isLoggedIn = false;
        localStorage.removeItem("user");
        signinBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
        alert("Logged Out!");
    }
});


let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartValue = document.querySelector(".cart-value");
const cartIcon = document.querySelector(".cart-icon");

let cartBox = document.createElement("div");
cartBox.classList.add("cart-box");
cartBox.style.position = "fixed";
cartBox.style.top = "80px";
cartBox.style.right = "20px";
cartBox.style.background = "#fff";
cartBox.style.width = "300px";
cartBox.style.maxHeight = "400px";
cartBox.style.overflowY = "auto";
cartBox.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
cartBox.style.padding = "15px";
cartBox.style.display = "none";
document.body.appendChild(cartBox);


function updateCartCount() {
    cartValue.textContent = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
}
updateCartCount();

const addButtons = document.querySelectorAll(".order-card .button");

addButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert("Please login first!");
            return;
        }

        const card = button.parentElement;
        const name = card.querySelector("h4").textContent;
        const price = card.querySelectorAll("h4")[1].textContent;

        const item = { name, price };

        cart.push(item);
        updateCartCount();
        alert(name + " added to cart!");
    });
});

cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    displayCart();
    cartBox.style.display = cartBox.style.display === "none" ? "block" : "none";
});


function displayCart() {
    cartBox.innerHTML = "<h3>Your Cart</h3>";

    if (cart.length === 0) {
        cartBox.innerHTML += "<p>Cart is empty</p>";
        return;
    }

    let total = 0;
    
    cart.forEach((item, index) => {

        let priceNumber = parseFloat(item.price.replace(/[^\d.]/g, ""));
        total += priceNumber;

        cartBox.innerHTML += `
            <div style="margin-bottom:10px;">
                <strong>${item.name}</strong><br>
                ${item.price}
                <button onclick="removeItem(${index})" 
                style="float:right; background:red; color:#fff; border:none; padding:3px 6px; cursor:pointer;">
                X
                </button>
            </div>
        `;
    });

    cartBox.innerHTML += `
        <hr>
        <h4 style="text-align:right;">
            Total: ₹${total.toFixed(2)}
        </h4>
    `;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCart();
}

@media (max-width: 768px) {

    
    .cart-box {
        top: auto;
        bottom: 0;
        right: 0;
        width: 100%;
        max-height: 70vh;
        border-radius: 15px 15px 0 0;
        animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
    }

    /* Order cards stack properly */
    .order-card {
        width: 100%;
    }

    /* Buttons full width */
    .order-card .button {
        width: 100%;
        padding: 10px;
    }

    /* Navbar spacing */
    .navbar {
        flex-direction: column;
        align-items: center;
    }

    .signin-btn {
        margin-top: 10px;
    }
}