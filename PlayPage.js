/**
 * Created by clima on 2016/7/4.
 */
function PlayPage() {
    GamePage.call(this);
    this.zoomFactor = 0.4;
    this.mapStartPointX = null;
    this.mapStartPointY = null;
    //load pictures of map,charactor,etc
    this.gameMap = new Image();
    this.gameMap.src = "assets/pictures/map.png";
    var pic_majorRole = new Image();
    pic_majorRole.src = "assets/pictures/majorRole.png";
    this.majorRole = {image: pic_majorRole, seperatorX: 18, seperatorY: 23, lengthX: 5, lengthY: 3, size: 20};
    this.isWelcome = true;
}

PlayPage.prototype = new GamePage();

PlayPage.prototype.refresh = function (eventData) {
    this.eventData = eventData;
    this.calculateStartPoint();
    this.drawElements();
    GamePage.prototype.releaseCanvasBuffer.call(this);
};

PlayPage.prototype.drawElements = function () {
    this.drawGameMap();
    //draw the buildmode prompt
    var buildMode = this.eventData.get("buildMode");
    if (buildMode.get("enable")) {
        this.pageContextBuffer.save();
        this.pageContextBuffer.globalAlpha = 0.5;
        var deltaX = this.eventData.get("buildingInfoMap").get(buildMode.get("type")).hitboxLength / 2;
        var deltaY = this.eventData.get("buildingInfoMap").get(buildMode.get("type")).hitboxHeight / 2;
        if (buildMode.get("buildFlag")) {
            GamePage.prototype.fillColorByPercent.call(this, "green", this.mapValueToPercent("x", buildMode.get("referX") - deltaX), this.mapValueToPercent("y", buildMode.get("referY") - deltaY), this.mapValueToPercent("x", buildMode.get("referX") + deltaX), this.mapValueToPercent("y", buildMode.get("referY") + deltaY));
        } else {
            GamePage.prototype.fillColorByPercent.call(this, "red", this.mapValueToPercent("x", buildMode.get("referX") - deltaX), this.mapValueToPercent("y", buildMode.get("referY") - deltaY), this.mapValueToPercent("x", buildMode.get("referX") + deltaX), this.mapValueToPercent("y", buildMode.get("referY") + deltaY));
        }
        this.pageContextBuffer.restore();
    }
    //draw thw buildings
    this.drawBuildings("behind");
    this.drawMajorRole();
    this.drawBuildings("forward");
    this.drawSubUI();
    GamePage.prototype.drawElements.call(this);
    if (this.isWelcome) {
        if (Data.keyPress === "J") {
            this.isWelcome = false;
        }
        //draw the welcome page
        this.pageContextBuffer.save();
        this.pageContextBuffer.globalAlpha = 0.8;
        GamePage.prototype.fillColorByPercent.call(this, "black", 0, 0, 100, 100);
        this.pageContextBuffer.restore();
        //draw the introduction words
        const story = "Your space ship crashes on a planet called Gala./nNow you have to live with the local people and build a city with them";
        this.pageContextBuffer.fillStyle = "white";
        GamePage.prototype.drawTextByPercent.call(this, "Your space ship crashes on a planet called Gala.", 18, 10, 8);
        GamePage.prototype.drawTextByPercent.call(this, "Now you have to live with the local people and build a city with them.", 9, 20, 8);
        GamePage.prototype.drawTextByPercent.call(this, "press WASD to move", 35, 40, 8);
        GamePage.prototype.drawTextByPercent.call(this, "press J to confirm,K to cancel", 30, 47, 8);
        GamePage.prototype.drawTextByPercent.call(this, "use mouse to click buttons to build and see the resources", 14, 54, 8);
        GamePage.prototype.drawTextByPercent.call(this, "PRESS J TO CONTINUE",30, 90, 10);
    }
};

PlayPage.prototype.calculateStartPoint = function () {
    var roleLocateX = this.eventData.get("majorRoleState").get("locateX");
    var roleLocateY = this.eventData.get("majorRoleState").get("locateY");
    var sWidth = Math.round(1000 * this.zoomFactor);
    var sHeight = Math.round(sWidth / 3 * 2);
    this.mapStartPointX = Math.round(roleLocateX - 1000 * this.zoomFactor / 2 - this.majorRole.size / 14);
    if (this.mapStartPointX <= 0) {
        this.mapStartPointX = 1;
    } else if (this.mapStartPointX + sWidth > 1000) {
        this.mapStartPointX = 1000 - sWidth + 1;
    }
    this.mapStartPointY = Math.round(roleLocateY - 1000 * this.zoomFactor / 3 - this.majorRole.size / 5);
    if (this.mapStartPointY <= 0) {
        this.mapStartPointY = 1;
    } else if (this.mapStartPointY + sHeight > 1000) {
        this.mapStartPointY = 1000 - sHeight + 1;
    }
};

PlayPage.prototype.drawMultiElementImage = function (multiImage, locate, percentX, percentY, percentSize) {
    //draw to the buffer view first
    var imageCanvasBuffer = document.getElementById("viewBufferForImage");
    imageCanvasBuffer.width = multiImage.seperatorX;
    imageCanvasBuffer.height = multiImage.seperatorY;
    var imageContextBuffer = imageCanvasBuffer.getContext("2d");
    var startX = ((locate - 1) % multiImage.lengthX ) * multiImage.seperatorX;
    var startY = Math.floor((locate - 1) / multiImage.lengthX) * multiImage.seperatorY;
    imageContextBuffer.drawImage(multiImage.image, startX, startY, multiImage.seperatorX, multiImage.seperatorY, 0, 0, multiImage.seperatorX, multiImage.seperatorY);
    //then draw into the format canvas
    GamePage.prototype.drawImageByPercent.call(this, imageCanvasBuffer, percentX, percentY, percentSize);
};

PlayPage.prototype.mapValueToPercent = function (type, value) {
    switch (type) {
        case "x":
            return (value - this.mapStartPointX) * 100 / (this.zoomFactor * 1000);
            break;
        case "y":
            return (value - this.mapStartPointY) * 100 / (this.zoomFactor * 1000 / 3 * 2);
            break;
        case "size":
            return value * 100 / (this.zoomFactor * 1000 / 3);
            break;
    }
};

PlayPage.prototype.drawSubUI = function () {
    if (this.eventData.get("subUI") === "build") {
        GamePage.prototype.fillColorByPercent.call(this, "white", 0, 35, 100, 85);
        //draw the decoration of buildings
        var buildingInfoMap = this.eventData.get("buildingInfoMap");
        var buttonList = this.eventData.get("buttons");
        for (var i = 0; i < buttonList.length; i++) {
            if (buildingInfoMap.contains(buttonList[i].ID)) {
                var buildingInfo = buildingInfoMap.get(buttonList[i].ID);
                //draw the produce and consume
                this.pageContextBuffer.fillStyle = "green";
                GamePage.prototype.drawTextByPercent.call(this, "require:", buttonList[i].viewPercentX, buttonList[i].viewPercentY + 18, 6);
                GamePage.prototype.drawTextByPercent.call(this, buildingInfo.requireType + " " + buildingInfo.requireAmount, buttonList[i].viewPercentX, buttonList[i].viewPercentY + 22, 6);
                GamePage.prototype.drawTextByPercent.call(this, "produce:", buttonList[i].viewPercentX, buttonList[i].viewPercentY + 26, 6);
                GamePage.prototype.drawTextByPercent.call(this, buildingInfo.produceType + " " + buildingInfo.produceAmount, buttonList[i].viewPercentX, buttonList[i].viewPercentY + 30, 6);
                GamePage.prototype.drawTextByPercent.call(this, "consume:", buttonList[i].viewPercentX, buttonList[i].viewPercentY + 34, 6);
                GamePage.prototype.drawTextByPercent.call(this, buildingInfo.consumeType + " " + buildingInfo.consumeAmount, buttonList[i].viewPercentX, buttonList[i].viewPercentY + 38, 6);
                if (buildingInfo.landform !== "normal") {
                    GamePage.prototype.drawTextByPercent.call(this, "build on " + buildingInfo.landform, buttonList[i].viewPercentX, buttonList[i].viewPercentY + 42, 6);
                }
                //draw the transparent red cover if cannot be built
                if (!(buildingInfo.requireAmount <= this.eventData.get("resource").get(buildingInfo.requireType) && buildingInfo.consumeAmount <= this.eventData.get("resource").get(buildingInfo.consumeType))) {
                    this.pageContextBuffer.save();
                    this.pageContextBuffer.globalAlpha = 0.5;
                    var fillEndPointX = buttonList[i].viewPercentSize / 3 + buttonList[i].viewPercentX;
                    var fillEndPointY = buttonList[i].viewPercentSize / 2 * buttonList[i].buttonImage.height / buttonList[i].buttonImage.width + buttonList[i].viewPercentY;
                    GamePage.prototype.fillColorByPercent.call(this, "red", buttonList[i].viewPercentX, buttonList[i].viewPercentY, fillEndPointX, fillEndPointY);
                    this.pageContextBuffer.restore();
                }
            }
        }
    } else if (this.eventData.get("subUI") === "resource") {
        GamePage.prototype.fillColorByPercent.call(this, "white", 5, 30, 35, 85);
        //draw texts that show resource
        this.pageContextBuffer.fillStyle = "green";
        GamePage.prototype.drawTextByPercent.call(this, "Food:", 7, 37, 10);
        GamePage.prototype.drawTextByPercent.call(this, "Wood:", 7, 47, 10);
        GamePage.prototype.drawTextByPercent.call(this, "Rock:", 7, 57, 10);
        GamePage.prototype.drawTextByPercent.call(this, "Population:", 7, 67, 10);
        //draw the number of resources
        GamePage.prototype.drawTextByPercent.call(this, this.eventData.get("resource").get("food"), 18, 37, 10);
        GamePage.prototype.drawTextByPercent.call(this, this.eventData.get("resource").get("wood"), 18, 47, 10);
        GamePage.prototype.drawTextByPercent.call(this, this.eventData.get("resource").get("rock"), 18, 57, 10);
        GamePage.prototype.drawTextByPercent.call(this, this.eventData.get("resource").get("population"), 30, 67, 10);
        //draw the increase and decrease number
        var foodRate = this.eventData.get("resource").get("foodRate");
        if (foodRate >= 0) {
            foodRate = "+" + foodRate;
        }
        GamePage.prototype.drawTextByPercent.call(this, foodRate, 28, 37, 10);
        var woodRate = this.eventData.get("resource").get("woodRate");
        if (woodRate >= 0) {
            woodRate = "+" + woodRate;
        }
        GamePage.prototype.drawTextByPercent.call(this, woodRate, 28, 47, 10);
        var rockRate = this.eventData.get("resource").get("rockRate");
        if (rockRate >= 0) {
            rockRate = "+" + rockRate;
        }
        GamePage.prototype.drawTextByPercent.call(this, rockRate, 28, 57, 10);
    }
};

PlayPage.prototype.drawBuildings = function (locateToCharector) {
    var buildingList = this.eventData.get("buildingList");
    for (var i = 0; i < buildingList.length; i++) {
        var buildingInfo = this.eventData.get("buildingInfoMap").get(buildingList[i].ID);
        var viewWidth = this.mapValueToPercent("size", buildingInfo.mapViewSize) / 3;
        var viewHeight = viewWidth * (buildingList[i].buildImage.height / buildingList[i].buildImage.width) / 2 * 3;
        var startPercentX = this.mapValueToPercent("x", buildingList[i].referX) - viewWidth / 2;
        var startPercentY = this.mapValueToPercent("y", buildingList[i].referY - buildingInfo.mapViewDeltaY) - viewHeight / 2;
        var endPercentX = startPercentX + viewWidth;
        var endPercentY = startPercentY + viewHeight;
        //if the building is outside of view,do not draw it to save resources,calculate the width and height first
        if (!(startPercentX > 100 || startPercentY > 100 || endPercentX < 0 || endPercentY < 0)) {
            //draw the building behind and forward the main role seperately
            var roleY = this.eventData.get("majorRoleState").get("locateY");
            if ((locateToCharector === "behind" && roleY >= buildingList[i].referY) || (locateToCharector === "forward" && roleY < buildingList[i].referY)) {
                GamePage.prototype.drawImageByPercent.call(this, buildingList[i].buildImage, startPercentX, startPercentY, this.mapValueToPercent("size", buildingInfo.mapViewSize));
            }
        }
    }
};

PlayPage.prototype.drawGameMap = function () {
    var sWidth = Math.round(this.gameMap.width * this.zoomFactor);
    var sHeight = Math.round(sWidth / 3 * 2);
    this.pageContextBuffer.drawImage(this.gameMap, Math.round(this.mapStartPointX / 5 * 4), Math.round(this.mapStartPointY / 5 * 4), sWidth, sHeight, 0, 0, Data.viewWidth, Data.viewHeight);
};

PlayPage.prototype.drawMajorRole = function () {
    var way = this.eventData.get("majorRoleState").get("way");
    var action = this.eventData.get("majorRoleState").get("action");
    //calculate the locate in the multiElementPicture
    var locate;
    if (action === "stand") {
        if (way === "up") {
            locate = 11;
        } else if (way === "down") {
            locate = 1;
        } else if (way === "left") {
            locate = 10;
        } else {
            locate = 4;
        }
    } else if (action === "walk1") {
        if (way === "up") {
            locate = 12;
        } else if (way === "down") {
            locate = 2;
        } else if (way === "left") {
            locate = 10;
        } else {
            locate = 4;
        }
    } else if (action === "walk2") {
        if (way === "up") {
            locate = 13;
        } else if (way === "down") {
            locate = 3;
        } else if (way === "left") {
            locate = 9;
        } else {
            locate = 5;
        }
    }
    this.drawMultiElementImage(this.majorRole, locate, this.mapValueToPercent("x", this.eventData.get("majorRoleState").get("locateX") - this.majorRole.size / 2), this.mapValueToPercent("y", this.eventData.get("majorRoleState").get("locateY") - this.majorRole.size), this.mapValueToPercent("size", this.majorRole.size));
};

