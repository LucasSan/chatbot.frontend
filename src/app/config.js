(() => {
  angular.module('chatbot')
    .factory('Config', () => ({
      AUTHCORE_URI: 'http://localhost:3000/api/auth',
      TELEGRAM: {
        URL: 'https://maps.google.com/maps/api/geocode/json?address=',
        TOKEN: '416915767:AAEIa1TptB_SlMGXBPYwXSd24aDOzArJgwM'
      },
      FACEBOOK: {
        APP_ID: '1972036449679547',
        CLIENT_TOKEN: 'ffb65d89175da73934f5a5bcdcaa6778',
        SECRET_KEY: '567e65c2deed6e9b65dca3729429ac43',
        ACCOUNT_KIT: {
          SECRET_KEY: '3c7d99fd691741b388279a1a59011aad',
          TOKEN: '2031ce2cf850e6f5cd4501e123c37dd0',
          VERSION: 'v1.1'
        }
      }
    }));
})();
