var tiles = [];
var tile_id;

$(document).ready(function () {
    displayTiles(16);

    
    
    $("body")
        .on("click", ".empty", showPopover)
        .on("click", hidePopover)
    
    $(".empty").popover({
        placement: 'bottom',
        html: true,
        content: '<button type="button" class="till_btn">Till</button>'
    });
});

function showPopover(){
    $(".empty").not(this).popover("hide");
}

function getTilled(){
    let this_tile = $(this);
    let tile_index = this_tile.attr("id");
    tile_id = this_tile.attr("id");

    console.log(tile_id)
    
    //this_tile.css("background-color", "#F2994A");
    //tiles[tile_index].till = true;
    console.log(this_tile)
}

function hidePopover(event){
    if ($(event.target).data('toggle') !== 'popover'
        && $(event.target).parents('.popover.in').length === 0) {
        $('[data-toggle="popover"]').popover('hide');
    }
}

function displayTiles(number_of_tile){
    let tile_block = "";

    tile_block += "\n<div class='tile'>\n";
    for(let tile_index=0;tile_index < number_of_tile; tile_index++) {
        tiles.push(new Tile(tile_index));
        tile_block +=   `<button type="button" id="tile_id_${tile_index}" class="empty" data-toggle="popover"></button>`;
    }
    tile_block += "\n</div>";

    $("#tiles_table").html(tile_block);
}
