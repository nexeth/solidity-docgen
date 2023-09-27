import { PragmaDirective } from "@solidity-parser/parser/dist/src/ast-types";
import { describe, expect, test } from "bun:test";

import { SolidityParser } from "../modules";

import { TestContract } from "./contracts";

const TEST_CONTRACT_FILE = "test/contracts/TestContract.sol";

describe("SolidityParserService", () => {
  describe("parse", () => {
    test("should parse Solidity code and return the corresponding AST", () => {
      const ast = SolidityParser.parse(TestContract);

      expect(ast).toBeDefined();
      expect(ast.type).toBe("SourceUnit");
      expect(ast.children.length).toBeGreaterThan(0);
    });
  });

  describe("parseFile", () => {
    test("should parse a Solidity file and return the corresponding AST", () => {
      const ast = SolidityParser.parseFile(TEST_CONTRACT_FILE);

      expect(ast).toBeDefined();
      expect(ast.type).toBe("SourceUnit");
      expect(ast.children.length).toBeGreaterThan(0);

      const pragma = ast.children[0] as PragmaDirective;
      expect(pragma.type).toBe("PragmaDirective");
      expect(pragma.name).toBe("solidity");
      expect(pragma.value).toBe("^0.8.0");
    });
  });
});
