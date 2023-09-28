import { BaseASTNode, EventDefinition, FunctionDefinition } from "@solidity-parser/parser/dist/src/ast-types";

import { DocumentationContext, NatspecTemplateData, ParamTemplateData } from "../../types";

import { documentParam, documentReturn } from "./document-param";

/**
 * Search for NatSpec comments above the function definition and return the parsed NatSpec
 * This will start from the beginning of the function definition and search backwards until it finds all NatSpec comments or a break in the comments
 */
export const documentNatspec = (node: BaseASTNode, context: DocumentationContext): NatspecTemplateData => {
  const comments: string[] = [];
  const start = node.loc?.start.line ? node.loc.start.line - 1 : 0;
  const contractLines = context.rawContract.split("\n");

  for (let i = start - 1; i >= 0; i--) {
    const line = contractLines[i]?.trim();

    if (line.startsWith("///") || line.startsWith("/**")) {
      comments.unshift(line.replace(/[/*]+/g, "").trim());
    } else if (line.startsWith("//") || line.startsWith("*")) {
      comments.unshift(line.replace(/(\/\/|\*)/g, "").trim());
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
      params.push(documentParam(paramMatch, node as FunctionDefinition | EventDefinition));
    } else if (returnMatch) {
      returns.push(documentReturn(returnMatch, node as FunctionDefinition));
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
