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

const getCurrentPlayer = (previous?: string) => {
    if (!previous || previous === PLAYER.two) {
        return PLAYER.one;
    } else {
        return PLAYER.two;
    }
};

const checkEqual = (one: any, two: any, three: any) => {
    return one === two && one === three;
};

// TODO: check only after the fourth turn
// TODO: check diagonal smarter
const checkWinner = (player: string, row: number, column: number) => {
    if (checkEqual(BOARD[row][0], BOARD[row][1], BOARD[row][2]) ||
        checkEqual(BOARD[0][column], BOARD[1][column], BOARD[2][column]) ||
        checkEqual(BOARD[0][0], BOARD[1][1], BOARD[2][2]) ||
        checkEqual(BOARD[0][2], BOARD[1][1], BOARD[2][0])
    ) {
        console.log(`${player} IS THE WINNER!\n\n`);
        rl.close();
    }
};

const insertToBoard =  (insert, player) => {
    if (insert < 0 || insert > 8) {
        console.log("\npleas choose only numbers between 1 - 9\n");
        return "blocked";
    }
    const row = Math.floor(insert / 3);
    const column = insert % 3;
    if (BOARD[row][column] !== PLAYER.one && BOARD[row][column] !== PLAYER.two) {
        BOARD[row][column] = player;
        checkWinner(player, row, column);
        return "success";
    } else {
        console.log("\nthis spot is already chosen\n");
        return "blocked";
    }
};

const printBoard = () => {
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            process.stdout.write("   " + BOARD[row][column] + "   ");
        }
        // new line
        console.log(" ");
    }
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const askQuestion = (player: string) => {
    printBoard();
    rl.question(`\n${player} Pick a place: `, (answer) => {
        const insertStatus = insertToBoard(answer - 1, player);
        // if the plot didnt success - dont switch player
        let newPlayer = player;
        if (insertStatus === "success") {
            newPlayer = getCurrentPlayer(player);
        }
        askQuestion(newPlayer);
    });
};

const firstPlayer = getCurrentPlayer();
askQuestion(firstPlayer);
