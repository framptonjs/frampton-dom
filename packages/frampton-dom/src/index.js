import Frampton from 'frampton/namespace';

import diff from 'frampton-dom/diff';
import update from 'frampton-dom/update';
import scene from 'frampton-dom/scene';

import {
  node, text,
  div, span, p, header, footer,
  article, section, aside, main,
  address, menu, menuitem, nav, progress,
  summary, details,
  ul, ol, li,
  dl, dd, dt,
  h1, h2, h3, h4, h5, h6,
  strong, em, a, pre, code,
  legend, fieldset, input, button, label,
  select, option, optgroup, textarea,
  video, audio, source,
  img, figure, figcaption,
  table, thead, tbody, tfoot, tr, td,
  col, colgroup, caption
} from 'frampton-dom/html/dom';

/**
 * @name DOM
 * @namespace
 * @memberof Frampton
 */
Frampton.DOM         = {};
Frampton.DOM.VERSION = '{-- VERSION_PLACEHOLDER --}';
Frampton.DOM.diff    = diff;
Frampton.DOM.update  = update;
Frampton.DOM.scene   = scene;

/**
 * @name Html
 * @namespace
 * @memberof Frampton.DOM
 */
Frampton.DOM.Html            = {};
// PRIMITIVES
Frampton.DOM.Html.node       = node;
Frampton.DOM.Html.text       = text;
// BASICS
Frampton.DOM.Html.div        = div;
Frampton.DOM.Html.span       = span;
Frampton.DOM.Html.p          = p;
Frampton.DOM.Html.a          = a;
// SEMANTIC
Frampton.DOM.Html.header     = header;
Frampton.DOM.Html.footer     = footer;
Frampton.DOM.Html.article    = article;
Frampton.DOM.Html.section    = section;
Frampton.DOM.Html.aside      = aside;
Frampton.DOM.Html.main       = main;
Frampton.DOM.Html.nav        = nav;
Frampton.DOM.Html.menu       = menu;
Frampton.DOM.Html.menuitem   = menuitem;
Frampton.DOM.Html.address    = address;
Frampton.DOM.Html.summary    = summary;
Frampton.DOM.Html.details    = details;
Frampton.DOM.Html.progress   = progress;
// LISTS
Frampton.DOM.Html.ul         = ul;
Frampton.DOM.Html.ol         = ol;
Frampton.DOM.Html.li         = li;
// DESCRIPTION LISTS
Frampton.DOM.Html.dl         = dl;
Frampton.DOM.Html.dt         = dt;
Frampton.DOM.Html.dd         = dd;
// HEADINGS
Frampton.DOM.Html.h1         = h1;
Frampton.DOM.Html.h2         = h2;
Frampton.DOM.Html.h3         = h3;
Frampton.DOM.Html.h4         = h4;
Frampton.DOM.Html.h5         = h5;
Frampton.DOM.Html.h6         = h6;
// FORMATTING
Frampton.DOM.Html.strong     = strong;
Frampton.DOM.Html.em         = em;
Frampton.DOM.Html.pre        = pre;
Frampton.DOM.Html.code       = code;
// FORMS
Frampton.DOM.Html.legend     = legend;
Frampton.DOM.Html.fieldset   = fieldset;
Frampton.DOM.Html.input      = input;
Frampton.DOM.Html.label      = label;
Frampton.DOM.Html.button     = button;
Frampton.DOM.Html.textarea   = textarea;
Frampton.DOM.Html.option     = option;
Frampton.DOM.Html.optgroup   = optgroup;
Frampton.DOM.Html.select     = select;
// MEDIA
Frampton.DOM.Html.figure     = figure;
Frampton.DOM.Html.img        = img;
Frampton.DOM.Html.video      = video;
Frampton.DOM.Html.audio      = audio;
Frampton.DOM.Html.source     = source;
Frampton.DOM.Html.figcaption = figcaption;
// TABLES
Frampton.DOM.Html.table      = table;
Frampton.DOM.Html.thead      = thead;
Frampton.DOM.Html.tbody      = tbody;
Frampton.DOM.Html.tfoot      = tfoot;
Frampton.DOM.Html.tr         = tr;
Frampton.DOM.Html.td         = td;
Frampton.DOM.Html.col        = col;
Frampton.DOM.Html.colgroup   = colgroup;
Frampton.DOM.Html.caption    = caption;
