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

  console.log(image);

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(image, imageAttributes);
}

module.exports = imageShortcode