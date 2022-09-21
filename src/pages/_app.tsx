import type { AppProps } from "next/app"
import Head from "next/head"
import "../styled/global.css"
import { DefaultSEO } from "../components/DefaultSEO"
import Layout from "../components/Layout"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<DefaultSEO />
			<Head>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}
export default MyApp
