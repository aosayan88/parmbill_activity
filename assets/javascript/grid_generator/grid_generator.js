var tiles = [
    [0,0,0,1],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,1]
];

$(document).ready(function () {
    displayTiles();
});

function displayTiles(){
    let output = "";

    for (let tile_index = 0; tile_index < tiles.length; tile_index++) {
        output += "\n<div class='tile'>\n";
        for (let element_index = 0; element_index < tiles[tile_index].length; element_index++) {
            if (tiles[tile_index][element_index] === 1) {
                output += "<div class='tilled'></div>";
            }
            if (tiles[tile_index][element_index] === 0) {
                output += "<div class='empty'></div>";
            }
        }
        output += "\n</div>";
    }
    $("#tiles_table").append(output);
}
