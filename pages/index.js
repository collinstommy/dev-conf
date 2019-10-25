import DevToTrends from '../components/devto.jsx';
import fetch from 'isomorphic-unfetch';
import * as data from '../data.json';

function Index({ articles }) {
	console.log(articles);
	return (
		<DevToTrends articles={articles} />
	);
}

Index.getInitialProps = async () => {
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

  const articles = data.default;
	return { articles };
};

export default Index;
