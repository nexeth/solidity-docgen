export interface Template {
  func: HandlebarsTemplateDelegate;
  event: HandlebarsTemplateDelegate;
  contract: HandlebarsTemplateDelegate;
}

export interface ParamTemplateData {
  name: string;
  type: string;
  description?: string;
}

export interface NatspecTemplateData {
  notice?: string;
  dev?: string;
  params?: Array<ParamTemplateData>;
  returns?: Array<ParamTemplateData>;
  author?: string;
  title?: string;
}

export interface FunctionTemplateData {
  name: string;
  signature?: string;
  natspec: NatspecTemplateData;
  params?: ParamTemplateData[];
  returns?: ParamTemplateData[];
}

export interface EventTemplateData {
  name: string;
  signature?: string;
  natspec: NatspecTemplateData;
  params?: ParamTemplateData[];
}

export interface ContractTemplateData {
  name: string;
  natspec: NatspecTemplateData;
  /**
   * Already documented functions as a string
   */
  functions?: string[];
  /**
   * Already documented events as a string
   */
  events?: string[];
}
