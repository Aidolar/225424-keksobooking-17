'use strict';

(function () {
  var housingType = document.querySelector('#type'); // локальная
  var pricePerNightInput = document.querySelector('#price'); // локальная
  var minPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  }; // локальная
  var timeIn = document.querySelector('#timein'); // локальная
  var timeOut = document.querySelector('#timeout'); // локальная
  var adHeaderInput = document.querySelector('#title'); // локальная
  var adForm = document.querySelector('.ad-form'); // локальная
  var adFormSubmit = document.querySelector('.ad-form__submit'); // локальная
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var RoomsAndGuests = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var setAttributesOnPricePerNightInput = function () {
    for (var i = 0; i < housingType.options.length; i++) {
      var housingOption = housingType.options[i];
      if (housingOption.selected) {
        pricePerNightInput.setAttribute('min', minPrice[housingOption.value.toUpperCase()]);
        pricePerNightInput.placeholder = minPrice[housingOption.value.toUpperCase()];
      }
    }
  };

  var disableСapacityOptions = function (value) {
    var capacityOptions = capacity.querySelectorAll('option');
    capacityOptions.forEach(function (it) {
      it.disabled = true;
    });
    RoomsAndGuests[value].forEach(function (it) {
      capacity.querySelector('option' + '[value="' + it + '"]').disabled = false;
    });
  };

  var checkGuestsValidity = function () {
    var roomGuests = RoomsAndGuests[roomNumber.value];
    if (!roomGuests.includes(parseInt(capacity.value, 10))) {
      capacity.setCustomValidity('Выбранного количества комнат не хватит для размещения всех гостей');
    }
  };

  var roomNumberChangeHandler = function (evt) {
    evt.target.setCustomValidity('');
    disableСapacityOptions(roomNumber.value);
  };

  var capacityChangeHandler = function (evt) {
    evt.target.setCustomValidity('');
  };

  document.addEventListener('DOMContentLoaded', function () {
    setAttributesOnPricePerNightInput();
    disableСapacityOptions(roomNumber.value);
  });

  housingType.addEventListener('change', function () {
    setAttributesOnPricePerNightInput();
  });

  timeIn.addEventListener('change', function () {
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

  roomNumber.addEventListener('change', roomNumberChangeHandler);
  capacity.addEventListener('change', capacityChangeHandler);

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
    checkGuestsValidity();
  });
})();
