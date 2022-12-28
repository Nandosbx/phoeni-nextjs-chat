import 'materialize-css/dist/css/materialize.min.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment, useEffect } from 'react'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const M = require('materialize-css')
		M.AutoInit()
	}, [])

	return (
		<Fragment>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Fragment>
	)
}
