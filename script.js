/**
 * FS25 Crop Calculator - Modern JavaScript
 */

// Game state
let currentGameDate = {
    day: 3,
    month: 10, // October
    year: 1
};

let fields = [];

// Constants
const monthNames = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April',
    5: 'May', 6: 'June', 7: 'July', 8: 'August', 
    9: 'September', 10: 'October', 11: 'November', 12: 'December'
};

const seasons = {
    3: 'Spring', 4: 'Spring', 5: 'Spring',
    6: 'Summer', 7: 'Summer', 8: 'Summer',
    9: 'Fall', 10: 'Fall', 11: 'Fall',
    12: 'Winter', 1: 'Winter', 2: 'Winter'
};

// Crop data with FS25 calendar information
const cropData = {
    'Barley': { 
        growthTime: 4,
        plantingSeason: [9, 10],
        harvestSeason: [6, 7],
        icon: '🌾'
    },
    'Canola': {
        growthTime: 10,
        plantingSeason: [7, 8, 9],
        harvestSeason: [6, 7, 8],
        icon: '🌻'
    },
    'Carrots': {
        growthTime: 5,
        plantingSeason: [4, 5, 6],
        harvestSeason: [8, 9, 10, 11],
        icon: '🥕'
    },
    'Corn': {
        growthTime: 6,
        plantingSeason: [3, 4, 5],
        harvestSeason: [10, 11],
        icon: '🌽'
    },
    'Cotton': {
        growthTime: 8,
        plantingSeason: [3],
        harvestSeason: [10, 11, 2],
        icon: '☁️'
    },
    'Grapes': {
        growthTime: 6,
        plantingSeason: [3, 4, 5],
        harvestSeason: [9, 10],
        icon: '🍇'
    },
    'Grass': {
        growthTime: 4,
        plantingSeason: [3, 4, 5, 6, 7, 8, 9],
        harvestSeason: [5, 6, 7, 8, 9, 10, 11, 12, 1, 2],
        icon: '🌱'
    },
    'Green Beans': {
        growthTime: 4,
        plantingSeason: [4, 5, 6],
        harvestSeason: [8, 9, 10, 11],
        icon: '🫘'
    },
    'Long Grain Rice': {
        growthTime: 5,
        plantingSeason: [3, 4],
        harvestSeason: [8, 9],
        icon: '🌾'
    },
    'Oats': {
        growthTime: 5,
        plantingSeason: [3, 4, 5],
        harvestSeason: [7, 8],
        icon: '🌾'
    },
    'Oilseed Radish': {
        growthTime: 12,
        plantingSeason: [3, 4, 5, 6, 7, 8, 9, 10, 11],
        harvestSeason: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2],
        icon: '🌱'
    },
    'Olives': {
        growthTime: 4,
        plantingSeason: [3, 4, 5, 6],
        harvestSeason: [9, 10],
        icon: '🫒'
    },
    'Parsnips': {
        growthTime: 6,
        plantingSeason: [4, 5, 6],
        harvestSeason: [8, 9, 10, 11],
        icon: '🥕'
    },
    'Peas': {
        growthTime: 4,
        plantingSeason: [3, 4, 5],
        harvestSeason: [7, 8, 9],
        icon: '🫛'
    },
    'Poplar': {
        growthTime: 12,
        plantingSeason: [3, 4, 5, 6, 7, 8],
        harvestSeason: [9, 10, 11, 12, 1, 2],
        icon: '🌳'
    },
    'Potatoes': {
        growthTime: 5,
        plantingSeason: [3, 4, 5],
        harvestSeason: [8, 9],
        icon: '🥔'
    },
    'Red Beet': {
        growthTime: 6,
        plantingSeason: [4, 5, 6],
        harvestSeason: [8, 9, 10, 11],
        icon: '🍠'
    },
    'Rice': {
        growthTime: 5,
        plantingSeason: [4, 5],
        harvestSeason: [8, 9],
        icon: '🌾'
    },
    'Sorghum': {
        growthTime: 5,
        plantingSeason: [4, 5],
        harvestSeason: [8, 9],
        icon: '🌾'
    },
    'Soybeans': {
        growthTime: 6,
        plantingSeason: [4, 5],
        harvestSeason: [9, 10],
        icon: '🫘'
    },
    'Spinach': {
        growthTime: 7,
        plantingSeason: [4, 5, 6],
        harvestSeason: [8, 9, 10, 11],
        icon: '🥬'
    },
    'Sugar Beet': {
        growthTime: 6,
        plantingSeason: [3, 4],
        harvestSeason: [9, 10, 11],
        icon: '🍠'
    },
    'Sunflowers': {
        growthTime: 6,
        plantingSeason: [4, 5],
        harvestSeason: [10, 11],
        icon: '🌻'
    },
    'Wheat': {
        growthTime: 9,
        plantingSeason: [8, 9],
        harvestSeason: [6, 7],
        icon: '🌾'
    }
};

// Date utility functions
function gameDataToDays(day, month, year) {
    return (year - 1) * 336 + ((month - 1) * 28) + (day - 1);
}

function daysToGameDate(totalDays) {
    const year = Math.floor(totalDays / 336) + 1;
    const remainingDays = totalDays % 336;
    const month = Math.floor(remainingDays / 28) + 1;
    const day = (remainingDays % 28) + 1;
    return { day, month, year };
}

function calculateHarvestDate(plantDay, plantMonth, cropType) {
    const plantTotalDays = gameDataToDays(plantDay, plantMonth, currentGameDate.year);
    const growthTimeInDays = cropData[cropType].growthTime * 28;
    const harvestTotalDays = plantTotalDays + growthTimeInDays;
    return daysToGameDate(harvestTotalDays);
}

function getGameDaysRemaining(harvestDate) {
    const currentTotalDays = gameDataToDays(currentGameDate.day, currentGameDate.month, currentGameDate.year);
    const harvestTotalDays = gameDataToDays(harvestDate.day, harvestDate.month, harvestDate.year);
    return harvestTotalDays - currentTotalDays;
}

function isPlantingSeason(cropType) {
    return cropData[cropType].plantingSeason.includes(currentGameDate.month);
}

function isHarvestSeason(cropType) {
    return cropData[cropType].harvestSeason.includes(currentGameDate.month);
}

// UI Update Functions
function updateGameDateDisplay() {
    const dateElement = document.getElementById('current-game-date');
    const seasonElement = document.getElementById('current-season');
    
    if (dateElement) {
        const dateStr = `Day ${currentGameDate.day}, ${monthNames[currentGameDate.month]}, Year ${currentGameDate.year}`;
        dateElement.textContent = dateStr;
    }
    
    if (seasonElement) {
        seasonElement.textContent = seasons[currentGameDate.month];
    }
}

function updateStatsCards() {
    const totalFields = fields.length;
    const readyHarvest = fields.filter(f => getGameDaysRemaining(f.harvestDate) <= 0).length;
    const growing = totalFields - readyHarvest;

    const elements = {
        'total-fields': totalFields,
        'ready-harvest': readyHarvest,
        'growing': growing
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

function updatePlantingRecommendations() {
    const container = document.getElementById('planting-recommendations');
    if (!container) return;
    
    const canPlant = Object.keys(cropData).filter(isPlantingSeason);
    
    if (canPlant.length === 0) {
        container.innerHTML = `
            <div class="recommendation-item">
                <div class="crop-info">
                    <div class="crop-name">No crops to plant</div>
                    <div class="crop-details">Nothing recommended for planting this month</div>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = canPlant.map(crop => `
        <div class="recommendation-item">
            <div class="crop-emoji">${cropData[crop].icon}</div>
            <div class="crop-info">
                <div class="crop-name">${crop}</div>
                <div class="crop-details">${cropData[crop].growthTime} months to harvest</div>
            </div>
        </div>
    `).join('');
}

function updateHarvestRecommendations() {
    const container = document.getElementById('harvest-recommendations');
    if (!container) return;
    
    const canHarvest = Object.keys(cropData).filter(isHarvestSeason);
    
    if (canHarvest.length === 0) {
        container.innerHTML = `
            <div class="recommendation-item">
                <div class="crop-info">
                    <div class="crop-name">No harvest season</div>
                    <div class="crop-details">No crops in harvest season this month</div>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = canHarvest.map(crop => `
        <div class="recommendation-item">
            <div class="crop-emoji">${cropData[crop].icon}</div>
            <div class="crop-info">
                <div class="crop-name">${crop}</div>
                <div class="crop-details">Harvest season active</div>
            </div>
        </div>
    `).join('');
}

function updateFieldsList() {
    const container = document.getElementById('fields-container');
    const emptyState = document.getElementById('empty-state');
    
    if (!container) return;

    if (fields.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Sort by harvest date
    const sortedFields = [...fields].sort((a, b) => {
        return getGameDaysRemaining(a.harvestDate) - getGameDaysRemaining(b.harvestDate);
    });

    const fieldsHTML = sortedFields.map(field => {
        const daysRemaining = getGameDaysRemaining(field.harvestDate);
        let statusClass, statusText;

        if (daysRemaining <= 0) {
            statusClass = 'status-ready';
            statusText = 'Ready to Harvest!';
        } else if (daysRemaining <= 28) {
            statusClass = 'status-warning';
            statusText = `${daysRemaining} days remaining`;
        } else {
            statusClass = 'status-growing';
            statusText = `${daysRemaining} days remaining`;
        }

        return `
            <div class="field-item">
                <div class="field-header">
                    <div class="field-info">
                        <div class="field-emoji">${cropData[field.cropType].icon}</div>
                        <div class="field-details">
                            <h4>${field.fieldName}</h4>
                            <div class="field-status ${statusClass}">${statusText}</div>
                        </div>
                    </div>
                    <div class="field-actions">
                        <button class="action-btn delete" onclick="removeField(${field.id})" title="Remove field">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
                <div class="field-meta">
                    <div class="meta-item">
                        <strong>Crop:</strong> ${field.cropType}
                        ${field.fieldSize ? ` • ${field.fieldSize} ha` : ''}
                    </div>
                    <div class="meta-item">
                        <strong>Planted:</strong> Day ${field.plantDate.day}, ${monthNames[field.plantDate.month]}
                    </div>
                    <div class="meta-item">
                        <strong>Harvest:</strong> Day ${field.harvestDate.day}, ${monthNames[field.harvestDate.month]}
                    </div>
                    ${field.notes ? `<div class="meta-item"><strong>Notes:</strong> ${field.notes}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = fieldsHTML;
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function createCropCalendar() {
    const container = document.getElementById('crop-calendar');
    if (!container) return;
    
    const months = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]; // Mar-Feb
    
    let calendarHTML = `
        <div class="calendar-grid">
            <div class="calendar-header">
                <div class="crop-header">Crop</div>
                ${months.map(month => `<div class="month-header">${monthNames[month].substring(0, 3)}</div>`).join('')}
            </div>
    `;
    
    Object.keys(cropData).sort().forEach(crop => {
        const data = cropData[crop];
        calendarHTML += `
            <div class="calendar-row">
                <div class="crop-name">
                    <span class="crop-icon">${data.icon}</span>
                    <span>${crop}</span>
                </div>
                ${months.map(month => {
                    let cellClass = 'calendar-cell';
                    const isPlanting = data.plantingSeason.includes(month);
                    const isHarvest = data.harvestSeason.includes(month);
                    
                    if (isPlanting && isHarvest) {
                        cellClass += ' both';
                    } else if (isPlanting) {
                        cellClass += ' planting';
                    } else if (isHarvest) {
                        cellClass += ' harvest';
                    }
                    
                    if (month === currentGameDate.month) {
                        cellClass += ' current';
                    }
                    
                    return `<div class="${cellClass}"></div>`;
                }).join('')}
            </div>
        `;
    });
    
    calendarHTML += '</div>';
    container.innerHTML = calendarHTML;
}

// Modal Functions
function showAddForm() {
    const modal = document.getElementById('add-field-modal');
    if (modal) {
        modal.classList.add('show');
        
        // Set default values
        const plantMonth = document.getElementById('plant-month');
        const plantDay = document.getElementById('plant-day');
        const fieldName = document.getElementById('field-name');
        
        if (plantMonth) plantMonth.value = currentGameDate.month;
        if (plantDay) plantDay.value = currentGameDate.day;
        if (fieldName) fieldName.focus();
    }
}

function hideAddForm() {
    const modal = document.getElementById('add-field-modal');
    if (modal) {
        modal.classList.remove('show');
        
        // Reset form
        const form = modal.querySelector('form');
        if (form) form.reset();
    }
}

function showDatePicker() {
    const modal = document.getElementById('date-picker-modal');
    if (modal) {
        modal.classList.add('show');
        
        // Set current values
        const dayInput = document.getElementById('game-day');
        const monthInput = document.getElementById('game-month');
        const yearInput = document.getElementById('game-year');
        
        if (dayInput) dayInput.value = currentGameDate.day;
        if (monthInput) monthInput.value = currentGameDate.month;
        if (yearInput) yearInput.value = currentGameDate.year;
    }
}

function hideDatePicker() {
    const modal = document.getElementById('date-picker-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function updateGameDate() {
    const dayInput = document.getElementById('game-day');
    const monthInput = document.getElementById('game-month');
    const yearInput = document.getElementById('game-year');
    
    if (dayInput && monthInput && yearInput) {
        currentGameDate.day = parseInt(dayInput.value) || 1;
        currentGameDate.month = parseInt(monthInput.value) || 1;
        currentGameDate.year = parseInt(yearInput.value) || 1;
        
        saveData();
        updateAllDisplays();
        hideDatePicker();
        
        showNotification('Game date updated successfully!', 'success');
    }
}

// Field Management
function addField() {
    const fieldNameEl = document.getElementById('field-name');
    const cropTypeEl = document.getElementById('crop-type');
    const plantMonthEl = document.getElementById('plant-month');
    const plantDayEl = document.getElementById('plant-day');
    const fieldSizeEl = document.getElementById('field-size');
    const notesEl = document.getElementById('notes');

    if (!fieldNameEl || !cropTypeEl || !plantMonthEl || !plantDayEl) {
        showNotification('Form elements missing', 'error');
        return;
    }

    const fieldName = fieldNameEl.value.trim();
    const cropType = cropTypeEl.value;
    const plantMonth = parseInt(plantMonthEl.value);
    const plantDay = parseInt(plantDayEl.value);
    const fieldSize = fieldSizeEl ? parseFloat(fieldSizeEl.value) || null : null;
    const notes = notesEl ? notesEl.value.trim() : '';

    // Validation
    if (!fieldName || !cropType || !plantMonth || !plantDay) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (fields.some(field => field.fieldName.toLowerCase() === fieldName.toLowerCase())) {
        showNotification('A field with this name already exists', 'error');
        return;
    }

    const harvestDate = calculateHarvestDate(plantDay, plantMonth, cropType);
    
    const field = {
        id: Date.now(),
        fieldName,
        cropType,
        plantDate: { day: plantDay, month: plantMonth },
        harvestDate,
        fieldSize,
        notes
    };

    fields.push(field);
    saveData();
    updateAllDisplays();
    hideAddForm();
    
    showNotification(`Field "${fieldName}" added successfully!`, 'success');
}

function removeField(id) {
    const field = fields.find(f => f.id === id);
    if (field && confirm(`Remove field "${field.fieldName}"?`)) {
        fields = fields.filter(f => f.id !== id);
        saveData();
        updateAllDisplays();
        showNotification('Field removed', 'info');
    }
}

// Data Management
function saveData() {
    try {
        const data = {
            currentGameDate,
            fields
        };
        localStorage.setItem('fs25Calculator', JSON.stringify(data));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

function loadData() {
    try {
        const saved = localStorage.getItem('fs25Calculator');
        if (saved) {
            const data = JSON.parse(saved);
            currentGameDate = data.currentGameDate || currentGameDate;
            fields = data.fields || [];
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function populateCropSelect() {
    const select = document.getElementById('crop-type');
    if (!select) return;
    
    select.innerHTML = '<option value="">Choose a crop...</option>';
    
    Object.keys(cropData).sort().forEach(crop => {
        const option = document.createElement('option');
        option.value = crop;
        option.textContent = `${cropData[crop].icon} ${crop} (${cropData[crop].growthTime} months)`;
        select.appendChild(option);
    });
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notifications') || document.body;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.parentNode.removeChild(notification);
            }, 300);
        }
    }, 4000);
}

function updateAllDisplays() {
    updateGameDateDisplay();
    updateStatsCards();
    updatePlantingRecommendations();
    updateHarvestRecommendations();
    updateFieldsList();
    createCropCalendar();
}

// Initialize app
function init() {
    try {
        loadData();
        populateCropSelect();
        updateAllDisplays();
        
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        console.log('FS25 Calculator initialized successfully!');
    } catch (error) {
        console.error('Error initializing app:', error);
        showNotification('Error initializing application', 'error');
    }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}