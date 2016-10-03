window.app = (() => {
  const LOGIN_URL = '/login.html';

  function logout() {
    window.AuthService.logout()
      .then(() => {
        window.location.href = LOGIN_URL;
      });
  }

  function init() {
    window.AuthService.checkAuth()
      .then((response) => {
        if (response) {
          return true;
        } else {
          window.location.href = LOGIN_URL;
        }
      })
      .then(window.AuthService.getCurrentUser)
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
})();
