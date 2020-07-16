import { chooseDifficulty, ripple } from './visual.js';
import { hasCoordinate, setMines } from './engine.js'

(function() {
    let field = [];
    let gameStarted = false;
    chooseDifficulty();
    $(".grid").on("click", ".square", function() {
        const gridSize = $(".grid").children().length;
        let width = 0;
        let height = 0
        
        switch (gridSize) {
            case 64:
                width = 8;
                height = 8;
                break;
            case 256:
                width = 16;
                height = 16;
                break;
            case 480:
                width = 30;
                height = 16;
        }

        const entryIndex = $(this).index();
        const entryCoordinates = [
            Math.floor(entryIndex / width),
            Math.floor(entryIndex % width)
        ];

        if (!gameStarted) {
            field = setMines(width, height, entryCoordinates);
            console.table(field)
            gameStarted = true;
        }

        if (!$(this).children().length && !$(this).text()) {
            ripple.call(this, field, width, height, entryIndex, entryCoordinates)

            const currentSquareValue = field[entryCoordinates[0]][entryCoordinates[1]];
            if (currentSquareValue !== '*') {
                $(this).text(currentSquareValue);
                if (!currentSquareValue) $(this).css({ "font-size": "0"});
            } else {
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        if (field[i][j] === '*') {
                            let image = $("<img />");
                            if (hasCoordinate([entryCoordinates], [i,j])) {
                                image.addClass("mine-image-red");
                            } else {
                                image.addClass("mine-image");
                            }
                            const openMine = i * width + j;
                            $($('.grid').children()[openMine]).html(image);
                        }
                    }
                }
                $(".grid").off();
            }
        }
    });

    $(".grid").on("contextmenu", ".square", function(event) {
        const image = $("<img />").addClass("flag-image");
        event.preventDefault();
        if (!$(this).text()) {
            if(!$(this).children().length) {
                $(this).append(image);
                $(this).off();
            } else {
                $(this).empty();
            }
        }
    })
})();
