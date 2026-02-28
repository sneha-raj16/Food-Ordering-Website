document.addEventListener("DOMContentLoaded", function () {

    const bars = document.querySelector(".bars");
    const mobileMenu = document.querySelector(".mobile-menu");

    bars.addEventListener("click", () => {
        mobileMenu.classList.toggle("mobile-menu-active");
    });


    const signInButtons = document.querySelectorAll(".signin-btn");
    const loginContainer = document.getElementById("loginContainer");
    const closeLogin = document.getElementById("closeLogin");
    const loginBtn = document.getElementById("loginBtn");

    let isLoggedIn = false;

    signInButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            if (!isLoggedIn) {
                loginContainer.style.display = "flex";
            } else {
                logoutUser();
            }
        });
    });

    closeLogin.addEventListener("click", () => {
        loginContainer.style.display = "none";
    });


    loginBtn.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username.trim() !== "" && password.trim() !== "") {

            isLoggedIn = true;

            signInButtons.forEach(btn => {
                btn.innerHTML = `
                Logout 
                <i class="fa-solid fa-arrow-right"></i>
            `;
            });

            loginContainer.style.display = "none";
            alert("Login Successful!");

        } else {
            alert("Please enter username and password.");
        }
    });


    function logoutUser() {
        isLoggedIn = false;

        signInButtons.forEach(btn => {
            btn.innerHTML = `
            Sign In 
            <i class="fa-solid fa-arrow-right"></i>
        `;
        });

        alert("Logged Out Successfully!");
    }

    const cartIcon = document.querySelector(".cart-icon");
    const cartModal = document.getElementById("cartModal");
    const closeCart = document.getElementById("closeCart");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartValue = document.querySelector(".cart-value");
    const addButtons = document.querySelectorAll(".order-card .button");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCart() {
        cartItems.innerHTML = "";

        let total = 0;
        let totalCount = 0;

        cart.forEach((item, index) => {

            total += item.price * item.quantity;
            totalCount += item.quantity;

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <div class="item-info">
                    <span>${item.name}</span>
                    <small>₹ ${item.price}</small>
                </div>

                <div class="quantity-controls">
                    <button class="minus" data-index="${index}">
                        <i class="fa-solid fa-minus"></i>
                    </button>

                    <span class="quantity">${item.quantity}</span>

                    <button class="plus" data-index="${index}">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>

                <div class="item-total">
                    ₹ ${item.price * item.quantity}
                </div>
            `;

            cartItems.appendChild(div);
        });

        cartTotal.innerText = "Total: ₹ " + total;
        cartValue.innerText = totalCount;

        addQuantityListeners();
    }

    function addQuantityListeners() {

        document.querySelectorAll(".plus").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = this.dataset.index;
                cart[index].quantity++;
                saveCart();
                updateCart();
            });
        });

        document.querySelectorAll(".minus").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = this.dataset.index;

                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }

                saveCart();
                updateCart();
            });
        });
    }

    addButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const card = this.closest(".order-card");
            const name = card.querySelectorAll("h4")[0].innerText;
            const priceText = card.querySelectorAll("h4")[1].innerText;
            const price = parseInt(priceText.replace("₹", "").trim());

            let existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
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

    cartIcon.addEventListener("click", function (e) {
        e.preventDefault();
        cartModal.style.display = "flex";
    });

    closeCart.addEventListener("click", function () {
        cartModal.style.display = "none";
    });

    updateCart();

});