let totalAmount = 0;

let addButton = document.getElementById("add");
let tbody = document.querySelector("tbody");
let totalExpense = document.getElementById("total-amount");

document.addEventListener('DOMContentLoaded', renderFromLocal);

addButton.addEventListener('click', () => {
    let category = document.getElementById("category").value;
    let amount = document.getElementById("amount").value;
    let date = document.querySelector("input[type='date']").value;

    amount = parseFloat(amount);

    if (isNaN(amount) || date === '') {
        alert("Please fill out all the fields first");
    } else {
        totalAmount += amount;
        localStorage.setItem('total', totalAmount); 
        totalExpense.innerText = totalAmount;

        let newRow = document.createElement("tr");
        let data1 = document.createElement("td");
        let data2 = document.createElement("td");
        let data3 = document.createElement("td");
        let data4 = document.createElement("td");
        let deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-btn");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener('click', deleteTask);

        data1.innerText = category;
        data2.innerText = amount;
        data3.innerText = date;
        data4.append(deleteButton);

        newRow.append(data1);
        newRow.append(data2);
        newRow.append(data3);
        newRow.append(data4);

        tbody.append(newRow);
        addExpenseToLocal(category, amount, date);
    }
});

function deleteTask(event) {
    let parent = event.target.parentElement.parentElement;
    let deletions = parent.querySelectorAll("td");

    let category = deletions[0].innerText;
    let amount = parseFloat(deletions[1].innerText);
    let date = deletions[2].innerText;

    totalAmount -= amount;
    localStorage.setItem('total', totalAmount); 
    totalExpense.innerText = totalAmount;

    deleteFromLocal(category, amount, date);
    parent.remove();
}

function addExpenseToLocal(category, amount, date) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const newExpense = {
        category: category,
        amount: amount,
        date: date,
    };

    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function deleteFromLocal(category, amount, date) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    expenses = expenses.filter(expense =>
        !(expense.category === category &&
          expense.amount === amount &&
          expense.date === date)
    );

    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function renderFromLocal() {
    const tableBody = document.querySelector('tbody');

    tableBody.innerHTML = '';

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    totalAmount = parseFloat(localStorage.getItem('total')) || 0; 
    totalExpense.innerText = totalAmount; 

    expenses.forEach((expense) => {
        const row = document.createElement('tr');

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', deleteTask);

        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
        `;
        let actionCell = document.createElement('td');
        actionCell.append(deleteButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}
