import { FunctionDefinition } from "@solidity-parser/parser/dist/src/ast-types";

import { DocumentationContext, FunctionTemplateData } from "../../types";

import { documentNatspec } from "./document-natspec";

const documentFunctionSignature = (func: FunctionDefinition, context: DocumentationContext): string => {
  const [start, end] = func.range || [0, 0];
  return context.rawContract.slice(start, end).split("{")[0].replaceAll("\n", "").trim();
};

export const documentFunction = (func: FunctionDefinition, context: DocumentationContext): string => {
  const natspec = documentNatspec(func, context);
  const templateData: FunctionTemplateData = {
    name: func.name || "",
    signature: documentFunctionSignature(func, context),
    natspec,
    params: natspec.params,
    returns: natspec.returns,
  };

  return context.config?.template.func(templateData);
};
