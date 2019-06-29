'use strict';

(function () {

  var NUMBER_OF_ADS = 8; // локальная
  var APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo']; // локальная
  var MAP_PIN_WIDTH = 50; // локальная
  var MAP_PIN_HEIGHT = 70; // локальная
  var MIN_Y_COORD = 130; // window для экспорта в main-pin-movement.js
  var MAX_Y_COORD = 630; // window для экспорта в main-pin-movement.js
  var map = document.querySelector('.map'); // window для экспорта в main-pin-movement.js и page-activation.js
  var adsList = []; // window для экспорта в page-activation.js

  // Объявляю функцию генерации целых случайных чисел в заданном диапазоне от min до max не включая max (по этой причине задаю значения max на 1 больше).
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }; // локальная

  var createMock = function () {
    for (var i = 1; i <= NUMBER_OF_ADS; i++) {
      var ad = {
        'author': {
          'avatar': 'img/avatars/user0' + i + '.png'
        },
        'offer': {
          'type': APARTMENT_TYPES[getRandomInt(0, APARTMENT_TYPES.length + 1)]
        },
        'location': {'x': getRandomInt(0, map.clientWidth) - MAP_PIN_WIDTH / 2,
          'y': getRandomInt(MIN_Y_COORD, MAX_Y_COORD + 1) - MAP_PIN_HEIGHT}
      };
      adsList.push(ad);
    }
  }; // локальная

  createMock();

  window.data = {
    MIN_Y_COORD: MIN_Y_COORD,
    MAX_Y_COORD: MAX_Y_COORD,
    map: map,
    adsList: adsList
  };

})();
