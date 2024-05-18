import { validateInput, displayError, clearErrors } from "./validation.js";

function closeModal(modal) {
  modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const addProductButton = document.getElementById("addProductButton");
  const modal = document.getElementById("productModal");
  const span1 = document.getElementsByClassName("close1")[0];
  const span2 = document.getElementsByClassName("close2")[0];
  const form = document.getElementById("product-form");
  const products = [


  ];
  const usedProductIds = [];
  const editModal = document.getElementById("editProductModal");
  
  displayProducts(products);

  

  addProductButton.onclick = () => {
    modal.style.display = "block";
    clearErrors();
  };

  span1.onclick = () => {
    closeModal(modal);
  };

  span2.onclick = () => {
    closeModal(editModal);
  };




 




  

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const productId = document.getElementById("productId").value;
    const category = document.getElementById("category").value;
    const subcategory = document.getElementById("subcategory").value;
    const price = parseFloat(document.getElementById("price").value);
    const stockQuantity = parseInt(
      document.getElementById("stockQuantity").value
    );
    const stockInfo = document.getElementById("stockInfo").value;
    const manufacturingDate =
      document.getElementById("manufacturingDate").value;
    const expiryDate = document.getElementById("expiryDate").value;

    if (
      !validateInput(productId, "productId") ||
      !validateInput(category, "category") ||
      !validateInput(subcategory, "subcategory") ||
      !validateInput(price, "price") ||
      !validateInput(stockQuantity, "stockQuantity") ||
      !validateInput(stockInfo, "stockInfo") ||
      !validateInput(manufacturingDate, "manufacturingDate") ||
      !validateInput(expiryDate, "expiryDate")
    ) {
      return;
    }

    // Check if manufacturing date is before expiry date
    if (new Date(manufacturingDate) >= new Date(expiryDate)) {
      displayError(
        "Manufacturing date should be before the expiry date.",
        "manufacturingDateError"
      );
      return;
    }

    // Define perishable and non-perishable date limits
    const perishableLimit = 30; // 30 days
    const nonPerishableLimit = 365; // 1 year
    const daysDifference = Math.ceil(
      (new Date(expiryDate) - new Date(manufacturingDate)) /
        (1000 * 60 * 60 * 24)
    );

    // Check perishable and non-perishable date limits
    if (category === "Perishable" && daysDifference > perishableLimit) {
      displayError(
        "Perishable items should have a shorter shelf life (less than 30 days).",
        "expiryDateError"
      );
      return;
    }

    if (category === "Non-Perishable" && daysDifference > nonPerishableLimit) {
      displayError(
        "Non-Perishable items should have a longer shelf life (less than 365 days).",
        "expiryDateError"
      );
      return;
    }

    if (usedProductIds.includes(productId)) {
      alert("Product ID already exists. Please choose a different one.");
      return;
    }

    const product = {
      productId,
      category,
      subcategory,
      price,
      stockQuantity,
      stockInfo,
      manufacturingDate,
      expiryDate,
      orderHistory: [],
    };

   

    products.push(product);
    usedProductIds.push(product.productId);
    displayProducts(products);
    form.reset();

    alert("Product added successfully!");
    closeModal(modal);

   
  
  });

  

 
  const searchButton = document.getElementById("searchButton");

// Add event listener to the search button
searchButton.addEventListener("click", function() {
    const searchValue = document.getElementById("searchInput").value.trim().toLowerCase();
    const searchAttribute = document.getElementById("searchAttribute").value;
    const filteredProducts = products.filter(product => {
        return product[searchAttribute].toLowerCase().includes(searchValue);
    });
    displayProducts(filteredProducts); // Display filtered products
    backButton.style.display = "block";
});

backButton.addEventListener("click", function() {
    // Clear the search input
    document.getElementById("searchInput").value = "";

    // Reset the search attribute to its default value
    document.getElementById("searchAttribute").value = "productId";

    // Display all products again
    displayProducts(products);

    // Hide the "Back" button
    backButton.style.display = "none";
});


  const sortButton = document.getElementById("sortButton");
  sortButton.addEventListener("click", function() {
      const sortAttribute = document.getElementById("sortAttribute").value;
      const sortOrder = document.getElementById("sortOrder").value;
      const sortedProducts = sortProducts(products, sortAttribute, sortOrder);
      displayProducts(sortedProducts); // Display sorted products
  });

  function sortProducts(products, sortAttribute, sortOrder) {
    return products.sort((a, b) => {
        let comparison = 0;
        if (a[sortAttribute] > b[sortAttribute]) {
            comparison = 1;
        } else if (a[sortAttribute] < b[sortAttribute]) {
            comparison = -1;
        }
        return sortOrder === "asc" ? comparison : -comparison;
    });
}

  function displayProducts(products) {
    const tableBody = document.querySelector("#product-table tbody");
    tableBody.innerHTML = "";
    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${product.productId}</td>
                <td>${product.category}</td>
                <td>${product.subcategory}</td>
                <td>${product.price}</td>
                <td>${product.stockQuantity}</td>
                <td>${product.stockInfo}</td>
                <td>${product.manufacturingDate}</td>
                <td>${product.expiryDate}</td>
                <td>
                <button class="edit-btn button-edit" data-id="${product.productId}">Edit</button>
                <button class="delete-btn button-delete" data-id="${product.productId}">Delete</button>
                </td>
                <td>
                <button class="view-history-btn button-view-history" data-id="${product.productId}" onclick="displayOrderHistory('${product.productId}')">View History</button>
                </td>
            `;
      tableBody.appendChild(row);
      console.log(products)
    });
  }

  // Add event listener to the table for handling "Edit" button clicks
  document
    .getElementById("product-table")
    .addEventListener("click", function (event) {
      const target = event.target;
      if (target.classList.contains("edit-btn")) {
        // Get the product ID from the data-id attribute
        const productId = target.getAttribute("data-id");
        // Find the product in the products array based on the product ID
        const product = products.find((prod) => prod.productId === productId);
        if (product) {
          // Open the Edit Model and populate fields with product details
          openEditModal(productId, product);
        }
      }
    });

    let originalProductId;
  // Function to open the Edit Model and populate fields with product details
  function openEditModal(productId, product) {
    const editModal = document.getElementById("editProductModal");
    const span2 = document.getElementsByClassName("close2");

    
    originalProductId = productId;
    // Populate input fields with product details

    document.getElementById("editProductId").value = productId;
    document.getElementById("editCategory").value = product.category;
    document.getElementById("editSubcategory").value = product.subcategory;
    document.getElementById("editPrice").value = product.price;
    document.getElementById("editStockQuantity").value = product.stockQuantity;
    document.getElementById("editStockInfo").value = product.stockInfo;
    document.getElementById("editManufacturingDate").value =
      product.manufacturingDate;
    document.getElementById("editExpiryDate").value = product.expiryDate;
    // Display the Edit Modal
    editModal.style.display = "block";

    span2.onclick = () => {
      closeModal(modal);
    };
  }
 


  // Add event listener to the "Save" button inside the Edit Modal
  document
    .getElementById("edit-product-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const editModal = document.getElementById("editProductModal");

     
      // Retrieve edited product details from input fields
      
      const newProductId = document.getElementById("editProductId").value;
      const category = document.getElementById("editCategory").value;
      const subcategory = document.getElementById("editSubcategory").value;
      const price = parseFloat(document.getElementById("editPrice").value);
      const stockQuantity = parseInt(
        document.getElementById("editStockQuantity").value
      );
      const stockInfo = document.getElementById("editStockInfo").value;
      const manufacturingDate = document.getElementById(
        "editManufacturingDate"
      ).value;
      const expiryDate = document.getElementById("editExpiryDate").value;

      if (
        !validateInput(newProductId, "editProductId") ||
        !validateInput(category, "editCategory") ||
        !validateInput(subcategory, "editSubcategory") ||
        !validateInput(price, "editPrice") ||
        !validateInput(stockQuantity, "editStockQuantity") ||
        !validateInput(stockInfo, "editStockInfo") ||
        !validateInput(manufacturingDate, "editManufacturingDate") ||
        !validateInput(expiryDate, "editExpiryDate")
      ) {
        return;
      }

      if (new Date(manufacturingDate) >= new Date(expiryDate)) {
        displayError("Manufacturing date should be before the expiry date.", "editManufacturingDateError");
        return;
      }

      const perishableLimit = 30;
      const nonPerishableLimit = 365;
      const daysDifference = Math.ceil((new Date(expiryDate) - new Date(manufacturingDate)) / (1000 * 60 * 60 * 24));
  
      if (category === "Perishable" && daysDifference > perishableLimit) {
        displayError("Perishable items should have a shorter shelf life (less than 30 days).", "editExpiryDateError");
        return;
      }
  
      if (category === "Non-Perishable" && daysDifference > nonPerishableLimit) {
        displayError("Non-Perishable items should have a longer shelf life (less than 365 days).", "editExpiryDateError");
        return;
      }
     
      const index = products.findIndex((prod) => prod.productId === originalProductId);
      if (index !== -1) {
        // Check if the new product ID is already used
        if (usedProductIds.includes(newProductId) && newProductId !== originalProductId) {
          displayError("Product ID already exists. Please choose a different one.", "editProductIdError");
          return;
        }

      
        products[index]={
          productId: newProductId,
          category,
          subcategory,
          price,
          stockQuantity,
          stockInfo,
          manufacturingDate,
          expiryDate,
          orderHistory: products[index].orderHistory,
        };
  
       

        if (originalProductId !== newProductId) {
          // Update usedProductIds array
          usedProductIds.splice(usedProductIds.indexOf(originalProductId), 1);
          usedProductIds.push(newProductId);
        }
        console.log(usedProductIds)

      // Find the index of the product in the products array based on the product ID
    
      displayProducts(products);
      
      alert('Product updated successfully!');
      closeModal(editModal)
      

    }
  });




  document
    .getElementById("product-table")
    .addEventListener("click", function (event) {
      const target = event.target;
      if (target.classList.contains("delete-btn")) {
        // Get the product ID from the data-id attribute
        const productId = target.getAttribute("data-id");
        // Find the index of the product in the products array based on the product ID
        const index = products.findIndex(
          (prod) => prod.productId === productId
        );

        if (index !== -1) {
          // Remove the product from the products array
          products.splice(index, 1);

          usedProductIds.splice(usedProductIds.indexOf(productId), 1);

          // Refresh the table to reflect the changes

          displayProducts(products);
          alert("Product deleted successfully!");
        }
      }
    });

  const placeOrderButton = document.getElementById("placeOrderButton");

  // Add event listener for the "Place Order" button click
  placeOrderButton.addEventListener("click", displayOrderForm);

  // Function to display the order form
  function displayOrderForm() {
    // Create the form elements
    const orderForm = document.createElement("form");
    orderForm.id = "order-form";
    orderForm.innerHTML = `
        <br>
            <label for="orderDate">Order Date:</label>
            <input type="date" id="orderDate" required /><br /><br>
            <label for="orderProductId">Product ID:</label>
            <input type="text" id="orderProductId" required onchange="populateProductDetails()"/><br /><br>
            
  
            <label for="orderCategory">Category:</label>
            <input type="text" id="orderCategory" disabled ><br><br>
            
  
            <label for="orderSubcategory">Subcategory:</label>
            <input type="text" id="orderSubcategory" disabled ><br><br>
            
  
            <label for="orderPrice">Price:</label>
            <input type="number" id="orderPrice" disabled /><br /><br>
            
  
            <label for="orderStockQuantity">Stock Quantity Available:</label>
            <input type="number" id="orderStockQuantity"  disabled /><br /><br>


            
            <label for="orderStockInfo"">Stock Info:</label>
            <input type="text" id="orderStockInfo" disabled /><br /><br>
            
            <label for="orderManufacturingDate">Manufacturing Date:</label>
            <input type="date" id="orderManufacturingDate" disabled /><br /><br>
            
            <label for="orderExpiryDate">Expiry Date:</label>
            <input type="date" id="orderExpiryDate" disabled  /><br /><br>

            <label for="orderQuantity">Order Quantity :</label>
            <input type="number" id="orderQuantity"  required /><br /><br>
            
            <button type="button" id="placeOrderBtn">Place Order</button><br>
            <br>
            <hr>
        `;

    // Append the form to the DOM, below the "Place Order" button
    const orderSection = document.getElementById("orderSection");
    orderSection.appendChild(orderForm);

    const orderProductIdInput = document.getElementById("orderProductId");
    orderProductIdInput.addEventListener("input", populateProductDetails);

    const placeOrderBtn = document.getElementById("placeOrderBtn");
    placeOrderBtn.addEventListener("click", placeOrder);
  }
  document.getElementById("placeOrderButton").addEventListener("click", displayOrderForm);

  function populateProductDetails() {
    const orderProductIdInput = document.getElementById("orderProductId");
    const productId = orderProductIdInput.value; // Get the product ID entered by the user

    // Find the product in the products array based on the product ID
    const product = products.find((prod) => prod.productId === productId);

    if (product) {
      // Populate the product details in the order form
      document.getElementById("orderCategory").value = product.category;
      document.getElementById("orderSubcategory").value = product.subcategory;
      document.getElementById("orderPrice").value = product.price;
      document.getElementById("orderStockQuantity").value =
        product.stockQuantity;
      document.getElementById("orderStockInfo").value = product.stockInfo;
      document.getElementById("orderManufacturingDate").value =
        product.manufacturingDate;
      document.getElementById("orderExpiryDate").value = product.expiryDate;
    } else {
      // If product is not found, clear the input fields
      document.getElementById("orderCategory").value = "";
      document.getElementById("orderSubcategory").value = "";
      document.getElementById("orderPrice").value = "";
      document.getElementById("orderStockQuantity").value = "";
      document.getElementById("orderStockInfo").value = "";
      document.getElementById("orderManufacturingDate").value = "";
      document.getElementById("orderExpiryDate").value = "";
      alert("Product not found!");
    }
  }

  function validateOrderForm() {
    const orderDate = document.getElementById("orderDate");
    const orderProductId = document.getElementById("orderProductId");
    const orderQuantity = document.getElementById("orderQuantity");
    let isValid = true;

    clearErrorMessages();

    if (!orderDate.value) {
      showError(orderDate, "Order Date is required");
      isValid = false;
  }

  // Validate Product ID
  if (!orderProductId.value) {
      showError(orderProductId, "Product ID is required");
      isValid = false;
  }

  // Validate Order Quantity
  if (!orderQuantity.value) {
      showError(orderQuantity, "Order Quantity is required");
      isValid = false;
  }

  return isValid;

   
}
function showError(input, message) {
  const errorSpan = document.createElement("span");
  errorSpan.className = "error";
  errorSpan.textContent = message;
  input.parentNode.insertBefore(errorSpan, input.nextSibling);
}
function clearErrorMessages() {
  const errors = document.querySelectorAll(".error");
  errors.forEach(error => error.remove());
}

  function placeOrder() {

    if (!validateOrderForm()) {
      return;
  }
    const orderDate = document.getElementById("orderDate").value;
    const productId = document.getElementById("orderProductId").value;
    const orderQuantity = parseInt(
      document.getElementById("orderQuantity").value
    );
    const product = products.find((prod) => prod.productId === productId);

    if (
      product &&
      orderQuantity > 0 &&
      orderQuantity <= product.stockQuantity
    ) {
      // Update the stock quantity
      product.stockQuantity -= orderQuantity;

      // Create order details
      const orderDetails = {
        productId: product.productId,
        orderDate,
        orderQuantity,
        totalPrice: product.price * orderQuantity,
      };

      product.orderHistory.push(orderDetails);
      // Display success message
      alert("Order placed successfully!");
      closeOrderForm();
      displayProducts(products);
      console.log(orderDetails);
      console.log(products);
    } else {
      alert(
        "Order Quantity Should be Less than Stock Quantity Available For Placing the order"
      );
    }
    

  }
  function closeOrderForm() {
    const orderForm = document.getElementById("order-form");
    if (orderForm) {
        orderForm.remove();
    }
}

  window.displayOrderHistory = function (productId) {
    const product = products.find((prod) => prod.productId === productId);
    if (product && product.orderHistory.length > 0) {
      let historyHtml = `<h3>Order History for Product ID: ${productId}</h3>`;
      historyHtml += "<ul>";
      product.orderHistory.forEach((order) => {
        historyHtml += `<li>Order Date: ${order.orderDate}, Quantity: ${
          order.orderQuantity
        }, Total Price: Rs${order.totalPrice.toFixed(2)}</li>`;
      });
      historyHtml += "</ul>";
      document.getElementById("orderHistory").innerHTML = historyHtml;
      const orderHistoryModal = document.getElementById("orderHistoryModal");
      orderHistoryModal.style.display = "block";
    } else {
      alert("No order history available for this product.");
    }
  };
  const orderHistoryModal = document.getElementById("orderHistoryModal");
  const closeOrderHistoryModal = orderHistoryModal.querySelector(".close3");

  closeOrderHistoryModal.onclick = () => {
    orderHistoryModal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === orderHistoryModal) {
      orderHistoryModal.style.display = "none";
    }
  };
});
