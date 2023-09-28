import { EventDefinition } from "@solidity-parser/parser/dist/src/ast-types";
import { beforeAll, describe, expect, test } from "bun:test";

import { SolidityParser, documentEvent } from "../modules";

import { mockMarkdownContext } from "./mock";

const testContract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestContract {
  event TestEvent(bool indexed _param, uint256[] _arrayParam);

  event NoParamsEvent();

  /// @dev This is a test event
  /// @param _param This is a test parameter
  /// @param _arrayParam This is a test array parameter
  event TestEvent(bool indexed _param, uint256[] _arrayParam);
}
`;

describe("documentEvent", () => {
  const context = mockMarkdownContext(testContract);
  const events: EventDefinition[] = [];

  beforeAll(() => {
    SolidityParser.visit(context.parsedContract, {
      EventDefinition: (node) => {
        events.push(node);
      },
    });
  });

  test("should return a string", () => {
    const output = documentEvent(events[0], context);
    expect(typeof output).toBe("string");
  });

  test("should contain the event name", () => {
    const output = documentEvent(events[0], context);
    expect(output).toContain("TestEvent");
  });

  test("should contain the event signature", () => {
    const output = documentEvent(events[0], context);
    expect(output).toContain("event TestEvent(bool indexed _param, uint256[] _arrayParam)");
  });

  test("should contain the event natspec", () => {
    const output = documentEvent(events[2], context);
    expect(output).toContain("This is a test event");
  });

  test("should contain the event params", () => {
    const output = documentEvent(events[2], context);
    expect(output).toContain("This is a test parameter");
    expect(output).toContain("This is a test array parameter");
  });
});
