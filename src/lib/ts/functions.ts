import type { Board, Directions } from './types';
import { boardSize } from './global_defaults';

export function createEmptyBoard() {
	const emptyBrd = [];
	for (let i = 0; i < boardSize; i++) {
		const x = [];
		for (let j = 0; j < boardSize; j++) {
			x.push(0);
		}
		emptyBrd.push(x);
	}
	return emptyBrd;
}

export function slider(brd: Board) {
	const newBrd: Board = [];
	let score: number = 0;

	for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
		let row: number[] = brd[rowIndex];

		row = row.filter((elm) => elm !== 0);

		for (let i = 0; i < row.length - 1; i++) {
			if (row[i] === row[i + 1]) {
				row[i] *= 2;
				row[i + 1] = 0;
				score += row[i];
			}
		}

		row = row.filter((elm) => elm !== 0);

		while (row.length < boardSize) {
			row.push(0);
		}

		newBrd.push(row);
	}

	return { brd: newBrd, score: score };
}

export function transposeMatrix(matrix: Board) {
	const newMatrix: Board = [];
	for (let i = 0; i < boardSize; i++) {
		const x = [];
		for (let j = 0; j < boardSize; j++) {
			x.push(matrix[j][i]);
		}
		newMatrix.push(x);
	}
	return newMatrix;
}

// export function transposeIfUp(brd: Board) {
// 	const newMatrix: Board = [];
// 	for (let i = 0; i < boardSize; i++) {
// 		const x = [];
// 		for (let j = 0; j < boardSize; j++) {
// 			x.push(brd[j][i]);
// 		}
// 		newMatrix.push(x);
// 	}
// 	return newMatrix;
// }

// export function transposeIfDown(brd: Board) {
// 	const newMatrix: Board = [];
// 	for (let i = 0; i < boardSize; i++) {
// 		const x = [];
// 		for (let j = 0; j < boardSize; j++) {
// 			x.push(brd[boardSize - 1 - j][i]);
// 		}
// 		newMatrix.push(x);
// 	}
// 	return newMatrix;
// }

function reverseNestedArrays(array: number[][]) {
	array.forEach((elm) => elm.reverse());
	return array;
}

export function transposeBoard(brd: Board, { direction }: Directions) {
	let newBrd: Board = [];

	switch (direction) {
		case 'Left':
			return (newBrd = brd);
		case 'Right':
			newBrd = reverseNestedArrays(brd);
			return newBrd;
		case 'Up':
			newBrd = transposeMatrix(brd);
			return newBrd;
		case 'Down':
			newBrd = transposeMatrix(brd.reverse());
			return newBrd;
	}
}

export function transposeBoardBack(brd: Board, { direction }: Directions) {
	let newBrd: Board = [];

	switch (direction) {
		case 'Left':
			return (newBrd = brd);
		case 'Right':
			newBrd = reverseNestedArrays(brd);
			return newBrd;
		case 'Up':
			newBrd = transposeMatrix(brd);
			return newBrd;
		case 'Down':
			brd.forEach((elm) => elm.reverse());
			newBrd = transposeMatrix(brd);
			return newBrd;
	}
}

export function hasEmptyFields(brd: Board) {
	let count = 0;

	brd.forEach((row) => {
		if (row.includes(0)) {
			count++;
		}
	});
	if (count) {
		return true;
	} else {
		return false;
	}
}

// export function boardTest(board: Board, { direction }: Directions) {
// 	let brd1: Board = transposeBoard(board, { direction });
// 	const afterSlide = slider(brd1);
// 	return (brd1 = transposeBoard(afterSlide.brd, { direction }));
// }

export function compareTwoArrays(a: Board, b: Board) {
	if (a.length !== b.length) {
		return false;
	}

	for (let i = 0; i < a.length; i++) {
		if (a[i].length !== b[i].length) {
			return false;
		}
		for (let j = 0; j < a[i].length; j++) {
			if (a[i][j] !== b[i][j]) {
				return false;
			}
		}
	}
	return true;
}

export function movementIsPossible(brd: Board, { direction }: Directions) {
	let tempBrd: Board = [...brd];
	tempBrd = transposeBoard(tempBrd, { direction });
	console.log('temporary board in function: ', tempBrd);
	console.log('original game board: ', brd);
	for (let i = 0; i < boardSize; i++) {
		for (let j = 0; j < boardSize - 1; j++) {
			if (brd[i][j] === 0 && tempBrd[i][j + 1] !== 0) {
				return true;
			}
		}
	}
	return false;
}
