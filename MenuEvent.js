/**
 * Created by clima on 2016/6/20.
 */
function MenuEvent() {
    GameEvent.call(this);
    this.eventData.set("state_UI", "main");
    //setup buttons
    var buttonList = this.eventData.get("buttons");
    var playButton = new GameButton("text", "Play", "play");
    playButton.setViewArea(10, 30, 20);
    playButton.setClickArea(10, 20, 30, 35);
    buttonList.push(playButton);
    var optionsButton = new GameButton("text", "Options", "options");
    optionsButton.setViewArea(10, 45, 20);
    optionsButton.setClickArea(10, 35, 50, 50);
    buttonList.push(optionsButton);
    var aboutButton = new GameButton("text", "About", "about");
    aboutButton.setViewArea(10, 60, 20);
    aboutButton.setClickArea(10, 50, 40, 65);
    buttonList.push(aboutButton);
    var backButton = new GameButton("canvas", "back", "back");
    backButton.setViewArea(5, 5, 10);
    backButton.setClickArea(5, 5, 15, 15);
    buttonList.push(backButton);
}

MenuEvent.prototype = new GameEvent();
//setup default UI to main,there's also options and about UI

MenuEvent.prototype.refresh = function () {
    this.interaction();
    return this.eventData;
};

MenuEvent.prototype.interaction = function () {
    GameEvent.prototype.interaction.call(this);
    var selectedButton = this.eventData.get("selectedButton");
    switch (this.eventData.get("state_UI")) {
        case "main":
            //require 3 main buttons
            GameEvent.prototype.setRequireElement.call(this, "buttons", ["play", "options", "about"]);
            //if click on buttons,try to switch events
            if (Data.mouseClick) {
                if (selectedButton === "play") {
                    Data.currentEvent = "play";
                } else if (selectedButton === "options") {
                    this.eventData.set("state_UI", "options");
                } else if (selectedButton === "about") {
                    this.eventData.set("state_UI", "about");
                }
            }
            break;
        case "options":
            //only require back button
            GameEvent.prototype.setRequireElement.call(this, "buttons", ["back"]);
            if (Data.mouseClick) {
                if (selectedButton === "back") {
                    this.eventData.set("state_UI", "main");
                    //control the music and the sound as a bar
                } else if (GameEvent.prototype.isMouseInAreaByPercent.call(this, 20, 30, 80, 40)) {
                    //music
                    Data.music = Math.round((GameEvent.prototype.getMousePercentX.call(this) - 20) * 100 / 60);
                } else if (GameEvent.prototype.isMouseInAreaByPercent.call(this, 20, 60, 80, 70)) {
                    //sound
                    Data.sound = Math.round((GameEvent.prototype.getMousePercentX.call(this) - 20) * 100 / 60);
                }
            }
            break;
        case "about":
            //only require back button
            GameEvent.prototype.setRequireElement.call(this, "buttons", ["back"]);
            if (Data.mouseClick) {
                if (selectedButton == "back") {
                    this.eventData.set("state_UI", "main");
                }
            }
            break;
    }
};

