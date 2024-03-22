<script>
	// import './reset.css';
	import './styles.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<footer>
		<p>made by <a href="https://github.com/sozhran">Artem</a>.</p>
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
			padding: 12px 0;
		}
	}
</style>
