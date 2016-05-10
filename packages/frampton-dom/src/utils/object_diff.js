import isObject from 'frampton-utils/is_object';

export default function object_diff(oldProps, newProps) {

  var diff;

  for (let key in oldProps) {

    const oldValue = oldProps[key];
    const newValue = newProps[key];

    if (!newValue) {
      diff = (diff || {});
      diff[key] = undefined;
    }

    if (isObject(oldValue) && isObject(newValue)) {
      diff = (diff || {});
      diff[key] = object_diff(oldValue, newValue);
    } else if (oldValue !== newValue) {
      diff = (diff || {});
      diff[key] = newValue;
    }
  }

  for (let key in newProps) {
    if (!oldProps[key]) {
      diff = (diff || {});
      diff[key] = newProps[key];
    }
  }

  return diff;
}