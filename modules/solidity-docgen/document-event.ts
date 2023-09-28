import { EventDefinition } from "@solidity-parser/parser/dist/src/ast-types";

import { DocumentationContext, EventTemplateData } from "../../types";

import { documentNatspec } from "./document-natspec";

const documentEventSignature = (event: EventDefinition, context: DocumentationContext): string => {
  const [start, end] = event.range || [0, 0];
  return context.rawContract.slice(start, end).split("{")[0].replaceAll("\n", "").trim();
};

export const documentEvent = (event: EventDefinition, context: DocumentationContext): string => {
  const natspec = documentNatspec(event, context);
  const templateData: EventTemplateData = {
    name: event.name,
    signature: documentEventSignature(event, context),
    natspec,
    params: natspec.params,
  };

  return context.config?.template.event(templateData);
};
