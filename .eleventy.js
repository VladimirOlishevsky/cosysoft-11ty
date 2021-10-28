const { build } = require("esbuild");
const production = process.env.NODE_ENV === `production` // true when NODE_ENV is production
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");


module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  // eleventyConfig.addNunjucksAsyncShortcode("image", require('./src/js/demo'));

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addWatchTarget("./src/_includes/assets/js");
  eleventyConfig.on("beforeBuild", () => {
    build({
      entryPoints: ["./src/_includes/assets/js/main.js"],
      outfile: "dist/scripts/main.js",
      bundle: true,
      minify: production,
    }).catch(() => process.exit(1));
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid", "svg", "webp", "png", "jpg", "jpeg"],
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
