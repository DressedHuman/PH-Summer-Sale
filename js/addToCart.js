// helper function for the main (addToCart) function to add the name to the cart
function addToCartItem(productName){
    const cart = document.getElementById("cart-items");
    const itemsCount = cart.childElementCount;
    const newItem = document.createElement("p");
    newItem.classList.add("text-[var(--black-color)]", "font-medium", "text-2xl", "mb-4");
    newItem.innerText = `${parseInt(itemsCount+1)}. ${productName}`;

    // adding to the cart list
    cart.appendChild(newItem);
};

// fixed numbers after decimal point in floating number
function toFixed(value, count){
    return parseFloat(value.toFixed(count))
}
// new value counter: helper function for the addToCartPrice function
function addValue(prevValue, newValue){
    value = parseFloat(prevValue) + parseFloat(newValue);
    return toFixed(value, 2);
}

// helper function to adjust the price
function addToCartPrice(productPrice){
    // setting the total price
    const priceTotal = document.getElementById("price-total");
    const newPriceTotal = addValue(priceTotal.innerText, productPrice);
    priceTotal.innerText = newPriceTotal;

    // if the new total price greater than 0, then enable the "Make Purchase" button and if greater than or equal to 200, then enable the "Apply" button for the coupon code also.
    if(newPriceTotal >=200){
        document.getElementById("make-purchase").removeAttribute("disabled");
        document.getElementById("btn-apply-coupon").removeAttribute("disabled");
    }else if(newPriceTotal > 0){
        document.getElementById("make-purchase").removeAttribute("disabled");
    }

    // setting the total price with the discount counted
    const total = document.getElementById("total");
    total.innerText = addValue(total.innerText, productPrice);
};


// the main function to add a product to the cart
function addToCart(productName, productPrice){
    addToCartItem(productName);
    addToCartPrice(productPrice);
}


// adding event listener to the products using for loop

// storing the names and prices of the products to use in the for loop when adding event listener
const itemsNamePrice = {
    product_1 : {name : "K. Accessories", price : "39.00"},
    product_2 : {name : "K. Accessories", price : "25.00"},
    product_3 : {name : "Home Cooker", price : "49.00"},
    product_4 : {name : "Sports Back Cap", price : "49.00"},
    product_5 : {name : "Full Jersey Set", price : "69.00"},
    product_6 : {name : "Sports cates", price : "159.00"},
}

const keys = Object.keys(itemsNamePrice);

for(const key of keys){
    document.getElementById(key).addEventListener("click", function(event){
        const object = itemsNamePrice[key];
        addToCart(object.name, object.price);
        event.stopPropagation();
    });
};


// adding event listener to the apply coupon button
document.getElementById("btn-apply-coupon").addEventListener("click", function(){
    const couponTyped = document.getElementById("typed-coupon");
    const couponCode = couponTyped.value;

    couponTyped.value = "";
    if(couponCode === ""){
        alert("You must type a valid coupon code");
    }else if(couponCode === "SELL200"){
        const totalPrice = document.getElementById("price-total");
        const discount = document.getElementById("discount");
        const total = document.getElementById("total");


        // counting available discount
        let available_discount = parseFloat(totalPrice.innerText) * 20 / 100;
        
        // adjusting the discount
        discount.innerText = toFixed(available_discount, 2);
        total.innerText = toFixed((parseFloat(total.innerText) - available_discount), 2);
    }else{
        alert("Your coupon was incorrect! If you're trying to hack the server, we'll call the Police!");
    }


});


// adding event listener to the "Go Home" button
document.getElementById("go-home").addEventListener("click", function(){
    window.location.reload();
})