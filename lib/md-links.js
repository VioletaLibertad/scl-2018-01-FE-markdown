#!/usr/bin/env node

const mdLinks = {};
const fs = require('fs');
const path = require('path');

/* Function to obtain user input and transform to absolute path */
mdLinks.obtainUserInput = (pathFromUser) => {
  let absolutePath = path.resolve(`${pathFromUser}`);
  console.log('This is to confirm it works > ' + absolutePath);
  return absolutePath;
};

/* Function that finds .md files */
mdLinks.pathIsFileOrDirectory = (absolutePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(absolutePath, (error, stats) => {
      if (error) {
        return reject(error);
      }
      if (stats.isFile() === true && path.extname(absolutePath) === '.md') {
        singleMdFile = absolutePath;
        // console.log('This is a ' + singleMdFile);
        return resolve(singleMdFile);
      }
      if (stats.isDirectory() === true) {
        fs.readdir(absolutePath, 'utf-8', (err, files) => {
          let mdFilesArray = [];
          if (err) throw err;
          // console.log('These files can be found here: ' + files);
          // console.log(files);
          mdFilesArray = files.filter((file) => path.extname(file) === '.md');
          // console.log('Array con archivos md ' + mdFilesArray);
          // console.log(Array.isArray(mdFilesArray));
          return resolve(mdFilesArray);
        });
      }
    });
  });
};

module.exports = mdLinks;
