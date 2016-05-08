/*
 * @name updateText
 * @memberOf Frampton.DOM
 * @method
 * @private
 * @param {Element} node Node to update
 * @param {String} text New text to display
 */
export default function update_text(node, text) {
  node.textContent = text;
}