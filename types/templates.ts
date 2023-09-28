export interface Template {
  func: HandlebarsTemplateDelegate;
  event: HandlebarsTemplateDelegate;
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
