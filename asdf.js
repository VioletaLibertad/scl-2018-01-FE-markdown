const mdLinks = require('./lib/md-links');
const fs = require('fs');
const path = require('path');

/* Obtain what user wrote on CLI */
const userInput = process.argv;
// console.log(userInput);
let pathFromUser = userInput[2];
let absolutePath = path.resolve(`${pathFromUser}`);
let mdFilesString = [];
let singleMdFile;
// console.log('probando a ver si funciona ' + absolutePath);

/* Checking if file or directory */
let stats = fs.statSync(absolutePath);
if (stats.isDirectory() === true) {
  fs.readdir(absolutePath, 'utf-8', (err, files) => {
    if (err) throw err;
    console.log('These files can be found here: ' + files);
    mdFilesString = files.filter((file) => path.extname(file) === '.md');
    console.log('Array con archivos md ' + mdFilesString);
    return mdFilesString;
  });
  console.log(mdFilesString);
} else if (stats.isFile() === true) {
  if (path.extname(absolutePath) === '.md') {
    singleMdFile = absolutePath;
    console.log('This is a ' + singleMdFile);
    return singleMdFile;
  } 
  console.log('Verificando extension del file ' + path.extname(absolutePath));
}
console.log(mdFilesString);



// console.log('is file? ' + stats.isFile());
// console.log('is directory? ' + stats.isDirectory());





// let result;

// if (require.main === module) {
//   for (let i = 0; i < userInput.length; i++) {
//     result = (userInput[i]);
//   }
//   console.log(result);
// }


// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });