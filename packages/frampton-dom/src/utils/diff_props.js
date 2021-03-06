import isObject from 'frampton-utils/is_object';
import isUndefined from 'frampton-utils/is_undefined';
import diffClass from 'frampton-dom/utils/diff_class';
import validatedTransition from 'frampton-dom/utils/validated_transition';

export default function diff_props(oldProps, newProps) {

  var diff;

  for (let key in oldProps) {

    let oldValue = oldProps[key];
    let newValue = newProps[key];

    if (isUndefined(newValue)) {
      diff = (diff || {});
      diff[key] = undefined;
    }

    if (key === 'style') {
      newValue = (newValue || {});
    }

    if (key === 'transition') {
      oldValue = validatedTransition(oldValue);
      newValue = validatedTransition(newValue);
      const tempDiff = diff_props(oldValue, newValue);
      if (tempDiff) {
        diff = (diff || {});
        diff[key] = tempDiff;
      }

    } else if (key === 'class') {
      newValue = (newValue || '');
      const tempDiff = diffClass(oldValue, newValue);
      if (tempDiff) {
        diff = (diff || {});
        diff[key] = tempDiff;
      }

    } else if (isObject(oldValue) && isObject(newValue)) {
      const tempDiff = diff_props(oldValue, newValue);
      if (tempDiff) {
        diff = (diff || {});
        diff[key] = tempDiff;
      }

    } else if (oldValue !== newValue) {
      diff = (diff || {});
      diff[key] = newValue;
    }
  }

  for (let key in newProps) {
    if (isUndefined(oldProps[key])) {
      const newValue = newProps[key];
      diff = (diff || {});
      diff[key] = newValue;
    }
  }

  return diff;
}
