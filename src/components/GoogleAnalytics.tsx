export function GoogleAnalytics() {
	return (
		<>
			<script
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-W055DP4N3J"
			/>
			<script
				dangerouslySetInnerHTML={{
					__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-W055DP4N3J');`,
				}}
			/>
		</>
	);
}
