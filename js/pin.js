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
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (e) {
      e.remove();
    });
    for (var j = 0; j < takeNumber; j++) {
      fragment.appendChild(createSinglePin(data[j]));
    }
    mapPin.appendChild(fragment);
  }; // локальная


  var housingTypeValue = 'any';


  var updatePins = function () {
    if (housingTypeValue !== 'any') {
      var sameHousingTypePins = adsArray.filter(function (item) {
        return item.offer.type === housingTypeValue;
      });
      insertPinsToPage(sameHousingTypePins);
    } else {
      insertPinsToPage(adsArray);
    }
  };

  var housingTypeSelect = document.querySelector('#housing-type');
  // var housingPriceSelect = document.querySelector('#housing-price');
  // var housingRoomsSelect = document.querySelector('#housing-rooms');
  // var housingGuestsSelect = document.querySelector('#housing-guests');


  housingTypeSelect.addEventListener('change', function () {
    housingTypeValue = housingTypeSelect.value;
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
