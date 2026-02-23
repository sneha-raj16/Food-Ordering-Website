// ========== MOBILE MENU TOGGLE ==========
const bars = document.querySelector(".bars");
const mobileMenu = document.querySelector(".mobile-menu");

bars.addEventListener("click", () => {
    mobileMenu.classList.toggle("mobile-menu-active");
});


// ========== LOGIN POPUP ==========
const signInBtn = document.querySelector(".signin-btn");
const loginContainer = document.getElementById("loginContainer");
const closeLogin = document.getElementById("closeLogin");

signInBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.style.display = "flex";
});

closeLogin.addEventListener("click", () => {
    loginContainer.style.display = "none";
});

// Close login when clicking outside the box
window.addEventListener("click", (e) => {
    if (e.target === loginContainer) {
        loginContainer.style.display = "none";
    }
});


// ========== ADD TO CART FUNCTION ==========
const cartValue = document.querySelector(".cart-value");
const addToCartButtons = document.querySelectorAll(".order-card .button");

let cartCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        cartCount++;
        cartValue.textContent = cartCount;
    });
});


// ========== SIMPLE LOGIN VALIDATION ==========
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