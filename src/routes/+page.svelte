<script lang="ts">
	import unicorn from '$lib/images/unicorn.png';
	import wolf from '$lib/images/wolf.png';
	import type { Board, Directions } from '$lib/ts/types';
	import { boardSize, zero_board, test_board, starting_board } from '$lib/ts/global_defaults';
	import {
		createEmptyBoard,
		slider,
		transposeBoard,
		transposeBoardBack,
		hasEmptyFields,
		compareTwoArrays,
		movementIsPossible
	} from '$lib/ts/functions';

	export let score: number;
	export let board: Board;
	export let gameOver: boolean;
	export let gameTurn: number;

	function resetGame() {
		score = 0;
		// board = createEmptyBoard();
		// board = test_board;
		board = zero_board;
		// board = starting_board;
		gameOver = false;
		gameTurn = 0;
		// addNewSquare();
		// addNewSquare();
	}

	resetGame();

	function handleKeyPress(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowLeft':
				handleSlide({ direction: 'Left' });
				break;
			case 'ArrowRight':
				handleSlide({ direction: 'Right' });
				break;
			case 'ArrowUp':
				handleSlide({ direction: 'Up' });
				break;
			case 'ArrowDown':
				handleSlide({ direction: 'Down' });
				break;
		}
	}

	export function addNewSquare() {
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

	export function handleSlide({ direction }: Directions) {
		// if (!hasEmptyFields) {
		// 	gameOverCheck();
		// }

		if (gameOver || !movementIsPossible(board, { direction: direction })) {
			return;
		}

		let brd1: Board = transposeBoard(board, { direction });
		let afterSlide = slider(brd1);
		brd1 = transposeBoardBack(afterSlide.brd, { direction });
		// if (compareTwoArrays(brd1, board)) {
		// 	return;
		// } else {
		board = brd1;
		score += afterSlide.score;
		addNewSquare();
		// }
	}

	export function checkMovement({ direction }: Directions) {
		console.log(movementIsPossible(board, { direction: direction }));
	}
	// export function gameOverCheck() {
	// 	let testBoard: Board = board;
	// 	testBoard = boardTest(testBoard, { direction: 'Left' });
	// 	testBoard = boardTest(testBoard, { direction: 'Right' });
	// 	testBoard = boardTest(testBoard, { direction: 'Up' });
	// 	testBoard = boardTest(testBoard, { direction: 'Down' });

	// 	if (testBoard === board) {
	// 		gameOver = true;
	// 		return true;
	// 	}

	// 	return false;
	// }
</script>

<svelte:head>
	<title>2048</title>
	<meta name="description" content="2048" />
</svelte:head>

<h1>2048</h1>
<hr />
<p>Score: {score}</p>
{#if gameOver}<p>GAME OVER MAN</p>{/if}

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
	<button on:click={() => handleSlide({ direction: 'Left' })}>LEFT</button>
	<button on:click={() => handleSlide({ direction: 'Right' })}>RIGHT</button>
	<button on:click={() => handleSlide({ direction: 'Up' })}>UP</button>
	<button on:click={() => handleSlide({ direction: 'Down' })}>DOWN</button>
</div>
<div>
	<button on:click={() => checkMovement({ direction: 'Left' })}>ChkMov LEFT</button>
	<button on:click={() => checkMovement({ direction: 'Right' })}>ChkMov RIGHT</button>
	<button on:click={() => checkMovement({ direction: 'Up' })}>ChkMov UP</button>
	<button on:click={() => checkMovement({ direction: 'Down' })}>ChkMov DOWN</button>
</div>

<svelte:window on:keyup|preventDefault={handleKeyPress} />
