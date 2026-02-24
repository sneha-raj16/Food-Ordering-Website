const bars = document.querySelector(".bars");
const mobileMenu = document.querySelector(".mobile-menu");

bars.addEventListener("click", () => {
    mobileMenu.classList.toggle("mobile-menu-active");
});

const signInButtons = document.querySelectorAll(".signin-btn");
const loginContainer = document.getElementById("loginContainer");
const closeLogin = document.getElementById("closeLogin");

signInButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        loginContainer.style.display = "flex";

        mobileMenu.classList.remove("mobile-menu-active");
    });
});

closeLogin.addEventListener("click", () => {
    loginContainer.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === loginContainer) {
        loginContainer.style.display = "none";
    }
});

const cartValues = document.querySelector(".cart-value");
const addToCartButtons = document.querySelectorAll(".order-card .button");

let cartCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        cartCount++;
        cartValue.textContent = cartCount;
    });
});

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please enter username and password!");
    } else {
        alert("Login Successful!");
        loginContainer.style.display = "none";
    }
});