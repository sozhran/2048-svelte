<script lang="ts">
	import unicorn from '$lib/images/unicorn.png';
	import wolf from '$lib/images/wolf.png';
	import type { Board, Directions } from '$lib/ts/types';
	import { boardSize, zero_board, test_board, starting_board } from '$lib/ts/global_defaults';
	import { createEmptyBoard, slider, transposeBoard, hasEmptyFields } from '$lib/ts/functions';

	export let score = 0;
	export let board = createEmptyBoard();
	addNewSquare();
	addNewSquare();
	// export let board = test_board;
	// export let board = starting_board;
	// export let gameOver: boolean = false;

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
				console.log('Yep!', x, y);
			}
		}
	}

	export function handleSlide({ direction }: Directions) {
		let brd1: Board = transposeBoard(board, { direction });
		let afterSlide = slider(brd1);
		brd1 = transposeBoard(afterSlide.board, { direction });

		if (board !== brd1) {
			board = brd1;
			score += afterSlide.score;
			addNewSquare();
			addNewSquare();
		} else {
			return;
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
<!-- <div><button on:click={() => matrixTest(board)}>TEST</button></div> -->
<div>
	<button on:click={() => handleSlide({ direction: 'Left' })}>LEFT</button>
	<button on:click={() => handleSlide({ direction: 'Right' })}>RIGHT</button>
	<button on:click={() => handleSlide({ direction: 'Up' })}>UP</button>
	<button on:click={() => handleSlide({ direction: 'Down' })}>DOWN</button>
</div>

<svelte:window on:keyup|preventDefault={handleKeyPress} />
