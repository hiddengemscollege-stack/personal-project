const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'ui');

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walk(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            let content = fs.readFileSync(filePath, 'utf8');
            // Regex to match imports with version numbers
            // Matches: from "package@version" or from "@scope/package@version"
            // We want to remove the @version part at the end
            const newContent = content.replace(/from "(.+?)@\d+\.\d+\.\d+"/g, 'from "$1"');

            if (content !== newContent) {
                console.log(`Fixing ${filePath}`);
                fs.writeFileSync(filePath, newContent);
            }
        }
    });
}

walk(dir);
console.log('Done fixing imports.');
