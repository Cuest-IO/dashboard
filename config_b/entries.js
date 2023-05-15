const path = require('path');
const glob = require('glob');

module.exports = () => {
  let pages = {
    index: [
      path.join(__dirname, `../${process.env.FOLDER_PRIVATE_BASE}/index.js`),
      path.join(__dirname, `../${process.env.FOLDER_PRIVATE_BASE}/index.scss`),
    ],
  };
  const files = glob.sync(`./${process.env.FOLDER_PRIVATE_BASE}/pages/**/*+(.scss|.css|.js)`);
  files.forEach((file) => {
    const dir = path.parse(path.dirname(file)).name;
    if (!pages[dir]) {
      pages[dir] = [];
    }
    pages[dir].push(path.join(__dirname, `../${file}`));
  });
  return pages;
};
