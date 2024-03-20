import { boardSize } from './global_defaults';
// import type { Board, Directions } from "./types";

export function createEmptyBoard() {
	const x = [];

	for (let row = 0; row < boardSize; row++) {
		for (let column = 0; column < boardSize; column++) {
			x.push([row, column, 2]);
		}
	}

	return x;
}

// function goes through all tiles and takes their values,
// and transposes the board matrix depending on the direction
// so all movements can be fed to one universal slider function

// export function cookValuesArray(board: Board, { direction }: Directions) {
//     let values: number[][] = [];

//     switch (direction) {
//         case "Left":
//             for (let row = 0; row < boardSize; row++) {
//                 let x: number[] = selectIndexTwo(board.filter((elm) => elm[0] === row));
//                 values.push(x);
//             }
//         case "Right":
//             for (let row = 0; row < boardSize; row++) {
//                 let x: number[] = selectIndexTwo(board.filter((elm) => elm[0] === row));
//                 values.push(x);
//                 values = values.reverse();
//             }
//         case "Up":
//             for (let column = 0; column < boardSize; column++) {
//                 let x: number[] = selectIndexTwo(board.filter((elm) => elm[1] === column));
//                 values.push(x);
//             }
//         case "Down":
//             for (let column = 0; column < boardSize; column++) {
//                 let x: number[] = selectIndexTwo(board.filter((elm) => elm[1] === column));
//                 values.push(x);
//                 values = values.reverse();
//             }
//     }

//     return values;
// }

// export function removeZeroes(row: number[]) {
//     return row.filter((elm) => elm !== 0);
// }

// export function selectIndexTwo(array: number[][]) {
//     let x: number[] = [];
//     array.forEach((e) => x.push(e[2]));
//     return x;
// }

//
// HANDLESLIDE FROM MAINPAGE
//

// function handleSlide({ direction }: Directions) {
//     const newBoard: Board = [];
//     let valuesArray: number[][] = cookValuesArray(board, { direction });

//     console.log("ValuesArray", valuesArray);
//     for (let i = 0; i < boardSize; i++) {
//         let values = removeZeroes(valuesArray[i]);
//         console.log("Values", values);

//         for (let i = 0; i < values.length - 1; i++) {
//             if (values[i] === values[i + 1]) {
//                 values[i] *= 2;
//                 values[i + 1] = 0;
//                 score += values[i];
//             }
//         }

//         values = removeZeroes(values);

//         while (values.length < boardSize) {
//             values.push(0);
//         }

//         refillRow(values, i, { direction });
//     }
//     board = newBoard;
// }
