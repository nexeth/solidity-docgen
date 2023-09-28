import { EventDefinition, FunctionDefinition } from "@solidity-parser/parser/dist/src/ast-types";
import { beforeAll, describe, expect, test } from "bun:test";

import { SolidityParser } from "../modules";
import { documentNatspec } from "../modules/solidity-docgen/document-natspec";

import { mockMarkdownContext } from "./mock";

const testContract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestContract {
    
    /// @dev This is a test function
    /// @param _param This is a test parameter
    /// @param _arrayParam This is a test array parameter
    /// @return This is a test return value
    function testFunction(bool _param, uint256[] memory _arrayParam) public returns (bool) {
        return _param;
    }

    // @dev This is a test function
    // @param _param This is a test parameter
    // @param _arrayParam This is a test array parameter
    // @return This is a test return value
    function testFunction(bool _param, uint256[] memory _arrayParam) public returns (bool) {
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

    /// @dev This is a test event
    /// @param _param This is a test parameter
    /// @param _arrayParam This is a test array parameter
    event TestEvent(bool indexed _param, uint256[] _arrayParam);

    // @dev This is a test event
    // @param _param This is a test parameter
    // @param _arrayParam This is a test array parameter
    event TestEvent(bool indexed _param, uint256[] _arrayParam);

    /**
     * @dev This is a test event
     * @param _param This is a test parameter
     * @param _arrayParam This is a test array parameter
     */
    event TestEvent(bool indexed _param, uint256[] _arrayParam);
}
`;

describe("documentNatspec", () => {
  const context = mockMarkdownContext(testContract);
  const functions: FunctionDefinition[] = [];
  const events: EventDefinition[] = [];

  beforeAll(() => {
    SolidityParser.visit(context.parsedContract, {
      FunctionDefinition: (node) => functions.push(node),
      EventDefinition: (node) => events.push(node),
    });
  });

  describe("for /// comments", () => {
    test("should document a function", () => {
      const natspec = documentNatspec(functions[0], context);

      expect(natspec).toMatchObject({
        params: [
          { name: "_param", type: "bool", description: "This is a test parameter" },
          { name: "_arrayParam", type: "uint256[] memory", description: "This is a test array parameter" },
        ],
        returns: [{ name: "", type: "bool", description: "This is a test return value" }],
        dev: "This is a test function",
      });
    });

    test("should document an event", () => {
      const natspec = documentNatspec(events[0], context);

      expect(natspec).toMatchObject({
        params: [
          { name: "_param", type: "bool indexed", description: "This is a test parameter" },
          { name: "_arrayParam", type: "uint256[]", description: "This is a test array parameter" },
        ],
        returns: [],
        dev: "This is a test event",
      });
    });
  });

  describe("for // comments", () => {
    test("should document a function", () => {
      const natspec = documentNatspec(functions[1], context);

      expect(natspec).toMatchObject({
        params: [
          { name: "_param", type: "bool", description: "This is a test parameter" },
          { name: "_arrayParam", type: "uint256[] memory", description: "This is a test array parameter" },
        ],
        returns: [{ name: "", type: "bool", description: "This is a test return value" }],
        dev: "This is a test function",
      });
    });

    test("should document an event", () => {
      const natspec = documentNatspec(events[1], context);

      expect(natspec).toMatchObject({
        params: [
          { name: "_param", type: "bool indexed", description: "This is a test parameter" },
          { name: "_arrayParam", type: "uint256[]", description: "This is a test array parameter" },
        ],
        returns: [],
        dev: "This is a test event",
      });
    });
  });

  describe("for /** */ comments", () => {
    test("should document a function", () => {
      const natspec = documentNatspec(functions[2], context);

      expect(natspec).toMatchObject({
        params: [
          { name: "_param", type: "bool", description: "This is a test parameter" },
          { name: "_arrayParam", type: "uint256[] memory", description: "This is a test array parameter" },
        ],
        returns: [{ name: "", type: "bool", description: "This is a test return value" }],
        dev: "This is a test function",
      });
    });

    test("should document an event", () => {
      const natspec = documentNatspec(events[2], context);

      expect(natspec).toMatchObject({
        params: [
          { name: "_param", type: "bool indexed", description: "This is a test parameter" },
          { name: "_arrayParam", type: "uint256[]", description: "This is a test array parameter" },
        ],
        returns: [],
        dev: "This is a test event",
      });
    });
  });
});
