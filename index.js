//creating DOM elements
const filters = document.querySelector(".filter");
const productsCont = document.querySelector(".productsCont");
const priceFilter = document.querySelector(".rangeFilter");
const priceFilterBtn = document.querySelector(".rangeFilter > button");
const minInput = document.querySelector(".rangeFilter>#minPrice")
const maxInput = priceFilter.querySelector("#maxPrice");
const colorsContainer = document.querySelector(".colorsFiltered");
const colors = colorsContainer.querySelectorAll("input:checked");
const typesContainer = document.querySelector(".types")
const sortSelection = document.getElementById("sort");
const singleProduct = document.querySelector(".viewProduct");
const CartItemsDisp = document.querySelector(".CartItemsDisp");
const pageCart = document.querySelector(".cart")
const dropDownColors = document.querySelector(".dropDownColors")
const types = [...new Set(PRODUCTS.map(p => p.type))];
const availableColors = [];
let cartItems;
let sort = "default";
let selectedColors = [];
let displayProducts = [];
const productCart = [];
let max = Math.max(...PRODUCTS.map(p => p.price));
let min = 0
let selectedTypes = [];
maxInput.value = max;
minInput.value = min;


types.forEach(el => {
    const input = document.createElement("input");
    const label = document.createElement("label");
    label.setAttribute("for", el)
    label.innerText = el;
    input.name = el;
    input.type = "checkbox";
    input.value = el;
    typesContainer.appendChild(input);
    typesContainer.appendChild(label);
})
pageCart.addEventListener("click", () => {
    clearCart();

})
const clearCart = () => {
    window.localStorage.clear();
    calculateCart();
}

const calculateProducts = () => {
    console.log("start");
    PRODUCTS.forEach(element => {
        if (element.price >= min && element.price <= max && element.colors.some(productColor => selectedColors.includes(productColor)) && selectedTypes.includes(element.type)) {
            displayProducts.push(element);
            console.log(element.price); //filter parameter is true add to array for products to display.

        }

    })
    if (sort === "Low to High") {
        displayProducts.sort((a, b) => a.price - b.price);
        console.log(displayProducts, "low to high selected");
    } else if (sort === "High to Low") {
        displayProducts.sort((a, b) => b.price - a.price);
        console.log(displayProducts, "high to low selected");
    };
};


const generateProductList = (displayProducts) => {
    displayProducts.forEach(product => {
        const name = product.name;
        const prodContainer = document.createElement("div");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const cart = document.createElement("a");
        cart.href = "#";
        cart.innerText = "cart"
        cart.className = "cart"
        h3.innerText = name;
        p.innerText = product.price;
        prodContainer.className = "product"
        const image = document.createElement("img");
        image.src = '.\\images\\Image(1).png';
        prodContainer.append(h3, image, p, cart);
        prodContainer.addEventListener("click", () => {
            if (event.target.className === "cart") {
                console.log("clicked on cart")
                addCartItem(product);
                calculateCart();
            } else {
                console.log("you clicked on me", event.target, product);
                productsCont.style.display = "none";
                renderProduct(product);
            }
        });
        productsCont.appendChild(prodContainer);
    })
}

const calculateCart = () => {
    console.log("calculating cart");
    cartItems = window.localStorage.length;
    if (cartItems !== 0) {
        CartItemsDisp.style.display = null;
        CartItemsDisp.innerHTML = `${cartItems}`;
    } else {
        CartItemsDisp.style.display = "none";
    }
}
calculateCart() //load on page load, show correct cart data

const addCartItem = (product) => {
    const storeProduct = JSON.stringify(product);
    window.localStorage.setItem(product.name, storeProduct);
    calculateCart()
}

const renderProduct = (product) => { // add products to .viewProduct
    singleProduct.innerHTML = "";
    const prodDiv = document.createElement("div");
    const prodImg = document.createElement("img");
    const prodTitle = document.createElement("h3");
    const prodDesc = document.createElement("p");
    const prodPrice = document.createElement("p");
    const prodDetailsCont = document.createElement("details");
    const prodSummary = document.createElement("summary");
    const prodDetails = document.createElement("p");
    const prodBack = document.createElement("button");
    const prodCart = document.createElement("button");
    prodCart.innerHTML = "add to cart"
    prodBack.innerHTML = "Back to products"
    prodSummary.innerText = "Details";
    prodDetails.innerHTML = `materials: ${product.materials} <br> Dimensions:${JSON.stringify(product.dimensions).substr(1, JSON.stringify(product.dimensions).length-1)} <br> weight: ${product.weight}`;
    prodDetailsCont.append(prodSummary, prodDetails);
    prodDiv.className = "prodDiv"
    prodImg.src = ".\\images\\Image(1).png";
    prodTitle.innerText = product.name;
    prodDesc.innerText = product.description;
    prodPrice.innerText = product.price;
    prodDiv.append(prodTitle, prodPrice, prodDesc, prodCart, prodDetailsCont);
    singleProduct.append(prodBack, prodImg, prodDiv);
    singleProduct.style.display = "block";
    prodCart.addEventListener("click", () => {
        if (event.target.innerHTML === "add to cart") {
            //run function to add to local storage
            addCartItem(product);
            event.target.innerHTML = "GO TO CHECKOUT"
        } else {
            console.log("going to cart");
        }
    });
    prodBack.addEventListener("click", () => {
        singleProduct.style.display = "none"
        productsCont.style.display = null;
    });
}

sortSelection.addEventListener("change", () => {
    console.log(event.target.value);
    productsCont.innerText = "";
    displayProducts = [];
    sort = event.target.value;
    calculateProducts();
    generateProductList(displayProducts);
});

colorsContainer.addEventListener("change", () => {
    console.log(event.target);
    console.log("you clicked a color", event.target.value)
    productsCont.innerText = "";
    displayProducts = [];
    console.log("clear products");
    selectedColors = [];
    console.log("cleared array");
    let test = colorsContainer.querySelectorAll("input:checked");
    console.log(test);
    if (test.length > 0) {
        test.forEach(c => {
            selectedColors.push(c.value);
            console.log("added color" + c.value + " " + selectedColors);
        });
        calculateProducts();
        generateProductList(displayProducts);
    } else {
        selectedColors.push("none");
    }
});

typesContainer.addEventListener("change", () => {
    selectedTypes = [];
    productsCont.innerText = "";
    displayProducts = [];
    console.log(event.target, "you clicked a type");
    const checked = typesContainer.querySelectorAll("input:checked");
    if (checked.length > 0) {
        checked.forEach(input => selectedTypes.push(input.value));
        calculateProducts();
        generateProductList(displayProducts);
    } else {
        selectedTypes.push("none");
    }
});


priceFilterBtn.addEventListener("click", () => {
    console.log("filters applied");
    productsCont.innerText = "";
    displayProducts = [];
    min = minInput.value;
    max = maxInput.value;
    console.log(min, max)
    calculateProducts();
    generateProductList(displayProducts);
});



const getColors = () => {
    PRODUCTS.forEach(element => {
        for (let i = 0; i < element.colors.length; i++) {
            const el = element.colors[i];
            console.log(el, "this is the color");
            if (!availableColors.includes(el)) {
                availableColors.push(el)
                console.log(availableColors);
            }
        }
    });
    console.log(availableColors);
}

getColors();

const createColors = () => {
    const list = document.createElement("ul")
    list.style = "list-style:none";
    colorsContainer.style.display = "none";
    colorsContainer.appendChild(list);
    availableColors.forEach(el => {
        const listItem = document.createElement("li")
        const input = document.createElement("input");
        const label = document.createElement("label");
        label.setAttribute("for", el)
        label.innerText = el;
        input.name = el;
        input.type = "checkbox";
        input.value = el;
        list.appendChild(listItem)
        listItem.appendChild(input);
        listItem.appendChild(label);
    })
};
createColors();

dropDownColors.addEventListener("click", () => {
    console.log("clicked");
    console.log(event.target.style);
    if (colorsContainer.style.display === "") {
        console.log(event.target.style);
        colorsContainer.style.display = "none";
        dropDownColors.querySelector("span").style = "transform: rotateZ(0);";
    } else {
        colorsContainer.style.display = null;
        dropDownColors.querySelector("span").style = "transform: rotateZ(90deg);";
    }
})

generateProductList(PRODUCTS);