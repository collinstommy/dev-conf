import dynamic from 'next/dynamic';
import { fetchJson } from '../lib/util';
import { conferencesEndPoint } from '../config';

const MapWithNoSSR = dynamic(() => import('../components/map'), {
	ssr: false
});

const Index = ({ conferences }) => {
	return (
		<MapWithNoSSR conferences={conferences} />
	);
}

Index.getInitialProps = async () => {
	const conferences = await fetchJson(conferencesEndPoint);
	return {
		conferences,
	}
}

export default Index;
