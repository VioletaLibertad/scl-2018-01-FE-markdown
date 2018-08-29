const mdLinks = require('../lib/md-links');

describe('mdLinks module', () => {
  test('mdLinks to be an object', () => {
    expect(typeof mdLinks).toBe('object');
  });

});

describe('obtainUserInput function', () => {
  test('obtainUserInput to return an absolute path', () => {
    expect(mdLinks.obtainUserInput('./lib/md-links.js')).toBe('/home/violeta/Documentos/Laboratoria/md-links/scl-2018-01-FE-markdown/lib/md-links.js');
  });
});
