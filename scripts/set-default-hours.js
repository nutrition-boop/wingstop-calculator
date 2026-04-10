const fs = require('fs');

const defaultHours = {
    monday: { open: '10:30 AM', close: '12:00 AM' },
    tuesday: { open: '10:30 AM', close: '12:00 AM' },
    wednesday: { open: '10:30 AM', close: '12:00 AM' },
    thursday: { open: '10:30 AM', close: '12:00 AM' },
    friday: { open: '10:30 AM', close: '12:00 AM' },
    saturday: { open: '10:30 AM', close: '12:00 AM' },
    sunday: { open: '10:30 AM', close: '12:00 AM' }
};

const locationsPath = 'locations.json';
const locations = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));

console.log(`Updating ${locations.length} locations...`);

locations.forEach(loc => {
    loc.carryoutHours = { ...defaultHours };
    loc.deliveryHours = { ...defaultHours };
    loc.hours = { ...defaultHours };
});

fs.writeFileSync(locationsPath, JSON.stringify(locations, null, 2));

console.log('Update complete.');
