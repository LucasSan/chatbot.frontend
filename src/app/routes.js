(() => {
  const states = {
    base: [
      buildStates('login', false, '/', 'src/app/components/common/login/login.html', 'LoginCtrl', 'vm'),
      buildStates('bot', false, '/bot', 'src/app/components/base/bot/bot.html', 'BotCtrl', 'bot')
    ]
  };

  angular.module('chatbot')
    .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
      $locationProvider.html5Mode(false);
      setStates($stateProvider, $urlRouterProvider, $locationProvider, states.base);
    })
    .run(($trace, $transitions) => {
      setTransitions($trace, $transitions);
    });

  function setStates($stateProvider, $urlRouterProvider, $locationProvider, array) {
    array.forEach((state) => {
      $stateProvider.state(state);
    });
    $urlRouterProvider.otherwise('/');
  }

  function setTransitions($trace, $transitions) {
    $trace.enable('TRANSITION');
    $transitions.onStart({}, () => {
      return true;
    });
  }

  function buildStates(name, abstract, url, templateUrl, controller, controllerAs, data) {
    return {
      name,
      abstract,
      url,
      templateUrl,
      controller,
      controllerAs,
      data
    };
  }
})();
