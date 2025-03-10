document.addEventListener("DOMContentLoaded", function () {
    // Toggle mobile menu
    const menuToggle = document.querySelector("#menu-toggle");
    const navLinks = document.querySelector(".nav_links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    // Cart functionality
    const btnCart = document.querySelector("#cart-icon");
    const cart = document.querySelector(".cart");
    const btnClose = document.querySelector("#cart-close");

    btnCart.addEventListener("click", () => {
        cart.classList.add("cart-active");
    });

    btnClose.addEventListener("click", () => {
        cart.classList.remove("cart-active");
    });

    // List of Indian Non-Veg Dishes
    const indianNonVegDishes = [
        { name: "Butter Chicken", price: "Rs.300", imgSrc: "https://www.samaheats.com/wp-content/uploads/2024/03/Untitled-design-15.png" },
        { name: "Chicken Biryani", price: "Rs.250", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVt4aAT6t8SWbxuE7YgThGOLOOPImFMqCpYg&s" },
        { name: "Mutton Curry", price: "Rs.350", imgSrc: "https://lh5.googleusercontent.com/proxy/fm5qZsQ1nm8HztsfW92BSx3XQKt1tl2miFs7fXnbRmwE5bmIR3ADNRXrG0h6fpcNpkggOK684pAHz0bkpBZTvZLVj8bIwot0-h0aDsU" },
        { name: "Fish Curry", price: "Rs.280", imgSrc: "https://www.teaforturmeric.com/wp-content/uploads/2023/06/Fish-Curry-Recipe.jpg" },
        { name: "Chicken Tikka", price: "Rs.220", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzjSTAYdIs9x9NM8NwRHvjUUerXoPO1kU3Ig&s" },
        { name: "Prawn Masala", price: "Rs.400", imgSrc: "https://www.licious.in/blog/wp-content/uploads/2020/12/Prawns-Masala-min.jpg" },
        { name: "Tandoori Chicken", price: "Rs.250", imgSrc: "https://sinfullyspicy.com/wp-content/uploads/2014/07/1200-by-1200-images-2.jpg" },
        { name: "Korma", price: "Rs.350", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoV8A3Wn6MI0OWKBCiyA5CCFiTPawr0Lpe8A&s" },
        { name: "Rogan Josh", price: "Rs.400", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgZRD0QKjIQ3bSuy0HLwuUdkb4qMQnJ4DV8g&s" },
        { name: "Baked Fish", price: "Rs.300", imgSrc: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Fast-Baked-Fish_EXPS_FT24_9049_JR_0301_1.jpg" },
        { name: "Keema Mutton", price: "Rs.320", imgSrc: "https://cdn.zeptonow.com/production///tr:w-600,ar-100-100,pr-true,f-auto,q-80/web/recipes/mutton-keema.png" },
        { name: "Chicken Pakora", price: "Rs.220", imgSrc: "https://www.pavaniskitchen.com/wp-content/uploads/2021/06/chicken-pakora.jpg" },
    ];

    const dishContainer = document.getElementById("dish-container");

    function displayDishes(dishes) {
        dishContainer.innerHTML = dishes.map(dish => `
            <div class="foodcard">
                <div class="food_card_title">
                    <div class="card_img">
                        <img src="${dish.imgSrc}" alt="${dish.name}" class="food-image">
                    </div>
                    <h1 class="food_card_title_name">${dish.name}</h1>
                    <h4 class="food_card_title_price">${dish.price}</h4>
                    <button class="order_food_btn">Order Now</button>
                </div>
            </div>
        `).join("");

        attachOrderEventListeners();
    }

    displayDishes(indianNonVegDishes);

    const searchCard = document.getElementById("search-card");
    searchCard.addEventListener("input", () => {
        const searchLowercase = searchCard.value.toLowerCase();
        const filteredFood = indianNonVegDishes.filter(food => food.name.toLowerCase().includes(searchLowercase));
        displayDishes(filteredFood);
    });

    function attachOrderEventListeners() {
        document.querySelectorAll(".order_food_btn").forEach(button => {
            button.addEventListener("click", addToCart);
        });
    }

    let itemList = [];

    function addToCart() {
        let item = this.parentElement;
        let foodName = item.querySelector(".food_card_title_name").innerText;
        let foodPrice = item.querySelector(".food_card_title_price").innerText;
        let foodImg = item.querySelector(".food-image").src;

        if (itemList.some(el => el.foodName === foodName)) {
            alert("Product already in cart");
            return;
        }

        itemList.push({ foodName, foodPrice, foodImg });
        updateCart();
    }

    function updateCart() {
        const cartContent = document.querySelector(".cart-content");
        cartContent.innerHTML = "";
        itemList.forEach(item => {
            let div = document.createElement("div");
            div.classList.add("cart-box");
            div.innerHTML = `
                <img src="${item.foodImg}" class="cart-img">
                <div class="detail-box">
                    <div class="cart-food-title">${item.foodName}</div>
                    <div class="price-box">
                        <div class="cart-price">${item.foodPrice}</div>
                        <div class="cart-amt">${item.foodPrice}</div>
                    </div>
                    <input type="number" value="1" class="cart-quantity" min="1" onchange="updateTotal()">
                </div>
                <ion-icon name="trash" class="cart-remove" onclick="removeItem('${item.foodName}')">🗑</ion-icon>
            `;
            cartContent.appendChild(div);
        });
        updateTotal();
    }

    function updateTotal() {
        const totalValue = document.querySelector(".total-price");
        let total = 0;
    
        document.querySelectorAll(".cart-box").forEach(product => {
            let priceText = product.querySelector(".cart-price").innerText;
            let price = parseFloat(priceText.replace("Rs.", "").trim());
            let qtyInput = product.querySelector(".cart-quantity");
            let qty = parseInt(qtyInput.value);
    
            if (!isNaN(price) && !isNaN(qty) && qty > 0) {
                let itemTotal = price * qty;
                product.querySelector(".cart-amt").innerText = "Rs." + itemTotal;
                total += itemTotal;
            }
    
            // Ensure event listener is only added once
            qtyInput.removeEventListener("input", updateTotal);
            qtyInput.addEventListener("input", updateTotal);
        });
    
        totalValue.innerText = "Rs." + total;
    }
    

    window.removeItem = function (foodName) {
        itemList = itemList.filter(item => item.foodName !== foodName);
        updateCart();
    };
});



  




 