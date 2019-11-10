import dynamic from 'next/dynamic';
import { fetchJson } from '../lib/util';
import { conferencesEndPoint } from '../config';

const MapWithNoSSR = dynamic(() => import('../components/map'), {
	ssr: false
});


const Index = ({ conferences }) => {
	return (
		<main>
			<h1>Dev Conferences Map</h1>
			<MapWithNoSSR conferences={conferences} />
		</main>
	);
}

Index.getInitialProps = async () => {
	const conferences = await fetchJson(conferencesEndPoint);
	return {
		conferences,
	}
}

export default Index;
