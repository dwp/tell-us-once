const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../app/views/current'); // adjust if needed

const variableSet = new Set();

function scanDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.njk') || file.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');

      // ✅ Match data['something']
      const bracketMatches = content.match(/data\[['"]([^'"]+)['"]\]/g) || [];
      bracketMatches.forEach(match => {
        const name = match.match(/data\[['"]([^'"]+)['"]\]/)[1];
        variableSet.add(name);
      });

      // ✅ Match data.something
      const dotMatches = content.match(/data\.([a-zA-Z0-9_-]+)/g) || [];
      dotMatches.forEach(match => {
        const name = match.replace('data.', '');
        variableSet.add(name);
      });

      // ✅ Match name="something"  🔥 (NEW BIT)
      const nameMatches = content.match(/name="([^"]+)"/g) || [];
      nameMatches.forEach(match => {
        const name = match.match(/name="([^"]+)"/)[1];
        variableSet.add(name);
      });
    }
  });
}

scanDir(ROOT);

// ✅ Output file
const output = Array.from(variableSet).sort().join('\n');

fs.writeFileSync(
  path.join(__dirname, '../variable-list.txt'),
  output
);

console.log('✅ variable-list.txt generated');