let header = document.getElementById("Header");
let footer = document.getElementById("Footer");



header.innerHTML = `


        <div class="logo">
            <h1>Umair arshad</h1>
        </div>
        <div class="menu">
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="Beauty.html">Beauty & Personal Care</a></li>
                    <li><a href="Fragrence.html">Fragrance</a></li>
                    <li><a href="Grocery.html">Grocery</a></li>
                    <li><a href="Electronics.html">Electronics</a></li>
                </ul>
            </nav>
        </div>
        <div class="icon">
            <img src="assets/svg icon/search.svg" width="30px" alt="">
            <img src="assets/svg icon/bell.svg" width="30px" alt="">
            <img src="assets/svg icon/outline-email.svg" width="30px" alt="">
           <a href ="cart.html">
            <img src="assets/svg icon/Shopping cart.svg" width="30px" alt=""></a>
            </div>
            <div class="menuicon"><img src="assets/svg icon/hamburger-menu-svgrepo-com.svg" width="30px" alt=""></div>
 <a href ="cart.html">
            <img src="assets/svg icon/Shopping cart.svg" width="30px" alt="" id ="cart"></a>
   

`

footer.innerHTML = `

        <div class="footer_parent">

            <div class="colum_1-Logo">
                <h1>umair arshad </h1>
                <p>Fresh Groceries, Delivered To Your Door</p>
                <div class="social_icon">
                    <a href="https://www.facebook.com/share/14sQeKqp8BG/?mibextid=wwXIfr" class="social-link">f</a>
                    <a href="https://github.com/Umair-945" class="social-link">G</a>
                    <a href="https://www.linkedin.com/in/umair-arshad-a07a27427/?skipRedirect=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_notifications%3B07b203ae-da90-4eec-875c-39c05017e20f&contentTrackingId=6LBbtUFaSDupJ4362UbJWg%3D%3D&viewName=premium-nav-upsell-text&upsellOrderOrigin=Tracking%3Av1%3Apremium_nav_upsell_text%3ANav%3AIn-Product" class="social-link">in</a>
                </div>
            </div>


            <div class="colum_2-Quick-links">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="Grocery.html">Grocery</a></li>
                    <li><a href="Beauty.html">Beauty</a></li>
                    <li><a href="Electronics.html">Electronics</a></li>
                </ul>
            </div>


            <div class="column-3_catgories">
                <h3>Categories</h3>
                <ul>
                    <li><a href="Grocery.html">Fresh Vegetables</a></li>
                    <li><a href="Beauty.html">Beauty</a></li>
                    <li><a href="Electronics.html">Electronics</a></li>
                    <li><a href="Beauty.html">Personal Care</a></li>
                </ul>
            </div>



            <div class="column4_contact">
                <h3>Contact</h3>
                <p class="phone">Phone: 0309-2258076</p>
                <p class="email">E-mail: umairarshad8653@gmail.com</p>
                <div class="newsletter">
                    <input type="email" placeholder="Enter your email">
                    <button>Subscribe</button>
                </div>
            </div>
        </div>

        <div class="footer_parent2">
            <div class="copyright">
                <p>Copyright &copy; 2026 GroceryCo. All Right Reserved</p>
            </div>
            <div class="Payment">
                <span>Visa</span> <span>MasterCard</span> <span>JazzCash</span> <span>Easypaisa</span>
            </div>
        </div>
        `
let aside = document.getElementById("aside");

aside.innerHTML = `
      <h1>umair arshad</h1>
        <img src="assets/svg icon/close_24dp_000000_FILL0_wght400_GRAD0_opsz24 (1).svg" alt="close icon" id="close_icon">
  <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="Beauty.html">Beauty </a></li>
                    <li><a href="Fragrence.html">Fragrance</a></li>
                    <li><a href="Grocery.html">Grocery</a></li>
                    <li><a href="Electronics.html">Electronics</a></li>
                </ul>
            </nav>

`





let humburger = document.querySelector(".menuicon");
let close = document.getElementById("close_icon")


humburger.addEventListener("click", function () {
    aside.style.width = "80%";
    document.body.style.overflow = "hidden";

});

close.addEventListener("click", () => {

    aside.style.width = "0%";

    window.location.reload();



});

// Index page cart
// cart.js - Universal for All Pages (Home, Beauty, Grocery etc.)

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    let count = cart.reduce((total, item) => total + item.quantity, 0);
    let cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = count;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}
updateCartCount();

// === IMPORTANT FIX: Sabhi cards ke buttons ke liye ===
let allAddToCartButtons = document.querySelectorAll('.home_cards button, .beauty_cards button, .grocery_cards button, .fragrance_cards button, .electronics_cards button, button');

allAddToCartButtons.forEach(button => {
    // Sirf "Add To Cart" wale button par kaam karo
    if (button.innerText.toLowerCase().includes('add to cart')) {
        button.addEventListener('click', (e) => {
            let card = e.target.closest('div[class]');
            // card ke andar h1 aur p dhoondo
            let nameElement = card.querySelector('h1');
            let priceElement = card.querySelector('p');
            let imageElement = card.querySelector('img');

            if (!nameElement || !priceElement || !imageElement) return;

            let name = nameElement.innerText;
            let priceText = priceElement.innerText;
            let price = parseInt(priceText.replace(/[^0-9]/g, ''));
            let image = imageElement.src;

            let product = {
                id: name.toLowerCase().replace(/\s+/g, '-'),
                name: name,
                price: price,
                image: image,
                quantity: 1
            };

            let existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product);
            }

            updateCartCount();
            
            let originalText = button.innerText;
            button.innerText = "Added ✓";
            button.style.backgroundColor = "#4CAF50";
            button.style.color = "white";
            setTimeout(() => {
                button.innerText = originalText;
                button.style.backgroundColor = "";
                button.style.color = "";
            }, 1000);
        });
    }
});

// Cart Page Display Function (Nayi IDs ke liye)
function displayCartItems() {
    let cartContainer = document.getElementById('my-cart-items-box');
    if (!cartContainer) return;

    let totalHeadingHTML = `<h2 class="my-cart-total-heading">Total: <span id="cart-total">Rs.0</span></h2>`;
    let cartItemsHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<div style="text-align:center; padding:50px; color:#9a8a7e;"><h3>Your cart is empty</h3></div>` + totalHeadingHTML;
        document.getElementById('cart-total').innerText = "Rs.0";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItemsHTML += `
            <div class="my-cart-item">
                <img src="${item.image}">
                <div style="flex:1;">
                    <h3>${item.name}</h3>
                    <p>Rs.${item.price} x ${item.quantity}</p>
                    <div style="margin-top:8px;">
                        <button onclick="changeQuantity(${index}, -1)" class="qty-btn">-</button>
                        <span style="margin:0 8px;"> ${item.quantity} </span>
                        <button onclick="changeQuantity(${index}, 1)" class="qty-btn">+</button>
                        <button onclick="removeItem(${index})" class="remove-btn">Remove</button>
                    </div>
                </div>
                <div><b>Rs.${item.price * item.quantity}</b></div>
            </div>
        `;
    });

    cartContainer.innerHTML = cartItemsHTML + totalHeadingHTML;
    document.getElementById('cart-total').innerText = `Rs.${total}`;
}

function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCartCount();
    displayCartItems();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCartItems();
}

displayCartItems();



