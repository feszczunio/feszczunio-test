import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

export const Loader = () => {
  return (
    <PuffLoader
      size={150}
      cssOverride={{
        margin: '50px auto',
      }}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )
}

