import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";
import { Favicon } from "../components/Favicon";
import { GoogleAnalytics } from "../components/GoogleAnalytics";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<GoogleAnalytics />
				<Head>
					<meta name="naver-site-verification" content="b408dee953bcbbb1038384f191f36dac0551c0fb" />
					<meta name="google-site-verification" content="vUtYhRYNCWYYTdurCRaVmtnWpPLuXKKwRAm5F6R9sNs" />
				</Head>
				<Favicon />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument;
