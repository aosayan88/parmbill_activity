class Tile {
    constructor(id) {
        this.tile_id = id;
        this.tilled = false;
        this.plant = {}
    }

    getTilled(){
        this.till = true;
    }

    setPlant(obj){
        this.plant = obj;
    }
}