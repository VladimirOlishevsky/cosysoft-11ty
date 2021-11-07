const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { toLowerCase, limit } = require('./src/_includes/assets/js/filter')

module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter('makeLowerCase', toLowerCase);
  eleventyConfig.addFilter('limit', limit);
  eleventyConfig.addShortcode('youtube', require('./src/_includes/assets/js/youtube'));

  return {
    templateFormats: ["md", "njk", "html", "png", "jpg", "jpeg"],
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
