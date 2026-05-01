const fs = require('fs');
const data = JSON.parse(fs.readFileSync('eslint.json', 'utf8'));
data.forEach(f => {
  f.messages.forEach(m => {
    if (m.severity === 2) {
      console.log(`${f.filePath}:${m.line}:${m.column} ${m.ruleId}`);
    }
  });
});
