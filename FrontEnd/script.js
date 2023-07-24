// Création de la Fonction qui va ajouter les projets à la galerie// 
function ajouterTravauxAGalerie(travaux) {
  const galerieArchitecte = document.getElementById('galerie-architecte'); // Sélectionnez l'élément de la galerie dans le DOM

  // Supprimer les travaux existants avant d'ajouter les nouveaux//
  galerieArchitecte.innerHTML = '';

// création des ééléments HTML //
  travaux.forEach(travail => {
      const travailElement = document.createElement('figure');
      travailElement.classList.add('travail'); 
      travailElement.setAttribute('data-categoryId', travail.categoryId);

      const imageElement = document.createElement('img');
      imageElement.src = travail.imageUrl;

      const figcaptionElement = document.createElement('figcaption');
      figcaptionElement.textContent = travail.title;

//ajout des éléments dans la galerie//
      travailElement.appendChild(imageElement);
      travailElement.appendChild(figcaptionElement);
      galerieArchitecte.appendChild(travailElement);
  });
}

// creation du filtre par categorie // Fonction pour filtrer les travaux par catégorie
function filtrerTravauxParCategorie(categorie) {
  const travaux = document.querySelectorAll('.travail');

  travaux.forEach(travail => {
      const travailCategoryId = travail.getAttribute('data-categoryId');

      if (categorie === 'tous' || travailCategoryId === categorie) {
          travail.style.display = 'block';
      } else {
          travail.style.display = 'none';
      }
  });
}

const boutonsCategories = document.querySelectorAll('#portfolio button');

boutonsCategories.forEach(bouton => {
    bouton.addEventListener('click', function () {
        const categorie = this.getAttribute('data-categoryId');
        filtrerTravauxParCategorie(categorie);
      });
    });


// récuperation des données de l'API via fetch + creation de la variable contenant les nouveaux projets//
async function recupererTravauxArchitecte() {
  try {
      const response = await fetch('http://localhost:5678/api/works');
      const travaux = await response.json(); // Convertit la réponse en JSON
      ajouterTravauxAGalerie(travaux); // Traite les données récupérées et les ajoute à la galerie
  } catch (error) {
      console.error('Erreur lors de la récupération des travaux :', error);
  }
}

// Appel de la fonction pour récupérer et ajouter les travaux à la galerie
recupererTravauxArchitecte();





//* Modale

document.addEventListener('DOMContentLoaded', function() {
  const btnModifier = document.getElementById('btnModifier');
  const modal = document.getElementById('modal');
  const closeBtn = document.querySelector('.close');

  // Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem('token');

  if (token) {
    // Afficher le bouton "Modifier" si l'utilisateur est connecté
    btnModifier.style.display = 'block';
  }

  // Ajouter un écouteur d'événement pour le clic sur le bouton "Modifier"
  btnModifier.addEventListener('click', ouvrirModal);

  function ouvrirModal() {
    // Vérifiez si un token d'authentification est présent dans le stockage local
  const token = localStorage.getItem('token');
  if (token) {
    // Si un token est présent, cela signifie que l'utilisateur est connecté
    // Affichez la modale
    modal.style.display = 'block';
  } else {
    // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
    // Redirigez vers la page de login
    window.location.href = 'login.html';
  }
    modal.style.display = 'block';
  }

  closeBtn.addEventListener('click', fermerModal);

  function fermerModal() {
    modal.style.display = 'none';
  }
});

// Sélectionnez l'élément du lien de connexion/logout
const loginLink = document.getElementById('loginLink');

// Vérifiez si un token d'authentification est présent dans le stockage local
const token = localStorage.getItem('token');
if (token) {
  // Si un token est présent, cela signifie que l'utilisateur est connecté
  // Masquez le lien de connexion et affichez le lien de déconnexion
  loginLink.textContent = 'Logout';
} else {
  // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
  // Masquez le lien de déconnexion
  loginLink.style.display = 'none';
}


// Ajoutez un écouteur d'événement au lien de connexion/logout
loginLink.addEventListener('click', handleLoginLogout);




function handleLoginLogout() {
  if (token) {
    // Si un token est présent, cela signifie que l'utilisateur est connecté
    // Effectuez ici les étapes de déconnexion

    // Supprimez le token du stockage local
    localStorage.removeItem('token');

    // Redirigez vers la page de login
    window.location.href = './index.html';
  } else {
    // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
    // Redirigez vers la page de login
    window.location.href = 'login.html';
  }
}


// Fonction pour mettre à jour l'affichage du bouton de connexion/logout dans la barre de navigation
function updateLoginButton() {
  const loginNavItem = document.getElementById('loginNavItem');
  const logoutNavItem = document.getElementById('logoutNavItem');

  if (token) {
    // Si un token est présent, cela signifie que l'utilisateur est connecté
    // Afficher le bouton de déconnexion et masquer le bouton de connexion
    loginNavItem.style.display = 'none';
    logoutNavItem.style.display = 'block';
  } else {
    // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
    // Afficher le bouton de connexion et masquer le bouton de déconnexion
    loginNavItem.style.display = 'block';
    logoutNavItem.style.display = 'none';
  }
}

// Appeler la fonction updateLoginButton() au chargement de la page pour mettre à jour l'affichage initial
window.addEventListener('load', updateLoginButton);

// Écouter l'événement de clic sur le bouton de connexion/logout
loginLink.addEventListener('click', handleLoginLogout);



// Fonction pour générer le contenu de la modale avec la galerie des travaux
function generateModalContent(travaux) {
  const modal = document.getElementById('modal');



  // Générer le contenu pour chaque travail
  travaux.forEach(travail => {
    const travailElement = document.createElement('div');
    travailElement.classList.add('travail');

    const imageElement = document.createElement('img');
    imageElement.src = travail.imageUrl;
    travailElement.appendChild(imageElement);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Éditer';
    travailElement.appendChild(editButton);

    modal.appendChild(travailElement);
  });
}

// Appel de la fonction pour récupérer les travaux via fetch
async function recupererTravauxArchitecte() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const travaux = await response.json();
    generateModalContent(travaux); // Appel de la fonction pour générer le contenu de la modale avec les travaux
  } catch (error) {
    console.error('Erreur lors de la récupération des travaux :', error);
  }
}

// Écouter l'événement de clic sur le bouton "Modifier" pour ouvrir la modale
const modifierButton = document.getElementById('modifierButton');
modifierButton.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'block'; // Afficher la modale lorsque le bouton "Modifier" est cliqué
  recupererTravauxArchitecte(); // Récupérer les travaux et générer le contenu de la modale
});

// jusqu'ici ok//




/* Sélectionnez les éléments nécessaires pour la modale de galerie
const modal = document.getElementById('modal');
const editButton = document.getElementById('editButton');
const gallery = document.getElementById('gallery');
const deleteGalleryButton = document.getElementById('deleteGalleryButton');

// Fonction pour afficher la modale
function openModal() {
  modal.style.display = 'block';
  // Chargez la galerie d'images
  loadGallery();
}

// Fonction pour masquer la modale
function closeModal() {
  modal.style.display = 'none';
}

// Fonction pour charger la galerie d'images
async function loadGallery() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const travaux = await response.json();

    // Afficher les images dans la galerie
    travaux.forEach(travail => {
      const imgElement = document.createElement('img');
      imgElement.src = travail.imageUrl;
      gallery.appendChild(imgElement);

      // Ajouter le bouton "Supprimer" pour chaque image
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Supprimer';
      deleteButton.addEventListener('click', () => deleteImage(travail.id));
      gallery.appendChild(deleteButton);
    });
  } catch (error) {
    console.error('Erreur lors du chargement de la galerie:', error);
  }
}





// Ajouter un gestionnaire d'événements au bouton "Modifier"
editButton.addEventListener('click', openModal);


// Ajouter un gestionnaire d'événements au bouton "Supprimer la galerie"
deleteGalleryButton.addEventListener('click', () => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer la galerie ?')) {
    // Effectuez ici les étapes de suppression de la galerie, si nécessaire
    gallery.innerHTML = '';
  }
});
*/



//* deuxieme modale


/*
// Sélectionnez les éléments nécessaires pour la modale d'ajout de photo
const addImageButton = document.getElementById('addImageButton');
const addPhotoModal = document.getElementById('addPhotoModal');
const closeAddPhotoModalButton = document.getElementById('closeAddPhotoModalButton');

// Fonction pour afficher la modale de galerie
function openModal() {
  modal.style.display = 'block';
  // Chargez la galerie d'images
  loadGallery();
}

// Fonction pour masquer la modale de galerie
function closeModal() {
  modal.style.display = 'none';
}



// Fonction pour afficher la modale d'ajout de photo
function openAddPhotoModal() {
  addPhotoModal.style.display = 'block';
}

// Fonction pour masquer la modale d'ajout de photo
function closeAddPhotoModal() {
  addPhotoModal.style.display = 'none';
}

// Écouter l'événement de clic sur le bouton "Modifier" pour ouvrir la modale de galerie
editButton.addEventListener('click', openModal);

// Écouter l'événement de clic sur le bouton "Supprimer la galerie"
deleteGalleryButton.addEventListener('click', () => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer la galerie ?')) {
    // Effectuez ici les étapes de suppression de la galerie, si nécessaire
    gallery.innerHTML = '';
  }
});

// Écouter l'événement de clic sur le bouton "Ajouter une image" pour ouvrir la modale d'ajout de photo
addImageButton.addEventListener('click', openAddPhotoModal);

// Écouter l'événement de clic sur le bouton "Fermer" dans la modale d'ajout de photo
closeAddPhotoModalButton.addEventListener('click', closeAddPhotoModal);

// Écouter l'événement de soumission du formulaire d'ajout de photo
addImageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(addImageForm);
  addImage(formData);
});


// Sélectionnez les éléments nécessaires pour la modale de galerie
const modal = document.getElementById('modal');
const editButton = document.getElementById('editButton');
const gallery = document.getElementById('gallery');
const deleteGalleryButton = document.getElementById('deleteGalleryButton');

// Fonction pour afficher la modale de galerie
function openModal() {
  modal.style.display = 'block';
  // Chargez la galerie d'images
  loadGallery();
}

// Fonction pour masquer la modale de galerie
function closeModal() {
  modal.style.display = 'none';
}

// Fonction pour charger la galerie d'images
async function loadGallery() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const travaux = await response.json();

    // Afficher les images dans la galerie
    travaux.forEach(travail => {
      const imgElement = document.createElement('img');
      imgElement.src = travail.imageUrl;
      gallery.appendChild(imgElement);

      // Ajouter le bouton "Supprimer" pour chaque image
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Supprimer';
      deleteButton.addEventListener('click', () => deleteImage(travail.id));
      gallery.appendChild(deleteButton);
    });
  } catch (error) {
    console.error('Erreur lors du chargement de la galerie:', error);
  }
}

// Fonction pour supprimer une image
async function deleteImage(id) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // Rechargez la galerie après la suppression
      gallery.innerHTML = '';
      loadGallery();
    } else {
      console.error('Erreur lors de la suppression de l\'image:', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
  }
}

// Ajouter un gestionnaire d'événements au bouton "Modifier"
editButton.addEventListener('click', openModal);

// Ajouter un gestionnaire d'événements au bouton "Supprimer la galerie"
deleteGalleryButton.addEventListener('click', () => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer la galerie ?')) {
    // Effectuez ici les étapes de suppression de la galerie, si nécessaire
    gallery.innerHTML = '';
  }
});
*/


//* Deuxième modale pour l'ajout de photo

// Sélectionnez les éléments nécessaires
const addImageButton = document.getElementById('addImageButton');
const addPhotoModal = document.getElementById('addPhotoModal');
const closeAddPhotoModalButton = document.getElementById('closeAddPhotoModalButton');
const addImageForm = document.getElementById('addImageForm');
const imageInput = document.getElementById('imageInput');
const imageTitleInput = document.getElementById('imageTitle');
const imageCategoryInput = document.getElementById('imageCategory');
const saveImageButton = document.getElementById('saveImageButton');

// Fonction pour afficher la modale d'ajout de photo
function openAddPhotoModal() {
  addPhotoModal.style.display = 'block';
}

// Fonction pour masquer la modale d'ajout de photo
function closeAddPhotoModal() {
  addPhotoModal.style.display = 'none';
}

// Écouter l'événement de clic sur le bouton "Ajouter une image" pour ouvrir la modale d'ajout de photo
addImageButton.addEventListener('click', openAddPhotoModal);

// Écouter l'événement de clic sur le bouton de fermeture de la modale d'ajout de photo
closeAddPhotoModalButton.addEventListener('click', closeAddPhotoModal);

// Écouter l'événement de soumission du formulaire d'ajout d'image
addImageForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Créer un nouvel objet FormData pour envoyer l'image, le titre et la catégorie
  const formData = new FormData();
  formData.append('image', imageInput.files[0]);
  formData.append('title', imageTitleInput.value);
  formData.append('category', imageCategoryInput.value);

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // Rechargez la galerie après l'ajout
      gallery.innerHTML = '';
      loadGallery();
      // Fermer la modale d'ajout de photo
      closeAddPhotoModal();
    } else {
      console.error('Erreur lors de l\'ajout de l\'image:', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'image:', error);
  }
});


/*
document.addEventListener('DOMContentLoaded', function () {
  const btnModifier = document.getElementById('btnModifier');
  const modal = document.getElementById('modal');
  const closeBtn = document.querySelector('.close');

  // Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem('token');

  if (token) {
    // Afficher le bouton "Modifier" si l'utilisateur est connecté
    btnModifier.style.display = 'block';
  }

  // Ajouter un écouteur d'événement pour le clic sur le bouton "Modifier"
  btnModifier.addEventListener('click', ouvrirModal);

  function ouvrirModal() {
    // Vérifiez si un token d'authentification est présent dans le stockage local
    const token = localStorage.getItem('token');
    if (token) {
      // Si un token est présent, cela signifie que l'utilisateur est connecté
      // Affichez la modale
      modal.style.display = 'block';
    } else {
      // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
      // Redirigez vers la page de login
      window.location.href = 'login.html';
    }
  }

  closeBtn.addEventListener('click', fermerModal);

  function fermerModal() {
    modal.style.display = 'none';
  }
});

// Sélectionnez l'élément du lien de connexion/logout
const loginLink = document.getElementById('loginLink');

// Vérifiez si un token d'authentification est présent dans le stockage local
const token = localStorage.getItem('token');
if (token) {
  // Si un token est présent, cela signifie que l'utilisateur est connecté
  // Masquez le lien de connexion et affichez le lien de déconnexion
  loginLink.textContent = 'Logout';
} else {
  // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
  // Masquez le lien de déconnexion
  loginLink.style.display = 'none';
}

// Ajoutez un gestionnaire d'événements au lien de connexion/logout
loginLink.addEventListener('click', handleLoginLogout);

// Fonction pour générer le contenu de la modale avec la galerie des travaux
function generateModalContent(travaux) {
  const modal = document.getElementById('modal');
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Vider la galerie avant d'ajouter les nouvelles images

  // Générer le contenu pour chaque travail
  travaux.forEach(travail => {
    const travailElement = document.createElement('div');
    travailElement.classList.add('travail');

    const imageElement = document.createElement('img');
    imageElement.src = travail.imageUrl;
    imageElement.style.width = '76px';
    imageElement.style.height = '102px';
    travailElement.appendChild(imageElement);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Éditer';
    travailElement.appendChild(editButton);

    modal.appendChild(travailElement);
  });
}

// Appel de la fonction pour récupérer les travaux via fetch
async function recupererTravauxArchitecte() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const travaux = await response.json();
    generateModalContent(travaux); // Appel de la fonction pour générer le contenu de la modale avec les travaux
  } catch (error) {
    console.error('Erreur lors de la récupération des travaux :', error);
  }
}

// Écouter l'événement de clic sur le bouton "Modifier" pour ouvrir la modale
const modifierButton = document.getElementById('modifierButton');
modifierButton.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'block'; // Afficher la modale lorsque le bouton "Modifier" est cliqué
  recupererTravauxArchitecte(); // Récupérer les travaux et générer le contenu de la modale
});

// Deuxième modale pour l'ajout de photo
const addImageButton = document.getElementById('addImageButton');
const addPhotoModal = document.getElementById('addPhotoModal');
const closeAddPhotoModalButton = document.getElementById('closeAddPhotoModalButton');
const addImageForm = document.getElementById('addImageForm');
const imageInput = document.getElementById('imageInput');
const imageTitleInput = document.getElementById('imageTitle');
const imageCategoryInput = document.getElementById('imageCategory');
const saveImageButton = document.getElementById('saveImageButton');

// Fonction pour afficher la modale d'ajout de photo
function openAddPhotoModal() {
  addPhotoModal.style.display = 'block';
}

// Fonction pour masquer la modale d'ajout de photo
function closeAddPhotoModal() {
  addPhotoModal.style.display = 'none';
}

// Écouter l'événement de clic sur le bouton "Ajouter une image" pour ouvrir la modale d'ajout de photo
addImageButton.addEventListener('click', openAddPhotoModal);
console.log(addImageButton);

// Écouter l'événement de clic sur le bouton de fermeture de la modale d'ajout de photo
closeAddPhotoModalButton.addEventListener('click', closeAddPhotoModal);

// Écouter l'événement de soumission du formulaire d'ajout d'image
addImageForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Créer un nouvel objet FormData pour envoyer l'image, le titre et la catégorie
  const formData = new FormData();
  formData.append('image', imageInput.files[0]);
  formData.append('title', imageTitleInput.value);
  formData.append('category', imageCategoryInput.value);

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // Rechargez la galerie après l'ajout
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = '';
      recupererTravauxArchitecte(); // Recharger la galerie de travaux
      // Fermer la modale d'ajout de photo
      closeAddPhotoModal();
    } else {
      console.error('Erreur lors de l\'ajout de l\'image:', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'image:', error);
  }
});

*/

/*document.addEventListener('DOMContentLoaded', function () {
  const btnModifier = document.getElementById('btnModifier');
  const modal = document.getElementById('modal');
  const closeBtn = document.querySelector('.close');

  // Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem('token');

  if (token) {
    // Afficher le bouton "Modifier" si l'utilisateur est connecté
    btnModifier.style.display = 'block';
  }

  // Ajouter un écouteur d'événement pour le clic sur le bouton "Modifier"
  btnModifier.addEventListener('click', ouvrirModal);

  function ouvrirModal() {
    // Vérifiez si un token d'authentification est présent dans le stockage local
    const token = localStorage.getItem('token');
    if (token) {
      // Si un token est présent, cela signifie que l'utilisateur est connecté
      // Affichez la modale
      modal.style.display = 'block';
    } else {
      // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
      // Redirigez vers la page de login
      window.location.href = 'login.html';
    }
  }

  closeBtn.addEventListener('click', fermerModal);

  function fermerModal() {
    modal.style.display = 'none';
  }
});

// Sélectionnez l'élément du lien de connexion/logout
const loginLink = document.getElementById('loginLink');

// Vérifiez si un token d'authentification est présent dans le stockage local
const token = localStorage.getItem('token');
if (token) {
  // Si un token est présent, cela signifie que l'utilisateur est connecté
  // Masquez le lien de connexion et affichez le lien de déconnexion
  loginLink.textContent = 'Logout';
} else {
  // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
  // Masquez le lien de déconnexion
  loginLink.style.display = 'none';
}

// Ajoutez un gestionnaire d'événements au lien de connexion/logout
loginLink.addEventListener('click', handleLoginLogout);

// Fonction pour générer le contenu de la modale avec la galerie des travaux
function generateModalContent(travaux) {
  const modal = document.getElementById('modal');
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Vider la galerie avant d'ajouter les nouvelles images

  // Générer le contenu pour chaque travail
  travaux.forEach(travail => {
    const travailElement = document.createElement('div');
    travailElement.classList.add('travail');

    const imageElement = document.createElement('img');
    imageElement.src = travail.imageUrl;
    imageElement.style.width = '76px';
    imageElement.style.height = '102px';
    travailElement.appendChild(imageElement);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Éditer';
    travailElement.appendChild(editButton);

    modal.appendChild(travailElement);
  });
}

// Appel de la fonction pour récupérer les travaux via fetch
async function recupererTravauxArchitecte() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const travaux = await response.json();
    generateModalContent(travaux); // Appel de la fonction pour générer le contenu de la modale avec les travaux
  } catch (error) {
    console.error('Erreur lors de la récupération des travaux :', error);
  }
}

// Écouter l'événement de clic sur le bouton "Modifier" pour ouvrir la modale
const modifierButton = document.getElementById('modifierButton');
modifierButton.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'block'; // Afficher la modale lorsque le bouton "Modifier" est cliqué
  recupererTravauxArchitecte(); // Récupérer les travaux et générer le contenu de la modale
});

// Deuxième modale pour l'ajout de photo
const addImageButton = document.getElementById('addImageButton');
const addPhotoModal = document.getElementById('addPhotoModal');
const closeAddPhotoModalButton = document.getElementById('closeAddPhotoModalButton');
const addImageForm = document.getElementById('addImageForm');
const imageInput = document.getElementById('imageInput');
const imageTitleInput = document.getElementById('imageTitle');
const imageCategoryInput = document.getElementById('imageCategory');
const saveImageButton = document.getElementById('saveImageButton');

// Fonction pour afficher la modale d'ajout de photo
function openAddPhotoModal() {
  addPhotoModal.style.display = 'block';
}

// Fonction pour masquer la modale d'ajout de photo
function closeAddPhotoModal() {
  addPhotoModal.style.display = 'none';
}

// Écouter l'événement de clic sur le bouton "Ajouter une image" pour ouvrir la modale d'ajout de photo
addImageButton.addEventListener('click', openAddPhotoModal);

// Écouter l'événement de clic sur le bouton de fermeture de la modale d'ajout de photo
closeAddPhotoModalButton.addEventListener('click', closeAddPhotoModal);

// Écouter l'événement de soumission du formulaire d'ajout d'image
addImageForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Créer un nouvel objet FormData pour envoyer l'image, le titre et la catégorie
  const formData = new FormData();
  formData.append('image', imageInput.files[0]);
  formData.append('title', imageTitleInput.value);
  formData.append('category', imageCategoryInput.value);

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // Rechargez la galerie après l'ajout
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = '';
      recupererTravauxArchitecte(); // Recharger la galerie de travaux
      // Fermer la modale d'ajout de photo
      closeAddPhotoModal();
    } else {
      console.error('Erreur lors de l\'ajout de l\'image:', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'image:', error);
  }
});*/
