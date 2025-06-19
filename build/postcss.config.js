'use strict'

module.exports = (ctx = {}) => {
  const isExamples = ctx.file && ctx.file.dirname && ctx.file.dirname.includes('examples');

  return {
    map: isExamples ? false : {
      inline: false,
      annotation: true,
      sourcesContent: true
    },
    plugins: {
      autoprefixer: {
        cascade: false
      }
    }
  };
};
