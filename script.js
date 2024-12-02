// Estado global de la aplicación
const state = {
    isAuthenticated: false,
    activeTab: 'areas',
    activeLab: 'Mecánica',
    inventory: [],
    users: [{ username: 'admin', password: 'admin' }]
};

// Elementos DOM
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginForm = document.getElementById('login-form');
const registerToggle = document.getElementById('register-toggle');
const tabButtons = document.querySelectorAll('.tab-btn');
const labTabs = document.querySelectorAll('.lab-tab');
const addItemBtn = document.getElementById('add-item-btn');
const inventoryForm = document.getElementById('inventory-form');
const itemForm = document.getElementById('item-form');
const cancelFormBtn = document.getElementById('cancel-form');
const inventoryBody = document.getElementById('inventory-body');

// Funciones de utilidad
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

function updateInventoryTable() {
    inventoryBody.innerHTML = '';
    const filteredItems = state.inventory.filter(item => 
        item.location.includes(state.activeLab)
    );

    if (filteredItems.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="6" class="text-center py-4 text-gray-500">
                No hay items registrados para este laboratorio
            </td>
        `;
        inventoryBody.appendChild(emptyRow);
        return;
    }

    filteredItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.code}</td>
            <td>${item.item}</td>
            <td>${item.description}</td>
            <td>${item.characteristics}</td>
            <td>
                <span class="status-${item.status.toLowerCase()}">
                    ${item.status}
                </span>
            </td>
            <td>${item.location}</td>
        `;
        inventoryBody.appendChild(row);
    });
}

// Event Listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = state.users.find(u => 
        u.username === username && u.password === password
    );

    if (user) {
        state.isAuthenticated = true;
        loginContainer.classList.add('hidden');
        dashboardContainer.classList.remove('hidden');
        showToast('Inicio de sesión exitoso');
    } else {
        showToast('Usuario o contraseña incorrectos', 'error');
    }
});

registerToggle.addEventListener('click', () => {
    const isRegistering = registerToggle.textContent.includes('Regístrate');
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    
    if (isRegistering) {
        registerToggle.textContent = '¿Ya tienes cuenta? Inicia sesión';
        submitBtn.textContent = 'Registrarse';
    } else {
        registerToggle.textContent = '¿No tienes cuenta? Regístrate';
        submitBtn.textContent = 'Iniciar Sesión';
    }
});

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const tabName = button.dataset.tab;
        state.activeTab = tabName;
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(`${tabName}-section`).classList.remove('hidden');
    });
});

labTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        labTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeLab = tab.textContent;
        updateInventoryTable();
    });
});

addItemBtn.addEventListener('click', () => {
    inventoryForm.classList.remove('hidden');
});

cancelFormBtn.addEventListener('click', () => {
    inventoryForm.classList.add('hidden');
    itemForm.reset();
});

itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newItem = {
        code: document.getElementById('code').value,
        item: document.getElementById('item').value,
        description: document.getElementById('description').value,
        characteristics: document.getElementById('characteristics').value,
        status: document.getElementById('status').value,
        location: `${state.activeLab} - ${document.getElementById('location').value}`
    };

    state.inventory.push(newItem);
    updateInventoryTable();
    inventoryForm.classList.add('hidden');
    itemForm.reset();
    showToast('Item agregado correctamente');
});