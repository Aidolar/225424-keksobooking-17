'use strict';

(function () {
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var fieldsets = document.querySelectorAll('fieldset');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var filterSelectors = mapFiltersContainer.querySelectorAll('select');
  var map = document.querySelector('.map');

  var setOriginalAddress = function () {
    document.querySelector('#address').value = MAIN_PIN_X + ', ' + MAIN_PIN_Y;
  };

  var blocksForms = function () {
    fieldsets.forEach(function (e) {
      e.disabled = true;
    });
    filterSelectors.forEach(function (e) {
      e.disabled = true;
    });
  };

  var unlocksFieldsets = function () {
    fieldsets.forEach(function (e) {
      e.disabled = false;
    });
    filterSelectors.forEach(function (e) {
      e.disabled = false;
    });
  };

  setOriginalAddress();
  blocksForms();

  window.pageActivation = {
    MAIN_PIN_X: MAIN_PIN_X,
    MAIN_PIN_Y: MAIN_PIN_Y,
    setOriginalAddress: setOriginalAddress,
    blocksForms: blocksForms,
    filterSelectors: filterSelectors,
    map: map,
    setActivePageMode: function () {
      map.classList.remove('map--faded');
      window.requests.load(window.pin.loadSuccessHandler, window.pin.loadErrorHandler);
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      unlocksFieldsets();
    }
  };
})();
