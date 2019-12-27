const readline = require("readline");
const PLAYER = {
    one: "X",
    two: "O",
};
const BOARD = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
];
const PLOT_STATUS = {
    blocked: "blocked",
    result: "success plot with a result",
    success: "success plot",
};
const getCurrentPlayer = (previous) => {
    if (!previous || previous === PLAYER.two) {
        return PLAYER.one;
    }
    else {
        return PLAYER.two;
    }
};
const checkEqual = (one, two, three) => {
    return one === two && one === three;
};
let turnNumber = 0;
// TODO: check diagonal smarter?
const checkWinner = (player, row, column) => {
    if (checkEqual(BOARD[row][0], BOARD[row][1], BOARD[row][2]) ||
        checkEqual(BOARD[0][column], BOARD[1][column], BOARD[2][column]) ||
        (turnNumber > 4 && checkEqual(BOARD[0][0], BOARD[1][1], BOARD[2][2]) ||
            checkEqual(BOARD[0][2], BOARD[1][1], BOARD[2][0]))) {
        printBoard();
        console.log(`\n${player} IS THE WINNER!\n\n`);
        return PLOT_STATUS.result;
    }
    else if (turnNumber === 9) {
        printBoard();
        console.log(`\nIT'S A TIE!\n\n`);
        return PLOT_STATUS.result;
    }
    return PLOT_STATUS.success;
};
const insertToBoard = (insert, player) => {
    if (insert < 0 || insert > 8) {
        console.log("\npleas choose only numbers between 1 - 9\n");
        return PLOT_STATUS.blocked;
    }
    const row = Math.floor(insert / 3);
    const column = insert % 3;
    if (BOARD[row][column] !== PLAYER.one && BOARD[row][column] !== PLAYER.two) {
        BOARD[row][column] = player;
        turnNumber += 1;
        return checkWinner(player, row, column);
    }
    else {
        console.log("\nthis spot is already chosen\n");
        return PLOT_STATUS.blocked;
    }
};
const printBoard = () => {
    console.log("\n\n");
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            process.stdout.write("   " + BOARD[row][column] + ((column + 1) % 3 > 0 ? "   |" : "   "));
        }
        // new line
        console.log(" ");
        row !== 2 && console.log("- - - -+- - - -+- - - -");
    }
};
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const newTurn = (player) => {
    printBoard();
    rl.question(`\n${player} Pick a spot: `, (answer) => {
        const insertStatus = insertToBoard(answer - 1, player);
        let newPlayer = player;
        if (insertStatus === PLOT_STATUS.result) {
            rl.close();
        }
        else {
            // if the plot didnt success dont switch player
            newPlayer = insertStatus === PLOT_STATUS.success ? getCurrentPlayer(player) : player;
            newTurn(newPlayer);
        }
    });
};
const firstPlayer = getCurrentPlayer();
newTurn(firstPlayer);
//# sourceMappingURL=app.js.map