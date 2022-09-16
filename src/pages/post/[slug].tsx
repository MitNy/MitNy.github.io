import type { GetStaticPaths, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { getPostBySlug, getPostsSlugs, IPost } from "../../utils/posts"

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
		<article className='prose'>
			<div>
				<h1 className='underline'>{post?.title}</h1>
				<h2>{post?.date}</h2>
				<p>{post?.content}</p>
			</div>
		</article>
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
