'use strict';

(function () {
  var mapPin = document.querySelector('.map__pins'); // локальная
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // локальная

  var createSinglePin = function (adObject) {
    var pin = pinTemplate.cloneNode(true);
    pin.style = 'left:' + adObject.location.x + 'px; top:' + adObject.location.y + 'px;';
    pin.querySelector('img').src = adObject.author.avatar;
    pin.querySelector('img').alt = adObject.offer.type;
    return pin;
  }; // локальная

  window.pin = {
    insertPinsToPage: function (adsArray) {
      var fragment = document.createDocumentFragment();
      for (var j = 0; j < adsArray.length; j++) {
        fragment.appendChild(createSinglePin(adsArray[j]));
      }
      mapPin.appendChild(fragment);
    } // window для экспорта в page-activation.js
  };
})();
