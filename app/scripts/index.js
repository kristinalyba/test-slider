window.app = window.app || {};

window.app = ((app) => {
  const LOGIN_URL = '/login.html';

  function logout() {
    app.AuthService.logout()
      .then(() => {
        window.location.href = LOGIN_URL;
      });
  }

  function init() {
    app.AuthService.checkAuth()
      .then((response) => {
        if (response) {
          return true;
        } else {
          window.location.href = LOGIN_URL;
        }
      })
      .then(app.AuthService.getCurrentUser)
      .then((response) => {
        const headerEl = document.querySelector('header');
        headerEl.textContent = `${response || 'user'}, welcome to our site!`;
      });
  }

  // init app
  init();

  return {
    logout,
  };
})(window.app);
