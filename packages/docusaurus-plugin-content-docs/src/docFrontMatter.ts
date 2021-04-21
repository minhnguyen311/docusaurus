/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Joi} from '@docusaurus/utils-validation';

// TODO complete this frontmatter + add unit tests
type DocFrontMatter = {
  id?: string;
  title?: string;
  description?: string;
  slug?: string;
  sidebar_label?: string;
  sidebar_position?: number;
  custom_edit_url?: string;
  parse_number_prefixes?: boolean;
};

// NOTE: we don't add any default value on purpose here
// We don't want default values to magically appear in doc metadatas and props
// While the user did not provide those values explicitly
// We use default values in code instead
const DocFrontMatterSchema = Joi.object<DocFrontMatter>({
  id: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  slug: Joi.string(),
  sidebar_label: Joi.string(),
  sidebar_position: Joi.number(),
  custom_edit_url: Joi.string().allow(null),
  parse_number_prefixes: Joi.boolean(),
});

export function validateDocFrontMatter(
  frontMatter: Record<string, unknown>,
): DocFrontMatter {
  return Joi.attempt(frontMatter, DocFrontMatterSchema, {
    convert: true,
    allowUnknown: true,
  });
}
