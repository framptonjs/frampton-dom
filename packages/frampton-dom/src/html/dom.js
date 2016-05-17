import vnode from 'frampton-dom/virtual/node';
import vtext from 'frampton-dom/virtual/text';


// GENERIC DOM NODE

export const node = (name, attrs, children) => {
  return vnode(name, attrs, children);
};


// TEXT NODE

export const text = (value) => {
  return vtext(value);
};


// BASIC TAGS

export const div = (attrs, children) => {
  return vnode('div', attrs, children);
};

export const span = (attrs, children) => {
  return vnode('span', attrs, children);
};

export const p = (attrs, children) => {
  return vnode('p', attrs, children);
};

export const a = (attrs, children) => {
  return vnode('a', attrs, children);
};


// SEMANTIC

export const header = (attrs, children) => {
  return vnode('header', attrs, children);
};

export const footer = (attrs, children) => {
  return vnode('footer', attrs, children);
};

export const article = (attrs, children) => {
  return vnode('article', attrs, children);
};

export const section = (attrs, children) => {
  return vnode('section', attrs, children);
};

export const aside = (attrs, children) => {
  return vnode('aside', attrs, children);
};

export const main = (attrs, children) => {
  return vnode('main', attrs, children);
};

export const nav = (attrs, children) => {
  return vnode('nav', attrs, children);
};

export const menu = (attrs, children) => {
  return vnode('menu', attrs, children);
};

export const menuitem = (attrs, children) => {
  return vnode('menuitem', attrs, children);
};

export const address = (attrs, children) => {
  return vnode('address', attrs, children);
};

export const summary = (attrs, children) => {
  return vnode('summary', attrs, children);
};

export const details = (attrs, children) => {
  return vnode('details', attrs, children);
};

export const progress = (attrs, children) => {
  return vnode('progress', attrs, children);
};


// HEADINGS

export const h1 = (attrs, children) => {
  return vnode('h1', attrs, children);
};

export const h2 = (attrs, children) => {
  return vnode('h2', attrs, children);
};

export const h3 = (attrs, children) => {
  return vnode('h3', attrs, children);
};

export const h4 = (attrs, children) => {
  return vnode('h4', attrs, children);
};

export const h5 = (attrs, children) => {
  return vnode('h5', attrs, children);
};

export const h6 = (attrs, children) => {
  return vnode('h6', attrs, children);
};


// LISTS

export const ul = (attrs, children) => {
  return vnode('ul', attrs, children);
};

export const ol = (attrs, children) => {
  return vnode('ol', attrs, children);
};

export const li = (attrs, children) => {
  return vnode('li', attrs, children);
};


// DESCRIPTION LISTS

export const dl = (attrs, children) => {
  return vnode('dl', attrs, children);
};

export const dt = (attrs, children) => {
  return vnode('dt', attrs, children);
};

export const dd = (attrs, children) => {
  return vnode('dd', attrs, children);
};


// MEDIA

export const img = (attrs, children) => {
  return vnode('img', attrs, children);
};

export const video = (attrs, children) => {
  return vnode('video', attrs, children);
};

export const audio = (attrs, children) => {
  return vnode('audio', attrs, children);
};

export const source = (attrs, children) => {
  return vnode('source', attrs, children);
};


export const figure = (attrs, children) => {
  return vnode('figure', attrs, children);
};

export const figcaption = (attrs, children) => {
  return vnode('figcaption', attrs, children);
};


// FORMS

export const legend = (attrs, children) => {
  return vnode('legend', attrs, children);
};

export const fieldset = (attrs, children) => {
  return vnode('fieldset', attrs, children);
};

export const option = (attrs, children) => {
  return vnode('option', attrs, children);
};

export const optgroup = (attrs, children) => {
  return vnode('optgroup', attrs, children);
};

export const label = (attrs, children) => {
  return vnode('label', attrs, children);
};

export const button = (attrs, children) => {
  return vnode('button', attrs, children);
};

export const select = (attrs, children) => {
  return vnode('select', attrs, children);
};

export const input = (attrs, children) => {
  return vnode('input', attrs, children);
};

export const textarea = (attrs, children) => {
  return vnode('textarea', attrs, children);
};


// FORMATTING

export const pre = (attrs, children) => {
  return vnode('pre', attrs, children);
};

export const code = (attrs, children) => {
  return vnode('code', attrs, children);
};

export const strong = (attrs, children) => {
  return vnode('strong', attrs, children);
};

export const em = (attrs, children) => {
  return vnode('em', attrs, children);
};


// TABLES

export const table = (attrs, children) => {
  return vnode('table', attrs, children);
};

export const caption = (attrs, children) => {
  return vnode('caption', attrs, children);
};

export const tbody = (attrs, children) => {
  return vnode('tbody', attrs, children);
};

export const thead = (attrs, children) => {
  return vnode('thead', attrs, children);
};

export const tfoot = (attrs, children) => {
  return vnode('tfoot', attrs, children);
};

export const col = (attrs, children) => {
  return vnode('col', attrs, children);
};

export const colgroup = (attrs, children) => {
  return vnode('colgroup', attrs, children);
};

export const th = (attrs, children) => {
  return vnode('th', attrs, children);
};

export const tr = (attrs, children) => {
  return vnode('tr', attrs, children);
};

export const td = (attrs, children) => {
  return vnode('td', attrs, children);
};
