class PhotographerCardTemplate {
  constructor(data) {
    this.data = data;
  }

  photographerCard() {
    const { name, portrait, city, country, tagline, price, id } = this.data;
    const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;
    const article = document.createElement('article');
    article.setAttribute('role', 'region');

    const imgHtml = `<a href="./photographer.html?id=${id}" type="link" title="Visiter la page de profil de ${name}"><img src="${picture}" alt="Photo de profil de ${name}"></a>`;
    article.innerHTML = imgHtml;
    const h2 = document.createElement('h2');
    h2.innerHTML = `<a href="./photographer.html?id=${id}" type="link" title="Visiter la page de profil de ${name}">${name}</a>`;
    const p1 = document.createElement('p');
    p1.innerHTML = `${city}, ${country}`;
    p1.classList.add('city');
    const p2 = document.createElement('p');
    p2.innerHTML = `${tagline}`;
    p2.classList.add('tagline');
    const p3 = document.createElement('p');
    p3.innerHTML = `${price}€/jour`;
    p3.classList.add('price');

    article.appendChild(h2);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);
    return article;
  }

  photographerProfileCard() {
    const { name, portrait, city, country, tagline, price } = this.data;
    document.title = `Fisheye - ${name}`;
    const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

    const divFiche = document.querySelector('.photograph-header');
    divFiche.setAttribute(
      'aria-label',
      `Et le tarif du photographe à partir de ${price}/jour`
    );
    divFiche.setAttribute('role', 'region');
    divFiche.setAttribute('tabIndex', '0');
    const divContentUser = document.createElement('div');
    divContentUser.setAttribute('class', 'divContentUser');
    divContentUser.setAttribute('tabIndex', '0');
    const h1 = document.createElement('h1');
    h1.setAttribute('tabIndex', '0');
    h1.innerHTML = `${name}`;
    const h2 = document.createElement('h2');
    h2.setAttribute('tabIndex', '0');
    h2.innerHTML = `${city}, ${country}`;
    const h3 = document.createElement('h3');
    h3.setAttribute('tabIndex', '0');
    h3.innerHTML = `${tagline}`;
    const divContact = document.createElement('div');
    divContact.setAttribute('class', 'divContact');
    divContact.setAttribute('tabIndex', '0');
    const buttonContact = document.querySelector('.contact_button');
    buttonContact.setAttribute('type', 'button');
    buttonContact.setAttribute('tabIndex', '0');
    buttonContact.setAttribute(
      'aria-label',
      'Bouton pour ouvrir le formulaire de contact du photographe'
    );
    const divPhoto = document.createElement('div');

    divPhoto.setAttribute('class', 'divPhoto');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `Photo de profil du compte de: ${name}`);
    img.setAttribute('tabIndex', '0');

    divContentUser.appendChild(h1);
    divContentUser.appendChild(h2);
    divContentUser.appendChild(h3);
    divContact.appendChild(buttonContact);
    divPhoto.appendChild(img);
    divFiche.appendChild(divContentUser);
    divFiche.appendChild(divContact);
    divFiche.appendChild(divPhoto);
  }

  createPostTemplate(infoUser) {
    const { portrait, id: idUser } = infoUser;

    const srcPhoto = `assets/photographers/${portrait.split('.')[0]}`;
    const srcVideo = `assets/photographers/${portrait.split('.')[0]}`;
    const sectionPost = document.createElement('section');
    sectionPost.setAttribute('tabIndex', '0');
    sectionPost.setAttribute('aria', 'Publications faites par le photographe');
    const main = document.querySelector('main');

    this.data.forEach((element, index) => {
      const { id, photographerId, title, image, video, likes, date } = element;

      if (image) {
        const template = `<article tabIndex="0" class="post post${index}"> 
            <a href="#" role="link" tabIndex="0" aria-label="Image nommée ${title} prise le ${date}" data-id="${index}"data-title="${title}" data-image="${srcPhoto}/${image}" class="link"><img src="${srcPhoto}/${image}" alt="${title} fait le ${date}"></a>
            <div class="contentArticle">
            <p>${title}</p>
            <p class="like like-${index}" tabIndex="0"><span title="Mettre un like au post ${title}" tabIndex="0" aria-label="Bouton pour liker la publication nommée ${title}">${likes}</span> <i class="fa-solid fa-heart"></i></p>
            </div>
            </article>`;
        sectionPost.innerHTML += template;
      } else {
        const templateV = `<article tabIndex="0" class="post post${index}">
            <a href="#" role="link" tabIndex="0" aria-label="Video nommée ${title} filmée le ${date}" data-id="${index}" data-title="${title}" data-video="${srcVideo}/${video}" class="link"><video src="${srcVideo}/${video}" alt="${title} fait le ${date}"></video></a>
            <div class="contentArticle">
            <p>${title}</p>
            <p class="like like-${index}" ><span title="Mettre un like au post ${title}" tabIndex="0" aria-label="Bouton pour liker la publication nommée ${title}">${likes}</span><i class="fa-solid fa-heart"></i></p>
            </div>
            </article>`;
        sectionPost.innerHTML += templateV;
      }

      main.appendChild(sectionPost);
    });
  }

  createMenuTri(infoUser) {
    const main = document.querySelector('main');
    const sectionTri = document.createElement('section');
    sectionTri.classList.add('tri');
    sectionTri.setAttribute('tabIndex', '0');
    const menu = ` <div class="menu" tabIndex="0">
                    <label for="filter">Trier par</label>
                      <select name="filter" id="filter" aria-label="Bouton pour ouvrir le menu déroulant">
                        <option value="Popularité" tabIndex="0">Popularité</option>
                        <option value="Date" tabIndex="0">Date</option>
                        <option value="Titre" tabIndex="0">Titre</option>
                      </select>
                  </div>`;

    sectionTri.innerHTML = menu;
    main.appendChild(sectionTri);

    // Les differents tris POPULARITE / TITRE / DATE //

    const triage = document.getElementById('filter');
    triage.addEventListener('change', (e) => {
      const listData = this.data;
      const select = e.target.value;
      let filter = '';
      const sectionPost = document.querySelectorAll('section')[1];

      if (select === 'Popularité') {
        sectionPost.remove();
        filter = listData.sort((a, b) => b.likes - a.likes);
        this.data = filter;
        this.createPostTemplate(infoUser);
      } else if (select === 'Titre') {
        sectionPost.remove();
        filter = listData.sort((a, b) => a.title.localeCompare(b.title));
        console.log(filter);
        this.data = filter;
        this.createPostTemplate(infoUser);
      } else if (select === 'Date') {
        sectionPost.remove();
        filter = listData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Tri par date décroissante
        this.data = filter;
        this.createPostTemplate(infoUser);
      }
    });
  }

  createLinkLogo() {
    const lienLogo = document.createElement('a');
    lienLogo.setAttribute('href', '/');
    lienLogo.setAttribute('title', "Lien vers la page d'acceuil");
    const header = document.querySelector('header');
    const img = document.querySelector('.logo');
    header.replaceChild(lienLogo, img);

    lienLogo.appendChild(img);
  }

  createTitle() {
    const titre = document.querySelector('head title');

    console.log(titre);
  }

  createStickyBar(totalLike, price) {
    const stickyBar = document.createElement('div');
    stickyBar.classList.add('stickyContainer');
    stickyBar.setAttribute('tabIndex', '0');

    const divAmountOfLike = document.createElement('p');
    divAmountOfLike.classList.add('likeContainer');
    divAmountOfLike.setAttribute(
      'aria-label',
      `Le photographe accumule ${totalLike} likes`
    );
    divAmountOfLike.setAttribute('tabIndex', '0');

    const amountOfLike = `<span>${totalLike}</span> <i class="fa-solid fa-heart"></i>`;
    divAmountOfLike.innerHTML = amountOfLike;

    const divPrice = document.createElement('p');
    divPrice.classList.add('priceContainer');
    divPrice.setAttribute(
      'aria-label',
      `Tarif du photographeà partir de ${price}/jour`
    );
    divPrice.setAttribute('tabIndex', '0');

    const pricePerDay = `${price}€ /jour`;
    divPrice.innerHTML = pricePerDay;

    stickyBar.appendChild(divAmountOfLike);
    stickyBar.appendChild(divPrice);

    const main = document.getElementById('main');
    main.appendChild(stickyBar);
  }

  likePost() {
    const listLike = document.querySelectorAll(`.like span`);
    const update = document.querySelector('.likeContainer span');

    listLike.forEach((element) => {
      element.addEventListener('click', () => {
        if (element.getAttribute('data-isLike') == 'true') {
          element.setAttribute('data-isLike', false);

          element.textContent--;
          update.textContent--;
        } else {
          element.setAttribute('data-isLike', true);

          element.textContent++;
          update.textContent++;
        }
      });
    });
  }

  getMediaContent(namePhotographer) {
    const media = [];

    console.log(this.data);

    this.data.forEach((element) => {
      const { title, image, video } = element;

      if (image) {
        media.push({
          type: 'image',
          title: title,
          src: image,
          name: namePhotographer,
        });
      }

      if (video) {
        media.push({
          type: 'video',
          title: title,
          src: video,
          name: namePhotographer,
        });
      }
    });
    console.log(media);
    return media;
  }
}
