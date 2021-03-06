import requestFrame from 'frampton-dom/utils/request_frame';
import update from 'frampton-dom/update';

const STATES = {
  NOTHING : 0,
  PENDING : 1
};

/**
 * Start a new VirtualDOM scene. The scene takes a root node to attach
 * to and returns a function to schedule updates. You give the scheduler
 * a new VirtualNode and it will schedule the diff and update of the
 * previous DOM.
 *
 * @name scene
 * @memberof Frampton.DOM
 * @method
 * @param {Element} rootNode The node to attach our scene to
 * @param {Function} messages A function to handle events in the DOM
 * @returns {Function} A function to schedule updates
 */
export default function scene(rootNode, messages) {

  var savedDOM = null;
  var scheduledDOM = null;
  var state = STATES.NOTHING;

  function draw() {
    update({
      rootNode: rootNode,
      messages: messages,
      oldTree: savedDOM,
      newTree: scheduledDOM
    });
    savedDOM = scheduledDOM;
    state = STATES.NOTHING;
  }

  return function scheduler(dom) {
    scheduledDOM = dom;

    switch (state) {

      case STATES.NOTHING:
        requestFrame(draw);
        state = STATES.PENDING;
        break;

      default:
        state = STATES.PENDING;
        break;
    }
  };
}
