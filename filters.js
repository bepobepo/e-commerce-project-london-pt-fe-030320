// creating type filters checkboxes
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

// adding type filter logic
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


// creating colors filter logic

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

// price filter button logic
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