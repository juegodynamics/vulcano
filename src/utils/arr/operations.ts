export const asyncForEach = async <T>(
  array: Array<T>,
  callbackfn: (value: T, index: number, array: T[]) => Promise<void>
) => {
  for (let index = 0; index < array.length; index++) {
    await callbackfn(array[index], index, array);
  }
};

export const intersect = <T>(...arrs: Array<Array<T>>): Array<T> => {
  if (!arrs || arrs.length === 0) {
    return [];
  }
  if (arrs.length === 1) {
    return arrs[0];
  }

  const arr1 = arrs.pop();
  const arr2 = arrs.pop();

  return intersect(
    arr1.filter(a => arr2.some(b => a === b)),
    ...arrs
  );
};
