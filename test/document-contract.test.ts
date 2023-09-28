import { describe, expect, test } from "bun:test";

import { documentContract } from "../modules";

import { mockMarkdownContext } from "./mock";

const testContract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title TestContract
 * @notice This is a test contract notice
 * @dev This is a test contract
 * @author mfbevan
 */
contract TestContract {

  /// @dev This is a test function
  /// @param _param This is a test parameter
  /// @param _arrayParam This is a test array parameter
  /// @return This is a test return value
  function testFunction(bool _param, uint256[] memory _arrayParam) public returns (bool) {
    return _param;
  }

  /// @dev This is a test event
  /// @param _param This is a test parameter
  /// @param _arrayParam This is a test array parameter
  event TestEvent(bool indexed _param, uint256[] _arrayParam);
}
`;

describe("documentContract", () => {
  const context = mockMarkdownContext(testContract);

  test("should return a string", () => {
    const output = documentContract(context);
    console.log(output);

    expect(typeof output).toBe("string");
  });

  test("should contain the contract name", () => {
    const output = documentContract(context);
    expect(output).toContain("# TestContract");
  });
});
