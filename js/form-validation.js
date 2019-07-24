'use strict';

(function () {
  var minPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var RoomsAndGuests = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var housingType = document.querySelector('#type');
  var pricePerNightInput = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var adHeaderInput = document.querySelector('#title');
  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = document.querySelector('.ad-form__submit');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var allInputs = adForm.querySelectorAll('input');
  var allSelects = adForm.querySelectorAll('select');
  var main = document.querySelector('main');

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

  var errorMessageClickHandler = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('click', errorMessageClickHandler);
    document.removeEventListener('keydown', errorMessageEscapeKeydownHandler);
  };

  var successMessageClickHandler = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('click', successMessageClickHandler);
    document.removeEventListener('keydown', successMessageEscapeKeydownHandler);
    window.pageDeactivation.deactivatePage();
  };

  var errorMessageEscapeKeydownHandler = function (evt) {
    if (evt.keyCode === window.card.ESC_KEYCODE) {
      document.querySelector('.error').remove();
      document.removeEventListener('click', errorMessageClickHandler);
      document.removeEventListener('keydown', errorMessageEscapeKeydownHandler);
    }
  };

  var successMessageEscapeKeydownHandler = function (evt) {
    if (evt.keyCode === window.card.ESC_KEYCODE) {
      document.querySelector('.success').remove();
      document.removeEventListener('click', successMessageClickHandler);
      document.removeEventListener('keydown', successMessageEscapeKeydownHandler);
      window.pageDeactivation.deactivatePage();
    }
  };

  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();
    window.pageDeactivation.deactivatePage();
  };

  var createSuccessMessage = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successNode = successTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', successNode);
    document.addEventListener('click', successMessageClickHandler);
    document.addEventListener('keydown', successMessageEscapeKeydownHandler);
  };

  var createErrorMessage = function (statusMessage) {
    var errorTemplate = document.querySelector('#error')
          .content
          .querySelector('.error');
    var errorNode = errorTemplate.cloneNode(true);
    var errorText = errorNode.querySelector('.error__message');
    errorText.textContent = statusMessage;
    main.insertAdjacentElement('afterbegin', errorNode);
    document.querySelector('.error').addEventListener('click', errorMessageClickHandler);
    document.addEventListener('click', errorMessageClickHandler);
    document.addEventListener('keydown', errorMessageEscapeKeydownHandler);
  };

  resetButton.addEventListener('click', resetButtonClickHandler);

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
    switch (true) {
      case adHeaderInput.validity.tooShort:
        adHeaderInput.setCustomValidity('Заголовок объявления должен содержать минимум 30 символов');
        break;
      case adHeaderInput.validity.tooLong:
        adHeaderInput.setCustomValidity('Заголовок объявления должен содержать максимум 100 символов');
        break;
      case adHeaderInput.validity.valueMissing:
        adHeaderInput.setCustomValidity('Обязательное поле');
        break;

      default:
        adHeaderInput.setCustomValidity('');
    }
  });

  pricePerNightInput.addEventListener('invalid', function () {
    switch (true) {
      case pricePerNightInput.validity.valueMissing:
        pricePerNightInput.setCustomValidity('Обязательное поле');
        break;
      case pricePerNightInput.validity.rangeUnderflow:
        pricePerNightInput.setCustomValidity('Указанная цена ниже минимально допустимой');
        break;
      case pricePerNightInput.validity.rangeOverflow:
        pricePerNightInput.setCustomValidity('Указанная цена выше максимально допустимой');
        break;

      default:
        pricePerNightInput.setCustomValidity('');
    }
  });

  adFormSubmit.addEventListener('click', function () {
    adForm.checkValidity();
    checkGuestsValidity();

    allInputs.forEach(function (item) {
      item.style = '';
      if (item.type !== 'checkbox' && item.checkValidity() === false) {
        item.style = 'outline: 2px solid red;';
      }
    });

    allSelects.forEach(function (item) {
      item.style = '';
      if (item.checkValidity() === false) {
        item.style = 'outline: 2px solid red;';
      }
    });
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.requests.upload(createSuccessMessage, createErrorMessage, new FormData(adForm));
  });

  window.formValidation = {
    adForm: adForm,
    housingType: housingType,
    pricePerNightInput: pricePerNightInput,
    timeIn: timeIn,
    timeOut: timeOut,
    roomNumber: roomNumber,
    capacity: capacity,
    allInputs: allInputs,
    allSelects: allSelects
  };
})();
