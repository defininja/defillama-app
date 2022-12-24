import * as React from 'react'
import Layout from '~/layout'
import ChainsContainer from '~/containers/Defi/Chains'
import { expiresForNext, maxAgeForNext } from '~/api'
import { getNewChainsPageData } from '~/api/categories/protocols'

export async function getStaticProps() {
	const { props: data } = await getNewChainsPageData('All')
	const sampledData = []
	const dataLength = data.stackedDataset.length
	for (let i = 0; i < dataLength; i++) {
		if (i % 2 === 0 || i === dataLength - 1) {
			sampledData.push(data.stackedDataset[i])
		}
	}
	data.stackedDataset = sampledData
	return {
		props: data,
		revalidate: maxAgeForNext([22]),
		expires: expiresForNext([22])
	}
}

export default function Chains(props) {
	return (
		<Layout title={`All Chains TVL - DefiLlama`} defaultSEO>
			<ChainsContainer {...props} />
		</Layout>
	)
}
