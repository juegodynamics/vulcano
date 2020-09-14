import { TableParser } from 'src/utils/lua/table';

import { ILuaHandler } from './types';

class LuaHandler implements ILuaHandler {
  public async convertLuaTable(luaTable: string): Promise<Record<string, any>> {
    return new TableParser().parseRawTable(luaTable);
  }
}

export default LuaHandler;
