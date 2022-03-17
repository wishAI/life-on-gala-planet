/**
 * Created by clima on 2016/6/15.
 */
function MenuPage() {
    GamePage.call(this);
    this.background = new Image();
    this.background.src = "assets/pictures/menu.png";
}

//extends the GamePage class
MenuPage.prototype = new GamePage();

MenuPage.prototype.refresh = function (eventData) {
    this.eventData = eventData;
    this.drawElements();
    this.releaseCanvasBuffer.call(this);
};

MenuPage.prototype.drawElements = function () {
    //draw the background first
    GamePage.prototype.fillBackGround.call(this, this.background);
    switch (this.eventData.get("state_UI")) {
        case "main":
            //only buttons, no other things
            break;
        case "options":
            //draw two titles for the bar
            this.pageContextBuffer.fillStyle = "white";
            GamePage.prototype.drawTextByPercent.call(this, "Music:", 5, 37, 13);
            GamePage.prototype.drawTextByPercent.call(this, "Sound:", 5, 67, 13);
            //draw two bars
            GamePage.prototype.fillColorByPercent.call(this, "white", 20, 30, 80, 40);
            GamePage.prototype.fillColorByPercent.call(this, "white", 20, 60, 80, 70);
            //draw point on the bar
            GamePage.prototype.fillColorByPercent.call(this, "green", Data.music * 0.6 + 16, 30, Data.music * 0.6 + 24, 40);
            GamePage.prototype.fillColorByPercent.call(this, "green", Data.sound * 0.6 + 16, 60, Data.sound * 0.6 + 24, 70);
            break;
        case "about":
            //draw some texts
            this.pageContextBuffer.fillStyle = "white";
            GamePage.prototype.drawTextByPercent.call(this, "Life on the Gala planet", 20, 30, 10);
            GamePage.prototype.drawTextByPercent.call(this, "version 1.0", 20, 40, 10);
            GamePage.prototype.drawTextByPercent.call(this, "Thanks to:", 20, 50, 10);
            GamePage.prototype.drawTextByPercent.call(this, "OpenGameArt", 20, 60, 10);
            break;
    }
    GamePage.prototype.drawElements.call(this);
};

