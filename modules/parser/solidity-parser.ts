import * as fs from "fs";

import * as parser from "@solidity-parser/parser";

/**
 * A service for parsing Solidity code and files into an AST.
 */
export class SolidityParser {
  private static config: parser.ParseOptions = {
    loc: true,
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
}
