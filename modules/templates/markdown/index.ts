import fs from "fs";

import Handlebars from "handlebars";

import { Template } from "../../../types";

const FUNCTION_TEMPLATE_PATH = process.cwd() + "/modules/templates/markdown/function.hbs";
const functionTemplate = fs.readFileSync(FUNCTION_TEMPLATE_PATH, "utf8");

export const markdownTemplate: Template = {
  func: Handlebars.compile(functionTemplate),
};
