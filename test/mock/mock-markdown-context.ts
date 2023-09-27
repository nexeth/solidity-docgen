import { SolidityParser, markdownTemplate } from "../../modules";
import { DocumentationContext } from "../../types";

export const mockMarkdownContext = (contract: string): DocumentationContext => {
  const parsedContract = SolidityParser.parse(contract);

  return {
    config: { template: markdownTemplate },
    rawContract: contract,
    parsedContract,
  };
};
