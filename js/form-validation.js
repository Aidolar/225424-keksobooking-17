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
})();
