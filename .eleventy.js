const { build } = require("esbuild");
const production = process.env.NODE_ENV === `production` // true when NODE_ENV is production
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { toLowerCase, limit } = require('./src/_includes/assets/js/filter')

module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter('makeLowerCase', toLowerCase);
  eleventyConfig.addFilter('limit', limit);
  eleventyConfig.addShortcode('youtube', require('./src/_includes/assets/js/youtube'));

  eleventyConfig.addWatchTarget("./src/_includes/assets/js");
  eleventyConfig.addWatchTarget('./src/filters');
  eleventyConfig.on("beforeBuild", () => {
    build({
      entryPoints: ["./src/_includes/assets/js/main.js"],
      outfile: "dist/scripts/main.js",
      bundle: true,
      minify: production,
    }).catch(() => process.exit(1));
  });

  return {
    templateFormats: ["md", "njk", "png", "jpg", "jpeg"],
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
