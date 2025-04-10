import path, { dirname } from 'path';
import setProcessEnv from '../env.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Добавление ENV переменных в конфигурацию
setProcessEnv(path.join(__dirname, `../../.env.${process.env.NODE_ENV}`));
export default {
  data: (context) => {
    const globalData = path.join(__dirname, `../../${process.env.TWIG_TEMPLATES}/index.json`);
    const env = { ...process.env };
    context.addDependency(globalData); // Force webpack to watch file
    const data = context.resourcePath.replace('.twig', '.json');
    context.addDependency(data); // Force webpack to watch file
    return Object.assign(
      context.fs.readJsonSync(globalData, {throws: false}) || {},
      context.fs.readJsonSync(data, {throws: false}) || {},
      env || {},
    );
  },
  namespaces: {
    'App': path.join(__dirname, `../../${process.env.TWIG_TEMPLATES}`),
  },
};
