class ContentFactory {
  constructor(data, type) {
    // si le type de content correspond à une video, alors retourne la creation d'un post video
    if (type === 'video') {
      return;
      // Sinon retourne la creation d'un post image
    } else if (type === 'image') {
      return;
      // Message d'erreur si format non reconnu
    } else {
      throw 'Erreur format inconu';
    }
  }
}
