(() => {
  angular
    .module('chatbot')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl(GatewayService, Config, $state) {
    const vm = this;
    vm.loginCallback = loginCallback;
    vm.smsLogin = smsLogin;
    vm.emailLogin = emailLogin;

    // initialize Account Kit with CSRF protection
    AccountKit_OnInteractive = () => {
      AccountKit.init({
        appId: `${Config.FACEBOOK.APP_ID}`,
        state: Guid.raw(),
        version: `${Config.FACEBOOK.ACCOUNT_KIT.VERSION}`,
        fbAppEventsEnabled: true,
        debug: true,
        Redirect: $state.go('login')
      });
    };

    // login callback
    function loginCallback(response) {
      console.log('loginCallback');
      if (response.status === 'PARTIALLY_AUTHENTICATED') {
        const code = response.code;
        const csrf = response.state;
        // Send code to server to exchange for access token
      } else if (response.status === 'NOT_AUTHENTICATED') {
        // handle authentication failure
      } else if (response.status === 'BAD_PARAMS') {
        // handle bad parameters
      }
    }

    // phone form submission handler
    function smsLogin() {
      var countryCode = document.getElementById("country_code").value;
      var phoneNumber = document.getElementById("phone_number").value;
      AccountKit.login(
        'PHONE', { countryCode: countryCode, phoneNumber: phoneNumber }, // will use default values if not specified
        loginCallback
      );
    }

    // email form submission handler
    function emailLogin() {
      const emailAddress = document.getElementById("email").value;
      AccountKit.login(
        'EMAIL', { emailAddress: emailAddress },
        loginCallback
      );
    }
  }
})();
