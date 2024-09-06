/* global PhotographerCardTemplate, Photographers */

function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const user = new PhotographerCardTemplate(photographer);

    const userCard = user.photographerCard();
    photographersSection.appendChild(userCard);
  });
}

async function init() {
  // Récupère les datas des photographes

  const lienLogo = new PhotographerCardTemplate();
  lienLogo.createLinkLogo();
  const photographers = new Photographers();
  await photographers.initPhotographers();
  const dataPhotographers = photographers.getPhotographers();
  displayData(dataPhotographers.photographers);
}

init();
