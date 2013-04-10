(function() {
  var CSUser;

  CSUser = (function() {
    var ERRORS, POSSIBLE_CKA_IDS;

    ERRORS = {};

    ERRORS[1] = 'Ошибка инициализации библиотек Аладдин';

    ERRORS[2] = 'Ошибка получения кол-ва слотов';

    ERRORS[3] = 'Ошибка получения списка слотов';

    ERRORS[4] = 'Слот не найден. Подключите eToken';

    ERRORS[5] = 'Ошибка открытия сессии';

    ERRORS[6] = 'Ошибка авторизации';

    ERRORS[7] = 'Ошибка создания ключевой пары';

    ERRORS[8] = 'Ошибка создания CSR';

    ERRORS[9] = 'Ошибка выделения памяти для BASE64';

    ERRORS[10] = 'Ошибка кодирования BASE64';

    ERRORS[11] = 'Ошибка инициализации токена';

    ERRORS[12] = 'Ошибка инициализации PIN';

    ERRORS[13] = 'Ошибка декодирования BASE64';

    ERRORS[14] = 'Ошибка создания объекта';

    ERRORS[15] = 'Ошибка инициализации поиска объектов';

    ERRORS[16] = 'Ошибка поиска объектов';

    ERRORS[17] = 'Ошибка финализации поиска объектов';

    ERRORS[18] = 'Ошибка удаления объекта';

    ERRORS[19] = 'Некорректный номер слота';

    ERRORS[20] = 'Некорректный id объекта';

    ERRORS[21] = 'Некорректный PIN админа';

    ERRORS[22] = 'Некорректный PIN пользователя';

    ERRORS[23] = 'Некорректная метка токена';

    ERRORS[24] = 'Некорректная сертификат';

    ERRORS[25] = 'Некорректное ФИО';

    ERRORS[26] = 'Некорректный СНИЛС';

    ERRORS[27] = 'Некорректные данные';

    ERRORS[28] = 'Сертификат не найден';

    ERRORS[29] = 'Ошибка создания ЭЦП PKCS7';

    ERRORS[30] = 'Ошибка получения информации сертификата';

    ERRORS[31] = 'Ошибка получения значения атрибута';

    ERRORS[32] = 'Ошибка смены PIN';

    ERRORS[33] = 'Ошибка данных';

    ERRORS[34] = 'Ошибка получения информации токена';

    ERRORS[35] = 'Ключ не найден';

    ERRORS[36] = 'Данные не найдены';

    ERRORS[37] = 'Ошибка инициализации генерации хэша';

    ERRORS[38] = 'Ошибка генерации хэша';

    ERRORS[39] = 'Ошибка инициализации генерации ЭЦП';

    ERRORS[40] = 'Ошибка генерации ЭЦП';

    ERRORS['not_valid'] = 'Плагин не готов к работе с браузером';

    ERRORS['unknown'] = 'Неизвестная ошибка';

    POSSIBLE_CKA_IDS = [1, 99];

    function CSUser(plugin) {
      this.plugin = plugin;
    }

    CSUser.property({
      error_code: {
        get: function() {
          return this.plugin.etgGetErrorCode();
        }
      }
    });

    CSUser.prototype.plugin_is_not_valid = function() {
      return !this.plugin.valid;
    };

    CSUser.prototype.error = function() {
      return this.error_code !== 0;
    };

    CSUser.prototype.no_error = function() {
      return this.error_code === 0;
    };

    CSUser.property({
      error_message: {
        get: function() {
          var _ref;
          if (this.plugin_is_not_valid()) {
            return ERRORS['not_valid'];
          } else {
            if (this.error_code === 0) {
              return void 0;
            } else if ((1 <= (_ref = this.error_code) && _ref <= 40)) {
              return ERRORS[this.error_code];
            } else {
              return ERRORS['unknown'];
            }
          }
        }
      }
    });

    CSUser.prototype.sign_data = function(pin, message) {
      var cka_id, sign_data, signature_value, _i, _len;
      if (this.plugin_is_not_valid()) {
        return;
      }
      for (_i = 0, _len = POSSIBLE_CKA_IDS.length; _i < _len; _i++) {
        cka_id = POSSIBLE_CKA_IDS[_i];
        sign_data = this.plugin.etgHashSignDataAny(1, cka_id, pin, message);
        if (this.no_error()) {
          signature_value = sign_data[1];
          return signature_value;
        }
      }
    };

    CSUser.prototype.get_x509_certificate = function(pin) {
      var cka_id, x509_certificate, _i, _len;
      if (this.plugin_is_not_valid()) {
        return;
      }
      for (_i = 0, _len = POSSIBLE_CKA_IDS.length; _i < _len; _i++) {
        cka_id = POSSIBLE_CKA_IDS[_i];
        x509_certificate = this.plugin.etgGetCertificate(1, cka_id, pin);
        if (this.no_error()) {
          return x509_certificate;
        }
      }
    };

    return CSUser;

  })();

  $(function() {
    var plugin;
    plugin = document.getElementById('csuser_plugin');
    if (plugin) {
      return window.csuser = new CSUser(plugin);
    }
  });

}).call(this);
