import type { GetStaticPaths, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { getPostBySlug, getPostsSlugs, IPost } from "../../utils/posts"
import MarkdownRenderer from "../../components/MarkdownRenderer"

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
		<div className="w-full min-h-screen pb-24 mt-8">
			<article className="prose max-w-none">
				<div className="border-b">
					<p className="text-4xl font-bold mb-0">{post?.title}</p>
					<p className="text-xs text-neutral-500">{post?.date}</p>
				</div>
				<MarkdownRenderer mdString={post?.content}/>
			</article>
		</div>
	)
}

export default Post

export const getStaticPaths: GetStaticPaths = () => {
	// get array of slugs
	const slugs = getPostsSlugs()
	const formattedSlugs = slugs.map((slug) => ({ params: { slug } }))

	return { paths: formattedSlugs, fallback: false }
}

export const getStaticProps = ({ params }: IPathProps) => {
	const slug = params.slug

	// find post by slug
	const post = getPostBySlug(slug)

	// return post
	return {
		props: {
			post,
		},
	}
}
