/**
 * Created by clima on 2016/5/28.
 */
//setup

var msPerTick = 1000 / Data.defaultTPS;
var isEventChanged = true;
var menuPage;
var menuEvent;
var playPage;
var playEvent;
var bgm = document.getElementById("BGM");

setup();
/*
 var menuPage = new MenuPage();
 menuPage.refresh();
 */
setInterval(tpsTrigger, msPerTick);

function setup() {
    //set the size of the view of game,make it fill the the whole web page
    var pageCanvas = document.getElementById("view");
    pageCanvas.width = pageCanvas.offsetWidth;
    pageCanvas.height = pageCanvas.offsetHeight;
    //calculate the height and width,maintain 3:2
    var pageCanvasBuffer = document.getElementById("viewBuffer");
    Data.viewHeight = document.getElementById("view").offsetHeight;
    Data.viewWidth = document.getElementById("view").offsetHeight / 2 * 3;
    pageCanvasBuffer.width = Data.viewWidth;
    pageCanvasBuffer.height = Data.viewHeight;
    //for different screen resolution,the size of objects in the game need to be flexible
    //besides width and height,all other objects use this value as the object of reference to enlarge or narrow
    Data.reference = Data.viewHeight / 2;
    //play the background music
    bgm.play();
    bgm.loop = true;
}

function tpsTrigger() {
    //reset key&mouse events
    Data.resetKeysInfo();
    //set the volume of the music
    bgm.volume = Data.music / 100;
    switch (Data.currentEvent) {
        case "menu":
            if (isEventChanged) {
                //need to give the page and event instances
                menuEvent = new MenuEvent();
                menuPage = new MenuPage();
                isEventChanged = false;
            }
            menuPage.refresh(menuEvent.refresh());
            if (Data.currentEvent !== "menu") {
                //release the instance,save memory resources
                menuPage = null;
                menuEvent = null;
                isEventChanged = true;
            }
            break;
        case "play":
            if (isEventChanged) {
                //need to give the page and event instances
                playEvent = new PlayEvent();
                playPage = new PlayPage();
                isEventChanged = false;
            }
            playPage.refresh(playEvent.refresh());
            if (Data.currentEvent !== "play") {
                //release the instance,save memory resources
                playPage = null;
                playEvent = null;
                isEventChanged = true;
            }
            break;
    }
}

function detectKeyboardDown(keyEvent) {
    Data.keyDownBuffer = String.fromCharCode(parseInt(keyEvent.which));
}

function detectKeyboardUp() {
    Data.keyPressBuffer = Data.keyDownBuffer;
    Data.keyDownBuffer = "none";
}

function detectMouseMove(mouseEvent) {
    Data.mousePositionBufferX = mouseEvent.clientX - (document.getElementById("view").width - Data.viewWidth) / 2;
    Data.mousePositionBufferY = mouseEvent.clientY;
}

function detectMouseClick() {
    Data.mouseClickBuffer = true;
}


