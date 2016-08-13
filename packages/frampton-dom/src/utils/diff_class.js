import length from 'frampton-list/length';
import emptyClass from 'frampton-dom/utils/empty_class';
import validatedClass from 'frampton-dom/utils/validated_class';

export default function diff_class(oldClass, newClass) {
  oldClass = validatedClass(oldClass);
  newClass = validatedClass(newClass);
  const oLen = length(oldClass.add);
  const nLen = length(newClass.add);
  var diff;

  for (let i = 0; i < oLen; i++) {
    if (newClass.add.indexOf(oldClass.add[i]) === -1) {
      diff = (diff || emptyClass());
      diff.remove = (diff.remove || []);
      diff.remove.push(oldClass.add[i]);
    }
  }

  for (let i = 0; i < nLen; i++) {
    if (oldClass.add.indexOf(newClass.add[i]) === -1) {
      diff = (diff || emptyClass());
      diff.add = (diff.add || []);
      diff.add.push(newClass.add[i]);
    }
  }

  return diff;
}
