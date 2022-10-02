import Header from "./Header"
import Footer from "./Footer";

type Props = {
	children: React.ReactNode
}

export default function Layout(props: Props) {
	return (
		<>
			<Header />
			<div className='mx-10 my-8'>
				<div className="w-full min-h-screen pb-24 mt-8">
				{props.children}
				</div>
			</div>
			<Footer />
		</>
	)
}
