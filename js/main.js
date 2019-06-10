'use strict';

var adsList = [];
var APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var NUMBER_OF_ADS = 8;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var mapPin = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

document.querySelector('.map').classList.remove('map--faded');

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
  return (pin);
};

var insertPinsToPage = function (adsArray) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < adsArray.length; j++) {
    fragment.appendChild(createSinglePin(adsArray[j]));
  }
  mapPin.appendChild(fragment);
};

insertPinsToPage(adsList);

/* Пытался создать объекты для вставки в МОК присваивая значения свойств точечной нотацией - не сработало(код ниже).
  Если бы внутри свойств этих объектов не было других объектов и можно было бы задавать свойствам значения без второй точечной нотации
  (имеется ввиду без .type, .x и .y), то все хорошо было бы, ошибки не вылезли бы.

 for (var i = 1; i <= numberOfAds; i++) {
  var ad = {};
  ad.author.avatar = 'img/avatars/user0' + i + '.png';
  ad.offer.type = apartmentTypes[getRandomInt(0, 4)];
  ad.location.x = getRandomInt(0, 1201);
  ad.location.y = getRandomInt(130, 631);
  adsList.push(ad);
}; */
