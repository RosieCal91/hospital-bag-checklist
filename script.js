document.addEventListener('DOMContentLoaded', function () {
    const babyChecklistForm = document.getElementById('henryChecklistForm');
    const henryNewItemInput = document.getElementById('henryNewItem');
    const babyChecklist = document.getElementById('henryChecklist');

    const siobhanChecklistForm = document.getElementById('siobhanChecklistForm');
    const siobhanNewItemInput = document.getElementById('siobhanNewItem');
    const siobhanChecklist = document.getElementById('siobhanChecklist');

    function addItem(form, input, checklist) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const newItemText = input.value.trim();
            if (newItemText !== '') {
                const listItem = createListItem(newItemText);
                checklist.appendChild(listItem);
                input.value = '';

                updateLocalStorage(checklist); // Update localStorage when a new item is added
            }
        });
    }

    function createListItem(text) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox">
            ${text}
            <button class="delete-btn">Delete</button>
        `;
        return listItem;
    }

    function updateLocalStorage(checklist) {
        const items = Array.from(checklist.querySelectorAll('li')).map(function (item) {
            return {
                text: item.textContent.replace('Delete', '').trim(),
                checked: item.querySelector('input[type="checkbox"]').checked
            };
        });

        localStorage.setItem(checklist.id, JSON.stringify(items));
    }

    // Retrieve checklist items from localStorage on page load
    function loadItemsFromLocalStorage(checklist) {
        const items = JSON.parse(localStorage.getItem(checklist.id)) || [];
        items.forEach(function (item) {
            const listItem = createListItem(item.text);
            if (item.checked) {
                listItem.querySelector('input[type="checkbox"]').checked = true;
            }
            checklist.appendChild(listItem);
        });
    }

    // Handle delete button click using event delegation for both checklists
    function handleChecklistClick(e, checklist) {
        if (e.target.classList.contains('delete-btn')) {
            const listItem = e.target.parentElement;
            listItem.remove();
            updateLocalStorage(checklist); // Update localStorage when an item is deleted
        }
    }

    // Add items to both checklists
    addItem(henryChecklistForm, henryNewItemInput, babyChecklist);
    addItem(siobhanChecklistForm, siobhanNewItemInput, siobhanChecklist);

    // Load checklist items from localStorage on page load for both checklists
    loadItemsFromLocalStorage(babyChecklist);
    loadItemsFromLocalStorage(siobhanChecklist);

    // Attach event delegation for delete button clicks to both checklists
    babyChecklist.addEventListener('click', (e) => handleChecklistClick(e, babyChecklist));
    siobhanChecklist.addEventListener('click', (e) => handleChecklistClick(e, siobhanChecklist));
});



