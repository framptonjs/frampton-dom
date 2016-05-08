/**
 * @name VirtualText
 * @memberof Frampton.DOM
 * @class
 * @private
 * @param {String} str Text content for new text node
 * @returns {VirtualText} A new VirtualText
 */
export default function VirtualText(str) {
  return {
    ctor : 'VirtualText',
    text : str
  };
}