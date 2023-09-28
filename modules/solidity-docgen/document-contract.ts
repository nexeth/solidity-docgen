import { SolidityParser, documentEvent, documentFunction, documentNatspec } from "..";
import { ContractTemplateData, DocumentationContext, NatspecTemplateData } from "../../types";

export const documentContract = (context: DocumentationContext): string => {
  const functions: string[] = [];
  const events: string[] = [];
  let contractName = "";
  let natspec: NatspecTemplateData = {};

  // TODO improve this to handle multiple contracts
  SolidityParser.visit(context.parsedContract, {
    FunctionDefinition: (node) => functions.push(documentFunction(node, context)),
    EventDefinition: (node) => events.push(documentEvent(node, context)),
    ContractDefinition: (node) => {
      if (contractName !== "") return;
      contractName = node.name;
      natspec = documentNatspec(node, context);
    },
  });

  const templateData: ContractTemplateData = {
    name: contractName,
    natspec,
    functions,
    events,
  };

  console.log({ templateData });

  const templatedContract = context.config?.template.contract(templateData);
  return contractCleanup(templatedContract);
};

/**
 * Replace any mismatched instances
 * * \&#x60; with `
 */
const contractCleanup = (contract: string): string => contract.replaceAll("\\&#x60;", "`");
