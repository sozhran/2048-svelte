<script lang="ts">
	import unicorn from '$lib/images/unicorn.png';
	import wolf from '$lib/images/wolf.png';
	import type { Board, Directions } from '$lib/ts/types';
	import { boardSize } from '$lib/ts/global_defaults';
	import {
		createEmptyBoard,
		performSlide,
		transposeBoard,
		transposeBoardBack,
		hasEmptyFields,
		checkAvailableMoves,
		checkAvailableMovesInAnyDirection,
		determineTileColor
	} from '$lib/ts/functions';

	let score: number;
	let board: Board;
	let gameOver: boolean;
	let newTiles: [number, number][];

	function resetGame() {
		score = 0;
		board = createEmptyBoard();
		gameOver = false;
		newTiles = [];
		addNewSquare();
		addNewSquare();
	}

	resetGame();

	function handleKeyPress(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowLeft':
			case 'a':
			case 'A':
				handleGameTurn({ direction: 'Left' });
				break;
			case 'ArrowRight':
			case 'd':
			case 'D':
				handleGameTurn({ direction: 'Right' });
				break;
			case 'ArrowUp':
			case 'w':
			case 'W':
				handleGameTurn({ direction: 'Up' });
				break;
			case 'ArrowDown':
			case 's':
			case 'S':
				handleGameTurn({ direction: 'Down' });
				break;
		}
	}

	function addNewSquare() {
		if (!hasEmptyFields(board)) {
			return;
		}

		let success = false;

		while (!success) {
			let x = Math.floor(Math.random() * boardSize);
			let y = Math.floor(Math.random() * boardSize);
			if (board[x][y] === 0) {
				let chance = Math.random();
				if (chance < 0.1) {
					board[x][y] = 4;
				} else {
					board[x][y] = 2;
				}
				newTiles.push([x, y]);
				success = true;
			}
		}
	}

	function handleGameTurn({ direction }: Directions) {
		if (gameOver || !checkAvailableMoves(board, { direction: direction })) return;

		newTiles = [];

		let transposedBoard: Board = transposeBoard(board, { direction });
		let afterSlide = performSlide(transposedBoard);
		transposedBoard = transposeBoardBack(afterSlide.board, { direction });
		board = [...transposedBoard];
		score += afterSlide.score;
		addNewSquare();

		if (!hasEmptyFields(board)) {
			gameOver = !checkAvailableMovesInAnyDirection(board);
		}
	}

	// for testing visuals:

	//function toggleGameOver() {
	//	return (gameOver = !gameOver);
	//}
</script>

<svelte:head>
	<title>2048</title>
	<meta name="description" content="2048" />
</svelte:head>

<body>
	<section class="top-section">
		<h1>2048</h1>
		{#if gameOver === true}
			<h1 class="red">GAME OVER</h1>
		{:else}
			<h1 class="red" style="visibility:hidden">GAME OVER</h1>
		{/if}
		<!-- <hr /> -->
		<p>Score: {score}</p>
	</section>

	<section class="main-section">
		<div class="board-section">
			<img alt="unicorn" src={unicorn} width="300px" height="300px" />
			<div class="board">
				{#each board as row, rowIndex}
					{#each row as tile, tileIndex}
						<div
							class={tile > 4096
								? determineTileColor(newTiles, rowIndex, tileIndex)
									? 'tile x4096' + ' newtile'
									: 'tile x4096'
								: determineTileColor(newTiles, rowIndex, tileIndex)
									? 'tile x' + tile + ' newtile'
									: 'tile x' + tile}
						>
							{#if tile > 0}{tile}{/if}
						</div>
					{/each}
				{/each}
			</div>
			<img alt="wolf" src={wolf} width="300px" height="300px" />
		</div>
		<div class="game-over">
			{#if gameOver}
				<button on:click={resetGame}>Play again</button>
			{:else}
				<button on:click={resetGame} disabled>Play again</button>
			{/if}
		</div>
	</section>

	<section class="footer">
		<!-- for testing visuals -->
		<!--<button on:click={toggleGameOver}>G.O.</button>-->
		<a href="https://github.com/sozhran/2048-svelte" target="_blank">
			<img
				alt="github share icon"
				src="https://i.imgur.com/5Qr1cEC.png"
				width="25"
				height="25"
				class="share"
			/>
		</a>
	</section>
</body>

<svelte:window on:keyup|preventDefault={handleKeyPress} />
