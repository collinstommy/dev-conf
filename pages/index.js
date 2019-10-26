import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Map from '../components/map';
import { useEffect, useState } from 'react'

// const MapWithNoSSR = dynamic(() => import('../components/map'), {
// 	ssr: false
// });

const Index = () => {
	const [inBrowser, setBrowser] = useState();
	useEffect(() => {
		if (window) {
			setBrowser(true);
		}
	});
	return (
		<div>
			<Map id="mapid" />;
		</div>
	);
}

Index.getInitialProps = async () => {
	return {};
};

export default Index;
