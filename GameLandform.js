/**
 * Created by clima on 2016/7/11.
 */
function GameLandform(type) {
    this.type = type;
    this.locate = [];
}

GameLandform.prototype.addLocation = function (x1, y1, x2, y2) {
    this.locate.push({x1: x1, y1: y1, x2: x2, y2: y2});
};

GameLandform.prototype.isPointIn = function (x, y) {
    //return x > this.mapX1 && x < this.mapX2 && y > this.mapY1 && y < this.mapY2;
    for (var i = 0; i < this.locate.length; i++) {
        if (x >= this.locate[i].x1 && x <= this.locate[i].x2 && y >= this.locate[i].y1 && y <= this.locate[i].y2) {
            return true;
        }
    }
    return false;
};
