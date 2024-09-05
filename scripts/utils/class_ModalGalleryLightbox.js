class ModalGalleryLightbox {
  constructor(listMedia) {
    this.listMedia = listMedia;
    this.currentIndex = 0;
  }

  initModal() {
    const modalLink = document.querySelectorAll('.link');
    // launch modal lightbox event
    modalLink.forEach((link) =>
      link.addEventListener('click', (e) => this.createLightboxModal(e))
    );
  }

  createLightboxModal(event) {
    event.preventDefault();

    console.log(this.listMedia);

    const displayModal = document.createElement('dialog');
    displayModal.classList.add('lightboxModal');
    displayModal.setAttribute('role', 'dialog');
    displayModal.setAttribute('aria-label', "Vue approchée de l'image");
    const imageLink = event.currentTarget.dataset.image;
    const videoLink = event.currentTarget.dataset.video;
    const title = event.currentTarget.dataset.title;
    let currentIndex = Number(event.currentTarget.dataset.id);
    this.currentIndex = currentIndex;

    const lightbox = ` 
                      <div class="lightboxContainer"> 
                      <button type="button" class="closeLightbox" aria-label="Bouton pour fermer la boite de zoom sur image"><i class="fa-solid fa-x"></i></button>
                     
                      <button type="button" class="previousLightbox" aria-label="Bouton pour passer à l'image précédente"><i class="fa-solid fa-chevron-left"></i></button>
                      <button type="button" class="nextLightbox" aria-label="Bouton pour passer à l'image suivante"><i class="fa-solid fa-chevron-right"></i></button>
                      <div class="lightboxContent" role="group" aria-roledescription="slide">
                      <div class="lightboxContentContainer">
                      ${
                        imageLink !== undefined
                          ? `<img src="${imageLink}" alt="Image nommée ${title}">`
                          : `<video src="${videoLink}" controls alt="Vidéo nommée ${title}"></video>`
                      }
  
                  
                      </div>
                      <p class="postDescription">${title}</p>
                      </div>
    
    
                      </div>
                      `;

    const main = document.querySelector('#main');
    displayModal.innerHTML = lightbox;
    main.appendChild(displayModal);
    displayModal.showModal();
    // close modal lightbox event // close modal lightbox
    const closeModal = document.querySelector('.closeLightbox');
    closeModal.addEventListener('click', (e) => {
      e.preventDefault();
      displayModal.remove();
    });

    //next and previous event
    const nextButton = document.querySelector('.nextLightbox');
    const previousButton = document.querySelector('.previousLightbox');

    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.currentIndex = (this.currentIndex + 1) % this.listMedia.length;

      this.updateLightboxContent();
    });

    previousButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.currentIndex =
        (this.currentIndex - 1 + this.listMedia.length) % this.listMedia.length;

      this.updateLightboxContent();
    });
  }

  updateLightboxContent() {
    const contentLightBox = document.querySelector('.lightboxContentContainer');

    const legende = document.querySelector('.postDescription');
    legende.remove();

    const { name, src, type } = this.listMedia[this.currentIndex];
    contentLightBox.innerHTML = `${
      type === 'image'
        ? `<img src="assets/photographers/${name}/${src}">`
        : `<video src="assets/photographers/${name}/${src}" controls></video>`
    }
    </div>
                    <p class="postDescription">${
                      this.listMedia[this.currentIndex].title
                    }</p>
                    </div>`;
  }
}

// http://127.0.0.1:5500/assets/photographers/sport_water_tunnel.jpg
