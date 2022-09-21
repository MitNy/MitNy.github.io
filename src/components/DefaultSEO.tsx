import { DefaultSeo, DefaultSeoProps } from "next-seo";

const DEFAULT_SEO: DefaultSeoProps = {
	title: "MitNy.log",
	canonical: "https://mitny.github.io",
	openGraph: {
		type: "website",
		locale: "ko_KR",
		url: "https://mitny.github.io",
		title: "MitNy.log",
		site_name: "MitNy.log",
	}
};

export function DefaultSEO() {
	return <DefaultSeo {...DEFAULT_SEO} />;
}
