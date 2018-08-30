const mdLinks = require('./lib/md-links');
const fs = require('fs');
const path = require('path');

/* Obtain what user wrote on CLI */
const userInput = process.argv;
let pathFromUser = userInput[2];
mdLinks.obtainUserInput(pathFromUser);

