class Photographers {
  dataPhotographers = null;

  // initialiser la fonction ci-dessous avant d'utiliser les methodes

  async initPhotographers() {
    const reponse = await fetch('./data/photographers.json');
    const photographes = await reponse.json();
    this.dataPhotographers = photographes;
  }

  getPhotographers() {
    return { photographers: this.dataPhotographers.photographers };
  }

  getPhotographersByID(id) {
    const infoUser = this.dataPhotographers.photographers.find((el) => {
      return el.id === id;
    });
    return infoUser;
  }

  totalLikeByUserId(medias) {
    const tableauMedia = medias;

    const initialValue = 0;
    const totalLikes = tableauMedia.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.likes;
    }, initialValue);

    return totalLikes;
  }

  getPhotographersMedia(id) {
    const infoMediaUser = this.dataPhotographers.media.filter((el) => {
      return el.photographerId === id;
    });
    return infoMediaUser;
  }
}
