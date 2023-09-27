import { FunctionDefinition } from "@solidity-parser/parser/dist/src/ast-types";

import { DocumentationConfig } from "./config";
import { ParsedContract } from "./parser";

export interface SolidityDocgenInterface {
  /**
   * Generates documentation for the given contract AST
   * @param contracts The contract AST to generate documentation for
   * @param config The configuration to use when generating documentation
   * @returns The generated documentation as a string
   */
  generate(contract: ParsedContract, config?: DocumentationConfig): string;

  /**
   * Generates documentation for a single contract
   * @param contract The function AST to generate documentation for
   * @param config The configuration to use when generating documentation
   * @returns The generated documentation as a string
   */
  documentFunction(func: FunctionDefinition, config?: DocumentationConfig): string;
}
