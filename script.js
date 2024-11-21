// Store orders in an array
const orders = [];

// Handle form submission to add an order
document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Get input values
    const personName = document.getElementById('personName').value.trim();
    const itemName = document.getElementById('itemName').value.trim();
    const itemQty = parseInt(document.getElementById('itemQty').value.trim(), 10);
    
    // Add the order to the array
    if (personName && itemName && itemQty > 0) {
        orders.push({ personName, itemName, itemQty });
        alert('Order added successfully!');
        
        // Clear form inputs
        document.getElementById('personName').value = '';
        document.getElementById('itemName').value = '';
        document.getElementById('itemQty').value = '';
    } else {
        alert('Please fill in all fields correctly.');
    }
});

// Show summary of orders
document.getElementById('showSummary').addEventListener('click', function () {
    const summaryContainer = document.getElementById('summaryContainer');
    const summaryList = document.getElementById('summaryList');
    
    // Group orders by item
    const orderSummary = orders.reduce((acc, order) => {
        if (!acc[order.itemName]) {
            acc[order.itemName] = { total: 0, persons: {} };
        }
        acc[order.itemName].total += order.itemQty;
        
        // Store individual person's quantity for this item
        if (!acc[order.itemName].persons[order.personName]) {
            acc[order.itemName].persons[order.personName] = 0;
        }
        acc[order.itemName].persons[order.personName] += order.itemQty;
        
        return acc;
    }, {});
    
    // Clear previous summary
    summaryList.innerHTML = '';

    // Display each item's summary
    for (const [itemName, details] of Object.entries(orderSummary)) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('dropdown');
        
        // Generate the list of persons with quantities
        const personsList = Object.entries(details.persons)
            .map(([person, qty]) => `<li>${person}: ${qty}</li>`)
            .join('');
        
        itemDiv.innerHTML = `
            <strong>${itemName} - Total: ${details.total}</strong>
            <ul>
                ${personsList}
            </ul>
        `;
        summaryList.appendChild(itemDiv);
    }

    // Show the summary container
    summaryContainer.classList.remove('hidden');
});
