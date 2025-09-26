/**
 * Farming Simulator 25 Crop Calculator
 * A professional crop growth tracking application
 */

// ========================================
// CROP DATA CONFIGURATION
// ========================================

const cropData = {
    'Wheat': { growthTime: 7, color: '#F59E0B' },
    'Barley': { growthTime: 7, color: '#F59E0B' },
    'Canola': { growthTime: 8, color: '#EAB308' },
    'Oats': { growthTime: 9, color: '#84CC16' },
    'Corn': { growthTime: 6, color: '#22D3EE' },
    'Sunflowers': { growthTime: 7, color: '#F59E0B' },
    'Soybeans': { growthTime: 6, color: '#22D3EE' },
    'Potatoes': { growthTime: 5, color: '#10B981' },
    'Rice': { growthTime: 4, color: '#06B6D4' },
    'Long Grain Rice': { growthTime: 5, color: '#10B981' },
    'Sugar Beet': { growthTime: 7, color: '#F59E0B' },
    'Sugarcane': { growthTime: 7, color: '#F59E0B' },
    'Cotton': { growthTime: 8, color: '#EAB308' },
    'Sorghum': { growthTime: 4, color: '#06B6D4' },
    'Grapes': { growthTime: 5, color: '#10B981' },
    'Olives': { growthTime: 4, color: '#06B6D4' },
    'Poplar': { growthTime: 12, color: '#DC2626' },
    'Red Beet': { growthTime: 4, color: '#06B6D4' },
    'Carrots': { growthTime: 4, color: '#06B6D4' },
    'Parsnips': { growthTime: 4, color: '#06B6D4' },
    'Green Beans': { growthTime: 4, color: '#06B6D4' },
    'Peas': { growthTime: 4, color: '#06B6D4' },
    'Spinach': { growthTime: 3, color: '#10B981' },
    'Grass': { growthTime: 2.5, color: '#22C55E' },
    'Oilseed Radish': { growthTime: 1, color: '#22C55E' }
};

// ========================================
// APPLICATION STATE
// ========================================

let fields = [];

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Calculate harvest date based on plant date and crop type
 * @param {string} plantDateString - ISO date string
 * @param {string} cropType - Crop type key
 * @returns {Date} Calculated harvest date
 */
function calculateHarvestDate(plantDateString, cropType) {
    const plantDate = new Date(plantDateString);
    const growthTime = cropData[cropType]?.growthTime || 0;
    const harvestDate = new Date(plantDate);
    harvestDate.setMonth(harvestDate.getMonth() + growthTime);
    return harvestDate;
}

/**
 * Calculate days remaining until harvest
 * @param {Date} harvestDate - Target harvest date
 * @returns {number} Days remaining (negative if overdue)
 */
function getTimeRemaining(harvestDate) {
    const now = new Date();
    const timeDiff = harvestDate.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

/**
 * Get status color based on days remaining
 * @param {number} daysRemaining - Days until harvest
 * @returns {string} CSS class name for status color
 */
function getStatusColor(daysRemaining) {
    if (daysRemaining < 0) return 'bg-green-500';
    if (daysRemaining <= 7) return 'bg-yellow-500';
    if (daysRemaining <= 30) return 'bg-orange-500';
    return 'bg-blue-500';
}

/**
 * Get human-readable status text
 * @param {number} daysRemaining - Days until harvest
 * @returns {string} Status message
 */
function getStatusText(daysRemaining) {
    if (daysRemaining < 0) return 'Ready to Harvest!';
    if (daysRemaining === 0) return 'Harvest Today!';
    if (daysRemaining === 1) return '1 day remaining';
    return `${daysRemaining} days remaining`;
}

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

/**
 * Generate CSS class name from crop type
 * @param {string} cropType - Crop type name
 * @returns {string} CSS class name
 */
function getCropClass(cropType) {
    return 'crop-' + cropType.toLowerCase().replace(/\s+/g, '');
}

// ========================================
// DATA PERSISTENCE
// ========================================

/**
 * Load fields from localStorage
 */
function loadFields() {
    try {
        const saved = localStorage.getItem('farmingFields');
        if (saved) {
            fields = JSON.parse(saved).map(field => ({
                ...field,
                plantDate: new Date(field.plantDate),
                harvestDate: new Date(field.harvestDate)
            }));
        }
    } catch (error) {
        console.error('Error loading fields from localStorage:', error);
        fields = [];
    }
}

/**
 * Save fields to localStorage
 */
function saveFields() {
    try {
        localStorage.setItem('farmingFields', JSON.stringify(fields));
    } catch (error) {
        console.error('Error saving fields to localStorage:', error);
    }
}

// ========================================
// UI INITIALIZATION
// ========================================

/**
 * Populate crop type dropdown
 */
function populateCropSelect() {
    const select = document.getElementById('crop-type');
    const sortedCrops = Object.keys(cropData).sort();
    
    // Clear existing options except the first one
    select.innerHTML = '<option value="">Select a crop</option>';
    
    sortedCrops.forEach(crop => {
        const option = document.createElement('option');
        option.value = crop;
        option.textContent = `${crop} (${cropData[crop].growthTime} months)`;
        select.appendChild(option);
    });
}

/**
 * Populate crop reference guide
 */
function populateCropReference() {
    const container = document.getElementById('crop-reference');
    const sortedCrops = Object.keys(cropData).sort();
    
    container.innerHTML = '';
    
    sortedCrops.forEach(crop => {
        const div = document.createElement('div');
        div.className = 'text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors';
        div.innerHTML = `
            <div class="text-sm font-medium text-gray-900 mb-1">${crop}</div>
            <div class="text-xs text-gray-600">
                ${cropData[crop].growthTime} ${cropData[crop].growthTime === 1 ? 'month' : 'months'}
            </div>
        `;
        container.appendChild(div);
    });
}

// ========================================
// MODAL FUNCTIONS
// ========================================

/**
 * Show the add field modal
 */
function showAddForm() {
    const modal = document.getElementById('add-field-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Set today's date as default
    document.getElementById('plant-date').value = new Date().toISOString().split('T')[0];
    
    // Focus on field name input
    document.getElementById('field-name').focus();
}

/**
 * Hide the add field modal
 */
function hideAddForm() {
    const modal = document.getElementById('add-field-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    // Reset form
    document.getElementById('add-field-form').reset();
}

// ========================================
// FIELD MANAGEMENT
// ========================================

/**
 * Add a new field
 */
function addField() {
    const fieldName = document.getElementById('field-name').value.trim();
    const cropType = document.getElementById('crop-type').value;
    const plantDateValue = document.getElementById('plant-date').value;
    const notes = document.getElementById('notes').value.trim();

    // Validation
    if (!fieldName || !cropType || !plantDateValue) {
        alert('Please fill in all required fields (Field Name, Crop Type, and Plant Date).');
        return;
    }

    const plantDate = new Date(plantDateValue);
    
    // Check if date is valid
    if (isNaN(plantDate.getTime())) {
        alert('Please enter a valid plant date.');
        return;
    }

    // Check if field name already exists
    if (fields.some(field => field.fieldName.toLowerCase() === fieldName.toLowerCase())) {
        alert('A field with this name already exists. Please choose a different name.');
        return;
    }

    const harvestDate = calculateHarvestDate(plantDateValue, cropType);

    const field = {
        id: Date.now(),
        fieldName,
        cropType,
        plantDate,
        harvestDate,
        notes
    };

    fields.push(field);
    saveFields();
    updateDisplay();
    hideAddForm();
    
    // Show success message
    showNotification(`Field "${fieldName}" added successfully!`, 'success');
}

/**
 * Remove a field
 * @param {number} id - Field ID to remove
 */
function removeField(id) {
    const field = fields.find(f => f.id === id);
    if (field && confirm(`Are you sure you want to remove "${field.fieldName}"?`)) {
        fields = fields.filter(field => field.id !== id);
        saveFields();
        updateDisplay();
        showNotification(`Field "${field.fieldName}" removed.`, 'info');
    }
}

// ========================================
// UI UPDATE FUNCTIONS
// ========================================

/**
 * Update all UI elements
 */
function updateDisplay() {
    updateSummaryCards();
    updateFieldsList();
}

/**
 * Update summary statistics cards
 */
function updateSummaryCards() {
    const totalFields = fields.length;
    const readyHarvest = fields.filter(f => getTimeRemaining(f.harvestDate) <= 0).length;
    const harvestSoon = fields.filter(f => {
        const days = getTimeRemaining(f.harvestDate);
        return days > 0 && days <= 7;
    }).length;
    const growing = fields.filter(f => getTimeRemaining(f.harvestDate) > 7).length;

    document.getElementById('total-fields').textContent = totalFields;
    document.getElementById('ready-harvest').textContent = readyHarvest;
    document.getElementById('harvest-soon').textContent = harvestSoon;
    document.getElementById('growing').textContent = growing;
}

/**
 * Update the fields list display
 */
function updateFieldsList() {
    const container = document.getElementById('fields-container');
    const emptyState = document.getElementById('empty-state');

    if (fields.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    // Sort fields by harvest readiness
    const sortedFields = [...fields].sort((a, b) => {
        const aDays = getTimeRemaining(a.harvestDate);
        const bDays = getTimeRemaining(b.harvestDate);
        if (aDays < 0 && bDays >= 0) return -1;
        if (bDays < 0 && aDays >= 0) return 1;
        return aDays - bDays;
    });

    // Generate HTML for fields
    const fieldsHTML = sortedFields.map(field => {
        const daysRemaining = getTimeRemaining(field.harvestDate);
        const statusColor = getStatusColor(daysRemaining);
        const statusText = getStatusText(daysRemaining);
        const cropClass = getCropClass(field.cropType);
        const readyClass = daysRemaining <= 0 ? 'ready-harvest' : '';

        return `
            <div class="p-6 hover:bg-gray-50 transition-colors border-b ${cropClass}">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-2">
                            <h3 class="text-lg font-semibold text-gray-900">${escapeHtml(field.fieldName)}</h3>
                            <span class="px-3 py-1 rounded-full text-white text-sm ${statusColor} ${readyClass}">
                                ${statusText}
                            </span>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div>
                                <strong>Crop:</strong> ${escapeHtml(field.cropType)}
                                <span class="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                                    ${cropData[field.cropType]?.growthTime}mo
                                </span>
                            </div>
                            <div><strong>Planted:</strong> ${formatDate(field.plantDate)}</div>
                            <div><strong>Harvest:</strong> ${formatDate(field.harvestDate)}</div>
                        </div>
                        ${field.notes ? `
                            <div class="mt-2 text-sm text-gray-600">
                                <strong>Notes:</strong> ${escapeHtml(field.notes)}
                            </div>
                        ` : ''}
                    </div>
                    <button onclick="removeField(${field.id})" 
                            class="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove field">
                        <i data-lucide="trash-2" class="h-5 w-5"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = fieldsHTML;
    
    // Re-initialize Lucide icons for new content
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ========================================
// UTILITY UI FUNCTIONS
// ========================================

/**
 * Escape HTML to prevent XSS
 * @param {string} unsafe - Unsafe string
 * @returns {string} Escaped string
 */
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Show notification message
 * @param {string} message - Message to show
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ========================================
// EVENT HANDLERS
// ========================================

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(event) {
    // ESC to close modal
    if (event.key === 'Escape') {
        const modal = document.getElementById('add-field-modal');
        if (!modal.classList.contains('hidden')) {
            hideAddForm();
        }
    }
    
    // Ctrl/Cmd + N to add new field
    if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        showAddForm();
    }
}

/**
 * Handle form submission
 */
function handleFormSubmit(event) {
    event.preventDefault();
    addField();
}

/**
 * Handle modal click outside to close
 */
function handleModalClick(event) {
    const modal = document.getElementById('add-field-modal');
    if (event.target === modal) {
        hideAddForm();
    }
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize the application
 */
function init() {
    try {
        // Load data
        loadFields();
        
        // Setup UI
        populateCropSelect();
        populateCropReference();
        updateDisplay();
        
        // Setup event listeners
        document.addEventListener('keydown', handleKeyboardShortcuts);
        document.getElementById('add-field-form').addEventListener('submit', handleFormSubmit);
        document.getElementById('add-field-modal').addEventListener('click', handleModalClick);
        
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Auto-refresh every minute to update time remaining
        setInterval(updateDisplay, 60000);
        
        console.log('Farming Simulator 25 Calculator initialized successfully!');
        
    } catch (error) {
        console.error('Error initializing application:', error);
        showNotification('Error initializing application. Please refresh the page.', 'error');
    }
}

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}