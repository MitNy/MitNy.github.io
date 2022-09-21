import { NextSeo, NextSeoProps } from "next-seo";

interface SEOProps extends NextSeoProps {}

export function SEO(props: SEOProps) {
	const title = `${
		props.title != null ? `${props.title} | ` : ""
	} MitNy.log`;

	return <NextSeo {...props} title={title} />;
}

export function getCanonicalAbsolutePath(relativePath: string) {
	const isStartWithSlash = relativePath.startsWith("/");

	return `https://mitny.github.io${
		isStartWithSlash ? relativePath : `/${relativePath}`
	}`;
}
