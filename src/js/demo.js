const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let image = await Image(src, {
    widths: [600],
    formats: ["jpeg"],
    outputDir: "./src/img/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };
  return Image.generateHTML(image, imageAttributes);
}

module.exports = imageShortcode