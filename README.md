# FS25Calculator

A comprehensive web-based crop tracking calculator for Farming Simulator 25. Track your fields, monitor harvest times, and optimize your planting schedule with an intuitive interface that matches your exact in-game settings.

## Features

- **🎮 Game Settings Integration**: Configure days per month to match your in-game time settings
- **📅 Field Management**: Add, track, and remove fields with detailed crop information
- **🕐 Game Date Tracking**: Set and update your current in-game date
- **🔢 Harvest Calculator**: Automatically calculates harvest dates based on planting times and game settings
- **🌱 Seasonal Recommendations**: Shows which crops to plant and harvest each month
- **📊 Visual Crop Calendar**: Interactive calendar showing planting and harvest seasons for all FS25 crops
- **📈 Progress Tracking**: Monitor fields that are ready to harvest vs. still growing
- **💾 Data Persistence**: Automatically saves your data locally
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## Game Settings Configuration

### Days Per Month Options
The calculator supports all FS25 time scale options:

- **1 day/month** (Fastest) - Perfect for rapid testing
- **3 days/month** (Fast) - Quick gameplay 
- **7 days/month** (Normal) - Balanced experience
- **14 days/month** (Slow) - More realistic timing
- **28 days/month** (Realistic) - Full simulation experience

### Automatic Recalculation
When you change the days per month setting, the calculator automatically:
- ✅ Recalculates all existing harvest dates
- ✅ Updates time displays throughout the interface
- ✅ Adjusts validation for day inputs
- ✅ Shows appropriate time units (days vs months)

## Supported Crops

The calculator includes all major FS25 crops with accurate growth times and seasonal data:

- **Grains**: Barley, Oats, Wheat, Corn, Rice, Long Grain Rice, Sorghum
- **Vegetables**: Carrots, Potatoes, Sugar Beet, Red Beet, Parsnips, Spinach
- **Legumes**: Soybeans, Green Beans, Peas
- **Oil Crops**: Canola, Sunflowers
- **Specialty**: Cotton, Grapes, Olives
- **Cover Crops**: Grass, Oilseed Radish
- **Trees**: Poplar

## How to Use

### Initial Setup
1. Open `index.html` in your web browser
2. Click on the current game date in the top header
3. Configure your **Days Per Month** setting to match your in-game settings
4. Set your current game date
5. Click "Update" to save settings

### Adding Fields
1. Click "Add Field" button
2. Enter field name (e.g., "North Field")
3. Select crop type from dropdown
4. Set planting month and day (validation adjusts to your days/month setting)
5. Optionally add field size and notes
6. Click "Add Field" to save

### Tracking Progress
- **Dashboard Cards**: View total fields, ready to harvest, and currently growing
- **Field Status**: Each field shows time remaining until harvest
- **Color Coding**: 
  - 🟢 Green = Ready to harvest
  - 🟡 Yellow = Harvest soon (within one month)
  - 🔵 Blue = Still growing

### Using the Calendar
- View the crop calendar at the bottom to see planting and harvest seasons
- Green cells = Planting season
- Orange cells = Harvest season  
- Diagonal split = Both planting and harvest
- Blue border = Current month

## Game Mechanics Integration

### Time System Flexibility
- Supports FS25's configurable month length system
- Automatically adjusts calculations based on your time scale
- Growth times scale appropriately with your game settings
- Shows relevant time units (days for fast settings, months for realistic)

### Seasonal Planting
- Each crop has optimal planting months
- The recommendations section shows what to plant in the current month
- Some crops can be planted across multiple seasons
- Calendar view helps plan crop rotations

### Harvest Calculations
- Uses exact FS25 crop growth times (in months)
- Multiplies by your configured days per month
- Handles year transitions automatically
- Accounts for different planting years

## Technical Details

### Files Structure
```
FS25Calculator/
├── index.html      # Main application interface
├── script.js       # Core functionality and game logic  
├── styles.css      # Professional styling and layout
└── README.md       # Documentation
```

### Data Storage
- Uses browser localStorage for data persistence
- Automatically saves field data, game date, and settings
- Data persists between browser sessions
- Settings are preserved when you close and reopen

### Game Settings Impact
- **Days Per Month**: Affects all time calculations
- **Auto-Recalculation**: Changing settings updates all existing fields
- **Validation**: Day inputs automatically adjust max values
- **Display**: Time units change based on your settings

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on desktop, tablet, and mobile
- No server required - runs entirely in the browser
- Progressive Web App capabilities

## Recent Updates

### Version 2.0 - Game Settings Integration
- **🎮 Days Per Month Configuration**: Match your exact in-game time settings
- **🔄 Automatic Recalculation**: All harvest dates update when settings change
- **⚡ Smart Time Display**: Shows days or months based on your time scale
- **✅ Enhanced Validation**: Day inputs adjust to your month length
- **🎯 Better UX**: Clear indicators of current settings in header

### Version 1.1 Improvements
- **Fixed Modal Functionality**: Add Field and Date Picker modals work correctly
- **Improved Styling**: Better visual hierarchy and responsive design
- **Enhanced Form Validation**: Better error handling and user feedback  
- **Mobile Optimization**: Improved mobile layout and touch interactions
- **Bug Fixes**: Resolved JavaScript errors and UI issues
- **Better Notifications**: Improved success/error message system

## Usage Examples

### Fast Gameplay (1 day/month)
- Perfect for testing crop rotations quickly
- Harvest times show in days (e.g., "120 days remaining")
- Ideal for learning the game mechanics

### Realistic Gameplay (28 days/month)
- Full simulation experience
- Harvest times show in months (e.g., "4 months remaining")  
- Matches real-world farming cycles

### Balanced Gameplay (7 days/month)
- Good compromise between speed and realism
- Shows days for short periods, months for longer
- Popular choice for most players

## Tips for Best Results

1. **Match Your Game**: Always set days per month to match your in-game setting
2. **Regular Updates**: Update your game date when you play
3. **Plan Ahead**: Use the calendar to plan seasonal rotations
4. **Field Names**: Use descriptive names like "North Wheat" or "Field 12"
5. **Notes**: Add notes about fertilizer, equipment used, or yield expectations

## Development

### Setup
1. Clone or download the project files
2. Open `index.html` in a web browser
3. No build process or dependencies required

### Customization
- Modify `cropData` in `script.js` to add/edit crops
- Adjust `gameSettings.daysPerMonth` options for different time scales
- Update styling in `styles.css`
- Game mechanics can be adjusted for different FS versions

## Troubleshooting

### Common Issues
- **Harvest dates seem wrong**: Check your days per month setting matches your game
- **Can't add fields**: Make sure day is within valid range (1 to days per month)
- **Data not saving**: Enable localStorage in your browser settings

### Support
This is a community tool for Farming Simulator 25 players. For issues or suggestions, please refer to the game's community forums or modding communities.

## License

Open source project - feel free to modify and distribute.

---

*Happy Farming! 🚜🌾*

*Now with full game settings integration for the perfect farming experience!*