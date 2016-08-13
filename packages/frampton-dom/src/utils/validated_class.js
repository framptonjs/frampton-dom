import isArray from 'frampton-utils/is_array';
import isString from 'frampton-utils/is_string';
import isObject from 'frampton-utils/is_object';
import notEmpty from 'frampton-dom/utils/not_empty';
import emptyClass from 'frampton-dom/utils/empty_class';

function splitClass(str) {
  return str.split(' ').filter(notEmpty);
}

/**
 * @name validatedClass
 */
export default function validated_class(str) {

  const newClass = emptyClass();

  if (isString(str)) {

    newClass.add = splitClass(str);

  } else if (isObject(str)) {

    if (isArray(str.add)) {
      newClass.add = str.add;
    } else if (isString(str.add)) {
      newClass.add = splitClass(str.add);
    }

    if (isArray(str.remove)) {
      newClass.remove = str.remove;
    } else if (isString(str.remove)) {
      newClass.remove = splitClass(str.remove);
    }

  }

  return newClass;
}
