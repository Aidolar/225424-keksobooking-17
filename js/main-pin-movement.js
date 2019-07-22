'use strict';

(function () {
  var MIN_Y_COORD = 130;
  var MAX_Y_COORD = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 81;
  var ENTER_KEYCODE = 13;
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    window.pageActivation.setActivePageMode();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentX = mainPin.offsetLeft - shift.x;
      var currentY = mainPin.offsetTop - shift.y;

      if (currentX + Math.floor(MAIN_PIN_WIDTH / 2) >= 0 && currentX + Math.floor(MAIN_PIN_WIDTH / 2) <= window.pageActivation.map.clientWidth) {
        mainPin.style.left = currentX + 'px';
      }

      if (currentY + MAIN_PIN_HEIGHT >= MIN_Y_COORD && currentY + MAIN_PIN_HEIGHT <= MAX_Y_COORD) {
        mainPin.style.top = currentY + 'px';
      }

      var mouseMoveCoordX = currentX + Math.floor(MAIN_PIN_WIDTH / 2);
      var mouseMoveCoordY = currentY + MAIN_PIN_HEIGHT;
      document.querySelector('#address').value = mouseMoveCoordX + ', ' + mouseMoveCoordY;
    };

    var mainPinMouseUpHandler = function () {
      mainPin.style.left = mainPin.offsetLeft + 'px';
      mainPin.style.top = mainPin.offsetTop + 'px';

      var mouseUpCoordX = mainPin.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2);
      var mouseUpCoordY = mainPin.offsetTop + MAIN_PIN_HEIGHT;
      document.querySelector('#address').value = mouseUpCoordX + ', ' + mouseUpCoordY;
      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  });

  var enterKeydownHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.pageActivation.setActivePageMode();
      document.removeEventListener('keydown', enterKeydownHandler);
    }
  };

  mainPin.addEventListener('keydown', enterKeydownHandler);

  window.mainPinMovement = {
    mainPin: mainPin
  };
})();
