import Header from "./Header"
import Footer from "./Footer";

type Props = {
	children: React.ReactNode
}

export default function Layout(props: Props) {
	return (
		<>
			<Header />
			<div className='mx-16 my-8'>{props.children}</div>
			<Footer />
		</>
	)
}
