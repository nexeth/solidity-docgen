import { FunctionDefinition } from "@solidity-parser/parser/dist/src/ast-types";
import { beforeAll, describe, expect, test } from "bun:test";

import { SolidityParser, documentFunction } from "../modules";

import { TestContract } from "./contracts";

describe("documentFunction", () => {
  const ast = SolidityParser.parse(TestContract);
  const functions: FunctionDefinition[] = [];

  beforeAll(() => {
    SolidityParser.visit(ast, {
      FunctionDefinition: (node) => {
        functions.push(node);
      },
    });
  });

  test("should return a string", () => {
    const output = documentFunction(functions[0]);
    expect(typeof output).toBe("string");
  });
});
