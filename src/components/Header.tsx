import Link from "next/link"

export default function Header() {
	return <div className='h-16 bg-white drop-shadow-md text-black'>
		<div className="mx-10 pt-3 cursor-pointer">
			<Link href="/">
				<p className="header-home text-3xl float-left">MitNy.log</p>
			</Link>
			<Link href="/about">
				<p className="text-base font-bold pt-2 float-right">About</p>
			</Link>
		</div>
	</div>
}
