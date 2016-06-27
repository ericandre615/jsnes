'use strict';

/*
* Gamepad Axis
* Axis 1
*  -1 UP
*  1 DOWN
* Axis 2
*  -1 LEFT
*  1 RIGHT
*/

const Gamepad = function() {
  return this;
};

Gamepad.prototype.gamepads = [];
Gamepad.prototype.gamepadPoll = false;
Gamepad.prototype.buttonPressedEvent = new CustomEvent('buttonpressed', {detail: null});

Gamepad.prototype.checkPads = function() {
  console.log(Gamepad.prototype.gamepads);
};

Gamepad.prototype.gamepadHandler = function(event, connecting) {
  let gamepad = event.gamepad;
 
  if(gamepad) {
    if(connecting) {
      console.log(this);
      Gamepad.prototype.gamepads[gamepad.index] = gamepad;
    } else {
      delete Gamepad.prototype.gamepads[gamepad.index];
    }
  }
};

Gamepad.prototype.isButtonPressed = function(btn) {
  if(typeof btn == 'object'){
    return btn.pressed;
  }

  return btn == 1.0;
};

Gamepad.prototype.gamepadListener = function() {
  var gamepads = navigator.getGamepadss ? navigator.getGamepadss() : (navigator.webkitGetGamepadss ? navigator.webkitGetGamepadss : []);
  var gp = gamepads[0];
  if(!gamepads) {
    return;
  }

  Gamepad.prototype.gamepads.forEach(function(pad) {
    var gamepad = navigator.getGamepads()[pad.index];

    for(var i = 0, len = gamepad.buttons.length; i < len; i++) {
      if(Gamepad.prototype.isButtonPressed(gamepad.buttons[i])) {
        //trigger press event
        var buttonPressed = new CustomEvent('buttonpressed', {detail: {id: i, value: `gamepad${i}`, type: 'button', message: true}});
        window.dispatchEvent(buttonPressed);
      } else {
        var buttonPressed = new CustomEvent('buttonpressed', {detail: {id: i, value: `gamepad${i}`, type: 'button', message: false}});
        window.dispatchEvent(buttonPressed);
      }
    }

    for(var j = 0, l = gamepad.axes.length; j < l; j++) {
      if(gamepad.axes[j] !== 0) { 
        var buttonPressed = new CustomEvent('buttonpressed', {detail: {id: j, value: `gamepad-axis-${1}${gamepad.axes[j]}`, type: 'axis', message: true}}); 
        window.dispatchEvent(buttonPressed);
      } else {
        var buttonPressed = new CustomEvent('buttonpressed', {detail: {id: j, value: `gamepad-axis-${1}${gamepad.axes[j]}`, type: 'axis', message: false}}); 
        window.dispatchEvent(buttonPressed);
      }
    }
  });

  Gamepad.prototype.gamepadPoll = requestAnimationFrame(Gamepad.prototype.gamepadListener);
};

Gamepad.prototype.addButtonPressListener = function() {
  window.addEventListener('buttonpressed', function(e) {
    console.log('triggered button press ', e);
    if(e.detail) {
      console.log('details: ', e.detail);
    }
  }, false);
};

Gamepad.prototype.listenForGamepadConnected = function(context){
  window.addEventListener('gamepadconnected', function(e) { 
    console.log('initializing gamepad');
    Gamepad.prototype.gamepadHandler(e, true);
    console.log('Gamepads connected: ',e);
    console.log('Gamepads configured: ', context.gamepads);
    Gamepad.prototype.gamepadListener();
  }, false);
};

Gamepad.prototype.listenForGamepadDisconnected = function(context) {
  window.addEventListener('gamepaddisconnected', function(e) {
    console.log('removing gamepad');
    Gamepad.prototype.gamepadHandler(e, false);
    console.log('Gamepads disconnected: ',e);
    console.log('Gamepads configured: ', context.gamepads);
    cancelAnimationFrame(Gamepad.prototype.gamepadPoll);
  }, false);
};

Gamepad.prototype.init = function() {
  this.listenForGamepadConnected(this);
  this.listenForGamepadDisconnected(this);
};

export default Gamepad;
