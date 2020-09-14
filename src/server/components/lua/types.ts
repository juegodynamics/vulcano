export interface ILuaHandler {
  convertLuaTable: (luaTable: string) => Record<string, any>;
}
