import { setMines, getSurroundingCoordinates } from './engine.js'

const renderGrid = (width, height) => {
    $(".grid .side-view").empty();
    if (width !== height) {
        $(".grid").css({
            "width": "70%"
        });
    }

    const gridHeight = $('.grid').width() / width * height;
    $(".side-view").css({
        "width": "100px",
        "height": gridHeight+'px' 
    });
    $(".grid").css({
        "height": gridHeight+'px',
        "grid-template-columns": `repeat(${width}, 1fr)`,
        "grid-template-rows": `repeat(${height}, 1fr)`,
        "border": "1px solid"
    });

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const gridItem = $("<button></button>").addClass("square").css({
                "background-color": "grey",
                "border": "1px solid"
            });
            $(".grid").append(gridItem);
        }
    }
};

export const chooseDifficulty = () => {
    $(".option").click(function() {
        $(".game-sign, .options-box").hide();

        const difficulty = $(this).attr("class").split(/\s+/)[1];
        switch (difficulty) {
            case 'easy': renderGrid(8, 8); break;
            case 'medium': renderGrid(16, 16); break;
            case 'hard': renderGrid(30, 16); 
        };
    });
};

export const ripple = function(field, entryIndex, entryCoordinates) {
    $(this).css({ "background-color": ""});    
}
