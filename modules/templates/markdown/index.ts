import Handlebars from "handlebars";

import { Template } from "../../../types";

// const functionTemplate = `
// ### {{name}}
// \`\`\`solidity
// {{signature}}
// \`\`\`
// TODO comments
// **Parameters**

// **Returns**
// `;

const functionTemplate = `
### {{name}}
{{#if natspec.notice}}
{{{natspec.notice}}}
{{/if}}
{{#if natspec.dev}}
_{{{natspec.dev}}}_
{{/if}}

{{#if signature}}
\`\`\`solidity
{{{signature}}}
\`\`\`
{{/if}}

{{#if natspec.params}}
**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
{{#each params}}
| {{name}} | {{type}} | {{{description}}} |
{{/each}}
{{/if}}

{{#if natspec.returns}}
**Return**

| Name | Type | Description |
| ---- | ---- | ----------- |
{{#each returns}}
| {{#if name}}{{name}}{{else}}[{{@index}}]{{/if}} | {{type}} | {{{description}}} |
{{/each}}
{{/if}}`;

export const markdownTemplate: Template = {
  func: Handlebars.compile(functionTemplate),
};
