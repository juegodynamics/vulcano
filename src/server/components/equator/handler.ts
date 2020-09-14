import * as calc from 'src/utils/calc';

import { IEquatorHandler } from './types';

class EquatorHandler implements IEquatorHandler {
  calculateReduction: IEquatorHandler.Calls.CalculateReduction = async req => {
    return new calc.Ratio(req.numerator, req.denominator).reduce().__toInterface__();
  };
}

export default EquatorHandler;
