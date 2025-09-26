/**
 * FS25 Crop Calculator - With Days Per Month Configuration
 */

// Game state
let currentGameDate = {
    day: 3,
    month: 10, // October
    year: 1
};

let gameSettings = {
    daysPerMonth: 28 // Default to realistic setting
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

// Date utility functions - Updated to use configurable days per month
function gameDataToDays(day, month, year) {
    const daysPerMonth = gameSettings.daysPerMonth;
    const daysPerYear = daysPerMonth * 12;
    return (year - 1) * daysPerYear + ((month - 1) * daysPerMonth) + (day - 1);
}

function daysToGameDate(totalDays) {
    const daysPerMonth = gameSettings.daysPerMonth;
    const daysPerYear = daysPerMonth * 12;
    
    const year = Math.floor(totalDays / daysPerYear) + 1;
    const remainingDays = totalDays % daysPerYear;
    const month = Math.floor(remainingDays / daysPerMonth) + 1;
    const day = (remainingDays % daysPerMonth) + 1;
    
    return { day, month, year };
}

function calculateHarvestDate(plantDay, plantMonth, plantYear, cropType) {
    const plantTotalDays = gameDataToDays(plantDay, plantMonth, plantYear);
    const growthTimeInDays = cropData[cropType].growthTime * gameSettings.daysPerMonth;
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

// Checklist logic and helpers
// Crops that leave stubble for mulching
const stubbleCrops = [
    'Barley', 'Wheat', 'Oats', 'Canola', 'Sorghum', 'Corn'
];

// Checklist definitions
const checklistTemplate = [
    { key: 'mulching', label: 'Mulching (2.5% yield)', info: 'Only crops that leave stubble', stubbleOnly: true },
    { key: 'liming', label: 'Liming (15% yield)', info: 'Needed every 3 harvests, decreases 5% every harvest', every3: true },
    { key: 'fertilize1', label: 'Fertilize (first run 22.5%)', info: '' },
    { key: 'plow', label: 'Plow (15% yield)', info: 'Needed every 3 harvests, decreases 5% every harvest', every3: true },
    { key: 'stone', label: 'Stone removal', info: 'No effect on yield, but on equipment wear' },
    { key: 'cultivate', label: 'Cultivate', info: '' },
    { key: 'seed', label: 'Seed', info: '' },
    { key: 'rolling', label: 'Rolling (2.5% yield)', info: 'Must be right after planting for bonus' },
    { key: 'fertilize2', label: 'Fertilize (second run 22.5%)', info: '' },
    { key: 'weed', label: 'Weed work (+20%)', info: '' }
];

// Helper to get checklist for a field
window.getChecklistForField = function(field) {
    const isStubble = stubbleCrops.includes(field.cropType);
    return checklistTemplate.map(item => ({
        key: item.key,
        label: item.label,
        info: item.info,
        stubbleOnly: !!item.stubbleOnly,
        every3: !!item.every3,
        checked: field.checklist?.find(c => c.key === item.key)?.checked || false,
        disabled: (item.stubbleOnly && !isStubble)
    }));
};

// Checklist toggle handler
window.toggleChecklist = function(fieldId, key) {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;
    if (!field.checklist) field.checklist = getChecklistForField(field);
    const item = field.checklist.find(c => c.key === key);
    if (!item || item.disabled) return;
    item.checked = !item.checked;
    saveData();
    updateFieldsList();
}

// Game Settings Functions
function onDaysPerMonthChange() {
    const input = document.getElementById('days-per-month');
    if (!input) return;

    let newDaysPerMonth = parseInt(input.value);
    if (isNaN(newDaysPerMonth) || newDaysPerMonth < 1 || newDaysPerMonth > 99) {
        showNotification('Days per month must be between 1 and 99', 'error');
        input.value = gameSettings.daysPerMonth;
        return;
    }

    const oldDaysPerMonth = gameSettings.daysPerMonth;

    if (newDaysPerMonth !== oldDaysPerMonth) {
        gameSettings.daysPerMonth = newDaysPerMonth;

        // Update max day validation for current day input
        updateDayInputValidation();

        // Recalculate all harvest dates
        recalculateAllHarvestDates();

        // Update display
        updateDaysPerMonthDisplay();

        // Save settings
        saveData();

        showNotification(`Days per month updated to ${newDaysPerMonth}. All harvest dates recalculated.`, 'info');
    }
}

function updateDayInputValidation() {
    const dayInput = document.getElementById('game-day');
    const plantDayInput = document.getElementById('plant-day');

    if (dayInput) {
        dayInput.max = gameSettings.daysPerMonth.toString();
        if (parseInt(dayInput.value) > gameSettings.daysPerMonth) {
            dayInput.value = gameSettings.daysPerMonth.toString();
        }
    }

    if (plantDayInput) {
        plantDayInput.max = gameSettings.daysPerMonth.toString();
        plantDayInput.placeholder = `1-${gameSettings.daysPerMonth}`;
    }
}

function recalculateAllHarvestDates() {
    fields.forEach(field => {
        field.harvestDate = calculateHarvestDate(
            field.plantDate.day,
            field.plantDate.month,
            field.plantDate.year || currentGameDate.year,
            field.cropType
        );
    });
    
    updateAllDisplays();
}

function updateDaysPerMonthDisplay() {
    const display = document.getElementById('days-per-month-display');
    if (display) {
        display.textContent = gameSettings.daysPerMonth.toString();
    }
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
        seasonElement.textContent = seasons[currentGameDate.month] || 'Unknown';
    }
    
    updateDaysPerMonthDisplay();
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
    
    container.innerHTML = canPlant.map(crop => {
        const realDays = Math.round(cropData[crop].growthTime * gameSettings.daysPerMonth);
        const timeUnit = gameSettings.daysPerMonth === 1 ? 'days' : 'months';
        const timeValue = gameSettings.daysPerMonth === 1 ? realDays : cropData[crop].growthTime;
        
        return `
            <div class="recommendation-item">
                <div class="crop-emoji">${cropData[crop].icon}</div>
                <div class="crop-info">
                    <div class="crop-name">${crop}</div>
                    <div class="crop-details">${timeValue} ${timeUnit} to harvest</div>
                </div>
            </div>
        `;
    }).join('');
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

    const sortedFields = [...fields].sort((a, b) => {
        return getGameDaysRemaining(a.harvestDate) - getGameDaysRemaining(b.harvestDate);
    });

    const fieldsHTML = sortedFields.map(field => {
        const daysRemaining = getGameDaysRemaining(field.harvestDate);
        let statusClass, statusText;
        if (daysRemaining <= 0) {
            statusClass = 'status-ready';
            statusText = 'Ready to Harvest!';
        } else if (daysRemaining <= gameSettings.daysPerMonth) {
            statusClass = 'status-warning';
            const unit = gameSettings.daysPerMonth === 1 ? 'days' : 
                         daysRemaining === 1 ? 'day' : 'days';
            statusText = `${daysRemaining} ${unit} remaining`;
        } else {
            statusClass = 'status-growing';
            const unit = gameSettings.daysPerMonth === 1 ? 'days' : 'days';
            statusText = `${daysRemaining} ${unit} remaining`;
        }

        // Checklist rendering
        const checklist = getChecklistForField(field);
        const checklistHTML = `
            <div class="mt-4 checklist">
                <div class="font-semibold mb-1 text-xs text-gray-400">Field Checklist</div>
                <ul class="space-y-1">
                    ${checklist.map(item => `
                        <li>
                            <label style="opacity:${item.disabled ? 0.5 : 1};cursor:${item.disabled ? 'not-allowed' : 'pointer'};">
                                <input type="checkbox"
                                    ${item.checked ? 'checked' : ''}
                                    ${item.disabled ? 'disabled' : ''}
                                    onchange="toggleChecklist(${field.id}, '${item.key}')"
                                    style="accent-color:#22d3ee;margin-right:0.5em;"
                                >
                                ${item.label}
                                ${item.info ? `<span class="text-xs text-gray-500 ml-1">(${item.info})</span>` : ''}
                            </label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        // --- Add Edit and Delete buttons here ---
        return `
            <div class="p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-4">
                        <div class="text-3xl">${cropData[field.cropType]?.icon || '🌱'}</div>
                        <div>
                            <h4 class="text-lg font-semibold text-gray-900">${field.fieldName}</h4>
                            <div class="${statusClass}">${statusText}</div>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="editField(${field.id})" class="action-btn" title="Edit field">
                            <i data-lucide="edit-2" class="w-5 h-5"></i>
                        </button>
                        <button onclick="removeField(${field.id})" class="action-btn delete" title="Remove field">
                            <i data-lucide="trash-2" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                        <strong class="text-gray-900">Crop:</strong> ${field.cropType}
                        ${field.fieldSize ? ` • ${field.fieldSize} ha` : ''}
                    </div>
                    <div>
                        <strong class="text-gray-900">Planted:</strong> Day ${field.plantDate.day}, ${monthNames[field.plantDate.month]}
                    </div>
                    <div>
                        <strong class="text-gray-900">Harvest:</strong> Day ${field.harvestDate.day}, ${monthNames[field.harvestDate.month]}, Year ${field.harvestDate.year}
                    </div>
                    ${field.notes ? `<div class="col-span-full"><strong class="text-gray-900">Notes:</strong> ${field.notes}</div>` : ''}
                </div>
                ${checklistHTML}
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
                <div class="crop-name-cell">
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
        
        if (plantMonth) plantMonth.value = currentGameDate.month.toString();
        if (plantDay) {
            plantDay.value = currentGameDate.day.toString();
            plantDay.max = gameSettings.daysPerMonth.toString();
            plantDay.placeholder = `1-${gameSettings.daysPerMonth}`;
        }
        if (fieldName) {
            fieldName.value = '';
            setTimeout(() => fieldName.focus(), 100);
        }
        
        // Reset other fields
        const cropType = document.getElementById('crop-type');
        const fieldSize = document.getElementById('field-size');
        const notes = document.getElementById('notes');
        
        if (cropType) cropType.value = '';
        if (fieldSize) fieldSize.value = '';
        if (notes) notes.value = '';
    }
}

let editingFieldId = null;

function editField(id) {
    const field = fields.find(f => f.id === id);
    if (!field) return;
    editingFieldId = id;
    showAddForm();

    // Pre-fill modal fields
    document.getElementById('field-name').value = field.fieldName;
    document.getElementById('crop-type').value = field.cropType;
    document.getElementById('plant-month').value = field.plantDate.month;
    document.getElementById('plant-day').value = field.plantDate.day;
    document.getElementById('field-size').value = field.fieldSize ?? '';
    document.getElementById('notes').value = field.notes ?? '';
}

// Reset editing state when modal is closed
function hideAddForm() {
    editingFieldId = null;
    const modal = document.getElementById('add-field-modal');
    if (modal) {
        modal.classList.remove('show');
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
    const daysPerMonthInput = document.getElementById('days-per-month');

    if (dayInput && monthInput && yearInput && daysPerMonthInput) {
        const newDay = parseInt(dayInput.value) || 1;
        const newMonth = parseInt(monthInput.value) || 1;
        const newYear = parseInt(yearInput.value) || 1;
        const newDaysPerMonth = parseInt(daysPerMonthInput.value) || 28;

        // Validation
        if (newDaysPerMonth < 1 || newDaysPerMonth > 99) {
            showNotification('Days per month must be between 1 and 99', 'error');
            daysPerMonthInput.value = gameSettings.daysPerMonth;
            return;
        }

        if (newDay < 1 || newDay > newDaysPerMonth) {
            showNotification(`Day must be between 1 and ${newDaysPerMonth}`, 'error');
            return;
        }

        if (newMonth < 1 || newMonth > 12) {
            showNotification('Invalid month selected', 'error');
            return;
        }

        if (newYear < 1) {
            showNotification('Year must be 1 or greater', 'error');
            return;
        }

        // Update days per month if changed
        const daysPerMonthChanged = newDaysPerMonth !== gameSettings.daysPerMonth;
        if (daysPerMonthChanged) {
            gameSettings.daysPerMonth = newDaysPerMonth;
            recalculateAllHarvestDates();
        }

        currentGameDate.day = newDay;
        currentGameDate.month = newMonth;
        currentGameDate.year = newYear;

        saveData();
        updateAllDisplays();
        hideDatePicker();

        if (daysPerMonthChanged) {
            showNotification('Game date and days per month updated! All harvest dates recalculated.', 'success');
        } else {
            showNotification('Game date updated successfully!', 'success');
        }
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
    if (!fieldName) {
        showNotification('Please enter a field name', 'error');
        fieldNameEl.focus();
        return;
    }

    if (!cropType) {
        showNotification('Please select a crop type', 'error');
        cropTypeEl.focus();
        return;
    }

    if (!plantMonth || plantMonth < 1 || plantMonth > 12) {
        showNotification('Please select a valid plant month', 'error');
        plantMonthEl.focus();
        return;
    }

    if (!plantDay || plantDay < 1 || plantDay > gameSettings.daysPerMonth) {
        showNotification(`Please enter a valid plant day (1-${gameSettings.daysPerMonth})`, 'error');
        plantDayEl.focus();
        return;
    }

    // If editing, update the field
    if (editingFieldId !== null) {
        const idx = fields.findIndex(f => f.id === editingFieldId);
        if (idx !== -1) {
            // Prevent duplicate name (except for self)
            if (
                fields.some(
                    (f, i) =>
                        i !== idx &&
                        f.fieldName.toLowerCase() === fieldName.toLowerCase()
                )
            ) {
                showNotification('A field with this name already exists', 'error');
                fieldNameEl.focus();
                return;
            }
            fields[idx] = {
                ...fields[idx],
                fieldName,
                cropType,
                plantDate: { day: plantDay, month: plantMonth, year: currentGameDate.year },
                harvestDate: calculateHarvestDate(plantDay, plantMonth, currentGameDate.year, cropType),
                fieldSize,
                notes,
                checklist: getChecklistForField(fields[idx]) // preserve checklist state
            };
            saveData();
            updateAllDisplays();
            hideAddForm();
            editingFieldId = null;
            showNotification(`Field "${fieldName}" updated!`, 'success');
            return;
        }
    }

    // Otherwise, add new field
    if (fields.some(field => field.fieldName.toLowerCase() === fieldName.toLowerCase())) {
        showNotification('A field with this name already exists', 'error');
        fieldNameEl.focus();
        return;
    }

    const harvestDate = calculateHarvestDate(plantDay, plantMonth, currentGameDate.year, cropType);

    const field = {
        id: Date.now(),
        fieldName,
        cropType,
        plantDate: { day: plantDay, month: plantMonth, year: currentGameDate.year },
        harvestDate,
        fieldSize,
        notes,
        checklist: getChecklistForField({ cropType })
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
            gameSettings,
            fields
        };
        localStorage.setItem('fs25Calculator', JSON.stringify(data));
    } catch (error) {
        console.error('Error saving data:', error);
        showNotification('Error saving data', 'error');
    }
}

function loadData() {
    try {
        const saved = localStorage.getItem('fs25Calculator');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.currentGameDate) {
                currentGameDate = data.currentGameDate;
            }
            if (data.gameSettings) {
                gameSettings = { ...gameSettings, ...data.gameSettings };
            }
            if (data.fields && Array.isArray(data.fields)) {
                fields = data.fields.map(f => ({
                    ...f,
                    checklist: getChecklistForField(f)
                        .map(item => {
                            // preserve checked state if present
                            const prev = f.checklist?.find(c => c.key === item.key);
                            return { ...item, checked: prev ? !!prev.checked : false };
                        })
                }));
                recalculateAllHarvestDates();
            }
        }
    } catch (error) {
        console.error('Error loading data:', error);
        showNotification('Error loading saved data', 'error');
    }
}

function populateCropSelect() {
    const select = document.getElementById('crop-type');
    if (!select) return;

    select.innerHTML = '<option value="">Choose a crop...</option>';

    Object.keys(cropData).sort().forEach(crop => {
        const option = document.createElement('option');
        option.value = crop;
        const timeUnit = gameSettings.daysPerMonth === 1 ? 'days' : 'months';
        const timeValue = gameSettings.daysPerMonth === 1 ?
            cropData[crop].growthTime * gameSettings.daysPerMonth :
            cropData[crop].growthTime;
        option.textContent = `${cropData[crop].icon} ${crop} (${timeValue} ${timeUnit})`;
        select.appendChild(option);
    });
}

function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds for longer messages
    const timeout = message.length > 50 ? 6000 : 4000;
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, timeout);
}

function updateAllDisplays() {
    updateGameDateDisplay();
    updateStatsCards();
    updatePlantingRecommendations();
    updateHarvestRecommendations();
    updateFieldsList();
    createCropCalendar();
    populateCropSelect(); // Re-populate to show correct time units
}

// Increment/Decrement Game Day
function incrementGameDay(amount) {
    let { day, month, year } = currentGameDate;
    const daysPerMonth = gameSettings.daysPerMonth;

    day += amount;

    while (day > daysPerMonth) {
        day -= daysPerMonth;
        month += 1;
        if (month > 12) {
            month = 1;
            year += 1;
        }
    }
    while (day < 1) {
        month -= 1;
        if (month < 1) {
            month = 12;
            year -= 1;
            if (year < 1) year = 1;
        }
        day += daysPerMonth;
    }

    currentGameDate.day = day;
    currentGameDate.month = month;
    currentGameDate.year = year;

    saveData();
    updateAllDisplays();
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Event Listeners
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideAddForm();
        hideDatePicker();
    }
});

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

// Add this function to fix the missing showDatePicker error
function showDatePicker() {
    const modal = document.getElementById('date-picker-modal');
    if (modal) {
        modal.classList.add('show');
    }
}