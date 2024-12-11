import React from 'react';
import blocksComponents from './gatsby-blocks';
import { StatikProjectProvider } from '@statik-space/gatsby-theme-statik';
import { Seo } from './src/components/commons/seo/Seo';

/**
 * Wraps the root element with a Block provider defined
 * in a `gatsby-blocks.js`. The Wrapper should not be removed
 * or updated.
 */
export const wrapRootElement = ({ element }) => {
  return (
    <StatikProjectProvider blocksComponents={blocksComponents}>
      {element}
    </StatikProjectProvider>
  );
};

export const onRenderBody = (args) => {
  if (Seo.htmlLang) {
    args.setHtmlAttributes({ lang: Seo.htmlLang });
  }
};
