import { Template } from "./templates";

export interface DocumentationConfig {
  /**
   * The path to the output directory
   */
  outputDir?: string;

  /**
   * The path to the input directory
   */
  inputDir?: string;

  /**
   * The path to the template directory
   */
  templateDir?: string;

  /**
   * The template definition to use
   */
  template: Template;
}
