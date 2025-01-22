import React from 'react';
import blocksComponents from './gatsby-blocks';
import { StatikProjectProvider } from '@statik-space/gatsby-theme-statik';
import './src/assets/stylesheets/style.scss';

export const wrapRootElement = ({ element }) => {
  return (
    <StatikProjectProvider blocksComponents={blocksComponents}>
      {element}
    </StatikProjectProvider>
  );
};


export const shouldUpdateScroll = (args) => {
  const resetScroll = args.routerProps.location?.state?.resetScroll
  return resetScroll
}
