import setStyle from 'frampton-style/set_style';

export default function apply_styles(node, props) {
  for (let key in props) {
    const value = props[key];
    if (key === 'height' && value === 'auto') {

    } else if (key === 'width' && value === 'auto') {

    } else {
      setStyle(node, key, value);
    }
  }
}
