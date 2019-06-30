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

  /* window.pin = {
    insertPinsToPage: function (adsArray) {
      var fragment = document.createDocumentFragment();
      for (var j = 0; j < adsArray.length; j++) {
        fragment.appendChild(createSinglePin(adsArray[j]));
      }
      mapPin.appendChild(fragment);
    } // window для экспорта в page-activation.js
  }; */

  window.pin = {
    loadSuccessHandler: function (adsArray) {
      var fragment = document.createDocumentFragment();
      for (var j = 0; j < adsArray.length; j++) {
        fragment.appendChild(createSinglePin(adsArray[j]));
      }
      mapPin.appendChild(fragment);
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
