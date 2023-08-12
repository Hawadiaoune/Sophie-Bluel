// Création de la Fonction qui va ajouter les projets à la galerie// 
function ajouterTravauxAGalerie(travaux) {
  const galerieArchitecte = document.getElementById('galerie-architecte'); // Sélectionnez l'élément de la galerie dans le DOM


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
  console.log(travaux);

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
        console.log('bonjour')
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




//* Modale connexion/deconnexion



// Sélectionne l'élément du lien de connexion/logout
const loginLink = document.getElementById('loginLink');

// Vérifie si un token d'authentification est présent dans le stockage local
const token = localStorage.getItem('token');
if (token) {
  // Si un token est présent, cela signifie que l'utilisateur est connecté
  // Masque le lien de connexion et affichez le lien de déconnexion
  loginLink.textContent = 'Logout';
}



// Ajoutez un écouteur d'événement au lien de connexion/logout
loginLink.addEventListener('click', handleLoginLogout);


function handleLoginLogout() {
  if (token) {
    // Si un token est présent, cela signifie que l'utilisateur est connecté
    // Effectue ici les étapes de déconnexion

    // Supprime le token du stockage local
    localStorage.removeItem('token');

    // Redirige vers la page de login
    window.location.href = './index.html';
  } else {
    // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
    // Redirige vers la page de login
    window.location.href = './login.html';
  }
}



// Fonction pour mettre à jour l'affichage du bouton de connexion/logout dans la barre de navigation
function updateLoginButton() {
  const loginLink = document.getElementById('loginLink');

  // Vérifier si un token est présent
  const token = localStorage.getItem('token');
  if (token) {
    // Si un token est présent, cela signifie que l'utilisateur est connecté
    // Afficher "Logout" sur le bouton de connexion/logout
    loginLink.textContent = 'Logout';
  } else {
    // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
    // Afficher "Login" sur le bouton de connexion/logout
    loginLink.textContent = 'Login';
  }
}

// Appeler la fonction pour mettre à jour l'affichage du bouton de connexion/logout au chargement de la page
window.addEventListener('load', updateLoginButton);


// Écouter l'événement de clic sur le bouton de connexion/logout
loginLink.addEventListener('click', handleLoginLogout);



//* Modale 1

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
    // Affiche la modale
    modal.style.display = 'block';
  } else {
    // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
    // Redirige vers la page de login
    window.location.href = './login.html';
    modal.style.display = 'none';
  }
 
  }

  closeBtn.addEventListener('click', fermerModal);

  function fermerModal() {
    modal.style.display = 'none';
  }
});

// Fonction pour générer le contenu de la modale avec la galerie des travaux
function generateModalContent(travaux) {
  const modal = document.getElementById('modal');

  /*
  async function deleteImage(imageId) {
    try {
      const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token, 
        },
      });
  
      if (response.ok) {
        // La suppression a réussi
        // Supprimer l'élément de la photo du DOM correspondant
        const photoElement = document.querySelector(`img[data-id="${imageId}"]`);
        if (photoElement) {
          photoElement.remove();
        }
      } else {
        console.error('La suppression de l\'image a échoué :', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image :', error);
    }
  }
  
*/
  // Générer le contenu pour chaque travail
  travaux.forEach(travail => {
    const travailElement = document.createElement('div');
    travailElement.classList.add('travail');

    const imageElement = document.createElement('img');
    imageElement.src = travail.imageUrl;
    travailElement.appendChild(imageElement);



    // Ajouter l'icône poubelle pour supprimer la photo
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
    deleteIcon.addEventListener('click', () => deleteImage(travail.id)); // Appel de la fonction deleteImage avec l'ID du travail
    travailElement.appendChild(deleteIcon);
    console.log(deleteIcon)

  // Ajouter le bouton editer
    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Éditer';
    travailElement.appendChild(editButton);


    // Ajouter la div du travail à la modale
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
const modifierButton = document.getElementById('btnModifier');
modifierButton.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'block'; // Afficher la modale lorsque le bouton "Modifier" est cliqué

});




//* Deuxieme modale ajout photo



document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const addPhotoModal = document.getElementById('addPhotoModal');
  const closeButton = document.getElementById('closeAddPhotoModalButton');
  const openAddPhotoModalButton = document.getElementById('openAddPhotoModalButton');
  const saveImageButton = document.getElementById('saveImageButton');

  // Ajoutez un écouteur d'événement pour le clic sur le bouton "Ajouter une photo"
  openAddPhotoModalButton.addEventListener('click', openAddPhotoModal);

  // Fonction pour afficher la modale d'ajout de photo
  function openAddPhotoModal() {

    // Masquer la galerie photo
    modalContent.classList.add('hide');

    // Afficher la modale d'ajout de photo
    addPhotoModal.style.display = 'block';
  }


  // Fonction pour masquer la modale d'ajout de photo
  function closeAddPhotoModal() {
    addPhotoModal.style.display = 'none';
    
  }
  // Écouter l'événement de clic sur le bouton de fermeture de la modale d'ajout de photo
  closeButton.addEventListener('click', closeAddPhotoModal);



  // Récupérer les données du formulaire
const imageInput = document.getElementById('imageInput');
const titleInput = document.getElementById('imageTitle');


const imageFile = imageInput.files[0];
const title = titleInput.value;


// Créer un objet FormData pour envoyer les données de formulaire (y compris l'image) via la requête fetch
const formData = new FormData();
formData.append('image', imageFile);
formData.append('title', title);


// Envoi de la requête POST vers l'API
fetch('http://localhost:5678/api/works', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token, // Inclure le jeton d'accès dans l'en-tête de la requête si nécessaire
  },
  body: formData,
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Échec du téléchargement de l\'image sur le serveur.');
    }
    return response.json();
  })
  .then(nouvellePhoto => {
    console.log('Nouvelle photo ajoutée :', nouvellePhoto);

    // Rafraîchir la galerie avec les nouvelles données (optionnel)
    recupererTravauxArchitecte();
          // Rediriger vers la page d'accueil
      window.location.href = './index.html';
  })
  .catch(error => {
    console.error('Erreur lors du téléchargement de l\'image :', error);
  });


});

  // Fonction pour récupérer les catégories via fetch
  async function getCategories() {
    try {
      const response = await fetch('http://localhost:5678/api/categories');
      const categories = await response.json();

      // Appeler la fonction pour générer les options de la liste déroulante
      generateCategoryOptions(categories);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
    }
  }

  // Fonction pour générer les options de la liste déroulante
  function generateCategoryOptions(categories) {
    const imageCategorySelect = document.getElementById('imageCategory');



    // Générer les options pour les catégories récupérées
    categories.forEach(category => {
      const option = document.createElement('option');
      option.setAttribute('value', category.id);
      option.textContent = category.name;
      imageCategorySelect.appendChild(option);
    });
    // Filtrer les travaux par catégorie une fois que les options ont été générées
    filtrerTravauxParCategorie('tous');
  }

  // Appeler la fonction pour récupérer les catégories via fetch
  getCategories();
  recupererTravauxArchitecte();


  /*

// Création de la Fonction qui va ajouter les projets à la galerie
function ajouterTravauxAGalerie(travaux) {
  const galerieArchitecte = document.getElementById('galerie-architecte'); // Sélectionnez l'élément de la galerie dans le DOM

  // Supprimer les travaux existants avant d'ajouter les nouveaux
  galerieArchitecte.innerHTML = '';

  // création des éléments HTML
  travaux.forEach(travail => {
    const travailElement = document.createElement('figure');
    travailElement.classList.add('travail'); 
    travailElement.setAttribute('data-categoryId', travail.categoryId);

    const imageElement = document.createElement('img');
    imageElement.src = travail.imageUrl;

    const figcaptionElement = document.createElement('figcaption');
    figcaptionElement.textContent = travail.title;

    //ajout des éléments dans la galerie
    travailElement.appendChild(imageElement);
    travailElement.appendChild(figcaptionElement);
    galerieArchitecte.appendChild(travailElement);
  });
}

// Création du filtre par categorie
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


// Récupération des données de l'API via fetch + création de la variable contenant les nouveaux projets
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



//* Modale connexion/deconnexion

// Sélectionne l'élément du lien de connexion/logout
const loginLink = document.getElementById('loginLink');

// Vérifie si un token d'authentification est présent dans le stockage local
const token = localStorage.getItem('token');
if (token) {
  // Si un token est présent, cela signifie que l'utilisateur est connecté
  // Masque le lien de connexion et affiche le lien de déconnexion
  loginLink.textContent = 'Logout';
}

// Ajoute un écouteur d'événement au lien de connexion/logout
loginLink.addEventListener('click', handleLoginLogout);

function handleLoginLogout() {
  if (token) {
    // Si un token est présent, cela signifie que l'utilisateur est connecté
    // Effectue ici les étapes de déconnexion

    // Supprime le token du stockage local
    localStorage.removeItem('token');

    // Redirige vers la page de login
    window.location.href = './index.html';
  } else {
    // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
    // Redirige vers la page de login
    window.location.href = './login.html';
  }
}

// Fonction pour mettre à jour l'affichage du bouton de connexion/logout dans la barre de navigation
function updateLoginButton() {
  const loginLink = document.getElementById('loginLink');

  // Vérifier si un token est présent
  const token = localStorage.getItem('token');
  if (token) {
    // Si un token est présent, cela signifie que l'utilisateur est connecté
    // Afficher "Logout" sur le bouton de connexion/logout
    loginLink.textContent = 'Logout';
  } else {
    // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
    // Afficher "Login" sur le bouton de connexion/logout
    loginLink.textContent = 'Login';
  }
}

// Appeler la fonction pour mettre à jour l'affichage du bouton de connexion/logout au chargement de la page
window.addEventListener('load', updateLoginButton);

// Écouter l'événement de clic sur le bouton de connexion/logout
loginLink.addEventListener('click', handleLoginLogout);

//* Modale 1

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
      // Affiche la modale
      modal.style.display = 'block';
    } else {
      // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
      // Redirige vers la page de login
      window.location.href = './login.html';
      modal.style.display = 'none';
    }
  }

  closeBtn.addEventListener('click', fermerModal);

  function fermerModal() {
    modal.style.display = 'none';
  }
});

// Fonction pour générer le contenu de la modale avec la galerie des travaux
function generateModalContent(travaux) {
  const modal = document.getElementById('modal');

  // Supprimer le contenu existant de la modale
  modal.innerHTML = '';

  travaux.forEach(travail => {
    const travailElement = document.createElement('div');
    travailElement.classList.add('travail');

    const imageElement = document.createElement('img');
    imageElement.src = travail.imageUrl;
    travailElement.appendChild(imageElement);

    // Ajouter l'icône poubelle pour supprimer la photo
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
    deleteIcon.addEventListener('click', () => deleteImage(travail.id)); // Appel de la fonction deleteImage avec l'ID du travail
    travailElement.appendChild(deleteIcon);

    // Ajouter le bouton editer
    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Éditer';
    travailElement.appendChild(editButton);

    // Ajouter la div du travail à la modale
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
const modifierButton = document.getElementById('btnModifier');
modifierButton.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'block'; // Afficher la modale lorsque le bouton "Modifier" est cliqué
});

// Fonction pour supprimer une image via l'API
async function deleteImage(imageId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

    if (response.ok) {
      // La suppression a réussi
      // Supprimer l'élément de la photo du DOM correspondant
      const photoElement = document.querySelector(`img[data-id="${imageId}"]`);
      if (photoElement) {
        photoElement.remove();
      }
    } else {
      console.error('La suppression de l\'image a échoué :', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image :', error);
  }
}

// récuperation des données de l'API via fetch + création de la variable contenant les nouveaux projets
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



//* Deuxieme modale ajout photo

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const addPhotoModal = document.getElementById('addPhotoModal');
  const closeButton = document.getElementById('closeAddPhotoModalButton');
  const openAddPhotoModalButton = document.getElementById('openAddPhotoModalButton');
  const saveImageButton = document.getElementById('saveImageButton');

  // Ajoutez un écouteur d'événement pour le clic sur le bouton "Ajouter une photo"
  openAddPhotoModalButton.addEventListener('click', openAddPhotoModal);

  // Fonction pour afficher la modale d'ajout de photo
  function openAddPhotoModal() {

    // Masquer la galerie photo
    modalContent.classList.add('hide');

    // Afficher la modale d'ajout de photo
    addPhotoModal.style.display = 'block';
  }

  // Fonction pour masquer la modale d'ajout de photo
  function closeAddPhotoModal() {
    addPhotoModal.style.display = 'none';
  }

  // Écouter l'événement de clic sur le bouton de fermeture de la modale d'ajout de photo
  closeButton.addEventListener('click', closeAddPhotoModal);

  // Récupérer les données du formulaire
  const imageInput = document.getElementById('imageInput');
  const titleInput = document.getElementById('imageTitle');

  saveImageButton.addEventListener('click', function () {
    const imageFile = imageInput.files[0];
    const title = titleInput.value;

    // Créer un objet FormData pour envoyer les données de formulaire (y compris l'image) via la requête fetch
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('title', title);

    // Envoi de la requête POST vers l'API
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token, // Inclure le jeton d'accès dans l'en-tête de la requête si nécessaire
      },
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Échec du téléchargement de l\'image sur le serveur.');
        }
        return response.json();
      })
      .then(nouvellePhoto => {
        console.log('Nouvelle photo ajoutée :', nouvellePhoto);

        // Rafraîchir la galerie avec les nouvelles données (optionnel)
        recupererTravauxArchitecte();
        // Rediriger vers la page d'accueil
        window.location.href = './index.html';
      })
      .catch(error => {
        console.error('Erreur lors du téléchargement de l\'image :', error);
      });
  });
});


// Fonction pour récupérer les catégories via fetch
async function getCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();

    // Appeler la fonction pour générer les options de la liste déroulante
    generateCategoryOptions(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
  }
}

// Fonction pour générer les options de la liste déroulante
function generateCategoryOptions(categories) {
  const imageCategorySelect = document.getElementById('imageCategory');

  // Supprimer les options existantes
  imageCategorySelect.innerHTML = '';

  // Générer les options pour les catégories récupérées
  categories.forEach(category => {
    const option = document.createElement('option');
    option.setAttribute('value', category.id);
    option.textContent = category.name;
    imageCategorySelect.appendChild(option);
  });
  // Filtrer les travaux par catégorie une fois que les options ont été générées
  filtrerTravauxParCategorie('tous');
}

// Appeler la fonction pour récupérer les catégories via fetch
getCategories();


*/