import isNumber from 'frampton-utils/is_number';
import contains from 'frampton-list/contains';
import easing from 'frampton-dom/utils/easing';

const alias_mapping = {
  'duration' : 'transition-duration',
  'delay' : 'transition-delay'
};

const durations = contains(
  ['transition-duration', 'transition-delay']
);

const pixels = contains(
  ['height', 'width', 'left', 'top', 'right', 'bottom']
);

export default function normalized_frame(frame) {
  const obj = {};
  for (let key in frame) {
    if (alias_mapping[key]) {
      if (isNumber(frame[key])) {
        obj[alias_mapping[key]] = frame[key] + 'ms';
      } else {
        obj[alias_mapping[key]] = frame[key];
      }
    } else if (pixels(key) && isNumber(frame[key])) {
      obj[key] = frame[key] + 'px';
    } else if (durations(key) && isNumber(frame[key])) {
      obj[key] = frame[key] + 'ms';
    } else if (key === 'transition-timing-function') {
      obj[key] = (easing[frame[key]] ? easing[frame[key]] : frame[key]);
    } else {
      obj[key] = frame[key];
    }
  }
  return obj;
}
