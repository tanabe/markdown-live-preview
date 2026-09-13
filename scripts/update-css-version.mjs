import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, realpathSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = new URL('../', import.meta.url);
const styles = ['style.css', 'github-markdown-light.css', 'github-markdown-dark_dimmed.css'];
export const cssFiles = styles.map(name => fileURLToPath(new URL(`public/css/${name}`, root)));

export function updateCssVersions() {
    const versions = new Map(styles.map((name, index) => [name,
        createHash('sha256').update(readFileSync(cssFiles[index])).digest('hex').slice(0, 12)
    ]));
    for (const name of ['index.html', 'src/main.js']) {
        const path = new URL(name, root);
        const original = readFileSync(path, 'utf8');
        const updated = original.replace(/css\/([\w-]+\.css)\?v=[^'"\s]+/g,
            (url, file) => versions.has(file) ? `css/${file}?v=${versions.get(file)}` : url);
        if (updated !== original) {
            writeFileSync(path, updated);
            console.log(`Updated CSS versions in ${name}`);
        }
    }
}

if (process.argv[1] && pathToFileURL(realpathSync(process.argv[1])).href === import.meta.url) {
    updateCssVersions();
}
