import isString from 'frampton-utils/is_string';
import notEmpty from 'frampton-dom/utils/not_empty';
import emptyClass from 'frampton-dom/utils/empty_class';

export default function validated_class(str) {

  if (!str) {
    return emptyClass();
  }

  if (isString(str)) {
    return {
      add : str.split(' ').filter(notEmpty),
      remove : []
    };
  }

  if (!str.add) {
    str.add = [];
  }

  if (!str.remove) {
    str.remove = [];
  }

  return str;
}
