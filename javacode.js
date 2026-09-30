let contacts = [];
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const contactList = document.getElementById('contact-list');
const counterSpan = document.getElementById('counter');
const searchInput = document.getElementById('search');
function renderContacts(filteredContacts = contacts) {
    contactList.innerHTML = '';
    if (filteredContacts.length === 0) {
        contactList.innerHTML = <p id="empty-message">No se encontraron contactos.</p>;
        return;
    }
    filteredContacts.forEach(contact => {
        const li = document.createElement('li');
        li.className = 'contact-item';
        li.innerHTML = `
            <div class="contact-info">
                <strong>${contact.name}</strong>
                <span>${contact.phone}</span>
            </div>
            <button class="btn-delete" onclick="deleteContact(${contact.id})">Eliminar</button>
        `;
        contactList.appendChild(li);
    });
}

function updateCounter() {
    counterSpan.textContent = Contactos: ${contacts.length};
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameValue = nameInput.value.trim();
    const phoneValue = phoneInput.value.trim();

    const isDuplicate = contacts.some(c => c.name.toLowerCase() === nameValue.toLowerCase());
    if (isDuplicate) {
        alert('Este nombre de contacto ya existe en tu directorio.');
        return;
    }

    
    const newContact = {
        id: Date.now(),
        name: nameValue,
        phone: phoneValue
    };

    contacts.push(newContact);
    contacts.sort((a, b) => a.name.localeCompare(b.name));

    contactForm.reset();
    updateCounter();
    renderContacts();
});

function deleteContact(id) {
    contacts = contacts.filter(c => c.id !== id);
    updateCounter();
    renderContacts();
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = contacts.filter(c => c.name.toLowerCase().includes(searchTerm));
    
    renderContacts(filtered);
});