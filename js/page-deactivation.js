'use strict';

(function () {
  var allInputs = document.querySelectorAll('input');
  var textarea = document.querySelector('#description');

  var housingType = document.querySelector('#type');
  var pricePerNightInput = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');

  var deactivatePage = function () {

    window.pageActivation.blocksForms();

    // очищает текстовые инпуты и чекбоксы
    allInputs.forEach(function (item) {
      if (item.type !== 'checkbox') {
        item.value = '';
      } else if ((item.type === 'checkbox') && (item.checked)) {
        item.checked = false;
      }
    });

    // возвращает селекты в начальное состояние
    housingType.selectedIndex = '1';
    pricePerNightInput.placeholder = '1000';
    timeIn.selectedIndex = '0';
    timeOut.selectedIndex = '0';
    roomNumber.selectedIndex = '0';
    capacity.selectedIndex = '0';
    housingTypeSelect.selectedIndex = '0';
    housingPriceSelect.selectedIndex = '0';
    housingRoomsSelect.selectedIndex = '0';
    housingGuestsSelect.selectedIndex = '0';

    // приводит объекты-фильтры в начальное состояние
    window.pin.filters.forEach(function (item) {
      if (item.selectedOption && item.selectedOption !== 'any') {
        item.selectedOption = 'any';
      } else if (item.checkboxValue && item.checkboxValue !== '') {
        item.checkboxValue = '';
      }
    });

    // очищает textarea
    textarea.value = '';

    // удаляет карточку
    var displayedCard = document.querySelector('.popup');
    if (displayedCard) {
      displayedCard.remove();
    }

    // удаляет пины
    var displayedPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    displayedPins.forEach(function (item) {
      item.remove();
    });

    // возвращает затемнение карты и формы
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');

    // возвращает главную метку в исходное положение и прописывает адрес в поле адреса
    window.mainPinMovement.mainPin.style.left = window.pageActivation.MAIN_PIN_X + 'px';
    window.mainPinMovement.mainPin.style.top = window.pageActivation.MAIN_PIN_Y + 'px';
    window.pageActivation.setOriginalAddress();
  };

  window.pageDeactivation = {
    deactivatePage: deactivatePage
  };
})();
