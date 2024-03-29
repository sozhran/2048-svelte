<script lang="ts">
	import unicorn from '$lib/images/unicorn.png';
	import wolf from '$lib/images/wolf.png';
	import type { Board, Directions } from '$lib/ts/types';
	import { boardSize } from '$lib/ts/global_defaults';
	import {
		createEmptyBoard,
		slider,
		transposeBoard,
		transposeBoardBack,
		hasEmptyFields,
		movementIsPossible,
		movementIsPossibleInAnyDirection,
		tileChecker
	} from '$lib/ts/functions';

	let score: number;
	let board: Board;
	let gameOver: boolean;
	let newTiles: [number, number][];
	// let mergedTiles: [number, number][];

	function resetGame() {
		score = 0;
		board = createEmptyBoard();
		gameOver = false;
		newTiles = [];
		// mergedTiles = [];
		addNewSquare();
		addNewSquare();
	}

	resetGame();

	function handleKeyPress(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowLeft':
				handleGameTurn({ direction: 'Left' });
				break;
			case 'ArrowRight':
				handleGameTurn({ direction: 'Right' });
				break;
			case 'ArrowUp':
				handleGameTurn({ direction: 'Up' });
				break;
			case 'ArrowDown':
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
		if (gameOver || !movementIsPossible(board, { direction: direction })) return;

		newTiles = [];
		// mergedTiles = [];

		let brd1: Board = transposeBoard(board, { direction });
		let afterSlide = slider(brd1);
		brd1 = transposeBoardBack(afterSlide.brd, { direction });
		board = [...brd1];
		score += afterSlide.score;
		addNewSquare();
		if (!hasEmptyFields(board)) {
			gameOverCheck();
			return;
		}
	}

	function gameOverCheck() {
		if (movementIsPossibleInAnyDirection(board)) {
			gameOver = false;
		} else {
			gameOver = true;
		}
	}
</script>

<svelte:head>
	<title>2048</title>
	<meta name="description" content="2048" />
</svelte:head>

<section class="top-section">
	{#if gameOver === true}
		<h1 class="red">GAME OVER</h1>
	{:else}
		<h1>2048</h1>
	{/if}
	<hr />
	<p>Score: {score}</p>
</section>

<div class="main-section">
	<img alt="unicorn" src={unicorn} width="300px" height="300px" />

	<div class="board">
		{#each board as row, rowIndex}
			{#each row as tile, tileIndex}
				<div
					class={tileChecker(newTiles, rowIndex, tileIndex)
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
{#if gameOver}
	<div class="game-over">
		<button on:click={resetGame}>Play again</button>
	</div>
{/if}

<svelte:window on:keyup|preventDefault={handleKeyPress} />
