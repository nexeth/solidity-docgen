/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FunctionDefinition, VariableDeclaration } from "@solidity-parser/parser/dist/src/ast-types";

import { ParamTemplateData } from "../../types";

/**
 * @param paramMatch The matched parameter documentation
 * @param func The function in which the parameter is used
 * @returns The parsed parameter documentation
 */
export const documentParam = (paramMatch: RegExpMatchArray, func: FunctionDefinition): ParamTemplateData => {
  const paramName = paramMatch[1];
  const comment = paramMatch[2];
  const param = func.parameters.find((_param) => _param.name === paramName);

  if (param) {
    return { name: paramName, type: getTypeName(param), description: comment };
  }

  return { name: paramName, type: "", description: comment };
};

export const documentReturn = (returnMatch: RegExpMatchArray, func: FunctionDefinition): ParamTemplateData => {
  const returnName = returnMatch[1];
  const returnParam = func.returnParameters?.find((_param) => _param.name === returnName);

  console.log({ returnParam, returnMatch });
  if (returnParam) {
    return { name: returnName, type: getTypeName(returnParam), description: returnMatch[1] };
  }

  return { name: "", type: "", description: returnMatch[1] };
};

/**
 * @param variable The variable/parameter to get the type name of
 * @returns The type name of the variable/parameter including the storage location
 */
export const getTypeName = (variable: VariableDeclaration): string => {
  console.log(variable);
  const storageLocation = variable.storageLocation ? ` ${variable.storageLocation}` : "";

  if (variable.typeName?.type === "ArrayTypeName") {
    // @ts-ignore
    return `${variable.typeName.baseTypeName.name}[]${storageLocation}`;
  }
  // @ts-ignore
  return `${variable.typeName?.name}${storageLocation}`;
};
