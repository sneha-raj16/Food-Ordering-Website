document.addEventListener("DOMContentLoaded", function () {

    const bars = document.querySelector(".bars");
    const mobileMenu = document.querySelector(".mobile-menu");

    bars.addEventListener("click", function (e) {
        e.preventDefault();
        mobileMenu.classList.toggle("mobile-menu-active");
    });


    const signInButtons = document.querySelectorAll(".signin-btn");
    const loginContainer = document.getElementById("loginContainer");
    const closeLogin = document.getElementById("closeLogin");
    const loginBtn = document.getElementById("loginBtn");

    signInButtons.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            loginContainer.classList.add("active");
        });
    });

    closeLogin.addEventListener("click", function () {
        loginContainer.classList.remove("active");
    });

    loginContainer.addEventListener("click", function (e) {
        if (e.target === loginContainer) {
            loginContainer.classList.remove("active");
        }
    });

    loginBtn.addEventListener("click", function () {

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "" || password === "") {
            alert("Please enter username and password!");
        } else {
            alert("Login Successful!");
            loginContainer.classList.remove("active");
        }
    });

});


    const cartIcon = document.querySelector(".cart-icon");
    const cartModal = document.getElementById("cartModal");
    const closeCart = document.getElementById("closeCart");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartValue = document.querySelector(".cart-value");
    const addButtons = document.querySelectorAll(".order-card .button");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCart();

    cartIcon.addEventListener("click", function (e) {
        e.preventDefault();
        cartModal.style.display = "flex";
    });

    closeCart.addEventListener("click", function () {
        cartModal.style.display = "none";
    });

    addButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const card = this.closest(".order-card");
            const name = card.querySelectorAll("h4")[0].innerText;
            const priceText = card.querySelectorAll("h4")[1].innerText;
            const price = parseInt(priceText.replace("₹", ""));

            let found = false;

            cart.forEach(function (item) {
                if (item.name === name) {
                    item.quantity += 1;
                    found = true;
                }
            });

            if (!found) {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            saveCart();
            updateCart();
        });
    });


    function updateCart() {

        cartItems.innerHTML = "";

        let total = 0;
        let totalQuantity = 0;

        cart.forEach(function (item, index) {

            total += item.price * item.quantity;
            totalQuantity += item.quantity;

            const div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.marginBottom = "10px";

            div.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>₹ ${item.price * item.quantity}</span>
                <button data-index="${index}">Remove</button>
            `;

            cartItems.appendChild(div);
        });

        cartTotal.innerText = "Total: ₹ " + total;
        cartValue.innerText = totalQuantity;

        const removeButtons = cartItems.querySelectorAll("button");

        removeButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                saveCart();
                updateCart();
            });
        });
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
