/**
 * Created by clima on 2016/6/20.
 */
function GameEvent() {
    this.eventData = new Map();
    this.eventData.set("buttons", []);
    this.gameTimer = new GameTimer();
}

GameEvent.prototype.refresh = function () {

};

GameEvent.prototype.interaction = function () {
    var selectedButton = this.detectSelectedButton();
    this.eventData.set("selectedButton", selectedButton);
    if (Data.mouseClick && selectedButton !== "none") {
        this.playSound("button");
    }
};

GameEvent.prototype.getMousePercentX = function () {
    return Data.mousePositionX / Data.viewWidth * 100;
};

GameEvent.prototype.getMousePercentY = function () {
    return Data.mousePositionY / Data.viewHeight * 100;
};

GameEvent.prototype.isMouseInAreaByPercent = function (percentX1, percentY1, percentX2, percentY2) {
    var mousePercentX = this.getMousePercentX();
    var mousePercentY = this.getMousePercentY();
    return percentX1 < mousePercentX && percentX2 > mousePercentX && percentY1 < mousePercentY && percentY2 > mousePercentY;
};

//make sure only load the necessary images
GameEvent.prototype.setRequireElement = function (type, requiredElements) {
    var elementsList = this.eventData.get(type);
    for (var i = 0; i < elementsList.length; i++) {
        if (requiredElements.indexOf(elementsList[i].ID) == -1) {
            elementsList[i].isRequired = false;
            elementsList[i].releaseImage();
        } else {
            elementsList[i].isRequired = true;
            elementsList[i].loadImage();
        }
    }
};

GameEvent.prototype.detectSelectedButton = function () {
    var buttonList = this.eventData.get("buttons");
    for (var i = 0; i < buttonList.length; i++) {
        if (buttonList[i].isRequired && this.isMouseInAreaByPercent(buttonList[i].clickPercentX1, buttonList[i].clickPercentY1, buttonList[i].clickPercentX2, buttonList[i].clickPercentY2)) {
            return buttonList[i].ID;
        }
    }
    return "none";
};

GameEvent.prototype.playSound = function (type) {
    var sound = document.createElement("audio");
    switch (type) {
        case "button":
            sound.src = "assets/sound/buttonClick.mp3";
            break;
        case "build":
            sound.src = "assets/sound/putBuilding.mp3";
            break;
    }
    sound.volume = Data.sound / 100;
    sound.play();
};
