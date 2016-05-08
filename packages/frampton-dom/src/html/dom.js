import vnode from 'frampton-dom/virtual/node';
import vtext from 'frampton-dom/virtual/text';


// GENERIC DOM NODE

export var node = (name, attrs, children) => {
  return vnode(name, attrs, children);
};


// TEXT NODE

export var text = (value) => {
  return vtext(value);
};


// MAIN TAGS

export var div = (attrs, children) => {
  return vnode('div', attrs, children);
};

export var span = (attrs, children) => {
  return vnode('span', attrs, children);
};

export var header = (attrs, children) => {
  return vnode('header', attrs, children);
};

export var footer = (attrs, children) => {
  return vnode('footer', attrs, children);
};

export var article = (attrs, children) => {
  return vnode('article', attrs, children);
};

export var section = (attrs, children) => {
  return vnode('section', attrs, children);
};

export var aside = (attrs, children) => {
  return vnode('aside', attrs, children);
};

export var main = (attrs, children) => {
  return vnode('main', attrs, children);
};

export var p = (attrs, children) => {
  return vnode('p', attrs, children);
};

export var a = (attrs, children) => {
  return vnode('a', attrs, children);
};


// HEADINGS

export var h1 = (attrs, children) => {
  return vnode('h1', attrs, children);
};

export var h2 = (attrs, children) => {
  return vnode('h2', attrs, children);
};

export var h3 = (attrs, children) => {
  return vnode('h3', attrs, children);
};

export var h4 = (attrs, children) => {
  return vnode('h4', attrs, children);
};

export var h5 = (attrs, children) => {
  return vnode('h5', attrs, children);
};

export var h6 = (attrs, children) => {
  return vnode('h6', attrs, children);
};


// LISTS

export var ul = (attrs, children) => {
  return vnode('ul', attrs, children);
};

export var ol = (attrs, children) => {
  return vnode('ol', attrs, children);
};

export var li = (attrs, children) => {
  return vnode('li', attrs, children);
};


// MEDIA

export var img = (attrs, children) => {
  return vnode('img', attrs, children);
};

export var video = (attrs, children) => {
  return vnode('video', attrs, children);
};

export var audio = (attrs, children) => {
  return vnode('audio', attrs, children);
};

export var source = (attrs, children) => {
  return vnode('source', attrs, children);
};


export var figure = (attrs, children) => {
  return vnode('figure', attrs, children);
};

export var figcaption = (attrs, children) => {
  return vnode('figcaption', attrs, children);
};


// FORMS

export var legend = (attrs, children) => {
  return vnode('legend', attrs, children);
};

export var fieldset = (attrs, children) => {
  return vnode('fieldset', attrs, children);
};

export var option = (attrs, children) => {
  return vnode('option', attrs, children);
};

export var optgroup = (attrs, children) => {
  return vnode('optgroup', attrs, children);
};

export var label = (attrs, children) => {
  return vnode('label', attrs, children);
};

export var button = (attrs, children) => {
  return vnode('button', attrs, children);
};

export var select = (attrs, children) => {
  return vnode('select', attrs, children);
};

export var input = (attrs, children) => {
  return vnode('input', attrs, children);
};

export var textarea = (attrs, children) => {
  return vnode('textarea', attrs, children);
};

export var caption = (attrs, children) => {
  return vnode('caption', attrs, children);
};


// FORMATTING

export var pre = (attrs, children) => {
  return vnode('pre', attrs, children);
};

export var strong = (attrs, children) => {
  return vnode('strong', attrs, children);
};

export var em = (attrs, children) => {
  return vnode('em', attrs, children);
};
