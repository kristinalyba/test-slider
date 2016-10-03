window.app = window.app || {};

window.app = ((app) => {
  function login(form) {
    const usermail = form.usermail.value;
    const password = form.password.value;

    if (isFormValid(usermail, password)) {
      app.AuthService.login(usermail, password)
        .then(() => {
          window.location.href = '/';
        })
        .catch((error) => {
          alert('Failed to log in');
        });
    } else {
      alert('Please enter valid data (email longer than 6 sybmbols and password longer than 3 symbols');
    }
  }

  function isFormValid(usermail, password) {
    return usermail.length > 6 && password.length > 3;
  }

  return {
    login,
  };
})(window.app);
