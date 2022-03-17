/**
 * Created by clima on 2016/6/19.
 */
function Data() {

}

Data.defaultTPS = 50;
Data.currentEvent = "menu";
Data.viewWidth = null;
Data.viewHeight = null;
Data.reference = null;
Data.keyDownBuffer = "none";
Data.keyPressBuffer = "none";
Data.mousePositionBufferX = 0;
Data.mousePositionBufferY = 0;
Data.mouseClickBuffer = false;
Data.keyDown = "none";
Data.keyPress = "none";
Data.mousePositionX = 0;
Data.mousePositionY = 0;
Data.mouseClick = false;
Data.music = 50;
Data.sound = 50;
Data.resetKeysInfo = function () {
    //mouse click event
    Data.mouseClick = false;
    if (Data.mouseClickBuffer) {
        Data.mouseClick = true;
        Data.mouseClickBuffer = false;
    }
    //mouse position
    Data.mousePositionX = Data.mousePositionBufferX;
    Data.mousePositionY = Data.mousePositionBufferY;
    //keyboard press
    Data.keyPress = "none";
    if (Data.keyPressBuffer !== "none") {
        Data.keyPress = Data.keyPressBuffer;
        Data.keyPressBuffer = "none";
    }
    //key down
    Data.keyDown = Data.keyDownBuffer;
};

Data.setup = function () {

};
