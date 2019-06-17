'use strict';

var adsList = [];
var APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var NUMBER_OF_ADS = 8;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var MAIN_PIN_X = 570; // вот тут не 600 ли надо прописать?
var MAIN_PIN_Y = 375;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 87; // высота с учетом хвостика
var mapPin = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var fieldsets = document.querySelectorAll('fieldset');
var mainPin = document.querySelector('.map__pin--main');

// Объявляю функцию генерации целых случайных чисел в заданном диапазоне от min до max не включая max (по этой причине в строках 29, 31 и 32 задаю значения max на 1 больше).
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var createMock = function () {
  for (var i = 1; i <= NUMBER_OF_ADS; i++) {
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'type': APARTMENT_TYPES[getRandomInt(0, 4)]
      },
      'location': {'x': getRandomInt(0, 1201) - MAP_PIN_WIDTH / 2,
        'y': getRandomInt(130, 631) - MAP_PIN_HEIGHT}
    };
    adsList.push(ad);
  }
};

createMock();

var createSinglePin = function (adObject) {
  var pin = pinTemplate.cloneNode(true);
  pin.style = 'left:' + adObject.location.x + 'px; top:' + adObject.location.y + 'px;';
  pin.querySelector('img').src = adObject.author.avatar;
  pin.querySelector('img').alt = adObject.offer.type;
  return pin;
};

var insertPinsToPage = function (adsArray) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < adsArray.length; j++) {
    fragment.appendChild(createSinglePin(adsArray[j]));
  }
  mapPin.appendChild(fragment);
};

document.querySelector('#address').value = MAIN_PIN_X + ', ' + MAIN_PIN_Y;

var blocksFieldsets = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }
};

blocksFieldsets();

var unlocksFieldsets = function () {
  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].disabled = false;
  }
};

var setActivePageMode = function () {
  document.querySelector('.map').classList.remove('map--faded');
  insertPinsToPage(adsList);
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  unlocksFieldsets();
};

function getCoords(elem) {
  return {
    top: elem.offsetTop - MAIN_PIN_HEIGHT,
    left: elem.offsetLeft - Math.floor(MAIN_PIN_WIDTH / 2)
  };
}

var mainPinCoordinates = getCoords(mainPin);

var setAddress = function () {
  var coordX = mainPinCoordinates.left;
  var coordY = mainPinCoordinates.top;
  document.querySelector('#address').value = coordX + ', ' + coordY;
};

var mainPinMouseupHandler = function () {
  setActivePageMode();
  setAddress();
};

mainPin.addEventListener('mouseup', mainPinMouseupHandler);
