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
    fieldsets.forEach(function (e) {
      e.disabled = true;
    });
    filterSelectors.forEach(function (e) {
      e.disabled = true;
    });
  }; // локальная

  blocksForms();

  var unlocksFieldsets = function () {
    fieldsets.forEach(function (e) {
      e.disabled = false;
    });
    filterSelectors.forEach(function (e) {
      e.disabled = false;
    });
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
