import React from "react";

const ResponsiveImage = ({ imgSrc, sources, alt }) => {
  return (
    <picture>
      {sources.map((source, index) => (
        <source key={index} {...source} />
      ))}
      <img src={imgSrc} alt={alt} />
    </picture>
  );
};

export default ResponsiveImage;
