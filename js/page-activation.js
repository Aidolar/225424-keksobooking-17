'use strict';

(function () {
  var MAIN_PIN_X = 570; // локальная
  var MAIN_PIN_Y = 375; // локальная
  var fieldsets = document.querySelectorAll('fieldset'); // локальная
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var filterSelectors = mapFiltersContainer.querySelectorAll('select');
  var map = document.querySelector('.map'); // window для экспорта в main-pin-movement.js и card.js

  var setOriginalAddress = function () {
    document.querySelector('#address').value = MAIN_PIN_X + ', ' + MAIN_PIN_Y;
  }; // локальная

  setOriginalAddress();

  var blocksForms = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
    for (var k = 0; k < filterSelectors.length; k++) {
      filterSelectors[k].disabled = true;
    }
  }; // локальная

  blocksForms();

  var unlocksFieldsets = function () {
    for (var j = 0; j < fieldsets.length; j++) {
      fieldsets[j].disabled = false;
    }
    for (var n = 0; n < filterSelectors.length; n++) {
      filterSelectors[n].disabled = false;
    }
  }; // локальная

  window.pageActivation = {
    filterSelectors: filterSelectors,
    map: map,
    setActivePageMode: function () {
      map.classList.remove('map--faded');
      window.load(window.pin.loadSuccessHandler, window.pin.loadErrorHandler);
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      unlocksFieldsets();
    } // window для экспорта в main-pin-movement.js
  };
})();
