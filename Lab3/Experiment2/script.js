
// PRODUCT DATABASE
const products = [
    { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
    { id: 2, name: "Headphones", price: 2000, category: "Electronics" },
    { id: 3, name: "Shirt", price: 700, category: "Fashion" },
    { id: 4, name: "Shoes", price: 1500, category: "Fashion" }
];

let cart = [];
let appliedCoupon = "";

// DISPLAY PRODUCT LIST
function loadProducts() {
    const list = document.getElementById("productList");

    products.forEach(p => {
        let card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <h4>${p.name} - ₹${p.price}</h4>
            <p>Category: ${p.category}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;

        list.appendChild(card);
    });
}

// ADD TO CART
function addToCart(id) {
    let product = products.find(p => p.id === id);

    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCart();
}

// REMOVE ITEM
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// UPDATE QUANTITY
function updateQty(id, value) {
    let item = cart.find(i => i.id === id);
    item.qty = Number(value);
    updateCart();
}

// DISCOUNT RULES
function applyDiscounts(subtotal, item) {

    // 1. BULK DISCOUNT: Buy ≥ 5 → 10% off
    if (item.qty >= 5) {
        subtotal *= 0.90;
    }

    // 2. CATEGORY DISCOUNT: Electronics → 5% off
    if (item.category === "Electronics") {
        subtotal *= 0.95;
    }

    // 3. COUPON DISCOUNTS
    if (appliedCoupon === "SAVE10") {
        subtotal *= 0.90;
    }

    if (appliedCoupon === "FASHION20" && item.category === "Fashion") {
        subtotal *= 0.80;
    }

    return subtotal;
}

// CALCULATE CART TOTAL
function calculateTotal() {
    let total = 0;

    cart.forEach(item => {
        let subtotal = item.qty * item.price;
        subtotal = applyDiscounts(subtotal, item);
        total += subtotal;
    });

    return Math.round(total);
}

// UPDATE CART TABLE
function updateCart() {
    const tbody = document.getElementById("cartBody");
    tbody.innerHTML = "";

    cart.forEach(item => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <input type="number" class="qty-input" value="${item.qty}"
                onchange="updateQty(${item.id}, this.value)">
            </td>
            <td>₹${item.price}</td>

            <td>₹${item.qty * item.price}</td>

            <td><button onclick="removeItem(${item.id})">X</button></td>
        `;

        tbody.appendChild(row);
    });

    document.getElementById("totalAmount").innerText = calculateTotal();
}

// COUPON HANDLING
document.getElementById("applyCoupon").addEventListener("click", () => {
    let code = document.getElementById("couponInput").value.trim().toUpperCase();

    if (code === "SAVE10" || code === "FASHION20") {
        appliedCoupon = code;
        document.getElementById("couponMsg").innerText = "Coupon applied!";
    } else {
        document.getElementById("couponMsg").innerText = "Invalid coupon";
    }

    updateCart();
});

// INITIAL LOAD
loadProducts();