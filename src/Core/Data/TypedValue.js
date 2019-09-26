// =================
// Here's where all pre-typed value will be stored with enumerable type of data.

// Typed value constant for representing square filler
export const SquareTypes = {
    CROSS: "X",
    CIRCLE: "O",
    NONE: " "
}

// Each value will determine whether the game is at the beginning, started or ended.
export const GameStates = {
    PREPARING: 0,
    PLAYING: 1,
    DRAW: 2,
    HAS_WINNER: 3
}

export const GameConclusion = {
    HAS_WINNER: 0,
    DRAW: 1,
    TBD: 2
}
