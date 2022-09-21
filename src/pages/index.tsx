import type { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import { getPosts, IPost } from "../utils/posts"
import { SEO } from "../components/SEO"
import Page from "../components/Page"

interface IProps {
	posts: IPost[]
}

const Home: NextPage<IProps> = ({ posts }) => {
	return (
		<div>
			<SEO title="Posts" canonical={`/`} />
			<p className='text-4xl font-bold text-neutral-500'>Posts</p>
			<Page posts={posts}/>
		</div>
	)
}

export default Home

export const getStaticProps: GetStaticProps = () => {
	const posts = getPosts()

	return {
		props: {
			posts,
		},
	}
}
