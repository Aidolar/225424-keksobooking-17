'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var ESC_KEYCODE = 27;
  var housingNames = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var getWordEnd = function (num, words) {
    if ((num % 100 > 10 && num % 100 < 15) || num % 10 > 4 || num % 10 === 0) {
      return words[2];
    } else if (num % 10 === 1) {
      return words[0];
    } else {
      return words[1];
    }
  };

  var createSingleCard = function (adObject) {
    var card = cardTemplate.cloneNode(true);

    if (adObject.author.avatar) {
      card.querySelector('.popup__avatar').src = adObject.author.avatar;
    } else {
      card.querySelector('.popup__avatar').classList.add('hidden');
    }

    if (adObject.offer.title) {
      card.querySelector('.popup__title').textContent = adObject.offer.title;
    } else {
      card.querySelector('.popup__title').classList.add('hidden');
    }

    if (adObject.offer.address) {
      card.querySelector('.popup__text--address').textContent = adObject.offer.address;
    } else {
      card.querySelector('.popup__text--address').classList.add('hidden');
    }

    if (adObject.offer.price) {
      var cardPriceSpan = card.querySelector('span');
      cardPriceSpan.textContent = '/ночь';
      card.querySelector('.popup__text--price').textContent = adObject.offer.price + '₽';
      card.querySelector('.popup__text--price').appendChild(cardPriceSpan);
    } else {
      card.querySelector('.popup__text--price').classList.add('hidden');
    }

    if (adObject.offer.type) {
      card.querySelector('.popup__type').textContent = housingNames[adObject.offer.type];
    } else {
      card.querySelector('.popup__type').classList.add('hidden');
    }

    if (adObject.offer.rooms && adObject.offer.guests) {
      card.querySelector('.popup__text--capacity').textContent = adObject.offer.rooms + ' ' + getWordEnd(adObject.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + adObject.offer.guests + ' ' + getWordEnd(adObject.offer.guests, ['гостя', 'гостей', 'гостей']);
    } else {
      card.querySelector('.popup__text--capacity').classList.add('hidden');
    }

    if (adObject.offer.checkin && adObject.offer.checkout) {
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adObject.offer.checkin + ', выезд до ' + adObject.offer.checkout;
    } else {
      card.querySelector('.popup__text--time').classList.add('hidden');
    }

    if (!adObject.offer.features) {
      card.querySelector('.popup__features').remove();
    } else {
      for (var i = 0; i < features.length; i++) {
        if (!adObject.offer.features.includes(features[i])) {
          card.querySelector('.popup__feature--' + features[i]).remove();
        }
      }
    }

    if (adObject.offer.description) {
      card.querySelector('.popup__description').textContent = adObject.offer.description;
    } else {
      card.querySelector('.popup__description').classList.add('hidden');
    }

    if (adObject.offer.photos) {
      for (var j = 0; j < adObject.offer.photos.length; j++) {
        var photo = card.querySelector('.popup__photo').cloneNode(true);
        photo.src = adObject.offer.photos[j];
        card.querySelector('.popup__photos').appendChild(photo);
      }
      card.querySelector('.popup__photo').remove();
    } else {
      card.querySelector('.popup__photos').classList.add('hidden');
    }
    return card;
  }; // локальная

  var buttonCloseClickHandler = function () {
    document.querySelector('.popup').remove();
    document.querySelector('.map__pin--active').classList.remove('map__pin--active');
  };

  var escapeKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      document.querySelector('.popup').remove();
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      document.removeEventListener('keydown', escapeKeydownHandler);
    }
  };

  window.card = {
    ESC_KEYCODE: ESC_KEYCODE,
    insertCardToPage: function (data) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(createSingleCard(data));
      window.pageActivation.map.insertBefore(fragment, window.pageActivation.mapFiltersContainer);
      var buttonClose = document.querySelector('.popup__close');
      buttonClose.addEventListener('click', buttonCloseClickHandler);
      document.addEventListener('keydown', escapeKeydownHandler);
    }
  };
})();
