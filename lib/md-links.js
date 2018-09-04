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
  return mdLinks.mdLinks(absolutePath);
};

/* Main Promise */
mdLinks.mdLinks = (absolutePath) => {
  return mdLinks.pathIsFileOrDirectory(absolutePath)
    .then((stringWithFiles) => {
      let mdFilesString = stringWithFiles;
      return mdLinks.readContentOfFileOrDir(mdFilesString);
    }).then((fileContent) => {
      let markdown = fileContent;
      let filePath = path.resolve(pathFromUser);
      return mdLinks.markdownLinkExtractor(markdown, filePath);
    }).then((links) => {
      console.log(links);
      return links;
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
        return resolve(mdFilesString);
      }
      if (stats.isDirectory() === true) {
        fs.readdir(absolutePath, 'utf-8', (err, files) => {
          if (err) throw err;
          mdFilesString = files.filter((file) => path.extname(file) === '.md');
          return resolve(mdFilesString);
        });
      }
    });
  });
};

/* Reading the content */
mdLinks.readContentOfFileOrDir = (mdFilesString) => {
  return new Promise((resolve, reject) => {
    fs.readFile(mdFilesString, 'utf-8', (error, data) => {
      if (error) {
        console.error('Lectura de archivos ha fallado porque: ' + error);
        return reject(error);
      } else {
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
