document.addEventListener("DOMContentLoaded", function () {

    const bars = document.querySelector(".bars");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (bars && mobileMenu) {
        bars.addEventListener("click", function (e) {
            e.preventDefault();
            mobileMenu.classList.toggle("mobile-menu-active");
        });
    }


    const signInButtons = document.querySelectorAll(".signin-btn");
    const loginContainer = document.getElementById("loginContainer");
    const closeLogin = document.getElementById("closeLogin");
    const loginBtn = document.getElementById("loginBtn");

    signInButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            loginContainer.style.display = "flex";
            mobileMenu.classList.remove("mobile-menu-active");
        });
    });

    if (closeLogin) {
        closeLogin.addEventListener("click", function () {
            loginContainer.style.display = "none";
        });
    }

    window.addEventListener("click", function (e) {
        if (e.target === loginContainer) {
            loginContainer.style.display = "none";
        }
    });

    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (username === "" || password === "") {
                alert("Please enter username and password!");
            } else {
                alert("Login Successful!");
                loginContainer.style.display = "none";
            }
        });
    }



    document.addEventListener("DOMContentLoaded", function () {

    const cartIcon = document.querySelector(".cart-icon");
    const cartValue = document.querySelector(".cart-value");
    const cartModal = document.getElementById("cartModal");
    const closeCart = document.getElementById("closeCart");
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const addToCartButtons = document.querySelectorAll(".order-card a.button");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCart();

    cartIcon.addEventListener("click", function (e) {
        e.preventDefault();
        cartModal.style.display = "flex";
    });

    closeCart.addEventListener("click", function () {
        cartModal.style.display = "none";
    });

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const card = this.closest(".order-card");
            const name = card.querySelectorAll("h4")[0].innerText;
            const priceText = card.querySelectorAll("h4")[1].innerText;
            const price = parseInt(priceText.replace("₹", "").trim());

            const existingItem = cart.find(item => item.name === name);

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
            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        let itemCount = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            itemCount += item.quantity;

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>₹ ${item.price * item.quantity}</span>
                <button onclick="removeItem(${index})">X</button>
            `;

            cartItemsContainer.appendChild(div);
        });

        cartTotal.innerText = "Total: ₹ " + total;
        cartValue.innerText = itemCount;
    }

    window.removeItem = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    };

});
    
    const orderNowBtn = document.querySelector(".hero-section .button");

    if (orderNowBtn) {
        orderNowBtn.addEventListener("click", function (e) {
            e.preventDefault();

            document.querySelector(".menu").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    const navLinks = document.querySelectorAll(".navlist a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const text = this.innerText.toLowerCase();

            if (text.includes("menu")) {
                document.querySelector(".menu").scrollIntoView({ behavior: "smooth" });
            }
            if (text.includes("services")) {
                document.querySelector(".service-card").scrollIntoView({ behavior: "smooth" });
            }
        });
    });

});