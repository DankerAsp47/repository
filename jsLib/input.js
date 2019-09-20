/* Version 2.0 - 2-Feb-2019
 * This file is adapted from
 * http://jlongster.com/Making-Sprite-based-Games-with-Canvas
 * Please do not re-distribute without permission
 *
 * ARP 28/07/2014
 *
 */


(function() {
  var pressedKeys = {};
  var pressedSpecialKeys = {};

  function setKey(event, status) {
    var code = event.keyCode;
    var key;

    if (event.ctrlKey) {
      pressedSpecialKeys['CTRL'] = status;
    }
    if (event.shiftKey) {
      pressedSpecialKeys['SHIFT'] = status;
    }
    if (event.altKey) {
      pressedSpecialKeys['ALT'] = status;
    }
    if (event.metaKey) {
      pressedSpecialKeys['META'] = status;
    }

    switch (code) {
      case 16:
        key = 'SHIFT';
        break;
      case 17:
        key = 'CTRL';
        break;
      case 32:
        key = 'SPACE';
        break;
      case 37:
        key = 'LEFT';
        break;
      case 38:
        key = 'UP';
        break;
      case 39:
        key = 'RIGHT';
        break;
      case 40:
        key = 'DOWN';
        break;
      default:
        // Convert ASCII codes to letters
        key = String.fromCharCode(code);
    }

    pressedKeys[key] = status;

  }

  document.addEventListener('keydown', function(e) {
    setKey(e, true);
  });

  document.addEventListener('keyup', function(e) {
    setKey(e, false);
  });

  window.addEventListener('blur', function() {
    pressedKeys = {};
  });

  window.input = {
    isDown: function(key) {
      return pressedKeys[key.toUpperCase()];
    },
    isSpecialDown: function(key) {
      return pressedSpecialKeys[key.toUpperCase()];
    }
  };
})();
