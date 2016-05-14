import isObject from 'frampton-utils/is_object';
import isUndefined from 'frampton-utils/is_undefined';
import diffClass from 'frampton-dom/utils/diff_class';
import validatedTransition from 'frampton-dom/utils/validated_transition';

export default function diff_props(oldObj, newObj) {

  var diff;

  for (let key in oldObj) {

    let oldValue = oldObj[key];
    let newValue = newObj[key];

    if (isUndefined(newValue)) {
      diff = (diff || {});
      diff[key] = undefined;
    }

    if (key === 'style') {
      newValue = (newValue || {});
    }

    if (key === 'transition') {
      newValue = validatedTransition(newValue);
      let tempDiff = diff_props(oldValue, newValue);
      if (tempDiff) {
        diff = (diff || {});
        diff[key] = tempDiff;
      }
    } else if (key === 'class') {
      newValue = (newValue || '');
      let tempDiff = diffClass(oldValue, newValue);
      if (tempDiff) {
        diff = (diff || {});
        diff[key] = tempDiff;
      }
    } else if (isObject(oldValue) && isObject(newValue)) {
      let tempDiff = diff_props(oldValue, newValue);
      if (tempDiff) {
        diff = (diff || {});
        diff[key] = tempDiff;
      }
    } else if (oldValue !== newValue) {
      diff = (diff || {});
      diff[key] = newValue;
    }
  }

  for (let key in newObj) {
    if (isUndefined(oldObj[key])) {
      const newValue = newObj[key];
      if (key === 'class') {
        let tempDiff = diffClass('', newValue);
        if (tempDiff) {
          diff = (diff || {});
          diff[key] = tempDiff;
        }
      } else {
        diff = (diff || {});
        diff[key] = newValue;
      }
    }
  }

  return diff;
}