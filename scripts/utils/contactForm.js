class ContactForm {
  constructor(name) {
    this.name = name;
  }

  initContactForm() {
    const contactButton = document.querySelector('.contact_button');
    contactButton.addEventListener('click', (e) => {
      this.createContactForm(e);
      this.displayModal();
      this.validateForm();
      const close = document.querySelector('.closeModal');
      console.log(close);
      close.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeModal();
      });
    });
  }

  displayModal() {
    const modal = document.querySelector('.contact_modal');
    //modal.style.display = 'block';
    modal.showModal();
  }

  closeModal() {
    const modal = document.querySelector('.contact_modal');

    // modal.style.display = 'none';
    modal.remove();
  }

  createContactForm(event) {
    event.preventDefault();

    const displayContactModal = document.createElement('dialog');
    displayContactModal.classList.add('contact_modal');
    displayContactModal.setAttribute('role', 'dialog');
    displayContactModal.setAttribute('aria-labelledby', 'photographe-name');
    const contactModal = `
                           <div class="contactFormContainer">
                            <div class="header">
                                <h2 id="photographers-name" tabIndex="0">Contactez-moi ${this.name}</h2>
                                <button type="button" class="closeModal" tabIndex="0"><i class="fa-solid fa-x"></i></button>
                            </div>
                            <form class="body" method="dialog" role="form">
                              <fieldset>
                              <div class="formData">
                                <label for="firstName">Prénom</label>
                                <input class="text-control" type="text" id="firstName" name="firstName" placeholder="Votre prénom..">
                              </div>
                              <div class="formData">
                                <label for="lastName">Nom</label>
                                <input class="text-control" type="text" id="lastName" name="lastName" placeholder="Votre nom..">
                              </div>
                              <div class="formData">
                                <label for="email">Email</label>
                                <input class="text-control" type="text" id="email" name="email" placeholder="Votre email..">
                              </div>
                                <label for="message">Votre message</label>
                                <textarea class="text-control" id="message" name="message" placeholder="Ecrivez quelque-chose.."></textarea>
                              </fieldset>
                                <input type="submit" value="Envoyer" aria-label="Bouton pour envoyer le message">

                           
                           </div> `;

    displayContactModal.innerHTML = contactModal;
    const main = document.querySelector('#main');
    main.appendChild(displayContactModal);
  }

  validateForm() {
    const form = document.querySelector('.body');
    const balisePrenom = document.getElementById('firstName');
    const baliseNom = document.getElementById('lastName');
    const baliseEmail = document.getElementById('email');

    function validateEmail(email) {
      let regex = new RegExp('[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+');
      if (regex.test(email)) {
        return true;
      }
      return false;
    }

    function showError(input, message) {
      const div = input.parentNode;
      div.dataset.error = message;
      div.dataset.errorVisible = 'true';
    }

    function removeError(input) {
      const div = input.parentNode;
      div.dataset.error = '';
      div.dataset.errorVisible = 'false';
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log('onSubmit');

      let isValidateForm = true;

      // check if the prenom is valid
      if (balisePrenom.value.length < 2) {
        showError(balisePrenom, 'Saisissez un prénom valide');
        isValidateForm = false;
      } else {
        removeError(balisePrenom);
      }

      // check if the name is valid
      if (baliseNom.value.length < 2) {
        showError(baliseNom, 'Saisissez un nom valide');
        isValidateForm = false;
      } else {
        removeError(balisePrenom);
      }

      // check if the email is valid
      if (!validateEmail(baliseEmail.value)) {
        showError(baliseEmail, 'Saisissez un email valide');
        isValidateForm = false;
      } else {
        removeError(baliseEmail);
      }

      if (isValidateForm) {
        console.log('form is valid');
        form.innerHTML = `<p class="valid"><span>Merci pour votre participation</span></p>`;
      }
    });
  }
}
