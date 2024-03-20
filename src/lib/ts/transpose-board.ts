// import { boardSize } from "$lib/ts/global_defaults";
// import type { Board, Directions } from "$lib/ts/types";
// import { selectIndexTwo } from "./select-index-two";

// // function goes through all tiles and takes their values,
// // and transposes the board matrix depending on the direction
// // so all movements can be fed to one universal slider function

// export function transposeBoard(board: Board, { direction }: Directions) {
//     let transposedBoard: Board = [];

//     function reverseIndex(x: number) {
//         return boardSize - 1 - x;
//     }

//     function switchValues([a, b, c]: number[]) {
//         let x = a;
//         a = b;
//         b = x;
//         return [a, b, c];
//     }

//     switch (direction) {
//         case "Left":
//             return transposedBoard = board;
//         case "Right":
//             board.forEach((elm) => (elm[0] = reverseIndex(elm[0])));
//             return transposedBoard = board;
//         case "Up":
//             board.forEach((elm) => switchValues(elm));
//             return transposedBoard = board;
//         case "Down":
//             board.forEach((elm) => switchValues(elm)
//             return reverseIndex(elm[0]));
//             return transposedBoard = board;
//     }

//     return values;
// }
