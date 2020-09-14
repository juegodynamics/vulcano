import { closestRatio, gcd, lcm } from './algos';

export class Ratio {
  constructor(public numerator: number, public denominator: number) {}

  /**
   * ================================================================
   * Alternative construction methods
   * ================================================================
   */
  static __fromInterface__ = ({
    numerator,
    denominator,
  }: Pick<IRatio, 'numerator' | 'denominator'>): Ratio => new Ratio(numerator, denominator);

  // static __fromArray__ = (params:[numerator: number, denominator: number]): Ratio => new Ratio(params[0], params[1]);

  static __null__ = (): Ratio => new Ratio(0, 1);

  static __identity__ = (): Ratio => new Ratio(1, 1);

  /**
   * ================================================================
   * Data serialization methods
   * ================================================================
   */
  public __toInterface__ = (): IRatio => ({
    numerator: this.numerator,
    denominator: this.denominator,
    approx: this.approx(),
  });

  /**
   * ================================================================
   * Class operation methods
   * ================================================================
   */
  public multiply(input: number | Ratio) {
    if (typeof input === 'number') {
      this.numerator = this.numerator * input;
      return this;
    }
    return this.update((n, d) => [n * input.numerator, d * input.denominator], true);
  }

  public scale(factor: number) {
    return this.update((n, d) => [n * factor, d * factor]);
  }

  public add(input: Ratio) {
    const commonDenom = lcm(this.denominator, input.denominator);
    const scaledInput = input.scale(commonDenom / input.denominator);
    this.scale(commonDenom / this.denominator);
    this.numerator = this.numerator + scaledInput.numerator;
    return this.reduce();
  }

  public reduce(): this {
    if (this.isNull()) {
      return this.update(() => [0, 1]);
    }
    if (this.isIdentity()) {
      return this.update(() => [1, 1]);
    }
    if (this.isInfinite()) {
      if (this.isIndeterminate()) {
        return this;
      }
      return this.update(n => [n > 0 ? 1 : -1, 0]);
    }
    if (!Number.isInteger(this.numerator) || !Number.isInteger(this.denominator)) {
      this.update((n, d) => {
        const { numerator, denominator } = closestRatio(n / d);
        return [numerator, denominator];
      });
    }
    const divisor = gcd(this.numerator, this.denominator);
    if (divisor === 1) {
      return this;
    }

    this.scale(1 / divisor);
    return this.reduce();
  }

  public approx(round: number = 4) {
    return Math.round((this.numerator / this.denominator) * 10 ** round) / 10 ** round;
  }

  /**
   * ================================================================
   * Special Axiomatic Definitions
   * ================================================================
   */
  public isNull = () => this.numerator === 0;
  public isIdentity = () => this.numerator === this.denominator;
  public isIndeterminate = () => this.numerator === 0 && this.denominator === 0;
  public isInfinite = () => this.denominator === 0;

  /**
   * ================================================================
   * Private
   * ================================================================
   */
  private update = (
    callback: (nIn: number, dIn: number) => [number, number],
    reduce: boolean = false
  ) => {
    [this.numerator, this.denominator] = callback(this.numerator, this.denominator);
    return reduce ? this.reduce() : this;
  };
}

export interface IRatio {
  numerator: number;
  denominator: number;
  approx: number;
}
