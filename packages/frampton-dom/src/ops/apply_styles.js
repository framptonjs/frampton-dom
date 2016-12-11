import isSomething from 'frampton-utils/is_something';
import setStyle from 'frampton-style/set_style';
import removeStyle from 'frampton-style/remove_style';

export default function apply_styles(node, props, isTransition) {
  for (let key in props) {
    const value = props[key];
    if (isTransition && key === 'height' && value === 'auto') {
      const firstChild = node.firstElementChild;
      if (firstChild) {
        const height = firstChild.offsetHeight;
        setStyle(node, 'height', `${height}px`);
      }
    } else if (isTransition && key === 'width' && value === 'auto') {
      const firstChild = node.firstElementChild;
      if (firstChild) {
        const width = firstChild.offsetWidth;
        setStyle(node, 'width', `${width}px`);
      }
    } else if (isSomething(value)) {
      setStyle(node, key, value);
    } else {
      removeStyle(node, key);
    }
  }
}
