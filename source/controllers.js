'use strict';

let defaultConfig = {
  player_one: {
    type: 'keyboard',
    mapping: {
      A: 88,
      B: 90,
      SELECT: 17,
      START: 13,
      UP: 38,
      DOWN: 40,
      LEFT: 37,
      RIGHT: 39
    }
  },
  player_two: {
    type: 'keyboard',
    mapping: {
      A: 103,
      B: 105,
      SELECT: 99,
      START: 97,
      UP: 104,
      DOWN: 98,
      LEFT: 100,
      RIGHT: 102
    }
  }
}

const Controllers = function(config = defaultConfig) {

    this.config = config;
    this.buttons = {
        A: 0,
        B: 1,
        SELECT: 2,
        START: 3,
        UP: 4,
        DOWN: 5,
        LEFT: 6,
        RIGHT: 7
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
    setButton: function(button, value) {
        switch (button) {
            case (this.config.player_one.mapping.A): this.state1[this.buttons.A] = value; break;      // X
            case (this.config.player_one.mapping.B): this.state1[this.buttons.B] = value; break;      // Z
            case (this.config.player_one.mapping.SELECT): this.state1[this.buttons.SELECT] = value; break; // Right Ctrl
            case (this.config.player_one.mapping.START): this.state1[this.buttons.START] = value; break;  // Enter
            case (this.config.player_one.mapping.UP): this.state1[this.buttons.UP] = value; break;     // Up
            case (this.config.player_one.mapping.DOWN): this.state1[this.buttons.DOWN] = value; break;   // Down
            case (this.config.player_one.mapping.LEFT): this.state1[this.buttons.LEFT] = value; break;   // Left
            case (this.config.player_one.mapping.RIGHT): this.state1[this.buttons.RIGHT] = value; break;  // Right

            case (this.config.player_two.mapping.A): this.state2[this.buttons.A] = value; break;     // Num-7
            case (this.config.player_two.mapping.B): this.state2[this.buttons.B] = value; break;     // Num-9
            case (this.config.player_two.mapping.SELECT): this.state2[this.buttons.SELECT] = value; break; // Num-3
            case (this.config.player_two.mapping.START): this.state2[this.buttons.START] = value; break;  // Num-1
            case (this.config.player_two.mapping.UP): this.state2[this.buttons.UP] = value; break;    // Num-8
            case (this.config.player_two.mapping.DOWN): this.state2[this.buttons.DOWN] = value; break;   // Num-2
            case (this.config.player_two.mapping.LEFT): this.state2[this.buttons.LEFT] = value; break;  // Num-4
            case (this.config.player_two.mapping.RIGHT): this.state2[this.buttons.RIGHT] = value; break; // Num-6
            default: return true;
        }
        return false; // preventDefault
    },

    buttonDown: function(evt, type) {
        let buttonPressed = (type === 'keyboard') ? evt.keyCode : evt.detail.value;
        //evt.keyCode
        if (!this.setButton(buttonPressed, 0x41) && evt.preventDefault) {
            evt.preventDefault();
        }
    },

    buttonUp: function(evt, type) {
        let buttonPressed = (type === 'keyboard') ? evt.keyCode : false;
        if (!this.setButton(buttonPressed, 0x40) && evt.preventDefault) {
            evt.preventDefault();
        }
    },

    buttonPress: function(evt, type) {
        evt.preventDefault();
    }
};

Controllers.prototype.configureButton = function(player = 'player_one', type = 'keyboard', button = null, setButton = 'A') {
  this.config[player].mapping[setButton] = button;
  console.log('mapping button');
  this.config([player].mapping);
  return this;
}

Controllers.prototype.configureAllButtons = function(player = 'player_one', type = 'keyboard', mapping) {

}

export default Controllers;
