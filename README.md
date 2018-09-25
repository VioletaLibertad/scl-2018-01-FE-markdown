# Markdown-Links

Md-Links is a small library that allows you to visualize all the links you might have included on a Markdown type file. In future releases, you will have the possibility to check whether those links are still active or not, thus allowing you to fix any problem with your files. The next version will also show the line of the file on which the link was found.  

## Installation

In order to install the module, you have to type on the Terminal:

```
npm install https://github.com/VioletaLibertad/scl-2018-01-FE-markdown
```

It is also required to install some dependencies listed below:

- Marked:
```
npm install --save marked
```

## Version 1.0.0

This first version includes the possibility to find all the links contained on a file and show them on the terminal this way:

```
md-links <path to '.md' file>
```

The output will be like this:

```
[
  { href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    title: null,
    file: '<path to file>'
  }
]
```

### About

This project was developed in the context of a Front End Developer Bootcamp at @Laboratoria.The personal organization for this project was done with [Trello](https://trello.com/b/ioKhRsnx/proyecto-mdlinks)

© Violeta Ledezma 2018

[Deploy](https://violetalibertad.github.io/scl-2018-01-FE-markdown/)
