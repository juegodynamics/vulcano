import * as calc from 'src/utils/calc';

export interface IEquatorHandler {
  calculateReduction: IEquatorHandler.Calls.CalculateReduction;
}

export namespace IEquatorHandler {
  export namespace Calls {
    export type CalculateReduction = (
      req: Pick<calc.IRatio, 'numerator' | 'denominator'>
    ) => Promise<calc.IRatio>;
  }
}
