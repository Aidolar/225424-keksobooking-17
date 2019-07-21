'use strict';

(function () {
  var textarea = document.querySelector('#description');


  var deactivatePage = function () {

    window.pageActivation.blocksForms();

    // очищает текстовые инпуты и чекбоксы и убирает красные рамки
    window.formValidation.allInputs.forEach(function (item) {
      if (item.type !== 'checkbox') {
        item.value = '';
        item.style = '';
      } else if ((item.type === 'checkbox') && (item.checked)) {
        item.checked = false;
      }
    });

    // возвращает селекты в начальное состояние
    window.formValidation.housingType.selectedIndex = '1';
    window.formValidation.pricePerNightInput.placeholder = '1000';
    window.formValidation.timeIn.selectedIndex = '0';
    window.formValidation.timeOut.selectedIndex = '0';
    window.formValidation.roomNumber.selectedIndex = '0';
    window.formValidation.capacity.selectedIndex = '0';
    window.pin.housingTypeSelect.selectedIndex = '0';
    window.pin.housingPriceSelect.selectedIndex = '0';
    window.pin.housingRoomsSelect.selectedIndex = '0';
    window.pin.housingGuestsSelect.selectedIndex = '0';

    // убирает красные рамки у селектов
    window.formValidation.allSelects.forEach(function (item) {
      item.style = '';
    });

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
    window.pageActivation.map.classList.add('map--faded');
    window.formValidation.adForm.classList.add('ad-form--disabled');

    // возвращает главную метку в исходное положение и прописывает адрес в поле адреса
    window.mainPinMovement.mainPin.style.left = window.pageActivation.MAIN_PIN_X + 'px';
    window.mainPinMovement.mainPin.style.top = window.pageActivation.MAIN_PIN_Y + 'px';
    window.pageActivation.setOriginalAddress();
  };

  window.pageDeactivation = {
    deactivatePage: deactivatePage
  };
})();
