var tiles = [];
var tile_id;
var popover_content = '';
var total_earinings = 0;

$(document).ready(function () {
    displayTiles(16);

    $("body")
        .on("click", ".empty", showPopover)                                         /** This function will show popups */
        .on("click", ".tilled", showPopover)                                        /** This function will show popups */
        .on("click", ".harvest", showPopover)                                       /** This function will show popups */
        .on("click", ".till_btn", getTilled)                                        /** This function will set the tile in tilled state */
        .on("click", ".plant_btn", getPlant)
        .on("click", ".has_plant", showPopover)
        .on("dblclick", ".has_plant", getHarvest)
        .on("click", ".remove_btn", openRemoveModal)
        .on("click", ".harvest_btn", harvestTile)
        .on("click", ".remove_modal_remove_btn", removePlant)
        .on("click", hidePopover);
    
    $('[data-toggle="popover"]').popover({
        placement: 'bottom',
        html: true,
        content: popOverButton
    });
});

/** 
    * DOCU: This function will show popups <br>
    * Triggered By: .on("click", ".empty", showPopover) <br>
    * Last Updated Date: Sept. 8, 2022
    * @function
    * @author Alfie Osayan
*/
function showPopover(){
    tile_id = $(this).attr("id");
    let tile_class = $(this).attr("class");

    $(`.${tile_class}`).not(this).popover("hide");
}


/** 
    * DOCU: This function will set the tile in tilled state <br>
    * Triggered By: .on("click", ".empty", showPopover) <br>
    * Last Updated Date: Sept. 9, 2022
    * @function
    * @author Alfie Osayan
*/
function getTilled(){
    let tile_index = tile_id.split("id_")[1];
    
    $(`#${tile_id}`).removeClass("empty").addClass("tilled");
    tiles[tile_index].setTileStatus("tilled");
}

function getPlant(){
    let tile_index = tile_id.split("id_")[1];
    $(`#${tile_id}`).removeClass("tilled").addClass("has_plant").find(".tile_text").text("7s");
    
    let timer = $(`#${tile_id}`).find(".tile_text").text().split("s")[0];

    harvestTime(7, tile_id);
    console.log(timer)
    tiles[tile_index].setTileStatus("has_plant");
}

function getHarvest(){
    let tile_index = tile_id.split("id_")[1];
    let harvest_tile = $(`#${tile_id}`);

    harvest_tile.removeClass("has_plant").addClass("harvest").find(".tile_text").text("$10");
    tiles[tile_index].setTileStatus("ready_to_harvest");
}

function hidePopover(event){
    if ($(event.target).data('toggle') !== 'popover'
        && $(event.target).parents('.popover.in').length === 0) {
        $('[data-toggle="popover"]').popover('hide');
    }
}

function harvestTile(){
    let harvested_value = $(".tile_text").text();

    total_earinings += parseInt(harvested_value.split("$")[1]);
    removePlant();
    $('.total_earnings_value').text(total_earinings);
}

function removePlant(){
    let tile = $(`#${tile_id}`);
    tile.removeClass().addClass("empty").find(".tile_text").text("");
}

function openRemoveModal(){
    $('#remove_modal').modal({
        backdrop: "static",
        keyboard: false
    });
}

function popOverButton(){
    if ($(this).hasClass("empty")) {
        return '<button class="till_btn">Till</button>';
    }
    else if ($(this).hasClass("tilled")) {
        return '<button class="plant_btn">Plant</button>';
    }
    else if ($(this).hasClass("harvest")) {
        return (
            '<button class="harvest_btn">Harvest</button> <button class="remove_btn">Remove</button>'
        );
    }
    else {
        return '<button class="remove_btn" data-toggle="modal">Remove</button>';
    }
}

function displayTiles(number_of_tile){
    let tile_block = "";

    tile_block += "\n<div class='tile'>\n";
    for(let tile_index=0;tile_index < number_of_tile; tile_index++) {
        tiles.push(new Tile(tile_index));
        tile_block +=   `<button type="button" id="tile_id_${tile_index}" class="empty" data-toggle="popover"><span class="tile_text"></span></button>`;
    }
    tile_block += "\n</div>";

    $("#tiles_table").html(tile_block);
    $('.total_earnings_value').text(total_earinings);
}

function harvestTime(time, tile) {
    let timer = setInterval(function() {
        time--;
        $(`#${tile}`).find(".tile_text").text(`${time}s`);
        if (time <= 0) {
            clearInterval(timer);
            $(`#${tile}`).removeClass("has_plant").addClass("harvest").find(".tile_text").text("$10");
        }
    }, 1000);
}
