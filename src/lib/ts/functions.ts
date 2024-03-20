import type { Board, Directions } from './types';
import { boardSize } from './global_defaults';

export function slider(board: Board) {
	const newBoard: Board = [];
	let score: number = 0;

	for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
		let row: number[] = board[rowIndex];

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

		newBoard.push(row);
	}

	return { board: newBoard, score: score };
}

export function transposeMatrix(board: Board) {
	const newMatrix: Board = [];
	for (let i = 0; i < boardSize; i++) {
		const x = [];
		for (let j = 0; j < boardSize; j++) {
			x.push(board[j][i]);
		}
		newMatrix.push(x);
	}
	return newMatrix;
}

// function transposeMatrixReverse(board: Board) {
// 	const newMatrix: Board = [];
// 	for (let i = 0; i < 4; i++) {
// 		const x = [];
// 		for (let row = 0; row < 4; row++) {
// 			x.push(board[row][i]);
// 		}
// 		newMatrix.push(x);
// 	}
// 	return newMatrix;
// }

export function transposeBoard(board: Board, { direction }: Directions) {
	let newBoard: Board = [];

	switch (direction) {
		case 'Left':
			return (newBoard = board);
		case 'Right':
			board.forEach((elm) => elm.reverse());
			newBoard = board;
			return newBoard;
		case 'Up':
			newBoard = transposeMatrix(board);
			return newBoard;
		case 'Down':
			board = transposeMatrix(board);
			board.forEach((elm) => elm.reverse());
			newBoard = board;
			return newBoard;
	}
}

// export function transposeBoardReverse(board: Board, { direction }: Directions) {
// 	let newBoard: Board = [];

// 	switch (direction) {
// 		case 'Left':
// 			return (newBoard = board);
// 		case 'Right':
// 			board.forEach((elm) => elm.reverse());
// 			newBoard = board;
// 			return newBoard;
// 		case 'Up':
// 			newBoard = transposeMatrixReverse(board);
// 			return newBoard;
// 		case 'Down':
// 			board = transposeMatrixReverse(board);
// 			board.forEach((elm) => elm.reverse());
// 			newBoard = board;
// 			return newBoard;
// 	}
// }
