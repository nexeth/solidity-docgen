import { FunctionDefinition } from "@solidity-parser/parser/dist/src/ast-types";

import { DocumentationConfig } from "../../types";

export const documentFunction = (func: FunctionDefinition, config?: DocumentationConfig): string => "func";
