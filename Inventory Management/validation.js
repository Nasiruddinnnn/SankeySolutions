// validation.js


// Get references to the category and subcategory dropdowns
const categoryDropdown = document.getElementById("category");
const subcategoryDropdown = document.getElementById("subcategory");

// Define subcategory options for each category
const subcategoryOptions = {
  "Perishable": ["Food Product", "Medical Supplies"],
  "Non-Perishable": ["Household Goods", "Durable Goods"]
};

// Function to update subcategory options based on selected category
function updateSubcategoryOptions() {
  const selectedCategory = categoryDropdown.value;
  // Clear existing options
  subcategoryDropdown.innerHTML = "";
  // Add new options based on selected category
  const options = subcategoryOptions[selectedCategory];
  if (options) {
    options.forEach(option => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      subcategoryDropdown.appendChild(optionElement);
    });
  }
}


// Call the function initially to set the subcategory options based on the default selected category
updateSubcategoryOptions();

// Add event listener to category dropdown to update subcategory options when category changes
categoryDropdown.addEventListener("change", updateSubcategoryOptions);


// Get references to the category and subcategory dropdowns in the edit product modal
const editCategoryDropdown = document.getElementById("editCategory");
const editSubcategoryDropdown = document.getElementById("editSubcategory");

// Function to update subcategory options in the edit modal based on selected category
function updateEditSubcategoryOptions() {
  const selectedCategory = editCategoryDropdown.value;
  // Clear existing options
  editSubcategoryDropdown.innerHTML = "";
  // Add new options based on selected category
  const options = subcategoryOptions[selectedCategory];
  if (options) {
    options.forEach(option => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      editSubcategoryDropdown.appendChild(optionElement);
    });
  }
}

// Call the function initially to set the subcategory options based on the default selected category
updateEditSubcategoryOptions();

// Add event listener to edit category dropdown to update edit subcategory options when category changes
editCategoryDropdown.addEventListener("change", updateEditSubcategoryOptions);


// Get references to the stock quantity and stock info input fields in the add product modal
const stockQuantityInput = document.getElementById("stockQuantity");
const stockInfoInput = document.getElementById("stockInfo");

// Add event listener to the stock quantity input field to update stock info dynamically
stockQuantityInput.addEventListener("input", function() {
  // Get the updated stock quantity value
  const updatedStockQuantity = parseInt(this.value);
  
  // Update stock info based on stock quantity
  if(updatedStockQuantity > 0){
    stockInfoInput.value = "In Stock";
  } else {
    stockInfoInput.value = "Not Available";
  }
});


// Get references to the stock quantity and stock info input fields in the edit product modal
const editStockQuantityInput = document.getElementById("editStockQuantity");
const editStockInfoInput = document.getElementById("editStockInfo");

// Add event listener to the stock quantity input field in the edit product modal to update stock info dynamically
editStockQuantityInput.addEventListener("input", function() {
  // Get the updated stock quantity value
  const updatedStockQuantity = parseInt(this.value);
  
  // Update stock info based on stock quantity
  if(updatedStockQuantity > 0){
    editStockInfoInput.value = "In Stock";
  } else {
    editStockInfoInput.value = "Not Available";
  }
});


function validateProductId(event) {
    const productIdInput = event.target;
    const productIdError = document.getElementById("productIdError");
    const productIdValue = productIdInput.value.trim();
  
    // Check if the input value is numeric
    if (!/^\d+$/.test(productIdValue)) {
      productIdError.textContent = "Product ID must be numeric";
      productIdInput.setCustomValidity("Product ID must be numeric");
    } else {
      productIdError.textContent = "";
      productIdInput.setCustomValidity("");
    }
  }
  function validateEditProductId(event) {
    const productIdInput = event.target;
    const productIdError = document.getElementById("editProductIdError");
    const productIdValue = productIdInput.value.trim();
  
    // Check if the input value is numeric
    if (!/^\d+$/.test(productIdValue)) {
      productIdError.textContent = "Edited Product ID must be numeric";
      productIdInput.setCustomValidity("Edited Product ID must be numeric");
    } else {
      productIdError.textContent = "";
      productIdInput.setCustomValidity("");
    }
  }
  document.getElementById("productId").addEventListener("input", validateProductId);
  document.getElementById("editProductId").addEventListener("input",validateEditProductId);
  
// Function to validate input fields
function validateInput(value, fieldId) {
    switch (fieldId) {
        case 'price':
        case 'stockQuantity':
            if (isNaN(value) || value <= 0) {
                displayError('Please enter a valid number greater than 0.', fieldId + 'Error');
                return false;
            }
            break;
        case 'manufacturingDate':
        case 'expiryDate':
            const date = new Date(value);
            if (!(date instanceof Date) || isNaN(date.getTime())) {
                displayError('Please enter a valid date.', fieldId + 'Error');
                return false;
            }
            break;
        
        default:
            if (!value) {
                displayError('This field is required.', fieldId + 'Error');
                return false;
            }
    }
    return true;
}

// Function to display error messages
function displayError(message, fieldId) {
    const errorElement = document.getElementById(fieldId);
    errorElement.textContent = message;
}

// Function to clear error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(errorElement => {
        errorElement.textContent = '';
    });
}

// Exporting validation functions
export { validateInput, displayError, clearErrors };
