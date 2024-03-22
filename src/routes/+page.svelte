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
		movementIsPossibleInAnyDirection
	} from '$lib/ts/functions';

	let score: number;
	let board: Board;
	let gameOver: boolean;

	function resetGame() {
		score = 0;
		board = createEmptyBoard();
		gameOver = false;
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
				board[x][y] = 2;
				success = true;
			}
		}
	}

	function handleGameTurn({ direction }: Directions) {
		if (gameOver || !movementIsPossible(board, { direction: direction })) return;

		let brd1: Board = transposeBoard(board, { direction });
		let afterSlide = slider(brd1);
		brd1 = transposeBoardBack(afterSlide.brd, { direction });
		board = brd1;
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

<h1>2048</h1>
<hr />
<p>Score: {score}</p>

<div class="main-section">
	<img alt="unicorn" src={unicorn} width="300px" height="300px" />

	<div class="board">
		{#each board as row}
			{#each row as tile}
				<div class={'tile x' + tile}>
					{#if tile > 0}{tile}{/if}
				</div>
			{/each}
		{/each}
	</div>
	<img alt="wolf" src={wolf} width="300px" height="300px" />
</div>
<br />

<div>
	<button on:click={() => handleGameTurn({ direction: 'Left' })}>LEFT</button>
	<button on:click={() => handleGameTurn({ direction: 'Right' })}>RIGHT</button>
	<button on:click={() => handleGameTurn({ direction: 'Up' })}>UP</button>
	<button on:click={() => handleGameTurn({ direction: 'Down' })}>DOWN</button>
</div>
{#if gameOver}<p>GAME OVER MAN</p>
	<button on:click={resetGame}>RESET</button>{/if}

<svelte:window on:keyup|preventDefault={handleKeyPress} />
