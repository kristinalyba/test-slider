window.app = window.app || {};

window.app.AuthService = ((window) => {
  const LOGGED_IN_KEY = 'status';
  const LOGGED_IN_VALUE = 'loggedIn';
  const LOGIN_KEY = 'user';

  class AuthService {
    static checkAuth() {
      return new Promise((resolve, reject) => {
        // emulate successfull call to server
        setTimeout(() => {
          if (window.sessionStorage.getItem(LOGGED_IN_KEY) !== LOGGED_IN_VALUE) {
            resolve(false);
          } else {
            resolve(true);
          }
        }, 300);
      });
    }

    static login(usermail, password) {
      return new Promise((resolve, reject) => {
        // emulate successfull call to server
        setTimeout(() => {
          window.sessionStorage.setItem(LOGGED_IN_KEY, LOGGED_IN_VALUE);
          window.sessionStorage.setItem(LOGIN_KEY, usermail);
          resolve();
        }, 300);
      });
    }

    static logout() {
      return new Promise((resolve, reject) => {
        // emulate successfull call to server
        setTimeout(() => {
          window.sessionStorage.removeItem(LOGGED_IN_KEY);
          window.sessionStorage.removeItem(LOGIN_KEY);
          resolve();
        }, 300);
      });
    }

    static getCurrentUser() {
      return new Promise((resolve, reject) => {
        // emulate successfull call to server
        setTimeout(() => {
          resolve(window.sessionStorage.getItem(LOGIN_KEY));
        }, 300);
      });
    }
  }

  return AuthService;
})(window);
