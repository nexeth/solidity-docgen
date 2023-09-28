import fs from "fs";

import Handlebars from "handlebars";

import { Template } from "../../../types";

// TODO Precompile templates so that we are no longer fs dependant
const FUNCTION_TEMPLATE_PATH = process.cwd() + "/modules/templates/markdown/function.hbs";
const functionTemplate = fs.readFileSync(FUNCTION_TEMPLATE_PATH, "utf8");

const EVENT_TEMPLATE_PATH = process.cwd() + "/modules/templates/markdown/event.hbs";
const eventTemplate = fs.readFileSync(EVENT_TEMPLATE_PATH, "utf8");

const CONTRACT_TEMPLATE_PATH = process.cwd() + "/modules/templates/markdown/contract.hbs";
const contractTemplate = fs.readFileSync(CONTRACT_TEMPLATE_PATH, "utf8");

export const markdownTemplate: Template = {
  func: Handlebars.compile(functionTemplate),
  event: Handlebars.compile(eventTemplate),
  contract: Handlebars.compile(contractTemplate),
};
