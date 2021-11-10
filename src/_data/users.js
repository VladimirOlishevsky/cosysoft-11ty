const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {

	const url = "https://jsonplaceholder.typicode.com/users";

	return await Cache(url, {
		duration: "1h",
		type: "json"    
	});
};
