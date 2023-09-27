import * as parser from "@solidity-parser/parser";

export type ParsedContract = ReturnType<typeof parser.parse>;
