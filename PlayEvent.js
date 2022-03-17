/**
 * Created by clima on 2016/7/4.
 */
function PlayEvent() {
    //divide the map to 1000*1000 for coordinate of map element
    GameEvent.call(this);
    this.majorRoleState = new Map();
    this.majorRoleState.set("locateX", 320);
    this.majorRoleState.set("locateY", 700);
    this.majorRoleState.set("way", "left");
    this.majorRoleState.set("action", "stand");
    this.eventData.set("majorRoleState", this.majorRoleState);
    //setup the resources amount in the game
    var resource = new Map();
    resource.set("wood", 30);
    resource.set("food", 50);
    resource.set("rock", 0);
    resource.set("population", 3);
    resource.set("woodRate", 0);
    resource.set("foodRate", 0);
    resource.set("rockRate", 0);
    this.eventData.set("resource", resource);
    //setup the buildmode
    var buildMode = new Map();
    buildMode.set("enable", false);
    buildMode.set("referX", null);
    buildMode.set("referY", null);
    buildMode.set("type", null);
    buildMode.set("buildFlag", false);
    this.eventData.set("buildMode", buildMode);
    //need subUIs for building and resources
    this.eventData.set("subUI", "none");
    //setup buttons
    var buttonList = this.eventData.get("buttons");
    var buttonBuild = new GameButton("image", "assets/pictures/iconBuilding.png", "build");
    buttonBuild.setViewArea(5, 85, 20);
    buttonBuild.setClickArea(5, 85, 15, 95);
    buttonList.push(buttonBuild);
    var buttonResource = new GameButton("image", "assets/pictures/iconResource.png", "resource");
    buttonResource.setViewArea(15, 85, 20);
    buttonResource.setClickArea(15, 85, 25, 95);
    buttonList.push(buttonResource);
    //make the buttons for the build subUI
    var subButtonList = ["smallHouse", "middleHouse", "bigHouse", "buildFarm", "buildWood", "buildMine"];
    for (var i = 0; i < 6; i++) {
        var subButton = new GameButton("image", "assets/pictures/" + subButtonList[i] + ".png", subButtonList[i]);
        subButton.setViewArea(5 + 15 * i, 37, 30);
        subButton.setClickArea(5 + 15 * i, 37, 15 + 15 * i, 80);
        buttonList.push(subButton);
    }
    //setup landform on the map
    this.eventData.set("landform", []);
    var landformList = this.eventData.get("landform");
    var shipLand = new GameLandform("ship");
    shipLand.addLocation(1, 500, 250, 850);
    shipLand.addLocation(240, 600, 300, 750);
    landformList.push(shipLand);
    var rockLand = new GameLandform("rock");
    rockLand.addLocation(1, 140, 120, 500);
    rockLand.addLocation(1, 850, 290, 900);
    landformList.push(rockLand);
    var waterLand = new GameLandform("water");
    waterLand.addLocation(1, 900, 580, 1000);
    waterLand.addLocation(580, 730, 1000, 1000);
    landformList.push(waterLand);
    var mountainLand = new GameLandform("mountain");
    mountainLand.addLocation(530, 1, 1000, 210);
    landformList.push(mountainLand);
    var treeLand = new GameLandform("tree");
    treeLand.addLocation(1, 1, 530, 90);
    treeLand.addLocation(900, 210, 1000, 730);
    landformList.push(treeLand);
    //setup the building list
    this.eventData.set("buildingList", []);
    //setup building info
    var buildingInfoMap = new Map();
    buildingInfoMap.set("smallHouse", {
        mapViewDeltaY: 18,
        mapViewSize: 70,
        hitboxLength: 85,
        hitboxHeight: 30,
        imagePath: "assets/pictures/smallHouse.png",
        produceType: "population",
        consumeType: "food",
        produceAmount: 2,
        consumeAmount: 1,
        requireType: "wood",
        requireAmount: 4,
        landform: "normal"
    });
    buildingInfoMap.set("middleHouse", {
        mapViewDeltaY: 30,
        mapViewSize: 90,
        hitboxLength: 100,
        hitboxHeight: 40,
        imagePath: "assets/pictures/middleHouse.png",
        produceType: "population",
        consumeType: "food",
        produceAmount: 4,
        consumeAmount: 2,
        requireType: "wood",
        requireAmount: 10,
        landform: "normal"
    });
    buildingInfoMap.set("bigHouse", {
        mapViewDeltaY: 40,
        mapViewSize: 160,
        hitboxLength: 170,
        hitboxHeight: 50,
        imagePath: "assets/pictures/bigHouse.png",
        produceType: "population",
        consumeType: "food",
        produceAmount: 16,
        consumeAmount: 6,
        requireType: "rock",
        requireAmount: 12,
        landform: "normal"
    });
    buildingInfoMap.set("buildWood", {
        mapViewDeltaY: 10,
        mapViewSize: 130,
        hitboxLength: 130,
        hitboxHeight: 100,
        imagePath: "assets/pictures/buildWood.png",
        produceType: "wood",
        consumeType: "population",
        produceAmount: 8,
        consumeAmount: 3,
        requireType: "wood",
        requireAmount: 10,
        landform: "tree"
    });
    buildingInfoMap.set("buildFarm", {
        mapViewDeltaY: 0,
        mapViewSize: 100,
        hitboxLength: 100,
        hitboxHeight: 100,
        imagePath: "assets/pictures/buildFarm.png",
        produceType: "food",
        consumeType: "population",
        produceAmount: 10,
        consumeAmount: 2,
        requireType: "wood",
        requireAmount: 6,
        landform: "normal"
    });
    buildingInfoMap.set("buildMine", {
        mapViewDeltaY: 0,
        mapViewSize: 130,
        hitboxLength: 110,
        hitboxHeight: 110,
        imagePath: "assets/pictures/buildMine.png",
        produceType: "rock",
        consumeType: "population",
        produceAmount: 5,
        consumeAmount: 6,
        requireType: "wood",
        requireAmount: 20,
        landform: "mountain"
    });
    this.eventData.set("buildingInfoMap", buildingInfoMap);
}

PlayEvent.prototype = new GameEvent();

PlayEvent.prototype.refresh = function () {
    this.gameTimer.timerTrigger();
    //set the required elements
    this.interaction();
    if (this.eventData.get("subUI") === "build") {
        GameEvent.prototype.setRequireElement.call(this, "buttons", ["build", "resource", "smallHouse", "middleHouse", "bigHouse", "buildFarm", "buildWood", "buildMine"]);
    } else {
        GameEvent.prototype.setRequireElement.call(this, "buttons", ["build", "resource"]);
    }
    var buildingIdList = [];
    var buildingList = this.eventData.get("buildingList");
    for (var i = 0; i < buildingList.length; i++) {
        if (buildingIdList.indexOf(buildingList[i].ID) == -1) {
            //push it to the array
            buildingIdList.push(buildingList[i].ID);
        }
    }
    //then set the image of buildings,get an array that include all the ids of buildings
    GameEvent.prototype.setRequireElement.call(this, "buildingList", buildingIdList);
    return this.eventData;
};

PlayEvent.prototype.compareBuildings = function (a, b) {
    return a.referY - b.referY;
};

PlayEvent.prototype.interaction = function () {
    GameEvent.prototype.interaction.call(this);
    this.buttonEvent();
    this.majorRoleWalk();
    if (this.eventData.get("buildMode").get("enable")) {
        this.buildMode();
    }
    this.refreshResources();
    this.eventData.get("buildingList").sort(this.compareBuildings);
};

PlayEvent.prototype.buttonEvent = function () {
    var selectedButton = this.eventData.get("selectedButton");
    if (Data.mouseClick) {
        switch (selectedButton) {
            case "build":
                if (this.eventData.get("subUI") === "build") {
                    this.eventData.set("subUI", "none");
                } else {
                    this.eventData.set("subUI", "build");
                }
                break;
            case "resource":
                if (this.eventData.get("subUI") === "resource") {
                    this.eventData.set("subUI", "none");
                } else {
                    this.eventData.set("subUI", "resource");
                }
                break;
            case "none":
                this.eventData.set("subUI", "none");
                break;
            default :
                //close the subUI
                this.eventData.set("subUI", "none");
                //click on the building buttons,enable the building mode if the resources are enough
                var buildingInfo = this.eventData.get("buildingInfoMap").get(selectedButton);
                if (buildingInfo.requireAmount <= this.eventData.get("resource").get(buildingInfo.requireType) && buildingInfo.consumeAmount <= this.eventData.get("resource").get(buildingInfo.consumeType)) {
                    //take the resources the building needs and set the rate of changing the resources
                    this.eventData.get("resource").set(buildingInfo.requireType, this.eventData.get("resource").get(buildingInfo.requireType) - buildingInfo.requireAmount);
                    if (buildingInfo.consumeType === "population") {
                        this.eventData.get("resource").set("population", this.eventData.get("resource").get("population") - buildingInfo.consumeAmount);
                    }
                    if (buildingInfo.produceType === "population") {
                        this.eventData.get("resource").set("population", this.eventData.get("resource").get("population") + buildingInfo.produceAmount);
                    }
                    var buildMode = this.eventData.get("buildMode");
                    buildMode.set("enable", true);
                    buildMode.set("type", selectedButton);
                }
                break;
        }
    }
};

PlayEvent.prototype.buildMode = function () {
    //calculate the reference point by the charactor location,ways and the hitbox size
    var type = this.eventData.get("buildMode").get("type");
    var referX, referY;
    var roleX = this.majorRoleState.get("locateX");
    var roleY = this.majorRoleState.get("locateY");
    var roleWay = this.majorRoleState.get("way");
    var buildingInfo = this.eventData.get("buildingInfoMap").get(type);
    var deltaX = buildingInfo.hitboxLength / 2 + 6;
    var deltaY = buildingInfo.hitboxHeight / 2 + 6;
    switch (roleWay) {
        case "up":
            referX = roleX;
            referY = roleY - deltaY;
            break;
        case "down":
            referX = roleX;
            referY = roleY + deltaY;
            break;
        case "left":
            referX = roleX - deltaX;
            referY = roleY;
            break;
        case "right":
            referX = roleX + deltaX;
            referY = roleY;
            break;
    }
    //determine if the building can be build in current location and store it in the buildFlag
    var buildFlag = false;
    for (var x = referX - buildingInfo.hitboxLength / 2; x <= referX + buildingInfo.hitboxLength / 2; x++) {
        var breakFlag = false;
        for (var y = referY - buildingInfo.hitboxHeight / 2; y <= referY + buildingInfo.hitboxHeight / 2; y++) {
            if (this.typeOfMapPoint(x, y) === buildingInfo.landform) {
                buildFlag = true;
            } else if (this.typeOfMapPoint(x, y) !== "normal") {
                buildFlag = false;
                breakFlag = true;
                break;
            }
        }
        if (breakFlag) {
            break;
        }
    }
    //process the key event,build or cancel
    if (Data.keyPress === "J" && buildFlag) {
        //create new building
        var building = new GameBuilding(type, buildingInfo);
        building.setReference(referX, referY);
        this.eventData.get("buildingList").push(building);
        //play the sound when put the building
        GameEvent.prototype.playSound.call(this, "build");
        this.eventData.get("buildMode").set("enable", false);
    } else if (Data.keyPress === "K") {
        //exit the building mode
        this.eventData.get("buildMode").set("enable", false);
        //turn back the resources
        this.eventData.get("resource").set(buildingInfo.requireType, this.eventData.get("resource").get(buildingInfo.requireType) + buildingInfo.requireAmount);
        if (buildingInfo.consumeType === "population") {
            this.eventData.get("resource").set("population", this.eventData.get("resource").get("population") + buildingInfo.consumeAmount);
        }
        if (buildingInfo.produceType === "population") {
            this.eventData.get("resource").set("population", this.eventData.get("resource").get("population") - buildingInfo.produceAmount);
        }
    }
    //save the info
    this.eventData.get("buildMode").set("referX", referX);
    this.eventData.get("buildMode").set("referY", referY);
    this.eventData.get("buildMode").set("buildFlag", buildFlag);
};

PlayEvent.prototype.refreshResources = function () {
    //calculate the increase rate from the buildingList
    var buildingList = this.eventData.get("buildingList");
    var woodRate = 0;
    var foodRate = 0;
    var rockRate = 0;
    for (var i = 0; i < buildingList.length; i++) {
        if (buildingList[i].getProduce().type === "wood") {
            woodRate += buildingList[i].getProduce().amount;
        } else if (buildingList[i].getProduce().type === "food") {
            foodRate += buildingList[i].getProduce().amount;
        } else if (buildingList[i].getProduce().type === "rock") {
            rockRate += buildingList[i].getProduce().amount;
        }
        if (buildingList[i].getConsume().type === "wood") {
            woodRate -= buildingList[i].getConsume().amount;
        } else if (buildingList[i].getConsume().type === "food") {
            foodRate -= buildingList[i].getConsume().amount;
        } else if (buildingList[i].getConsume().type === "rock") {
            rockRate -= buildingList[i].getConsume().amount;
        }
    }
    //save the rate into eventData
    this.eventData.get("resource").set("woodRate", woodRate);
    this.eventData.get("resource").set("foodRate", foodRate);
    this.eventData.get("resource").set("rockRate", rockRate);
    const refreshTime = 400;
    if (this.gameTimer.lapsRecording("resource", refreshTime)) {
        //increase and decrease the resources
        var resource = this.eventData.get("resource");
        if (resource.get("food") + resource.get("foodRate") > 0) {
            resource.set("food", resource.get("food") + resource.get("foodRate"));
        }
        if (resource.get("wood") + resource.get("woodRate") > 0) {
            resource.set("wood", resource.get("wood") + resource.get("woodRate"));
        }
        if (resource.get("rock") + resource.get("rockRate") > 0) {
            resource.set("rock", resource.get("rock") + resource.get("rockRate"));
        }
    }
};

PlayEvent.prototype.majorRoleWalk = function () {
    const tickPerStep = 10;
    const tickPerPoint = 1;
    //process the step first
    if (Data.keyDown !== "none") {
        //change the walk style
        if (this.gameTimer.lapsRecording("walkView", tickPerStep)) {
            //change the walk style
            if (this.majorRoleState.get("action") === "walk2") {
                this.majorRoleState.set("action", "walk1");
            } else {
                this.majorRoleState.set("action", "walk2");
            }
        }
    } else {
        //remove the timer
        this.gameTimer.removeTimer("walkView");
        //set to the stand mode
        this.majorRoleState.set("action", "stand");
    }
    //process the location when binding the ways to keys
    var locateX = this.majorRoleState.get("locateX");
    var locateY = this.majorRoleState.get("locateY");
    switch (Data.keyDown) {
        case "W":
            //change the charactor way
            this.majorRoleState.set("way", "up");
            if (this.gameTimer.lapsRecording("walk", tickPerPoint)) {
                locateY--;
            }
            break;
        case "A":
            //change the charactor way
            this.majorRoleState.set("way", "left");
            if (this.gameTimer.lapsRecording("walk", tickPerPoint)) {
                locateX--;
            }
            break;
        case "S":
            //change the charactor way
            this.majorRoleState.set("way", "down");
            if (this.gameTimer.lapsRecording("walk", tickPerPoint)) {
                locateY++;
            }
            break;
        case "D":
            //change the charactor way
            this.majorRoleState.set("way", "right");
            if (this.gameTimer.lapsRecording("walk", tickPerPoint)) {
                locateX++;
            }
            break;
    }
    //if there is some barriers,do not move,??play some sound??
    if (this.typeOfMapPoint(locateX, locateY) === "normal") {
        this.majorRoleState.set("locateX", locateX);
        this.majorRoleState.set("locateY", locateY);
        this.eventData.set("majorRoleState", this.majorRoleState);
    }
};


PlayEvent.prototype.typeOfMapPoint = function (x, y) {
    //detect if out of range
    if (x < 1 || x > 1000 || y < 1 || y > 1000) {
        return "out";
    }
    //detect the buildings
    var buildingList = this.eventData.get("buildingList");
    for (var i = 0; i < buildingList.length; i++) {
        if (buildingList[i].isPointInHitBox(x, y)) {
            return "building";
        }
    }
    //detect if in special landform
    var landformList = this.eventData.get("landform");
    for (var i = 0; i < landformList.length; i++) {
        if (landformList[i].isPointIn(x, y)) {
            return landformList[i].type;
        }
    }
    //return normal if not special things
    return "normal";
};