# FS25Calculator

A comprehensive web-based crop tracking calculator for Farming Simulator 25. Track your fields, monitor harvest times, and optimize your planting schedule with an intuitive interface.

## Features

- **Field Management**: Add, track, and remove fields with detailed crop information
- **Game Date Tracking**: Set and update your current in-game date
- **Harvest Calculator**: Automatically calculates harvest dates based on planting times
- **Seasonal Recommendations**: Shows which crops to plant and harvest each month
- **Visual Crop Calendar**: Interactive calendar showing planting and harvest seasons for all FS25 crops
- **Progress Tracking**: Monitor fields that are ready to harvest vs. still growing
- **Data Persistence**: Automatically saves your data locally

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

### Getting Started
1. Open `index.html` in your web browser
2. Set your current game date using the date picker in the top header
3. Start adding your fields using the "Add Field" button

### Adding Fields
1. Click "Add Field" button
2. Enter field name (e.g., "North Field")
3. Select crop type from dropdown
4. Set planting month and day
5. Optionally add field size and notes
6. Click "Add Field" to save

### Tracking Progress
- **Dashboard Cards**: View total fields, ready to harvest, and currently growing
- **Field Status**: Each field shows days remaining until harvest
- **Color Coding**: 
  - Green = Ready to harvest
  - Yellow = Harvest soon (within 28 days)  
  - Blue = Still growing

### Using the Calendar
- View the crop calendar at the bottom to see planting and harvest seasons
- Green cells = Planting season
- Orange cells = Harvest season
- Diagonal split = Both planting and harvest
- Blue border = Current month

## Game Mechanics

### Time System
- FS25 uses a 28-day month system
- Each crop has a specific growth time in months
- The calculator automatically handles year transitions and harvest date calculations

### Seasonal Planting
- Each crop has optimal planting months
- The recommendations section shows what to plant in the current month
- Some crops can be planted across multiple seasons

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
- Automatically saves field data and game date
- Data persists between browser sessions

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on desktop, tablet, and mobile
- No server required - runs entirely in the browser

## Recent Fixes

### Version 1.1 Improvements
- **Fixed Modal Functionality**: Add Field and Date Picker modals now work correctly
- **Improved Styling**: Better visual hierarchy and responsive design
- **Enhanced Form Validation**: Better error handling and user feedback  
- **Mobile Optimization**: Improved mobile layout and touch interactions
- **Bug Fixes**: Resolved various JavaScript errors and UI issues
- **Better Notifications**: Improved success/error message system

### Key Bug Fixes
- Modal dialogs now properly show and hide
- Form submissions work correctly
- Field data saves and loads properly
- Responsive calendar layout on mobile devices
- Fixed CSS conflicts between custom styles and Tailwind

## Development

### Setup
1. Clone or download the project files
2. Open `index.html` in a web browser
3. No build process or dependencies required

### Customization
- Modify `cropData` in `script.js` to add/edit crops
- Adjust styling in `styles.css`
- Update game mechanics as needed for different FS versions

## License

Open source project - feel free to modify and distribute.

## Support

This is a community tool for Farming Simulator 25 players. For issues or suggestions, please refer to the game's community forums or modding communities.

---

*Happy Farming! 🚜🌾*