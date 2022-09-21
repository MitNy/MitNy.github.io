import React, { useState, useEffect, useRef, createRef, MouseEvent } from "react";
import Link from "next/link";
import { IPost } from "../utils/posts";

interface PageProps {
	posts: IPost[],
}

export default function Page({ posts } : PageProps) {
	const limit = 5;
	const pageCountLimit = 10;
	const postCount = posts.length;

	const [page, setPage] = useState<number>(typeof window !== 'undefined' ? Number(localStorage.getItem('beforePage')) || 1 : 1);

	useEffect(() => {
		localStorage.removeItem('beforePage');
	});

	const pageCount = ( postCount <= limit ) ? 1 : Math.ceil(postCount / limit);

	const isFirst = (page == 1) ? " pointer-events-none" : "";
	const isLast = (page == pageCount) ? " pointer-events-none" : "";
	const liStyle = "mr-4 px-3 py-2 float-left cursor-pointer border-solid border-2 rounded-md";

	const [showPost, setShowPost] = useState(posts.slice((page * limit) - limit, (page * limit)));

	const handlePost = (page:number, start:number, end:number) => {
		setShowPost(posts.slice(start, end));
	}

	const handlePage = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const pageId = Number(target.id);
		const start = (pageId * limit) - limit;
		const end = (pageId * limit);
	
		setPage(pageId);
		handlePost(pageId, start, end);
	}

	const handlePrevNext = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const move = target.id;
		let start = (page * limit) - limit;
		let end = (page * limit);
		let pageId = page;

		if (move == "prev") {
			if (page == 1) return;

			pageId = page - 1;
			start = (pageId * limit) - limit;
			end = (pageId * limit);
			setPage(pageId);
		} else {
			if (page == pageCount) return;

			pageId = page + 1;
			start = (pageId * limit) - limit;
			end = (pageId * limit);
			setPage(pageId);
		}
		handlePost(pageId, start,end);
	}

	const savePage = () => {
		localStorage.setItem('beforePage', String(page));
	}

	const pageItem = () => {
		let li = [];

		for (let i = 1; i <= pageCount; i++) {
			li.push(<li key={i} id={String(i)} className={page == i ? liStyle + " border-rose-400" : liStyle}  onClick={(e) => handlePage(e)}>{i}</li>);
		}
		return li;
	}

	return (
		<>
			<div className="w-full min-h-screen pb-24 mt-8">
				{showPost.map((post, index) => (
					<article
						key={index}
						className='my-6 p-6 border-solid border-2 rounded-md'
						onClick={savePage}
					>
						<Link href={`/post/${post.slug}`}>
							<a>
								<span className="display: inline-block">
									<p className="text-xl font-bold mb-4 hover:text-rose-400 float-left">{post.title}</p>
								</span>
								<p className="text-neutral-500 mb-4">{post.description}</p>
								<p className="text-xs">{post.date}</p>
							</a>
						</Link>
					</article>
				))}
			</div>
			<nav className="position-relative translate-y-full mb-20">
				<ul className="list-none flex justify-center items-center">
					<li id="prev" className={liStyle + " hover:border-rose-400 md:hover:none" + isFirst} onClick={handlePrevNext}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
							<path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
						</svg>
					</li>
					{pageItem()}
					<li id="next" className={liStyle + " hover:border-rose-400 md:hover:none" + isLast} onClick={handlePrevNext}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
							<path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
						</svg>
					</li>
				</ul>
			</nav>
		</>
	)	
}
