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

	return { board: newBrd, score: score };
}

export function transposeIfUp(brd: Board) {
	const newMatrix: Board = [];
	for (let i = 0; i < boardSize; i++) {
		const x = [];
		for (let j = 0; j < boardSize; j++) {
			x.push(brd[j][i]);
		}
		newMatrix.push(x);
	}
	return newMatrix;
}

export function transposeIfDown(brd: Board) {
	const newMatrix: Board = [];
	for (let i = 0; i < boardSize; i++) {
		const x = [];
		for (let j = 0; j < boardSize; j++) {
			x.push(brd[boardSize - 1 - j][i]);
		}
		newMatrix.push(x);
	}
	return newMatrix;
}

export function transposeBoard(brd: Board, { direction }: Directions) {
	let newBrd: Board = [];

	switch (direction) {
		case 'Left':
			return (newBrd = brd);
		case 'Right':
			brd.forEach((elm) => elm.reverse());
			newBrd = brd;
			return newBrd;
		case 'Up':
			newBrd = transposeIfUp(brd);
			return newBrd;
		case 'Down':
			brd.forEach((elm) => elm.reverse());
			brd = transposeIfDown(brd);
			newBrd = brd;
			return newBrd;
	}
}

export function hasEmptyFields(brd: Board) {
	brd.forEach((row: number[]) => {
		if (row.includes(0)) {
			return true;
		} else {
			return false;
		}
	});
}
