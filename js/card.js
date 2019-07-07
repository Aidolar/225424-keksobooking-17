'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup'); // локальная

  var getWordend = function (num, words) {
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
      switch (adObject.offer.type) {
        case 'bungalo':
          card.querySelector('.popup__type').textContent = 'Бунгало';
          break;
        case 'flat':
          card.querySelector('.popup__type').textContent = 'Квартира';
          break;
        case 'house':
          card.querySelector('.popup__type').textContent = 'Дом';
          break;
        case 'palace':
          card.querySelector('.popup__type').textContent = 'Дворец';
          break;
        default: card.querySelector('.popup__type').classList.add('hidden');
      }
    } else {
      card.querySelector('.popup__type').classList.add('hidden');
    }

    if (adObject.offer.rooms && adObject.offer.guests) {
      card.querySelector('.popup__text--capacity').textContent = adObject.offer.rooms + ' ' + getWordend(adObject.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + adObject.offer.guests + ' ' + getWordend(adObject.offer.guests, ['гостя', 'гостей', 'гостей']);
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
      if (!adObject.offer.features.includes('wifi')) {
        card.querySelector('.popup__feature--wifi').remove();
      }
      if (!adObject.offer.features.includes('dishwasher')) {
        card.querySelector('.popup__feature--dishwasher').remove();
      }
      if (!adObject.offer.features.includes('parking')) {
        card.querySelector('.popup__feature--parking').remove();
      }
      if (!adObject.offer.features.includes('washer')) {
        card.querySelector('.popup__feature--washer').remove();
      }
      if (!adObject.offer.features.includes('elevator')) {
        card.querySelector('.popup__feature--elevator').remove();
      }
      if (!adObject.offer.features.includes('conditioner')) {
        card.querySelector('.popup__feature--conditioner').remove();
      }
    }

    if (adObject.offer.description) {
      card.querySelector('.popup__description').textContent = adObject.offer.description;
    } else {
      card.querySelector('.popup__description').classList.add('hidden');
    }

    if (adObject.offer.photos) {
      for (var i = 0; i < adObject.offer.photos.length; i++) {
        var photo = card.querySelector('.popup__photo').cloneNode(true);
        photo.src = adObject.offer.photos[i];
        card.querySelector('.popup__photos').appendChild(photo);
      }
      card.querySelector('.popup__photo').remove();
    } else {
      card.querySelector('.popup__photos').classList.add('hidden');
    }
    return card;
  }; // локальная

  window.card = {
    insertCardToPage: function (data) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(createSingleCard(data[8]));
      window.pageActivation.map.insertBefore(fragment, window.pageActivation.mapFiltersContainer);
    } // window для экспорта в pin.js
  };
})();
