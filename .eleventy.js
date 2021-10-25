const { build } = require("esbuild");
const production = process.env.NODE_ENV === `production` // true when NODE_ENV is production

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.setDataDeepMerge(true);

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: false
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  // eleventyConfig.addWatchTarget("./src/js");

  eleventyConfig.addWatchTarget("./src/_includes/assets/js");
  eleventyConfig.on("beforeBuild", () => {
    build({
      entryPoints: ["./src/_includes/assets/js/main.js"],
      outfile: "dist/scripts/main.js",
      bundle: true,
      minify: production,
    }).catch(() => process.exit(1));
  });

  // eleventyConfig.addCollection("portfolio", function(collectionApi) {
  //   return collectionApi.getFilteredByGlob("src/portfolio/*.md");
  // });

  return {
    templateFormats: ["md", "njk", "html", "liquid",  "svg", "webp", "png", "jpg", "jpeg"],
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
