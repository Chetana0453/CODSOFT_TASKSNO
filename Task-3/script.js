const form = document.querySelector("#transaction-form");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");
const transactionList = document.querySelector("#transaction-list");
const emptyMessage = document.querySelector("#empty-message");
const totalIncome = document.querySelector("#total-income");
const totalExpenses = document.querySelector("#total-expenses");
const balance = document.querySelector("#balance");
const submitButton = document.querySelector("#submit-button");
const cancelEditButton = document.querySelector("#cancel-edit");

let editingIndex = null;
const transactions = [JSON.parse(localStorage.getItem("expense-transactions")) || []];

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);

  if (description === "" || !Number.isFinite(amount) || amount <= 0) {
    alert("Enter a description and a valid positive amount.");
    return;
  }
  const transaction = {
  description: description,
  amount: Math.round(amount * 100),
  type: typeInput.value,
  category: categoryInput.value,
  date: dateInput.value
};

if (editingIndex === null) {
  transactions.push(transaction);
} else {
  transactions[editingIndex] = transaction;
}
  form.reset();
  resetForm();
});

function showTransactions() {
  localStorage.setItem(
    "expense-transactions",
    JSON.stringify(transactions)
  );
  transactionList.innerHTML = "";

  let income = 0;
  let expenses = 0;

  transactions.forEach(function (transaction , index) {
    if (transaction.type === "income") {
      income += transaction.amount;
    } else {
      expenses += transaction.amount;
    }

    const item = document.createElement("li");

    const details = document.createElement("div");
    details.className = "transaction-details";

    const title = document.createElement("strong");
    title.textContent = transaction.description;

    const information = document.createElement("p");
    information.textContent =
      `${transaction.date} • ${transaction.category} • ${transaction.type}`;

    details.append(title, information);

    const amount = document.createElement("strong");
    amount.className = transaction.type;

    const sign = transaction.type === "income" ? "+" : "−";
    amount.textContent =
      sign + currency.format(transaction.amount / 100);
    
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.setAttribute("aria-label",`Edit ${transaction.description}`
);

editButton.addEventListener("click", function () {
  editingIndex = index;

  descriptionInput.value = transaction.description;
  amountInput.value = transaction.amount / 100;
  typeInput.value = transaction.type;
  categoryInput.value = transaction.category;
  dateInput.value = transaction.date;

  submitButton.textContent = "Save Changes";
  cancelEditButton.hidden = false;
  descriptionInput.focus();
});
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.setAttribute("aria-label",`Delete ${transaction.description}`
);

deleteButton.addEventListener("click", function () {
  transactions.splice(index, 1);
  showTransactions();
});

    item.append(details, amount, editButton, deleteButton);
    transactionList.appendChild(item);
  });

  totalIncome.textContent = currency.format(income / 100);
  totalExpenses.textContent = currency.format(expenses / 100);
  balance.textContent = currency.format((income - expenses) / 100);

  emptyMessage.hidden = transactions.length > 0;
}
function resetForm() {
  form.reset();
  editingIndex = null;
  submitButton.textContent = "Add Transaction";
  cancelEditButton.hidden = true;
}

cancelEditButton.addEventListener("click", resetForm);
showTransactions();