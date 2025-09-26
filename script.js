/**
 * Farming Simulator 25 In-Game Crop Calculator
 * Uses FS25's in-game calendar system
 */

// ========================================
// FS25 GAME CALENDAR SYSTEM
// ========================================

// Current game date (Day, Month, Year)
let currentGameDate = {
    day: 3,
    month: 10, // October
    year: 1
};

// Month names
const monthNames = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April',
    5: 'May', 6: 'June', 7: 'July', 8: 'August', 
    9: 'September', 10: 'October', 11: 'November', 12: 'December'
};

// Season mapping
const seasons = {
    3: 'Spring', 4: 'Spring', 5: 'Spring',
    6: 'Summer', 7: 'Summer', 8: 'Summer',
    9: 'Fall', 10: 'Fall', 11: 'Fall',
    12: 'Winter', 1: 'Winter', 2: 'Winter'
};

// ========================================
// CROP DATA WITH FS25 SEASONS
// ========================================

const cropData = {
    'Barley': { 
        growthTime: 4, // months in-game
        plantingSeason: [9, 10], // Sep-Oct
        harvestSeason: [6, 7], // Jun-Jul
        icon: '🌾'
    },
    'Canola': {
        growthTime: 10,
        plantingSeason: [7, 8, 9], // Jul-Sep
        harvestSeason: [6, 7, 8], // Jun-Aug
        icon: '🌻'
    },
    'Carrots': {
        growthTime: 5,
        plantingSeason: [4, 5, 6], // Apr-Jun
        harvestSeason: [8, 9, 10, 11], // Aug-Nov
        icon: '🥕'
    },
    'Corn': {
        growthTime: 6,
        plantingSeason: [3, 4, 5], // Mar-May
        harvestSeason: [10, 11], // Oct-Nov
        icon: '🌽'
    },
    'Cotton': {
        growthTime: 8,
        plantingSeason: [3], // Mar
        harvestSeason: [10, 11, 2], // Oct-Nov, Feb
        icon: '☁️'
    },
    'Grapes': {
        growthTime: 6,
        plantingSeason: [3, 4, 5], // Mar-May
        harvestSeason: [9, 10], // Sep-Oct
        icon: '🍇'
    },
    'Grass': {
        growthTime: 4,
        plantingSeason: [3, 4, 5, 6, 7, 8, 9], // Mar-Sep
        harvestSeason: [5, 6, 7, 8, 9, 10, 11, 12, 1, 2], // May-Feb
        icon: '🌱'
    },
    'Green Beans': {
        growthTime: 4,
        plantingSeason: [4, 5, 6], // Apr-Jun
        harvestSeason: [8, 9, 10, 11], // Aug-Nov
        icon: '🫘'
    },
    'Long Grain Rice': {
        growthTime: 5,
        plantingSeason: [3, 4], // Mar-Apr
        harvestSeason: [8, 9], // Aug-Sep
        icon: '🌾'
    },
    'Oats': {
        growthTime: 5,
        plantingSeason: [3, 4, 5], // Mar-May
        harvestSeason: [7, 8], // Jul-Aug
        icon: '🌾'
    },
    'Oilseed Radish': {
        growthTime: 12,
        plantingSeason: [3, 4, 5, 6, 7, 8, 9, 10, 11], // Mar-Nov
        harvestSeason: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2], // All year
        icon: '🌱'
    },
    'Olives': {
        growthTime: 4,
        plantingSeason: [3, 4, 5, 6], // Mar-Jun
        harvestSeason: [9, 10], // Sep-Oct
        icon: '🫒'
    },
    'Parsnips': {
        growthTime: 6,
        plantingSeason: [4, 5, 6], // Apr-Jun
        harvestSeason: [8, 9, 10, 11], // Aug-Nov
        icon: '🥕'
    },
    'Peas': {
        growthTime: 4,
        plantingSeason: [3, 4, 5], // Mar-May
        harvestSeason: [7, 8, 9], // Jul-Sep
        icon: '🫛'
    },
    'Poplar': {
        growthTime: 12,
        plantingSeason: [3, 4, 5, 6, 7, 8], // Mar-Aug
        harvestSeason: [9, 10, 11, 12, 1, 2], // Sep-Feb
        icon: '🌳'
    },
    'Potatoes': {
        growthTime: 5,
        plantingSeason: [3, 4, 5], // Mar-May
        harvestSeason: [8, 9], // Aug-Sep
        icon: '🥔'
    },
    'Red Beet': {
        growthTime: 6,
        plantingSeason: [4, 5, 6], // Apr-Jun
        harvestSeason: [8, 9, 10, 11], // Aug-Nov
        icon: '🍠'
    },
    'Rice': {
        growthTime: 5,
        plantingSeason: [4, 5], // Apr-May
        harvestSeason: [8, 9], // Aug-Sep
        icon: '🌾'
    },
    'Sorghum': {
        growthTime: 5,
        plantingSeason: [4, 5], // Apr-May
        harvestSeason: [8, 9], // Aug-Sep
        icon: '🌾'
    },
    'Soybeans': {
        growthTime: 6,
        plantingSeason: [4, 5], // Apr-May
        harvestSeason: [9, 10], // Sep-Oct
        icon: '🫘'
    },
    'Spinach': {
        growthTime: 7,
        plantingSeason: [4, 5, 6], // Apr-Jun
        harvestSeason: [8, 9, 10, 11], // Aug-Nov
        icon: '🥬'
    },
    'Sugar Beet': {
        growthTime: 6,
        plantingSeason: [3, 4], // Mar-Apr
        harvestSeason: [9, 10, 11], // Sep-Nov
        icon: '🍠'
    },
    'Sunflowers': {
        growthTime: 6,
        plantingSeason: [4, 5], // Apr-May
        harvestSeason: [10, 11], // Oct-Nov
        icon: '🌻'
    },
    'Wheat': {
        growthTime: 9,
        plantingSeason: [8, 9], // Aug-Sep
        harvestSeason: [6, 7], // Jun-Jul
        icon: '🌾'
    }
};

// ========================================
// APPLICATION STATE
// ========================================

let fields = [];

// ========================================
// GAME DATE FUNCTIONS
// ========================================

/**
 * Convert game date to total days for calculations
 */
function gameDataToDays(day, month, year) {
    return (year - 1) * 336 + ((month - 1) * 28) + (day - 1);
}

/**
 * Convert total days back to game date
 */
function daysToGameDate(totalDays) {
    const year = Math.floor(totalDays / 336) + 1;
    const remainingDays = totalDays % 336;
    const month = Math.floor(remainingDays / 28) + 1;
    const day = (remainingDays % 28) + 1;
    return { day, month, year };
}

/**
 * Calculate harvest date based on plant date and crop growth time
 */
function calculateHarvestDate(plantDay, plantMonth, cropType) {
    const plantTotalDays = gameDataToDays(plantDay, plantMonth, currentGameDate.year);
    const growthTimeInDays = cropData[cropType].growthTime * 28; // 28 days per month
    const harvestTotalDays = plantTotalDays + growthTimeInDays;
    return daysToGameDate(harvestTotalDays);
}

/**
 * Calculate days remaining until harvest
 */
function getGameDaysRemaining(harvestDate) {
    const currentTotalDays = gameDataToDays(currentGameDate.day, currentGameDate.month, currentGameDate.year);
    const harvestTotalDays = gameDataToDays(harvestDate.day, harvestDate.month, harvestDate.year);
    return harvestTotalDays - currentTotalDays;
}

/**
 * Check if current date is in planting season for crop
 */
function isPlantingSeason(cropType) {
    const plantingSeasons = cropData[cropType].plantingSeason;
    return plantingSeasons.includes(currentGameDate.month);
}

/**
 * Check if current date is in harvest season for crop
 */
function isHarvestSeason(cropType) {
    const harvestSeasons = cropData[cropType].harvestSeason;
    return harvestSeasons.includes(currentGameDate.month);
}

// ========================================
// UI UPDATE FUNCTIONS
// ========================================

/**
 * Update the current game date display
 */
function updateGameDateDisplay() {
    const dateStr = `Day ${currentGameDate.day}, ${monthNames[currentGameDate.month]}, Year ${currentGameDate.year}`;
    document.getElementById('current-game-date').textContent = dateStr;
    document.getElementById('current-season').textContent = seasons[currentGameDate.month];
}

/**
 * Update planting recommendations
 */
function updatePlantingRecommendations() {
    const container = document.getElementById('planting-recommendations');
    const canPlant = Object.keys(cropData).filter(isPlantingSeason);
    
    if (canPlant.length === 0) {
        container.innerHTML = '<p class="text-gray-500">No crops recommended for planting this month.</p>';
        return;
    }
    
    container.innerHTML = canPlant.map(crop => `
        <div class="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
            <span class="text-lg">${cropData[crop].icon}</span>
            <span class="font-medium">${crop}</span>
            <span class="text-sm text-gray-600">(${cropData[crop].growthTime} months)</span>
        </div>
    `).join('');
}

/**
 * Update harvest recommendations
 */
function updateHarvestRecommendations() {
    const container = document.getElementById('harvest-recommendations');
    const canHarvest = Object.keys(cropData).filter(isHarvestSeason);
    
    if (canHarvest.length === 0) {
        container.innerHTML = '<p class="text-gray-500">No crops in harvest season this month.</p>';
        return;
    }
    
    container.innerHTML = canHarvest.map(crop => `
        <div class="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg">
            <span class="text-lg">${cropData[crop].icon}</span>
            <span class="font-medium">${crop}</span>
            <span class="text-sm text-gray-600">Harvest season</span>
        </div>
    `).join('');
}

/**
 * Update summary statistics
 */
function updateSummaryCards() {
    const totalFields = fields.length;
    const readyHarvest = fields.filter(f => getGameDaysRemaining(f.harvestDate) <= 0).length;
    const growing = totalFields - readyHarvest;

    document.getElementById('total-fields').textContent = totalFields;
    document.getElementById('ready-harvest').textContent = readyHarvest;
    document.getElementById('growing').textContent = growing;
}

/**
 * Update fields list
 */
function updateFieldsList() {
    const container = document.getElementById('fields-container');
    const emptyState = document.getElementById('empty-state');

    if (fields.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    // Sort by days remaining
    const sortedFields = [...fields].sort((a, b) => {
        return getGameDaysRemaining(a.harvestDate) - getGameDaysRemaining(b.harvestDate);
    });

    const fieldsHTML = sortedFields.map(field => {
        const daysRemaining = getGameDaysRemaining(field.harvestDate);
        const statusColor = daysRemaining <= 0 ? 'bg-green-500' : 
                           daysRemaining <= 28 ? 'bg-yellow-500' : 'bg-blue-500';
        const statusText = daysRemaining <= 0 ? 'Ready to Harvest!' :
                          daysRemaining === 1 ? '1 day remaining' :
                          `${daysRemaining} days remaining`;

        return `
            <div class="p-6 hover:bg-gray-50 transition-colors border-b">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-2">
                            <span class="text-2xl">${cropData[field.cropType].icon}</span>
                            <h3 class="text-lg font-semibold text-gray-900">${escapeHtml(field.fieldName)}</h3>
                            <span class="px-3 py-1 rounded-full text-white text-sm ${statusColor}">
                                ${statusText}
                            </span>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div>
                                <strong>Crop:</strong> ${escapeHtml(field.cropType)}
                                ${field.fieldSize ? `<span class="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">${field.fieldSize} ha</span>` : ''}
                            </div>
                            <div><strong>Planted:</strong> Day ${field.plantDate.day}, ${monthNames[field.plantDate.month]}</div>
                            <div><strong>Harvest:</strong> Day ${field.harvestDate.day}, ${monthNames[field.harvestDate.month]}</div>
                        </div>
                        ${field.notes ? `
                            <div class="mt-2 text-sm text-gray-600">
                                <strong>Notes:</strong> ${escapeHtml(field.notes)}
                            </div>
                        ` : ''}
                    </div>
                    <button onclick="removeField(${field.id})" 
                            class="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <i data-lucide="trash-2" class="h-5 w-5"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = fieldsHTML;
    
    // Re-initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * Create crop calendar visual
 */
function createCropCalendar() {
    const container = document.getElementById('crop-calendar');
    const months = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]; // Mar-Feb
    
    let calendarHTML = `
        <div class="crop-calendar-grid">
            <div class="calendar-header">
                <div class="crop-name-header">Crop</div>
                ${months.map(month => `<div class="month-header">${monthNames[month].substring(0, 3)}</div>`).join('')}
            </div>
    `;
    
    Object.keys(cropData).sort().forEach(crop => {
        const data = cropData[crop];
        calendarHTML += `
            <div class="crop-row">
                <div class="crop-name">
                    <span class="crop-icon">${data.icon}</span>
                    <span>${crop}</span>
                </div>
                ${months.map(month => {
                    let cellClass = 'calendar-cell';
                    if (data.plantingSeason.includes(month)) cellClass += ' planting-season';
                    if (data.harvestSeason.includes(month)) cellClass += ' harvest-season';
                    if (month === currentGameDate.month) cellClass += ' current-month';
                    return `<div class="${cellClass}"></div>`;
                }).join('')}
            </div>
        `;
    });
    
    calendarHTML += '</div>';
    container.innerHTML = calendarHTML;
}

// ========================================
// MODAL FUNCTIONS
// ========================================

function showAddForm() {
    document.getElementById('add-field-modal').classList.remove('hidden');
    document.getElementById('add-field-modal').classList.add('flex');
    
    // Set current month as default
    document.getElementById('plant-month').value = currentGameDate.month;
    document.getElementById('plant-day').value = currentGameDate.day;
    
    document.getElementById('field-name').focus();
}

function hideAddForm() {
    document.getElementById('add-field-modal').classList.add('hidden');
    document.getElementById('add-field-form').reset();
}

function showDatePicker() {
    document.getElementById('date-picker-modal').classList.remove('hidden');
    document.getElementById('date-picker-modal').classList.add('flex');
    
    document.getElementById('game-day').value = currentGameDate.day;
    document.getElementById('game-month').value = currentGameDate.month;
    document.getElementById('game-year').value = currentGameDate.year;
}

function hideDatePicker() {
    document.getElementById('date-picker-modal').classList.add('hidden');
}

function updateGameDate() {
    currentGameDate.day = parseInt(document.getElementById('game-day').value);
    currentGameDate.month = parseInt(document.getElementById('game-month').value);
    currentGameDate.year = parseInt(document.getElementById('game-year').value);
    
    saveData();
    updateDisplay();
    hideDatePicker();
    
    showNotification('Game date updated successfully!', 'success');
}

// ========================================
// FIELD MANAGEMENT
// ========================================

function addField() {
    const fieldName = document.getElementById('field-name').value.trim();
    const cropType = document.getElementById('crop-type').value;
    const plantMonth = parseInt(document.getElementById('plant-month').value);
    const plantDay = parseInt(document.getElementById('plant-day').value);
    const fieldSize = parseFloat(document.getElementById('field-size').value) || null;
    const notes = document.getElementById('notes').value.trim();

    if (!fieldName || !cropType || !plantMonth || !plantDay) {
        alert('Please fill in all required fields.');
        return;
    }

    if (fields.some(field => field.fieldName.toLowerCase() === fieldName.toLowerCase())) {
        alert('A field with this name already exists.');
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
    updateDisplay();
    hideAddForm();
    
    showNotification(`Field "${fieldName}" added successfully!`, 'success');
}

function removeField(id) {
    const field = fields.find(f => f.id === id);
    if (field && confirm(`Remove "${field.fieldName}"?`)) {
        fields = fields.filter(field => field.id !== id);
        saveData();
        updateDisplay();
        showNotification(`Field removed.`, 'info');
    }
}

// ========================================
// DATA PERSISTENCE & UTILITIES
// ========================================

function saveData() {
    const data = {
        currentGameDate,
        fields
    };
    localStorage.setItem('fs25Calculator', JSON.stringify(data));
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

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function populateCropSelect() {
    const select = document.getElementById('crop-type');
    select.innerHTML = '<option value="">Select a crop</option>';
    
    Object.keys(cropData).sort().forEach(crop => {
        const option = document.createElement('option');
        option.value = crop;
        option.textContent = `${cropData[crop].icon} ${crop} (${cropData[crop].growthTime} months)`;
        select.appendChild(option);
    });
}

function updateDisplay() {
    updateGameDateDisplay();
    updatePlantingRecommendations();
    updateHarvestRecommendations();
    updateSummaryCards();
    updateFieldsList();
    createCropCalendar();
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
    loadData();
    populateCropSelect();
    updateDisplay();
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    console.log('FS25 Crop Calculator initialized!');
}

// Start the application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}