import { FunctionDefinition } from "@solidity-parser/parser/dist/src/ast-types";
import { beforeAll, describe, expect, test } from "bun:test";

import { SolidityParser, documentFunction } from "../modules";

import { mockMarkdownContext } from "./mock";

const testContract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestContract {
   event TestEvent(bool indexed _param, uint256[] _arrayParam);

   event NoParamsEvent();

   /// @dev This is a test function
}
`;

describe("documentFunction", () => {
  const context = mockMarkdownContext(testContract);
  const functions: FunctionDefinition[] = [];

  beforeAll(() => {
    SolidityParser.visit(context.parsedContract, {
      FunctionDefinition: (node) => {
        functions.push(node);
      },
    });
  });

  test("should return a string", () => {
    const output = documentFunction(functions[0], context);
    expect(typeof output).toBe("string");
  });

  test("should return the name of the function", () => {
    const output = documentFunction(functions[0], context);
    expect(output).toContain("### pureFunction");
  });

  test("should return the function signature", () => {
    const output = documentFunction(functions[0], context);
    expect(output).toInclude("function pureFunction() public pure returns (bool)");
  });

  test("should return the function natspec", () => {
    const output = documentFunction(functions[8], context);
    expect(output).toInclude("This is a test function");
  });

  test("should return the function parameters", () => {
    const output = documentFunction(functions[8], context);
    expect(output).toInclude("| _param | bool | This is a test parameter |");
  });

  test("should return the function return values", () => {
    const output = documentFunction(functions[8], context);
    expect(output).toInclude("[0] | bool | This is a test return value |");
  });

  test("should return typed return values", () => {
    const output = documentFunction(functions[9], context);
    expect(output).toInclude("| namedReturn | bool | This is a test return value |");
  });
});
