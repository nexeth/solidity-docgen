import { FunctionDefinition } from "@solidity-parser/parser/dist/src/ast-types";

import { DocumentationContext, NatspecTemplateData, ParamTemplateData } from "../../types";

import { documentParam, documentReturn } from "./document-param";

const documentFunctionSignature = (func: FunctionDefinition, context: DocumentationContext): string => {
  const [start, end] = func.range || [0, 0];
  return context.rawContract.slice(start, end).split("{")[0].replaceAll("\n", "").trim();
};

/**
 * Search for NatSpec comments above the function definition and return the parsed NatSpec
 * This will start from the beginning of the function definition and search backwards until it finds all NatSpec comments or a break in the comments
 */
export const documentFunctionNatspec = (
  func: FunctionDefinition,
  context: DocumentationContext
): NatspecTemplateData => {
  const comments: string[] = [];
  const start = func.loc?.start.line ? func.loc.start.line - 1 : 0;

  for (let i = start - 1; i >= 0; i--) {
    const line = context.rawContract.split("\n")[i];
    console.log(line);
    if (line?.trim().startsWith("//")) {
      comments.unshift(line.trim().replace("//", "").trim());
    } else {
      break;
    }
  }

  const params: ParamTemplateData[] = [];
  let dev: string | undefined;
  const returns: ParamTemplateData[] = [];
  let author: string | undefined;
  let notice: string | undefined;
  let title: string | undefined;

  comments.forEach((comment) => {
    const paramMatch = comment.match(/@param\s+(\S+)\s+(.*)/);
    const returnMatch = comment.match(/@return\s+(.*)/);
    const devMatch = comment.match(/@dev\s+(.*)/);
    const authorMatch = comment.match(/@author\s+(.*)/);
    const noticeMatch = comment.match(/@notice\s+(.*)/);
    const titleMatch = comment.match(/@title\s+(.*)/);

    if (paramMatch) {
      params.push(documentParam(paramMatch, func));
    } else if (returnMatch) {
      //   const returnType = func.returnParameters.find((param) => param.name === returnMatch[1]);
      //   if (returnType) {
      //     const type = returnType.typeName.name;
      //     returns.push({ name: returnMatch[1], type, description: returnMatch[1] });
      //   } else {
      //     returns.push({ name: returnMatch[1], type: returnType, description: returnMatch[1] });
      //   }
      returns.push(documentReturn(returnMatch, func));
    } else if (devMatch) dev = devMatch[1];
    else if (authorMatch) author = authorMatch[1];
    else if (noticeMatch) notice = noticeMatch[1];
    else if (titleMatch) title = titleMatch[1];
  });

  return {
    params,
    returns,
    dev,
    author,
    notice,
    title,
  };
};

export const documentFunction = (func: FunctionDefinition, context: DocumentationContext): string => {
  const natspec = documentFunctionNatspec(func, context);
  const templateData = {
    name: func.name,
    signature: documentFunctionSignature(func, context),
    natspec,
    params: natspec.params,
    returns: natspec.returns,
  };

  return context.config?.template.func(templateData);
};

/**
 * TODOS
 * - [ ] Document function parameters
 * - [ ] Document function return values
 * - [ ] Document function modifiers
 * - [ ] Document function visibility
 * - [ ] Document function state mutability
 * - [ ] Document function events emitted
 */
