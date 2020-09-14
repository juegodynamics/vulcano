import { Ratio } from './Ratio';

export const closestRatio = (value: number, maxdenom = 10000): Ratio => {
  const best = { numerator: 1, denominator: 1, error: Math.abs(value - 1) };
  for (let denominator = 1; best.error > 0 && denominator <= maxdenom; denominator++) {
    const numerator = Math.round(value * denominator);
    const error = Math.abs(value - numerator / denominator);
    if (error >= best.error) continue;
    best.numerator = numerator;
    best.denominator = denominator;
    best.error = error;
  }
  return new Ratio(best.numerator, best.denominator);
};

export const lcm = (x: number, y: number): number => {
  return Math.abs((x * y) / gcd(x, y));
};

export const gcd = (a: number, b: number): number => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
};

export type Factors = Record<number, number>;
export namespace Factors {
  export const getValue = (f: Factors) =>
    Object.entries(f).reduce((product, [factor, power]) => product * parseInt(factor) ** power, 1);

  export const getGCD = (f1: Factors, f2: Factors): Factors =>
    Object.keys(f1)
      .filter(f1key => !!f2[f1key])
      .reduce(
        (fCommon, fCommonKey) => ({
          ...fCommon,
          [fCommonKey]: Math.min(f1[fCommonKey], f2[fCommonKey]),
        }),
        {}
      );

  export const fromValue = (value: number) => new primeFactorizer(value).next();
}

class primeFactorizer {
  private primes: number[];
  private currentPrimeIndex: number;
  private factors: Factors;
  constructor(private value: number) {
    this.currentPrimeIndex = 0;
    this.primes = getPrimes(value);
    this.factors = { 1: 1 };
  }

  next() {
    console.log(
      JSON.stringify({
        value: this.value,
        currentPrimeIndex: this.currentPrimeIndex,
        factors: this.factors,
      })
    );
    if (this.value % this.getCurrentPrime() === 0) {
      this.value = this.value / this.getCurrentPrime();
      this.plus1factor(this.getCurrentPrime());
      return this.next();
    }
    if (!this.nextPrime()) {
      return this.next();
    }
    this.plus1factor(this.value);
    return this.factors;
  }

  plus1factor(factor: number) {
    if (!this.factors[factor]) {
      this.factors[factor] = 0;
    }
    this.factors[factor]++;
  }

  getCurrentPrime() {
    return this.primes[this.currentPrimeIndex];
  }

  nextPrime() {
    if (this.currentPrimeIndex >= this.primes.length) {
      return false;
    }
    this.currentPrimeIndex++;
    return true;
  }
}

function getPrimes(max: number) {
  const sieve: boolean[] = [];
  const primes = [];
  for (let i = 2; i <= max; ++i) {
    if (!sieve[i]) {
      // i has not been marked -- it is prime
      primes.push(i);
      for (let j = i << 1; j <= max; j += i) {
        sieve[j] = true;
      }
    }
  }
  return primes;
}
