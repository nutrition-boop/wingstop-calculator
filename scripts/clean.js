const fs = require('fs');
const filepath = 'c:/vibe/wingstop/src/lib/data/menu.ts';
let code = fs.readFileSync(filepath, 'utf8');

const categoriesToRemove = ['sandwiches', 'sides', 'drinks', 'desserts', 'dips'];
for (const cat of categoriesToRemove) {
  const regex = new RegExp(`\\s*\\{\\s*id:[\\s\\S]*?category:\\s*'${cat}'[\\s\\S]*?\\},`, 'g');
  code = code.replace(regex, '');
}

fs.writeFileSync(filepath, code, 'utf8');
console.log('Cleaned old items');
