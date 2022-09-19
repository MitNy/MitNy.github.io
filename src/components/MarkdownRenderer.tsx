import rehypeExternalLinks from "rehype-external-links";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify/lib";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

interface MarkdownRendererProps {
	mdString: string;
}

export default function MarkdownRenderer({ mdString }: MarkdownRendererProps) {
	const html = remark()
		.use(remarkParse)
		.use(remarkRehype, { allowDangerousHtml: true})
		.use(rehypeStringify, { allowDangerousHtml: true})
		.use(rehypeSlug)
		.use(rehypeExternalLinks, {
			target: "_blank",
			rel: ["noopener", "noreferrer"],
		})
		.use(rehypePrism)
		.processSync(mdString)
		.toString();

		return (
			<div dangerouslySetInnerHTML={ {__html: html} }></div>
		)
}
