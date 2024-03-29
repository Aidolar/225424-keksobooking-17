'use strict';

(function () {
  var LOWER_PRICE_LIMIT = 10000;
  var UPPER_PRICE_LIMIT = 50000;
  var PIN_TIMEOUT = 500;
  var MAX_PINS_QUANTITY = 5;
  var mapPinsBlock = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var adsArray = [];
  var lastTimeout;
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var wifiCheckbox = document.querySelector('#filter-wifi');
  var dishwasherCheckbox = document.querySelector('#filter-dishwasher');
  var parkingCheckbox = document.querySelector('#filter-parking');
  var washerCheckbox = document.querySelector('#filter-washer');
  var elevatorCheckbox = document.querySelector('#filter-elevator');
  var conditionerCheckbox = document.querySelector('#filter-conditioner');

  var housingTypeFilter = {
    selectedOption: 'any',
    filter: function (arr) {
      if (housingTypeFilter.selectedOption === 'any') {
        return arr;
      }
      return arr.filter(function (item) {
        return item.offer.type === housingTypeFilter.selectedOption;
      });
    }
  };

  var housingPriceFilter = {
    selectedOption: 'any',
    filter: function (arr) {
      switch (housingPriceFilter.selectedOption) {
        case 'low':
          return arr.filter(function (item) {
            return item.offer.price < LOWER_PRICE_LIMIT;
          });
        case 'middle':
          return arr.filter(function (item) {
            return item.offer.price >= LOWER_PRICE_LIMIT && item.offer.price <= UPPER_PRICE_LIMIT;
          });
        case 'high':
          return arr.filter(function (item) {
            return item.offer.price > UPPER_PRICE_LIMIT;
          });
        default: return arr;
      }
    }
  };

  var housingRoomsFilter = {
    selectedOption: 'any',
    filter: function (arr) {
      if (housingRoomsFilter.selectedOption === 'any') {
        return arr;
      }
      return arr.filter(function (item) {
        return item.offer.rooms.toString() === housingRoomsFilter.selectedOption;
      });
    }
  };

  var housingGuestsFilter = {
    selectedOption: 'any',
    filter: function (arr) {
      if (housingGuestsFilter.selectedOption === 'any') {
        return arr;
      }
      return arr.filter(function (item) {
        return item.offer.guests.toString() === housingGuestsFilter.selectedOption;
      });
    }
  };

  var wifiCheckboxFilter = {
    checkboxValue: '',
    filter: function (arr) {
      if (wifiCheckboxFilter.checkboxValue !== '') {
        return arr.filter(function (item) {
          return item.offer.features.includes(wifiCheckboxFilter.checkboxValue);
        });
      }
      return arr;
    }
  };

  var dishwasherCheckboxFilter = {
    checkboxValue: '',
    filter: function (arr) {
      if (dishwasherCheckboxFilter.checkboxValue !== '') {
        return arr.filter(function (item) {
          return item.offer.features.includes(dishwasherCheckboxFilter.checkboxValue);
        });
      }
      return arr;
    }
  };

  var parkingCheckboxFilter = {
    checkboxValue: '',
    filter: function (arr) {
      if (parkingCheckboxFilter.checkboxValue !== '') {
        return arr.filter(function (item) {
          return item.offer.features.includes(parkingCheckboxFilter.checkboxValue);
        });
      }
      return arr;
    }
  };

  var washerCheckboxFilter = {
    checkboxValue: '',
    filter: function (arr) {
      if (washerCheckboxFilter.checkboxValue !== '') {
        return arr.filter(function (item) {
          return item.offer.features.includes(washerCheckboxFilter.checkboxValue);
        });
      }
      return arr;
    }
  };

  var elevatorCheckboxFilter = {
    checkboxValue: '',
    filter: function (arr) {
      if (elevatorCheckboxFilter.checkboxValue !== '') {
        return arr.filter(function (item) {
          return item.offer.features.includes(elevatorCheckboxFilter.checkboxValue);
        });
      }
      return arr;
    }
  };

  var conditionerCheckboxFilter = {
    checkboxValue: '',
    filter: function (arr) {
      if (conditionerCheckboxFilter.checkboxValue !== '') {
        return arr.filter(function (item) {
          return item.offer.features.includes(conditionerCheckboxFilter.checkboxValue);
        });
      }
      return arr;
    }
  };

  var filters = [
    housingTypeFilter,
    housingPriceFilter,
    housingRoomsFilter,
    housingGuestsFilter,
    wifiCheckboxFilter,
    dishwasherCheckboxFilter,
    parkingCheckboxFilter,
    washerCheckboxFilter,
    elevatorCheckboxFilter,
    conditionerCheckboxFilter
  ];

  var insertPinClickHandler = function (data, i) {
    var pinClickHandler = function () {
      if (document.querySelector('.popup')) {
        document.querySelector('.popup').remove();
      }
      if (document.querySelector('.map__pin--active')) {
        document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
      document.querySelectorAll('.map__pin:not(.map__pin--main)')[i].classList.add('map__pin--active');
      window.card.insertCardToPage(data);
    };
    document.querySelectorAll('.map__pin:not(.map__pin--main)')[i].addEventListener('click', pinClickHandler);
  };

  var createSinglePin = function (adObject) {
    var pin = pinTemplate.cloneNode(true);
    pin.style = 'left:' + adObject.location.x + 'px; top:' + adObject.location.y + 'px;';
    pin.querySelector('img').src = adObject.author.avatar;
    pin.querySelector('img').alt = adObject.offer.type;
    return pin;
  }; // локальная

  var insertPinsToPage = function (data) {
    var takeNumber = data.length > MAX_PINS_QUANTITY ? MAX_PINS_QUANTITY : data.length;
    var fragment = document.createDocumentFragment();
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (e) {
      e.remove();
    });
    for (var j = 0; j < takeNumber; j++) {
      fragment.appendChild(createSinglePin(data[j]));
    }
    mapPinsBlock.appendChild(fragment);
    for (var k = 0; k < takeNumber; k++) {
      insertPinClickHandler(data[k], k);
    }
  }; // локальная

  var updatePins = function () {
    var filteredOffers = adsArray;
    filters.forEach(function (obj) {
      filteredOffers = obj.filter(filteredOffers);
    });
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      insertPinsToPage(filteredOffers);
    }, PIN_TIMEOUT);


  };

  housingTypeSelect.addEventListener('change', function () {
    housingTypeFilter.selectedOption = housingTypeSelect.value;
    updatePins();
  });

  housingPriceSelect.addEventListener('change', function () {
    housingPriceFilter.selectedOption = housingPriceSelect.value;
    updatePins();
  });

  housingRoomsSelect.addEventListener('change', function () {
    housingRoomsFilter.selectedOption = housingRoomsSelect.value;
    updatePins();
  });

  housingGuestsSelect.addEventListener('change', function () {
    housingGuestsFilter.selectedOption = housingGuestsSelect.value;
    updatePins();
  });

  wifiCheckbox.addEventListener('change', function () {
    wifiCheckboxFilter.checkboxValue = wifiCheckbox.checked ? wifiCheckbox.value : '';
    updatePins();
  });

  dishwasherCheckbox.addEventListener('change', function () {
    dishwasherCheckboxFilter.checkboxValue = dishwasherCheckbox.checked ? dishwasherCheckbox.value : '';
    updatePins();
  });

  parkingCheckbox.addEventListener('change', function () {
    parkingCheckboxFilter.checkboxValue = parkingCheckbox.checked ? parkingCheckbox.value : '';
    updatePins();
  });

  washerCheckbox.addEventListener('change', function () {
    washerCheckboxFilter.checkboxValue = washerCheckbox.checked ? washerCheckbox.value : '';
    updatePins();
  });

  elevatorCheckbox.addEventListener('change', function () {
    elevatorCheckboxFilter.checkboxValue = elevatorCheckbox.checked ? elevatorCheckbox.value : '';
    updatePins();
  });

  conditionerCheckbox.addEventListener('change', function () {
    conditionerCheckboxFilter.checkboxValue = conditionerCheckbox.checked ? conditionerCheckbox.value : '';
    updatePins();
  });

  window.pin = {
    adsArray: adsArray,
    housingTypeSelect: housingTypeSelect,
    housingPriceSelect: housingPriceSelect,
    housingRoomsSelect: housingRoomsSelect,
    housingGuestsSelect: housingGuestsSelect,
    filters: filters,
    mapPinsBlock: mapPinsBlock,
    loadSuccessHandler: function (data) {
      adsArray = data;
      updatePins();
    },

    loadErrorHandler: function (errMessage) {
      var errElement = document.createElement('div');
      errElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: yellow;';
      errElement.style.position = 'absolute';
      errElement.style.width = window.pageActivation.map.clientWidth + 'px';
      errElement.style.left = 0;
      errElement.style.right = 0;
      errElement.style.fontSize = '30px';
      errElement.textContent = errMessage;
      document.body.insertAdjacentElement('afterbegin', errElement);
    }
  };
})();
