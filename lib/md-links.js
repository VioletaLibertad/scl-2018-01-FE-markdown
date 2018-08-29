#!/usr/bin/env node

const mdLinks = {};
const fs = require('fs');
const path = require('path');

/* Function to obtain user input and transform to absolute path */
mdLinks.obtainUserInput = (pathFromUser) => {
  let absolutePath = path.resolve(`${pathFromUser}`);
  return absolutePath;
};

mdLinks.pathIsFileOrDirectory = () => {
  return new Promise((resolve, reject) => {

  });
};

module.exports = mdLinks;