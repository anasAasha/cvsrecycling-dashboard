import React, { lazy, Suspense } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <BiLoaderAlt
      style={{
        animation: 'rotate 1s linear infinite',
        fontSize: '3rem',
      }}
    />
    <style>
      {`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
  </div>
);

const withLazy = (importFunction) => {
  const LazyComponent = lazy(importFunction);

  return (props) => (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent {...props} />
      
    </Suspense>
  );
};

export default withLazy;
