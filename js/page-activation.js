'use strict';

(function () {
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var fieldsets = document.querySelectorAll('fieldset');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var filterSelectors = mapFiltersContainer.querySelectorAll('select');
  var map = document.querySelector('.map');
  var address = document.querySelector('#address');

  var setOriginalAddress = function () {
    address.value = MAIN_PIN_X + ', ' + MAIN_PIN_Y;
  };


  var blocksAndUnblocksForms = function (isUnblocked) {
    fieldsets.forEach(function (e) {
      e.disabled = isUnblocked;
    });
    filterSelectors.forEach(function (e) {
      e.disabled = isUnblocked;
    });
  };

  setOriginalAddress();
  blocksAndUnblocksForms(true);

  window.pageActivation = {
    MAIN_PIN_X: MAIN_PIN_X,
    MAIN_PIN_Y: MAIN_PIN_Y,
    setOriginalAddress: setOriginalAddress,
    blocksAndUnblocksForms: blocksAndUnblocksForms,
    filterSelectors: filterSelectors,
    map: map,
    setActivePageMode: function () {
      map.classList.remove('map--faded');
      window.requests.load(window.pin.loadSuccessHandler, window.pin.loadErrorHandler);
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      blocksAndUnblocksForms(false);
    }
  };
})();
