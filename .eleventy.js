const { build } = require("esbuild");
const CleanCSS = require('clean-css');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const production = process.env.NODE_ENV === `production` // true when NODE_ENV is production

module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addWatchTarget("./src/_includes/assets/js");
  // eleventyConfig.on("beforeBuild", () => {
  //   build({
  //     entryPoints: ["./src/_includes/assets/js/main.js"],
  //     outfile: "dist/scripts/main.js",
  //     bundle: true,
  //     minify: production,
  //   }).catch(() => process.exit(1));
  // });

  // eleventyConfig.setDataDeepMerge(true);
 
  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
};