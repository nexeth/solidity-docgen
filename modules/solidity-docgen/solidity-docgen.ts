import { ParsedContracts } from "../../types";
import { SolidityDocgenInterface } from "../../types/docgen";

export class SolidityDocgen implements SolidityDocgenInterface {
  generate(contracts: ParsedContracts): string {
    return "";
  }
}
