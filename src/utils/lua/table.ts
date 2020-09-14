import luaparse from 'luaparse';

export class TableParser {
  luaRawTable: string;

  public parseRawTable = (luaRawTable: string) => {
    this.luaRawTable = luaRawTable;
    const luaStatement = luaparse.parse(`local row = ${luaRawTable}`).body[0];
    if (luaStatement.type === 'LocalStatement') {
      const tableResponse = luaStatement.init.map(luaTable => {
        if (luaTable.type === 'TableConstructorExpression') {
          return this.parseTable(luaTable);
        }
        this.throwTypeMismtach(luaTable, 'TableConstructorExpression');
      });
      return tableResponse.length === 1 ? tableResponse[0] : tableResponse;
    }
    this.throwTypeMismtach(luaStatement, 'LocalStatement');
  };

  public parseTable(luaTable: luaparse.TableConstructorExpression) {
    if (this.isObjectTable(luaTable.fields)) {
      return luaTable.fields.reduce<Record<string, any>>((jsonObject, nextKeyValue) => {
        const nextKey =
          nextKeyValue.type === 'TableKeyString'
            ? nextKeyValue.key.name
            : `${this.parseValue(nextKeyValue.key)}`;
        try {
          return {
            ...jsonObject,
            [nextKey]: this.parseValue(nextKeyValue.value),
          };
        } catch (e) {
          throw new Error(`${nextKey}: ${JSON.stringify(nextKeyValue)} : ${e}`);
        }
      }, {});
    }
    if (this.isArrayTable(luaTable.fields)) {
      return luaTable.fields.map(luaField => this.parseValue(luaField.value));
    }
    this.throwTypeMismtach(luaTable.fields[0], 'TableKeyString | TableValue | TableKey');
  }

  public parseValue(luaValue: luaparse.TableKeyString['value']) {
    switch (luaValue.type) {
      case 'StringLiteral':
        try {
          return JSON.parse(luaValue.raw);
        } catch (e) {
          console.warn(`Failed to escape raw string value: ${e}`);
          return luaValue.raw;
        }

      case 'NumericLiteral':
        return luaValue.value;
      case 'BooleanLiteral':
        return luaValue.value;
      case 'NilLiteral':
        return null;
      case 'UnaryExpression':
        return -1 * this.parseValue(luaValue.argument);
      case 'BinaryExpression':
        return this.parseBinaryExpression(luaValue);
      case 'TableConstructorExpression':
        if (!luaValue.fields || luaValue.fields.length === 0) {
          return [];
        }
        return this.parseTable(luaValue);
      default:
        throw new Error(
          `Cannot parse type ${luaValue.type} into JSON (${JSON.stringify(luaValue)})`
        );
    }
  }

  public parseBinaryExpression(luaExp: luaparse.BinaryExpression) {
    const left = this.parseValue(luaExp.left);
    const right = this.parseValue(luaExp.right);
    switch (luaExp.operator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '%':
        return left % right;
      case '^':
        return left ^ right;
      case '/':
        return left / right;
      case '&':
        return left & right;
      case '|':
        return left | right;
      case '~=':
        return left !== right;
      case '==':
        return left === right;
      case '<':
        return left < right;
      case '<=':
        return left <= right;
      case '>':
        return left > right;
      case '>=':
        return left >= right;
    }
  }

  private isObjectTable(
    luaFields: luaparse.TableConstructorExpression['fields']
  ): luaFields is Array<luaparse.TableKeyString | luaparse.TableKey> {
    return luaFields.reduce(
      (priorIsValue, currentTableKey) =>
        priorIsValue &&
        (currentTableKey.type === 'TableKeyString' || currentTableKey.type === 'TableKey'),
      true
    );
  }

  private isArrayTable(
    luaFields: luaparse.TableConstructorExpression['fields']
  ): luaFields is Array<luaparse.TableValue> {
    return luaFields.reduce(
      (priorIsValue, currentTableKey) => priorIsValue && currentTableKey.type === 'TableValue',
      true
    );
  }

  private throwTypeMismtach = (node: luaparse.Node, expected: string) => {
    throw new Error(`Expected ${expected}; received: ${node.type}`);
  };
}
