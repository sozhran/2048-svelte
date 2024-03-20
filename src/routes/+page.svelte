<script lang="ts">
	import unicorn from '$lib/images/unicorn.png';
	import wolf from '$lib/images/wolf.png';
	import type { Board, Directions } from '$lib/ts/types';
	import { boardSize, zero_board, test_board, starting_board } from '$lib/ts/global_defaults';
	import { slider, transposeBoard, transposeMatrix } from '$lib/ts/functions';

	export let score = 0;
	// let board = createEmptyBoard();
	let board = test_board;
	// export let board = starting_board;

	// function handleKeyPress(e: KeyboardEvent) {
	//     if (e.key === "ArrowLeft") {
	//         handleSlide();
	//     }
	// }
	function matrixTest(board: Board) {
		return (board = transposeMatrix(board));
		console.log('It works', board);
	}

	export function handleSlide({ direction }: Directions) {
		transposeBoard(board, { direction });
		console.log('board after transpose 1: ', board);
		let x = slider(board);
		console.log('X after slider: ', x);
		board = transposeBoard(x.board, { direction });
		console.log('board after transpose 2: ', board);
		score += x.score;
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
				<div class={'tile x' + tile}>{tile}</div>
			{/each}
		{/each}
	</div>
	<img alt="wolf" src={wolf} width="300px" height="300px" />
</div>
<br />
<div><button on:click={() => matrixTest(board)}>TEST</button></div>
<div>
	<button on:click={() => handleSlide({ direction: 'Left' })}>LEFT</button>
	<button on:click={() => handleSlide({ direction: 'Right' })}>RIGHT</button>
	<button on:click={() => handleSlide({ direction: 'Up' })}>UP</button>
	<button on:click={() => handleSlide({ direction: 'Down' })}>DOWN</button>
</div>

<!-- <svelte:window on:keyup|preventDefault={handleKeyPress} /> -->
