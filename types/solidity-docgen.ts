import { DocumentationConfig } from "./config";
import { ParsedContract } from "./parser";

export interface DocumentationContext {
  config: DocumentationConfig;
  parsedContract: ParsedContract;
  rawContract: string;
}
