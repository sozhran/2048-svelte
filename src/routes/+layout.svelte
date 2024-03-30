<script>
	import './reset.css';
	import './styles.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<footer>
		<a href="https://github.com/sozhran/2048" target="_blank">
			<img alt="github share icon" src="https://i.imgur.com/5Qr1cEC.png" width="30" height="30" />
		</a>
	</footer>
</div>

<style>
	app {
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 480px) {
		footer {
			display: flex;
			align-self: flex-end;
			flex-direction: row;
			justify-content: center;
			align-items: bottom;
			margin: 10px;
			opacity: 60%;
		}
	}
</style>
