import * as parser from "@solidity-parser/parser";

export type ParsedContracts = ReturnType<typeof parser.parse>;
