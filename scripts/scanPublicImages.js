const readDir = require('fs').readdirSync;
const writeFile = require('fs').writeFileSync;
const path = require('path');

const pathToImages = path.resolve(__dirname, '../public/standalone/img_bg');
const pathToJson = path.resolve(__dirname, '../public/standalone/img_bg.json');

const result = readDir(pathToImages);

if (result.length === 0) {
  console.error('There are no bg images!');

  process.exit(1);
}

writeFile(pathToJson, JSON.stringify(result, null, 2));
