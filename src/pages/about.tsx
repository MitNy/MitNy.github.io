import type { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { SEO } from "../components/SEO"
import Page from "../components/Page"

const About: NextPage = () => {
	return (
		<div>
			<p>이미진 (LEE MI JIN)</p>
			<br/>
			<p>Email: leemj314@gmail.com</p>
			<p>GitHub: <Link href="https://github.com/MitNy">https://github.com/MitNy</Link></p>
		</div>
	)
}

export default About
