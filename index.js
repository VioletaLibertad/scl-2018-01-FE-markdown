#!/usr/bin/env node

const mdLinks = require('./lib/md-links');

mdLinks.obtainUserInput();


// recuerden que para fijarse si un programa está siendo ejecutado como programa en la terminal o siendo requerido como módulo pueden usar la siguiente linea :
// if (require.main === module) {
//    //Soy un programa en la terminal
// }else{
//    //Me están ejecutando como módulo, debería exportar la función solamente
// }

// let result;

// if (require.main === module) {
//   for (let i = 0; i < userInput.length; i++) {
//     result = (userInput[i]);
//   }
//   console.log(result);
// }