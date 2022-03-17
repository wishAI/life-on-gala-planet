/**
 * Created by clima on 2016/6/23.
 */
function Map() {
    this.key = [];
    this.value = [];
}

Map.prototype.set = function (key, value) {
    //detect if keys are already exists,if yes override it
    for (var i = 0; i < this.key.length; i++) {
        if (key === this.key[i]) {
            //override data
            this.value[i] = value;
            return false;
        }
    }
    //set new key-values
    this.key.push(key);
    this.value.push(value);
};

Map.prototype.get = function (key) {
    for (var i = 0; i < this.key.length; i++) {
        if (key === this.key[i]) {
            //return the value
            return this.value[i];
        }
    }
    //throw the errors if key not exist
    console.log("error:not such key in map " + key);
};

Map.prototype.remove = function (key) {
    for (var i = 0; i < this.key.length; i++) {
        if (key === this.key[i]) {
            //return the value
            this.key.splice(i, 1);
            this.value.splice(i, 1);
        }
    }
    //throw the errors if key not exist
    //alert("error:not such key in map " + key);
};

Map.prototype.contains = function (key) {
    for (var i = 0; i < this.key.length; i++) {
        if (key === this.key[i]) {
            return true;
        }
    }
    return false;
};

Map.prototype.getKeyByIndex = function (index) {
    return this.key[index];
};

Map.prototype.getValueByIndex = function (index) {
    return this.value[index];
};

Map.prototype.getLength = function () {
    return this.key.length;
};