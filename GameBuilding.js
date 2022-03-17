/**
 * Created by clima on 2016/7/12.
 */
function GameBuilding(type, buildingInfo) {
    //set the size and the hitbox depends on the type,get them from buildingInfo
    this.buildingInfo = buildingInfo;
    this.ID = type;
    this.buildImage = null;
    this.referX = null;
    this.referY = null;
}

GameBuilding.prototype.setReference = function (referX, referY) {
    this.referX = referX;
    this.referY = referY;
};

GameBuilding.prototype.getProduce = function () {
    //return the resources and the amount the building can produce
    return {amount: this.buildingInfo.produceAmount, type: this.buildingInfo.produceType};
};

GameBuilding.prototype.getConsume = function () {
    //return the resources the building consume
    return {amount: this.buildingInfo.consumeAmount, type: this.buildingInfo.consumeType};
};

GameBuilding.prototype.isPointInHitBox = function (x, y) {
    return x > this.referX - this.buildingInfo.hitboxLength / 2 && x < this.referX + this.buildingInfo.hitboxLength / 2 && y > this.referY - this.buildingInfo.hitboxHeight / 2 && y < this.referY + this.buildingInfo.hitboxHeight / 2;
};

//release memorys
GameBuilding.prototype.loadImage = function () {
    this.buildImage = new Image();
    this.buildImage.src = this.buildingInfo.imagePath;
};

GameBuilding.prototype.releaseImage = function () {
    this.buildImage = null;
};