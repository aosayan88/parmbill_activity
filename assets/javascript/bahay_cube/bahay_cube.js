var tiles = [];
var tile_id;
var popover_content = '';

$(document).ready(function () {
    displayTiles(16);

    
    
    $("body")
        .on("click", ".empty", showPopover)
        .on("click", ".tilled", showPopover)
        .on("click", ".till_btn", getTilled)
        .on("click", hidePopover);
    
    $('[data-toggle="popover"]').popover({
        placement: 'bottom',
        html: true,
        content: function() {
            return $(this).hasClass("empty") ? '<button class="till_btn">Till</button>' : '<button class="plant_btn">Plant</button>'
        }
    });
});

function showPopover(){
    tile_id = $(this).attr("id");

    $(".empty").not(this).popover("hide");
    $(".tilled").not(this).popover("hide");
}

function getTilled(){
    let tile_index = tile_id.split("id_")[1];
    
    $(`#${tile_id}`).removeClass("empty").addClass("tilled");
    tiles[tile_index].till = true;
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
