<script>
	import './reset.css';
	import './styles.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<footer>
		<p>
			<a href="https://github.com/sozhran/2048" target="_blank"
				><img
					alt="github share icon"
					src="https://i.imgur.com/FyuvoYD.png"
					width="30"
					height="30"
				/></a
			>
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
	}

	@media (min-width: 480px) {
		footer {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin: 10px;
			opacity: 60%;
		}
	}
</style>
