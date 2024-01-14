var maxLimit = 5000;
// Function to add or update an expense
function addOrUpdateExpense() {
    var date = document.getElementById("expenseDate").value;
    var name = document.getElementById("expenseName").value;
    var amount = document.getElementById("expenseAmount").value;
    var editIndex = document.getElementById("editIndex").value;

    // Validate input
    if (name.trim() === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    // Create expense object
    var expense = {
        date: date,
        name: name,
        amount: parseFloat(amount)
    };

    // Retrieve existing expenses from local storage
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    if (editIndex === "") {
        // Add new expense to the list
        expenses.push(expense);
    } else {
        // Update existing expenses
        expenses[editIndex] = expense;
    }

    // Save updated list back to local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Clear the form
    document.getElementById("expenseForm").reset();
    document.getElementById("editIndex").value = "";

    // Update the expense list and totals
    updateExpenseList();
    updateTotals();
}

// Function to edit an expense
function editExpense(index) {
    // Retrieve existing expenses from local storage
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Populate the form with the selected expense details
    document.getElementById("expenseName").value = expenses[index].name;
    document.getElementById("expenseAmount").value = expenses[index].amount;
    document.getElementById("editIndex").value = index;
}

// Function to delete an expense
function deleteExpense(index) {
    // Retrieve existing expenses from local storage
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Remove expense at the specified index
    expenses.splice(index, 1);

    // Save updated list back to local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Update the expense list and totals
    updateExpenseList();
    updateTotals();
}

// Function to update the expense list
function updateExpenseList() {
    var expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    // Retrieve expenses from local storage
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Display each expense in the list
    expenses.forEach(function(expense, index) {
        var listItem = document.createElement("li");
        listItem.className = "expense-item";
        listItem.innerHTML = `
            <span><span class="expense-date">${expense.date}</span> <span class="expense-name"> ${expense.name}:</span> Rs.${expense.amount.toFixed(2)}</span>
            <span><button class="edit-button" onclick="editExpense(${index})">Edit</button>
            <button class="delete-button" onclick="deleteExpense(${index})">Delete</button><span>
        `;
        expenseList.appendChild(listItem);
    });
}


// Function to update the total expenses and income
function updateTotals() {
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Calculate total expenses and income
    var totalExpenses = expenses.reduce(function(acc, expense) {
        return acc + expense.amount;
    }, 0);

    // Update the total expenses display
    document.getElementById("totalExpenses").textContent = totalExpenses.toFixed(2);

    // Check if monthly expenses exceed 5000 Rs
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed

    var monthlyExpenses = expenses.reduce(function(acc, expense) {
        var expenseDate = new Date(expense.date);
        var expenseMonth = expenseDate.getMonth() + 1;

        if (currentMonth === expenseMonth) {
            return acc + expense.amount;
        } else {
            return acc;
        }
    }, 0);

    // Generate alert if monthly expenses exceed 5000 Rs
    if (monthlyExpenses > maxLimit) {
        alert("Warning: Monthly expenses exceed 5000 Rs!");
    }
}

function setLimit(){
    var newLimit = document.getElementById("budget").value;
    maxLimit = newLimit;
}

// Initial update when the page loads
updateExpenseList();
updateTotals();


// Initial update when the page loads
updateExpenseList();
updateTotals();




