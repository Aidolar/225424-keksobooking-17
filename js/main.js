'use strict';

var adsList = [];
var APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var NUMBER_OF_ADS = 8;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var MAIN_PIN_X = 570; // вот тут не 600 ли надо прописать?
var MAIN_PIN_Y = 375;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 81; // высота с учетом хвостика
var mapPin = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var housingType = document.querySelector('#type');
var pricePerNightInput = document.querySelector('#price');
var minPrice = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var adHeaderInput = document.querySelector('#title');
var adForm = document.querySelector('.ad-form');
var adFormSubmit = document.querySelector('.ad-form__submit');

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


var setAttributesOnPricePerNightInput = function () {
  for (var i = 0; i < housingType.options.length; i++) {
    var housingOption = housingType.options[i];
    if (housingOption.selected) {
      pricePerNightInput.setAttribute('min', minPrice[housingOption.value.toUpperCase()]);
      pricePerNightInput.placeholder = minPrice[housingOption.value.toUpperCase()];
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  setAttributesOnPricePerNightInput();
});

housingType.addEventListener('change', function () {
  setAttributesOnPricePerNightInput();
});

timeIn.addEventListener('change', function () { // с помощью колбэков сделать единый эвент и использовать его для timeIn и timeOut.
  for (var i = 0; i < timeIn.options.length; i++) {
    var timeInOption = timeIn.options[i];
    if (timeInOption.selected) {
      timeOut.options[i].selected = true;
    }
  }
});

timeOut.addEventListener('change', function () {
  for (var i = 0; i < timeOut.options.length; i++) {
    var timeOutOption = timeOut.options[i];
    if (timeOutOption.selected) {
      timeIn.options[i].selected = true;
    }
  }
});

adHeaderInput.addEventListener('invalid', function () {
  if (adHeaderInput.validity.tooShort) {
    adHeaderInput.setCustomValidity('Заголовок объявления должен содержать минимум 30 символов');
  } else if (adHeaderInput.validity.tooLong) {
    adHeaderInput.setCustomValidity('Заголовок объявления должен содержать максимум 100 символов');
  } else if (adHeaderInput.validity.valueMissing) {
    adHeaderInput.setCustomValidity('Обязательное поле');
  } else {
    adHeaderInput.setCustomValidity('');
  }
});

pricePerNightInput.addEventListener('invalid', function () {
  if (pricePerNightInput.validity.valueMissing) {
    pricePerNightInput.setCustomValidity('Обязательное поле');
  } else if (pricePerNightInput.validity.rangeUnderflow) {
    pricePerNightInput.setCustomValidity('Указанная цена ниже минимально допустимой');
  } else if (pricePerNightInput.validity.rangeOverflow) {
    pricePerNightInput.setCustomValidity('Указанная цена выше максимально допустимой');
  } else {
    pricePerNightInput.setCustomValidity('');
  }
});

adFormSubmit.addEventListener('click', function () {
  adForm.checkValidity();
});
