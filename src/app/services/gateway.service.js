(() => {
  angular.module('chatbot')
    .factory('GatewayService', ($http, $q, Config, $timeout) => {
      return {
        get,
        post,
        put,
        remove
      };

      function get(path) {
        return request(path, 'GET', null);
      }

      function post(path, data) {
        return request(path, 'POST', data);
      }

      function put(path, data) {
        return request(path, 'PUT', data);
      }

      function remove(path) {
        return request(path, 'DELETE', null);
      }

      function request(path, method, data) {
        const options = {
          method,
          url: `${Config.AUTHCORE_URI}${path}`,
          data
        };

        return $q((resolve, reject) => {
          $timeout(() => {
            $http(options)
              .then(success => resolve(success.data), (err) => {
                if (err.status === 401) {
                  location.reload();
                  return reject();
                }
                return reject(err);
              })
              .finally(() => {});
          }, 1000);
        });
      }
    });
})();
