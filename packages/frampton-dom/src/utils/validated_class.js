import isArray from 'frampton-utils/is_array';
import isString from 'frampton-utils/is_string';
import isObject from 'frampton-utils/is_object';
import notEmpty from 'frampton-dom/utils/not_empty';
import emptyClass from 'frampton-dom/utils/empty_class';

export default function validated_class(str) {

  if (isString(str)) {

    return {
      add : str.split(' ').filter(notEmpty),
      remove : []
    };

  } else if (isObject(str)) {

    let newClass = emptyClass();

    if (isArray(str.add)) {
      newClass.add = str.add;
    }

    if (isArray(str.remove)) {
      newClass.remove = str.remove;
    }

    return newClass;

  } else {
    return emptyClass();
  }
}
