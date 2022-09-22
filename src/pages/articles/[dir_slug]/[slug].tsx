import type { GetStaticPaths, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { getOldPostBySlug, getOldPostsSlugs, IPost } from "../../../utils/posts"
import MarkdownRenderer from "../../../components/MarkdownRenderer"
import { getCanonicalAbsolutePath, SEO } from "../../../components/SEO";

interface IProps {
	post: IPost
}

interface IPathProps {
	params: {
		slug: string
	}
}

const Post: NextPage<IProps> = ({ post }) => {
	return (
		<>
			<SEO title={post?.title} canonical={getCanonicalAbsolutePath(`/articles/${post?.slug}`)} />
			<div className="w-full min-h-screen pb-24 mt-8">
				<article className="prose max-w-none">
					<div className="border-b">
						<p className="text-4xl font-bold mb-0">{post?.title}</p>
						<p className="text-xs text-neutral-500">{post?.date}</p>
					</div>
					<MarkdownRenderer mdString={post?.content}/>
				</article>
			</div>
		</>
	)
}

export default Post

export const getStaticPaths: GetStaticPaths = () => {
	// get array of slugs
	const slugs = getOldPostsSlugs()
	const oldSlugs:any[] = [];
	// oldSlugs[1] : 'yyyy-mm', oldSlugs[3]: 'title'
	slugs.map((el) => oldSlugs.push(/^(\d{4}-\d{1,2})-(\d{1,2})-(.*)/.exec(el)));

	const formattedSlugs = oldSlugs.map((slug) => (
		{ params: {
			dir_slug: slug[1],
			slug: slug[3]
		}
	}));

	return { paths: formattedSlugs, fallback: false }
}

export const getStaticProps = ({ params }: IPathProps) => {
	const slug = params.slug

	// find post by slug
	const post = getOldPostBySlug(slug)

	// return post
	return {
		props: {
			post,
		},
	}
}
