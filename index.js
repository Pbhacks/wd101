// Load saved data from localStorage
function loadEntries() {
    const tableBody = document.getElementById('entriesTable');
    const data = JSON.parse(localStorage.getItem('registrationData')) || [];

    tableBody.innerHTML = '';

    data.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.terms ? 'Yes' : 'No'}</td>
            <td><button class="removeButton" data-index="${index}">Remove</button></td>
        `;
        tableBody.appendChild(row);
    });

    // Add event listeners to the remove buttons
    document.querySelectorAll('.removeButton').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            removeEntry(index);
        });
    });
}

// Add an entry to the table and localStorage
document.getElementById('registrationForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    // Validate date of birth
    const dobDate = new Date(dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    if (age < 18 || age > 55) {
        alert('You must be between 18 and 55 years old.');
        return;
    }

    const newEntry = { name, email, password, dob, terms };
    const existingData = JSON.parse(localStorage.getItem('registrationData')) || [];
    existingData.push(newEntry);
    localStorage.setItem('registrationData', JSON.stringify(existingData));

    loadEntries(); // Refresh the table
    event.target.reset(); // Clear the form
});

// Remove an entry by index
function removeEntry(index) {
    let existingData = JSON.parse(localStorage.getItem('registrationData')) || [];
    existingData.splice(index, 1); // Remove entry at the given index
    localStorage.setItem('registrationData', JSON.stringify(existingData));
    loadEntries(); // Refresh the table
}

// Remove all entries
document.getElementById('removeAllButton').addEventListener('click', () => {
    localStorage.removeItem('registrationData');
    loadEntries(); // Refresh the table
});

// Initial load of entries
loadEntries();
