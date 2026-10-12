(function () {
  "use strict";

  const form = document.querySelector('#mail-send');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const thisForm = this;
    const action = thisForm.getAttribute('action');

    if (!action) {
      displayError(thisForm, 'Form action is not set!');
      return;
    }

    thisForm.querySelector('.loading').style.display = "block";
    thisForm.querySelector('.error-message').style.display = "none";
    thisForm.querySelector('.sent-message').style.display = "none";

    const formData = new FormData(thisForm);
    submitForm(thisForm, action, formData);
  });

  function submitForm(thisForm, action, formData) {
    axios.post(action, formData)
      .then(response => {
        thisForm.querySelector('.loading').style.display = "none";

        if (response.data === 'OK') {
          thisForm.querySelector('.sent-message').style.display = "block";
          thisForm.reset();
        } else {
          throw new Error('Submission failed!');
        }
      })
      .catch(error => {
        displayError(thisForm, error.message || error);
      });
  }

  function displayError(thisForm, message) {
    thisForm.querySelector('.loading').style.display = "none";
    thisForm.querySelector('.error-message').textContent = message;
    thisForm.querySelector('.error-message').style.display = "block";
  }

})();
