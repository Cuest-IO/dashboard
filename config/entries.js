import path, { dirname } from 'path';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function getEntries() {
  let pages = {
    index: [
      path.join(__dirname, `../${process.env.FOLDER_PRIVATE_BASE}/index.js`),
      path.join(__dirname, `../${process.env.FOLDER_PRIVATE_BASE}/index.scss`),
    ],
  };
  const files = globSync(`./${process.env.FOLDER_PRIVATE_BASE}/pages/**/*+(.scss|.css|.js)`);
  files.forEach((file) => {
    const dir = path.parse(path.dirname(file)).name;
    if (!pages[dir]) {
      pages[dir] = [];
    }
    pages[dir].push(path.join(__dirname, `../${file}`));
  });
  return pages;
}

export default getEntries;
