const fs = require('fs');
const code = fs.readFileSync('frontend/src/pages/Home.tsx', 'utf-8');
const lines = code.split('\n');

const staffStart = 347;
const staffEnd = 366;
const appPromoStart = 419;
const appPromoEnd = 722;

const appPromo = lines.slice(appPromoStart, appPromoEnd + 1).join('\n');

const beforeStaff = lines.slice(0, staffStart);
const between = lines.slice(staffEnd + 1, appPromoStart);
const afterAppPromo = lines.slice(appPromoEnd + 1);

const newLines = [...beforeStaff, appPromo, ...between, ...afterAppPromo];
fs.writeFileSync('frontend/src/pages/Home.tsx', newLines.join('\n'));
