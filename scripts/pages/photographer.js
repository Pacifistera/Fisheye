async function displayData(infoUser) {
  const profilUser = new PhotographerCardTemplate(infoUser);
  profilUser.photographerProfileCard();
}

async function init() {
  let params = new URL(document.location).searchParams;
  let id = parseInt(params.get('id'));

  const lienLogo = new PhotographerCardTemplate();
  lienLogo.createLinkLogo();

  const title = new PhotographerCardTemplate();
  title.createTitle();

  const photographers = new Photographers();
  await photographers.initPhotographers();
  const infoUser = photographers.getPhotographersByID(id);

  await displayData(infoUser);

  const infoMediasUser = photographers.getPhotographersMedia(id);

  // utilise method totalLike
  //const totalLike = contentUser.totalLike();
  const totalLikeByUserId = photographers.totalLikeByUserId(infoMediasUser);

  const contentUser = new PhotographerCardTemplate(infoMediasUser);
  const listMediaByUser = contentUser.getMediaContent(
    infoUser.portrait.split('.')[0]
  );
  contentUser.createMenuTri(infoUser);
  contentUser.createPostTemplate(infoUser);
  contentUser.createStickyBar(totalLikeByUserId, infoUser.price);
  contentUser.likePost();

  console.log(listMediaByUser);

  const modalLightbox = new ModalGalleryLightbox(listMediaByUser);
  modalLightbox.initModal();

  const modalContact = new ContactForm(infoUser.name);
  modalContact.initContactForm();
}

init();
