'use strict';

const Controllers = function() {

    this.buttons = {
        BUTTON_A: 0,
        BUTTON_B: 1,
        BUTTON_SELECT: 2,
        BUTTON_START: 3,
        BUTTON_UP: 4,
        BUTTON_DOWN: 5,
        BUTTON_LEFT: 6,
        BUTTON_RIGHT: 7
    };

    this.state1 = new Array(8);
    for (let i = 0; i < this.state1.length; i++) {
        this.state1[i] = 0x40;
    }
    this.state2 = new Array(8);
    for (let i = 0; i < this.state2.length; i++) {
        this.state2[i] = 0x40;
    }
};

Controllers.prototype = {
    setKey: function(key, value) {
        switch (key) {
            case 88: this.state1[this.keys.KEY_A] = value; break;      // X
            case 89: this.state1[this.keys.KEY_B] = value; break;      // Y (Central European keyboard)
            case 90: this.state1[this.keys.KEY_B] = value; break;      // Z
            case 17: this.state1[this.keys.KEY_SELECT] = value; break; // Right Ctrl
            case 13: this.state1[this.keys.KEY_START] = value; break;  // Enter
            case 38: this.state1[this.keys.KEY_UP] = value; break;     // Up
            case 40: this.state1[this.keys.KEY_DOWN] = value; break;   // Down
            case 37: this.state1[this.keys.KEY_LEFT] = value; break;   // Left
            case 39: this.state1[this.keys.KEY_RIGHT] = value; break;  // Right

            case 103: this.state2[this.keys.KEY_A] = value; break;     // Num-7
            case 105: this.state2[this.keys.KEY_B] = value; break;     // Num-9
            case 99: this.state2[this.keys.KEY_SELECT] = value; break; // Num-3
            case 97: this.state2[this.keys.KEY_START] = value; break;  // Num-1
            case 104: this.state2[this.keys.KEY_UP] = value; break;    // Num-8
            case 98: this.state2[this.keys.KEY_DOWN] = value; break;   // Num-2
            case 100: this.state2[this.keys.KEY_LEFT] = value; break;  // Num-4
            case 102: this.state2[this.keys.KEY_RIGHT] = value; break; // Num-6
            default: return true;
        }
        return false; // preventDefault
    },

    keyDown: function(evt) {
        if (!this.setKey(evt.keyCode, 0x41) && evt.preventDefault) {
            evt.preventDefault();
        }
    },

    keyUp: function(evt) {
        if (!this.setKey(evt.keyCode, 0x40) && evt.preventDefault) {
            evt.preventDefault();
        }
    },

    keyPress: function(evt) {
        evt.preventDefault();
    }
};

module.exports = Controllers;
