import { FunctionDefinition } from "@solidity-parser/parser/dist/src/ast-types";
import { beforeAll, describe, expect, test } from "bun:test";

import { SolidityParser, documentFunction } from "../modules";

import { mockMarkdownContext } from "./mock";

const testContract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestContract {
    function pureFunction() public pure returns (bool) {
        return true;
    }

    function viewFunction() public view returns (bool) {
        return true;
    }

    function payableFunction() public payable returns (bool) {
        return true;
    }

    function externalFunction() external returns (bool) {
        return true;
    }

    function internalFunction() internal returns (bool) {
        return true;
    }

    function privateFunction() private returns (bool) {
        return true;
    }

    function parameterFunction(bool _param) public returns (bool) {
        return _param;
    }

    function parameterFunction2(bool _param, uint256 _param2) public returns (bool) {
        return _param;
    }

    // @dev This is a test function
    // @param _param This is a test parameter
    // @param _arrayParam This is a test array parameter
    // @return This is a test return value
    function testFunction(bool _param, uint256[] memory _arrayParam) public returns (bool) {
        return _param;
    }

    // @dev This is a test function
    // @param _param This is a test parameter
    // @param _arrayParam This is a test array parameter
    // @return This is a test return value
    function namedReturnValue(bool _param, uint256[] memory _arrayParam) public returns (bool namedReturn) {
        return _param;
    }

    /**
     * @dev This is a test function
     * @param _param This is a test parameter
     * @param _arrayParam This is a test array parameter
     * @return This is a test return value
     */
    function testFunction(bool _param, uint256[] memory _arrayParam) public returns (bool) {
        return _param;
    }
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
    expect(output).toContain("### testFunction");
  });

  test.only("should return the function signature", () => {
    const output = documentFunction(functions[9], context);
    console.log(output);
    expect(output).toInclude(`\`\`\`solidity
function testFunction(bool _param, uint256[] memory _arrayParam) public returns (bool)
\`\`\``);
  });
});
