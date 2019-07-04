'use strict';

(function () {
  var mapPin = document.querySelector('.map__pins'); // локальная
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // локальная
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
            return item.offer.price < 10000;
          });
        case 'middle':
          return arr.filter(function (item) {
            return item.offer.price >= 10000 && item.offer.price <= 50000;
          });
        case 'high':
          return arr.filter(function (item) {
            return item.offer.price > 50000;
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
          return item.offer.features.includes(wifiCheckboxFilter.checkboxValue) === true;
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
          return item.offer.features.includes(dishwasherCheckboxFilter.checkboxValue) === true;
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
          return item.offer.features.includes(parkingCheckboxFilter.checkboxValue) === true;
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
          return item.offer.features.includes(washerCheckboxFilter.checkboxValue) === true;
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
          return item.offer.features.includes(elevatorCheckboxFilter.checkboxValue) === true;
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
          return item.offer.features.includes(conditionerCheckboxFilter.checkboxValue) === true;
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

  var updatePins = function () {
    var filteredOffers = adsArray;
    filters.forEach(function (obj) {
      filteredOffers = obj.filter(filteredOffers);
    });
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      insertPinsToPage(filteredOffers);
    }, 500);
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
    if (wifiCheckbox.checked) {
      wifiCheckboxFilter.checkboxValue = wifiCheckbox.value;
      updatePins();
    } else {
      wifiCheckboxFilter.checkboxValue = '';
      updatePins();
    }
  });

  dishwasherCheckbox.addEventListener('change', function () {
    if (dishwasherCheckbox.checked) {
      dishwasherCheckboxFilter.checkboxValue = dishwasherCheckbox.value;
      updatePins();
    } else {
      dishwasherCheckboxFilter.checkboxValue = '';
      updatePins();
    }
  });

  parkingCheckbox.addEventListener('change', function () {
    if (parkingCheckbox.checked) {
      parkingCheckboxFilter.checkboxValue = parkingCheckbox.value;
      updatePins();
    } else {
      parkingCheckboxFilter.checkboxValue = '';
      updatePins();
    }
  });

  washerCheckbox.addEventListener('change', function () {
    if (washerCheckbox.checked) {
      washerCheckboxFilter.checkboxValue = washerCheckbox.value;
      updatePins();
    } else {
      washerCheckboxFilter.checkboxValue = '';
      updatePins();
    }
  });

  elevatorCheckbox.addEventListener('change', function () {
    if (elevatorCheckbox.checked) {
      elevatorCheckboxFilter.checkboxValue = elevatorCheckbox.value;
      updatePins();
    } else {
      elevatorCheckboxFilter.checkboxValue = '';
      updatePins();
    }
  });

  conditionerCheckbox.addEventListener('change', function () {
    if (conditionerCheckbox.checked) {
      conditionerCheckboxFilter.checkboxValue = conditionerCheckbox.value;
      updatePins();
    } else {
      conditionerCheckboxFilter.checkboxValue = '';
      updatePins();
    }
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
