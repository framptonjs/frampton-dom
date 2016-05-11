import isObject from 'frampton-utils/is_object';

export default function object_diff(oldObj, newObj) {

  var diff;

  for (let key in oldObj) {

    const oldValue = oldObj[key];
    const newValue = newObj[key];

    if (!newValue) {
      diff = (diff || {});
      diff[key] = undefined;
    }

    if (isObject(oldValue) && isObject(newValue)) {
      let tempDiff = object_diff(oldValue, newValue);
      if (tempDiff) {
        diff = (diff || {});
        diff[key] = object_diff(oldValue, newValue);
      }
    } else if (oldValue !== newValue) {
      diff = (diff || {});
      diff[key] = newValue;
    }
  }

  for (let key in newObj) {
    if (!oldObj[key]) {
      diff = (diff || {});
      diff[key] = newObj[key];
    }
  }

  return diff;
}