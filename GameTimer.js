/**
 * Created by clima on 2016/7/4.
 */
function GameTimer() {
    //count 0 to 4999,the maximum capacity of the timer is 1min
    this.tickCounter = 0;
    this.timerMap = new Map();
}

GameTimer.prototype.timerTrigger = function () {
    this.tickCounter = this.getPlusTime(1);
    this.recycleExpiredTimer();
};

GameTimer.prototype.setTimer = function (key, time) {
    //store the count where time is passed
    this.timerMap.set(key, this.getPlusTime(time));
};

GameTimer.prototype.isTimerFinished = function (key) {
    if (this.timerMap.get(key) == this.tickCounter) {
        this.timerMap.remove(key);
        return true;
    } else {
        return false;
    }
};

GameTimer.prototype.removeTimer = function (key) {
    this.timerMap.remove(key);
};

GameTimer.prototype.lapsRecording = function (key, time) {
    if (!this.timerMap.contains(key)) {
        //set up a key
        this.setTimer(key, time);
        return false;
    } else if (this.isTimerFinished(key)) {
        this.setTimer(key, time);
        return true;
    } else {
        return false;
    }
};

GameTimer.prototype.recycleExpiredTimer = function () {
    for (var i = 0; i < this.timerMap.getLength(); i++) {
        if (this.tickCounter == 0 && this.timerMap.getValueByIndex(i) == 4999) {
            this.removeTimer(this.timerMap.getKeyByIndex(i));
        } else if (this.tickCounter - 1 == this.timerMap.getValueByIndex(i)) {
            this.removeTimer(this.timerMap.getKeyByIndex(i));
        }
    }
};

GameTimer.prototype.getPlusTime = function (time) {
    var counterBuffer = this.tickCounter + time;
    if (counterBuffer >= 5000) {
        counterBuffer -= 5000;
    }
    return counterBuffer;
};

