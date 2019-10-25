const fetch = require('isomorphic-unfetch');
const fs = require('fs');

const writeToFile = async () => {
	const apiUrl = 'https://dev.to/api/articles?top=30';

	const getArticles = async function(page = 1) {
		const url = `${apiUrl}?page=${page}&top=30`;
		return await (await fetch(url)).json();
	};

	const getAllArticles = async function(page = 1) {
		const results = await getArticles(page);
		console.log({
			length: results.length,
			page
		});
		if (page > 5) return results;

		if (results && results.length) {
			return results.concat(await getAllArticles(page + 1));
		} else {
			return results;
		}
	};

	const articles = await getAllArticles();
	fs.writeFile('./test.json', JSON.stringify(articles), function(err) {
		if (err) {
			return console.log(err);
		}
	});
};

(async () => {
	writeToFile();
})();
