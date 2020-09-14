export const createArrayIndex = <ProtoT extends { name: string }, EntryT>({
  master,
  valueCaller,
  indexNamer,
}: {
  master: Record<string, ProtoT>;
  valueCaller: (protoValue: ProtoT) => { entries: Array<EntryT> };
  indexNamer: (entry: EntryT) => { indexKey: string };
}) => {
  return Object.values(master).reduce((masterIndex, nextProtoValue) => {
    const { entries } = valueCaller(nextProtoValue);
    if (!entries || entries.length === 0) {
      return masterIndex;
    }
    return {
      ...masterIndex,
      ...entries.reduce(
        (subIndex, entry) => ({
          ...subIndex,
          [indexNamer(entry).indexKey]: masterIndex[indexNamer(entry).indexKey]
            ? [...masterIndex[indexNamer(entry).indexKey], nextProtoValue.name]
            : [nextProtoValue.name],
        }),
        {}
      ),
    };
  }, {});
};
