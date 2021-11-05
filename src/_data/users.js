const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {

	let url = "https://jsonplaceholder.typicode.com/users";

	/* This returns a promise */
	return await Cache(url, {
		duration: "1h", // save for 1 day
		type: "json"    // we’ll parse JSON for you
	});
};
