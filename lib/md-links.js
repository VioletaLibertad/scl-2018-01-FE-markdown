#!/usr/bin/env node

const mdLinks = {};
const fs = require('fs');
const path = require('path');
const marked = require('marked');

/* Obtain what user wrote on CLI */
const userInput = process.argv;
let pathFromUser = userInput[2];
mdLinks.obtainUserInput = () => {
  let absolutePath = path.resolve(`${pathFromUser}`);
  // console.log('Probando: ' + absolutePath);
  return mdLinks.pathIsFileOrDirectory(absolutePath)
    .then((stringWithFiles) => {
      let mdFilesString = stringWithFiles;
      // console.log('Probando 2:' + mdFilesString);
      // console.log(typeof mdFilesString);
      // console.log('testnnnn: ' + mdFilesString);
      return mdLinks.readContentOfFileOrDir(mdFilesString);
    }).then((fileContent) => {
      let markdown = fileContent;
      let filePath = path.resolve(pathFromUser);
      // console.log('testblabla: ' + filePath);
      // console.log('Probando 3: ' + markdown);
      return mdLinks.markdownLinkExtractor(markdown, filePath);
    }).then((links) => {
      console.log(links);
    }).catch((error) => {
      console.error('Ha ocurrido un error: ' + error);
    });
};

/* Finding the .md files */
mdLinks.pathIsFileOrDirectory = (absolutePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(absolutePath, (error, stats) => {
      let mdFilesString;
      if (error) {
        console.error('Ha ocurrido un error: ' + error);
        return reject(error);
      }
      if (stats.isFile() === true && path.extname(absolutePath) === '.md') {
        mdFilesString = absolutePath;
        // console.log('Array con archivos md ' + mdFilesString);
        // console.log(mdFilesString);
        return resolve(mdFilesString);
      }
      if (stats.isDirectory() === true) {
        fs.readdir(absolutePath, 'utf-8', (err, files) => {
          if (err) throw err;
          // console.log('These files can be found here: ' + files);
          // console.log(files);
          mdFilesString = files.filter((file) => path.extname(file) === '.md');
          // console.log(mdFilesString);
          return resolve(mdFilesString);
        });
      }
    });
  });
};

/* Reading the content */
mdLinks.readContentOfFileOrDir = (mdFilesString) => {
  return new Promise((resolve, reject) => {
    // console.log('Path > ' + mdFilesString);
    fs.readFile(mdFilesString, 'utf-8', (error, data) => {
      // console.log('asdf' + mdFilesString);
      if (error) {
        console.error('Lectura de archivos ha fallado porque: ' + error);
        return reject(error);
      } else {
        // console.log(data);
        let markdown = data;
        return resolve(markdown, mdFilesString);
      }
    });
  });
};

/* Extracting the links from the data */
mdLinks.markdownLinkExtractor = (markdown, filePath) => {
  const links = [];
  const renderer = new marked.Renderer();
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,
      file: filePath,
    });
  };
  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      title: title,
      file: filePath,
    });
  };
  marked(markdown, {
    renderer: renderer,
  });

  return links;
};


module.exports = mdLinks;
