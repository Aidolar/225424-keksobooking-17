'use strict';

(function () {
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var uploadURL = 'https://js.dump.academy/keksobooking';

  var request = function (type, url) {
    return function (onSuccess, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var errorMessage;
        switch (xhr.status) {
          case 100:
            errorMessage = 'Продолжай';
            break;
          case 102:
            errorMessage = 'Идёт обработка';
            break;
          case 200:
            onSuccess(xhr.response);
            break;
          case 204:
            errorMessage = 'Нет содержимого';
            break;
          case 400:
            errorMessage = 'Неверный запрос';
            break;
          case 401:
            errorMessage = 'Пользователь не авторизован';
            break;
          case 404:
            errorMessage = 'Ничего не найдено';
            break;
          case 500:
            errorMessage = 'Внутренняя ошибка сервера';
            break;
          case 502:
            errorMessage = 'Ошибочный шлюз';
            break;

          default:
            errorMessage = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }

        if (errorMessage) {
          onError(errorMessage);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open(type, url);
      xhr.send(data);
    };
  };

  window.requests = {
    load: request('GET', loadURL),
    upload: request('POST', uploadURL)
  };
})();
