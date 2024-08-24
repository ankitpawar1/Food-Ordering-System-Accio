// Function to fetch and display the menu on page load
document.addEventListener("DOMContentLoaded", getMenu);

async function getMenu() {
  try {
    // Fetch the menu items from the provided JSON URL
    const response = await fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    );
    const menu = await response.json();

    // Get the container where menu items will be displayed
    const menuItemsContainer = document.getElementById("menu-items");

    // Iterate over the fetched menu items and create HTML elements for each
    menu.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.classList.add("item");

      // Set the inner HTML for each menu item with an image, name, price, and a button
      menuItem.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}">
                <div class="container-price">
                    <div class="container-txt">
                        <p>${item.name}</p>
                        <p class="price">$${item.price}/-</p>
                    </div>
                    <div class="container-btn">
                        <button class="add-to-cart">+</button>
                    </div>
                </div>
            `;

      // Append the created menu item to the container
      menuItemsContainer.appendChild(menuItem);
    });

    // Add event listeners to each "Add to Cart" button
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", handleOrderProcess);
    });
  } catch (error) {
    console.error("Error fetching the menu:", error);
  }
}

// Function to simulate taking an order, returning a promise
function TakeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly select 3 burgers from the menu
      const order = {
        burgers: ["Burger 1", "Burger 2", "Burger 3"].sort(
          () => 0.5 - Math.random()
        ),
      };
      resolve(order);
    }, 2500); // Delay of 2500ms
  });
}

// Function to simulate order preparation, returning a promise
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500); // Delay of 1500ms
  });
}

// Function to simulate payment, returning a promise
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000); // Delay of 1000ms
  });
}

// Function to show a thank-you alert
function thankyouFnc() {
  alert("Thank you for eating with us today!");
}

// Function to handle the entire order process
async function handleOrderProcess() {
  try {
    // Step 1: Take order
    const order = await TakeOrder();
    console.log("Order:", order);

    // Step 2: Prepare order
    const orderStatus = await orderPrep();
    console.log("Order Status:", orderStatus);

    // Step 3: Make payment
    const paymentStatus = await payOrder();
    console.log("Payment Status:", paymentStatus);

    // Step 4: Thank the customer if payment was successful
    if (paymentStatus.paid) {
      thankyouFnc();
    }
  } catch (error) {
    console.error("Error during the order process:", error);
  }
}
