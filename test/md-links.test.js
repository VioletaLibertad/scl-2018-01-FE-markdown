const mdLinks = require('../lib/md-links');

describe('mdLinks module', () => {
  test('mdLinks to be an object', () => {
    expect(typeof mdLinks).toBe('object');
  });
});

describe('pathIsFileOrDirectory function', () => {
  test('should return an array if directory', () => {
    expect.assertions(1);
    return mdLinks.pathIsFileOrDirectory('/home/violeta/Documentos/Laboratoria/md-links/scl-2018-01-FE-markdown/assets')
      .then((mdFilesString) => {
        expect(Array.isArray(mdFilesString)).toBe(true);
      });
  });
  test('should return an absolute path if file', () => {
    expect.assertions(1);
    return mdLinks.pathIsFileOrDirectory('/home/violeta/Documentos/Laboratoria/md-links/scl-2018-01-FE-markdown/assets/README.md')
      .then((mdFilesString) => {
        expect(mdFilesString).toBe('/home/violeta/Documentos/Laboratoria/md-links/scl-2018-01-FE-markdown/assets/README.md');
      });
  });
});

// npm test -- --coverage

// describe('readContentOfFileOrDir to return data')