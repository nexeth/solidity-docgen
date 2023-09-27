import * as fs from "fs";

import * as parser from "@solidity-parser/parser";
import { BaseASTNode, ASTVisitor } from "@solidity-parser/parser/dist/src/ast-types";

/**
 * A service for parsing Solidity code and files into an AST.
 */
export class SolidityParser {
  private static config: parser.ParseOptions = {
    loc: true,
    range: true,
  };

  /**
   * Parses Solidity code and returns the corresponding AST.
   * @param code The Solidity code to parse.
   * @returns The parsed AST of the Solidity code.
   */
  public static parse(code: string) {
    return parser.parse(code, this.config);
  }

  /**
   * Parses a Solidity file located at the specified path.
   * @param path The path to the Solidity file.
   * @returns The parsed AST of the Solidity file.
   */
  public static parseFile(path: string) {
    const code = fs.readFileSync(path, "utf8");
    return parser.parse(code, this.config);
  }

  /**
   * Visits each node in the given Solidity AST and calls the corresponding visitor function.
   * @param ast The Solidity AST to visit.
   * @param visitor The visitor function to call for each node in the AST.
   */
  public static visit(ast: BaseASTNode, visitor: ASTVisitor) {
    return parser.visit(ast, visitor);
  }
}
