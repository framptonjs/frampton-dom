import TYPES from 'frampton-dom/virtual/patch_types';

/**
 * @name VirtualPatch
 * @memberof Frampton.DOM
 * @class
 * @private
 * @param {Number} type Type of patch
 * @param {VirtualNode} node VirtualNode to patch
 * @param {*} update Description of update to make
 * @returns {VirtualPatch} A new VirtualPatch
 */
function VirtualPatch(type, node, update) {
  return {
    ctor : 'VirtualPatch',
    type : type,
    node : node,
    update : update
  };
}

export var none = (node, patch) => {
  return VirtualPatch(TYPES.NONE, node, patch);
};

export var insert = (node, patch) => {
  return VirtualPatch(TYPES.INSERT, node, patch);
};

export var remove = (node, patch) => {
  return VirtualPatch(TYPES.REMOVE, node, patch);
};

export var replace = (node, patch) => {
  return VirtualPatch(TYPES.REPLACE, node, patch);
};

export var props = (node, patch) => {
  return VirtualPatch(TYPES.PROPS, node, patch);
};

export var text = (node, patch) => {
  return VirtualPatch(TYPES.TEXT, node, patch);
};