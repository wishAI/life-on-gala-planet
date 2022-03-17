/**
 * Created by clima on 2016/5/29.
 */
function GamePage() {
    this.pageCanvasBuffer = document.getElementById("viewBuffer");
    this.pageContextBuffer = this.pageCanvasBuffer.getContext("2d");
    this.eventData = null;
}

GamePage.prototype.refresh = function (eventData) {
    this.eventData = eventData;
    this.drawElements();
    this.releaseCanvasBuffer();
};

GamePage.prototype.drawElements = function () {
    this.drawButtons();
};

GamePage.prototype.percentToValue = function (type, percent) {
    if (type == "x") {
        return Math.round(percent * Data.viewWidth / 100);
    } else if (type == "y") {
        return Math.round(percent * Data.viewHeight / 100);
    } else if (type == "size") {
        return Math.round(percent * Data.reference / 100);
    } else {
        alert("not such type of percent");
    }
};

GamePage.prototype.fillBackGround = function (img) {
    this.pageContextBuffer.drawImage(img, 0, 0, Data.viewWidth, Data.viewHeight);
};

GamePage.prototype.fillColorByPercent = function (color, percentX1, percentY1, percentX2, percentY2) {
    this.pageContextBuffer.fillStyle = color;
    this.pageContextBuffer.fillRect(this.percentToValue("x", percentX1), this.percentToValue("y", percentY1), this.percentToValue("x", percentX2 - percentX1), this.percentToValue("y", percentY2 - percentY1));
};

GamePage.prototype.drawImageByPercent = function (img, percentX, percentY, percentSize) {
    var imgWidth = this.percentToValue("size", percentSize);
    //keep the proportion of the image
    var imgHeight = Math.round(img.height * imgWidth / img.width);
    this.pageContextBuffer.drawImage(img, this.percentToValue("x", percentX), this.percentToValue("y", percentY), imgWidth, imgHeight);
};

GamePage.prototype.drawTextByPercent = function (text, percentX, percentY, percentSize) {
    this.pageContextBuffer.font = this.percentToValue("size", percentSize) + "px Sans-serif";
    this.pageContextBuffer.fillText(text, this.percentToValue("x", percentX), this.percentToValue("y", percentY));
};

GamePage.prototype.drawButtons = function () {
    var buttonList = this.eventData.get("buttons");
    for (var i = 0; i < buttonList.length; i++) {
        if (buttonList[i].isRequired) {
            var isSelected = this.eventData.get("selectedButton") == buttonList[i].ID;
            switch (buttonList[i].viewType) {
                case "text":
                    if (isSelected) {
                        this.pageContextBuffer.fillStyle = "green";
                    } else {
                        this.pageContextBuffer.fillStyle = "white";
                    }
                    this.drawTextByPercent(buttonList[i].content, buttonList[i].viewPercentX, buttonList[i].viewPercentY, buttonList[i].viewPercentSize);
                    break;
                case "canvas":
                    if (isSelected) {
                        this.pageContextBuffer.fillStyle = "green";
                        this.pageContextBuffer.strokeStyle = "green";
                    } else {
                        this.pageContextBuffer.fillStyle = "white";
                        this.pageContextBuffer.strokeStyle = "white";
                    }
                    this.pageContextBuffer.save();
                    this.pageContextBuffer.beginPath();
                    this.pageContextBuffer.translate(this.percentToValue("x", buttonList[i].viewPercentX), this.percentToValue("y", buttonList[i].viewPercentY));
                    if (buttonList[i].content === "back") {
                        this.pageContextBuffer.moveTo(0, this.percentToValue("size", 10));
                        this.pageContextBuffer.lineTo(this.percentToValue("size", 20), 0);
                        this.pageContextBuffer.lineTo(this.percentToValue("size", 20), this.percentToValue("size", 20));
                        this.pageContextBuffer.closePath();
                        this.pageContextBuffer.fill();
                    } else if (buttonList[i].content === "yes") {
                        this.pageContextBuffer.lineWidth = 5;
                        this.pageContextBuffer.moveTo(0, this.percentToValue("size", 15));
                        this.pageContextBuffer.lineTo(this.percentToValue("size", 5), this.percentToValue("size", 15));
                        this.pageContextBuffer.lineTo(this.percentToValue("size", 20), 0);
                        this.pageContextBuffer.stroke();
                    } else if (buttonList[i].content === "no") {
                        this.pageContextBuffer.lineWidth = 5;
                        this.pageContextBuffer.moveTo(0, 0);
                        this.pageContextBuffer.lineTo(this.percentToValue("size", 20), this.percentToValue("size", 20));
                        this.pageContextBuffer.moveTo(0, this.percentToValue("size", 20));
                        this.pageContextBuffer.lineTo(this.percentToValue("size", 20), 0);
                        this.pageContextBuffer.stroke();
                    }
                    this.pageContextBuffer.restore();
                    break;
                case "image":
                    //draw the image
                    this.drawImageByPercent(buttonList[i].buttonImage, buttonList[i].viewPercentX, buttonList[i].viewPercentY, buttonList[i].viewPercentSize);
                    //add a border if selected
                    if (isSelected) {
                        this.pageContextBuffer.strokeStyle = "green";
                        this.pageContextBuffer.lineWidth = 5;
                        var strokeWidth = this.percentToValue("size", buttonList[i].viewPercentSize);
                        var strokeHeight = Math.round(strokeWidth * buttonList[i].buttonImage.height / buttonList[i].buttonImage.width);
                        this.pageContextBuffer.strokeRect(this.percentToValue("x", buttonList[i].viewPercentX), this.percentToValue("y", buttonList[i].viewPercentY), strokeWidth, strokeHeight);
                    }
                    break;
            }
        }
    }
};

GamePage.prototype.releaseCanvasBuffer = function () {
    var pageCanvas = document.getElementById("view");
    var pageContext = pageCanvas.getContext("2d");
    pageContext.drawImage(this.pageCanvasBuffer, (pageCanvas.width - Data.viewWidth) / 2, 0);
};



