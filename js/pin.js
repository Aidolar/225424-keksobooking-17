'use strict';

(function () {
  var mapPin = document.querySelector('.map__pins'); // локальная
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // локальная
  var adsArray = [];

  var createSinglePin = function (adObject) {
    var pin = pinTemplate.cloneNode(true);
    pin.style = 'left:' + adObject.location.x + 'px; top:' + adObject.location.y + 'px;';
    pin.querySelector('img').src = adObject.author.avatar;
    pin.querySelector('img').alt = adObject.offer.type;
    return pin;
  }; // локальная

  var insertPinsToPage = function (data) {
    var takeNumber = data.length > 5 ? 5 : data.length;
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < takeNumber; j++) {
      fragment.appendChild(createSinglePin(data[j]));
    }
    mapPin.appendChild(fragment);
  }; // локальная


  var housingTypeValue;


  var updatePins = function () {
    var sameHousingTypePins = adsArray.filter(function (item) {
      return item.offer.type === housingTypeValue;
    });
    insertPinsToPage(sameHousingTypePins);
  };

  var housingTypeSelect = document.querySelector('#housing-type');
  // var housingPriceSelect = document.querySelector('#housing-price');
  // var housingRoomsSelect = document.querySelector('#housing-rooms');
  // var housingGuestsSelect = document.querySelector('#housing-guests');


  housingTypeSelect.addEventListener('change', function () {
    for (var i = 0; i < housingTypeSelect.options.length; i++) {
      var housingTypeSelectOption = housingTypeSelect.options[i];
      if (housingTypeSelectOption.selected) {
        housingTypeValue = housingTypeSelectOption.value;
      }
    }
    updatePins();
  });

  window.pin = {

    loadSuccessHandler: function (data) {
      adsArray = data;
      updatePins();
    }, // window для экспорта в page-activation.js

    loadErrorHandler: function (errMessage) {
      var errElement = document.createElement('div');
      errElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: yellow;';
      errElement.style.position = 'absolute';
      errElement.style.width = window.data.map.clientWidth + 'px';
      errElement.style.left = 0;
      errElement.style.right = 0;
      errElement.style.fontSize = '30px';
      errElement.textContent = errMessage;
      document.body.insertAdjacentElement('afterbegin', errElement);
    } // window для экспорта в page-activation.js
  };
})();
