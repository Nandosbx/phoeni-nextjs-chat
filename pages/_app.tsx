import 'materialize-css/dist/css/materialize.min.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment, useEffect } from 'react'
import Layout from '../components/Layout'
import 'react-toastify/dist/ReactToastify.css'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const M = require('materialize-css')
		M.AutoInit()
	}, [])

	return (
		<Fragment>
			<RecoilRoot>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</RecoilRoot>
		</Fragment>
	)
}
