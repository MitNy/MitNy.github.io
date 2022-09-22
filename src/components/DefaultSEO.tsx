import { DefaultSeo, DefaultSeoProps } from "next-seo";

const DEFAULT_SEO: DefaultSeoProps = {
	title: "MitNy.log",
	description: "기록 저장소",
	canonical: "https://mitny.github.io",
	openGraph: {
		type: "website",
		locale: "ko_KR",
		url: "https://mitny.github.io",
		title: "MitNy.log",
		site_name: "MitNy.log",
		description: "기록 저장소"
	}
};

export function DefaultSEO() {
	return <DefaultSeo {...DEFAULT_SEO} />;
}
