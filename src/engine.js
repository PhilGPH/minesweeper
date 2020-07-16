export const hasCoordinate = (array, target) => {
    for (const element of array) {
        if (element[0] === target[0] && element[1] === target[1]) {
            return true;
        }
    }
    return false;
};

export const getSurroundingCoordinates = (entry) => [
    [entry[0]-1, entry[1]-1], [entry[0]-1, entry[1]], [entry[0]-1, entry[1]+1],
    [entry[0], entry[1]-1], [entry[0], entry[1]+1],
    [entry[0]+1, entry[1]-1], [entry[0]+1, entry[1]], [entry[0]+1, entry[1]+1]
];


const generateMineLocations = (width, height, entryPoint, mines) => {
    const coordinates = [];
    const safeZone = [...getSurroundingCoordinates(entryPoint), entryPoint];

    while (coordinates.length < mines) {
        const newMine = [
            Math.floor(Math.random() * height),
            Math.floor(Math.random() * width)
        ];

        if (hasCoordinate(safeZone, newMine)) {
            continue;
        } else {
            !hasCoordinate(coordinates, newMine) ? coordinates.push(newMine) : null;
        }
    }

    return coordinates;
};

export const setMines = (width, height, entryPoint, mines) => {
    width === 8 && height === 8 ? mines = 10 : mines;
    width === 16 && height === 16 ? mines = 40 : mines;
    width === 30 && height === 16 ? mines = 99 : mines;

    const matrixField = new Array(height);
    for (let i = 0; i < matrixField.length; i++) {
        matrixField[i] = new Array(width);
        matrixField[i].fill(0);
    };

    const locations = generateMineLocations(width, height, entryPoint, mines);
    for (const location of locations) {
        matrixField[location[0]][location[1]] = '*';

        const surroundingSquares = getSurroundingCoordinates(location);
        for (const square of surroundingSquares) {
            if ((square[0] >= 0 && square[0] < height) &&
                (square[1] >= 0 && square[1] < width) && 
                matrixField[square[0]][square[1]] !== '*'
            ) {
                matrixField[square[0]][square[1]]++;
            }
        }
    }

    return matrixField;
};
