import { ParsedContracts } from "./parser";

export interface SolidityDocgenInterface {
  /**
   * Generates documentation for the given contract AST
   * @param contracts The contract AST to generate documentation for
   * @returns The generated documentation as a string
   */
  generate(contracts: ParsedContracts): string;
}
