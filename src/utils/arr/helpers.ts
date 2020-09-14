export const makeIndices = ({
  min = 0,
  max,
  interval = 1,
}: {
  min?: number;
  max: number;
  interval?: number;
}): Array<number> => {
  const indices: number[] = [];
  for (let index = min; index < max; index += interval) {
    indices.push(index);
  }
  return indices;
};
