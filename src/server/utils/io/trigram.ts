type Char = string;
const isChar = (str: string): str is Char => /^(.|\n)$/.test(str);
const char = (str: string, idx: number): Char => {
  const c = str[idx];
  if (!isChar(c)) {
    throw new Error(`Non-character string located at position ${idx} in "${str}"`);
  }
  return c;
};

export class TrigramIndex {
  tIndex: Record<Char, Record<Char, Record<Char, string[]>>>;
  constructor() {
    this.tIndex = {};
  }

  private addEntry = ({ c1, c2, c3, word }: { c1: Char; c2: Char; c3: Char; word: string }) => {
    this.tIndex = {
      ...this.tIndex,
      [c1]: {
        ...(this.tIndex[c1] ? this.tIndex[c1] : {}),
        [c2]: {
          ...(this.tIndex[c1][c2] ? this.tIndex[c1][c2] : {}),
          [c3]: [...(this.tIndex[c1][c2][c3] ? this.tIndex[c1][c2][c3] : []), word],
        },
      },
    };
  };
}
