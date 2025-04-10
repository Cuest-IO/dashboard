import fs from 'fs';
import dotenv from 'dotenv';

function setProcessEnv(nameFile) {
    const envConfig = dotenv.parse(fs.readFileSync(nameFile));
    Object.assign(process.env, envConfig);
}

export default setProcessEnv;
