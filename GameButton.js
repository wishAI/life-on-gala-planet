/**
 * Created by clima on 2016/6/27.
 */
function GameButton(viewType, content, ID) {
    this.viewType = viewType;
    this.content = content;
    this.ID = ID;
    this.viewPercentX = null;
    this.viewPercentY = null;
    this.viewPercentSize = null;
    this.clickPercentX1 = null;
    this.clickPercentY1 = null;
    this.clickPercentX2 = null;
    this.clickPercentY2 = null;
    this.buttonImage = null;
    this.isRequired = false;
}



GameButton.prototype.setViewArea = function (percentX, percentY, percentSize) {
    this.viewPercentX = percentX;
    this.viewPercentY = percentY;
    this.viewPercentSize = percentSize;
};

GameButton.prototype.setClickArea = function (percentX1, percentY1, percentX2, percentY2) {
    this.clickPercentX1 = percentX1;
    this.clickPercentX2 = percentX2;
    this.clickPercentY1 = percentY1;
    this.clickPercentY2 = percentY2;
};

//images consume lots of memory ,load only if needed ,release if not
GameButton.prototype.loadImage = function () {
    if (this.viewType !== "image" || this.buttonImage != null) {
        return false;
    } else {
        this.buttonImage = new Image();
        this.buttonImage.src = this.content;
    }
};

GameButton.prototype.releaseImage = function () {
    if (this.viewType !== "image" || this.buttonImage == null) {
        return false;
    } else {
        this.buttonImage = null;
    }
};