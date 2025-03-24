import type { Board, Directions } from './types';
import { boardSize } from './global_defaults';

export function createEmptyBoard() {
	const emptyBoard = [];
	for (let i = 0; i < boardSize; i++) {
		const x = [];
		for (let j = 0; j < boardSize; j++) {
			x.push(0);
		}
		emptyBoard.push(x);
	}
	return emptyBoard;
}

export function performSlide(board: Board) {
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

function reverseNestedArrays(array: number[][]) {
	array.forEach((elm) => elm.reverse());
	return array;
}

export function transposeBoard(board: Board, { direction }: Directions) {
	let newBoard: Board = [];

	switch (direction) {
		case 'Left':
			return (newBoard = board);
		case 'Right':
			newBoard = reverseNestedArrays(board);
			return newBoard;
		case 'Up':
			newBoard = transposeMatrix(board);
			return newBoard;
		case 'Down':
			newBoard = transposeMatrix(board.reverse());
			return newBoard;
	}
}

export function transposeBoardBack(board: Board, { direction }: Directions) {
	let newBoard: Board = [];

	switch (direction) {
		case 'Left':
			return (newBoard = board);
		case 'Right':
			newBoard = reverseNestedArrays(board);
			return newBoard;
		case 'Up':
			newBoard = transposeMatrix(board);
			return newBoard;
		case 'Down':
			board.forEach((elm) => elm.reverse());
			newBoard = transposeMatrix(board);
			return newBoard;
	}
}

export function hasEmptyFields(board: Board) {
	let count = 0;

	board.forEach((row) => {
		if (row.includes(0)) {
			count++;
		}
	});
	if (count > 0) {
		return true;
	} else {
		return false;
	}
}

export function checkAvailableMoves(board: Board, { direction }: Directions) {
	let tempBrd: Board = [];
	board.map((elm) => tempBrd.push([...elm]));
	tempBrd = transposeBoard(tempBrd, { direction });
	for (let i = 0; i < boardSize; i++) {
		for (let j = 0; j < boardSize - 1; j++) {
			if (
				(tempBrd[i][j] !== 0 && tempBrd[i][j] === tempBrd[i][j + 1]) ||
				(tempBrd[i][j] === 0 && tempBrd[i][j + 1] !== 0)
			) {
				return true;
			}
		}
	}
	return false;
}

export function checkAvailableMovesInAnyDirection(board: Board) {
	if (
		checkAvailableMoves(board, { direction: 'Left' }) ||
		checkAvailableMoves(board, { direction: 'Right' }) ||
		checkAvailableMoves(board, { direction: 'Up' }) ||
		checkAvailableMoves(board, { direction: 'Down' })
	) {
		return true;
	}
	return false;
}

export function determineTileColor(array: [number, number][], a: number, b: number) {
	for (let i = 0; i < array.length; i++) {
		if (array[i][0] === a && array[i][1] === b) return true;
		break;
	}
	return false;
}
