'use strict';

(function () {
  var MAIN_PIN_X = 570; // локальная
  var MAIN_PIN_Y = 375; // локальная
  var fieldsets = document.querySelectorAll('fieldset'); // локальная

  var setOriginalAddress = function () {
    document.querySelector('#address').value = MAIN_PIN_X + ', ' + MAIN_PIN_Y;
  }; // локальная

  setOriginalAddress();

  var blocksFieldsets = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
  }; // локальная

  blocksFieldsets();

  var unlocksFieldsets = function () {
    for (var j = 0; j < fieldsets.length; j++) {
      fieldsets[j].disabled = false;
    }
  }; // локальная

  window.pageActivation = {
    setActivePageMode: function () {
      window.data.map.classList.remove('map--faded');
      window.pin.insertPinsToPage(window.data.adsList);
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      unlocksFieldsets();
    } // window для экспорта в main-pin-movement.js
  };
})();
