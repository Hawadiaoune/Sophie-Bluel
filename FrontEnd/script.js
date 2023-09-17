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


// Appel de la fonction pour récupérer les travaux via fetch + création de la variable contenant les nouveaux projets
async function recupererTravauxArchitecte() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const travaux = await response.json();
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
  const boutonsCategories = document.querySelectorAll('#portfolio button');
  const travaux = document.querySelectorAll('.travail');

// Créer l'overlay
const overlay = document.createElement('div');
overlay.id = 'overlay';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'; // Noir avec 40% d'opacité
overlay.style.zIndex = '1000'; //  l'overlay est au-dessus de tout le reste
overlay.style.display = 'none'; // Initialement masqué

// Ajoutez l'overlay au corps (body) du document
document.body.appendChild(overlay);
  

  // Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem('token');

  if (token) {
    // Afficher le bouton "Modifier" si l'utilisateur est connecté

    boutonsCategories.forEach(bouton => {
      bouton.style.display = 'none';
    });
    btnModifier.style.display = 'block';
    
  }

  // Ajouter un écouteur d'événement pour le clic sur le bouton "Modifier"
  btnModifier.addEventListener('click', ouvrirModal);

// Ajoutez un gestionnaire d'événements pour le clic en dehors de la modale
document.addEventListener('click', function (event) {
  if (event.target === modal) {
    fermerModal();
  }
});


  function ouvrirModal() {
    
    // Vérifier si un token d'authentification est présent dans le stockage local
  const token = localStorage.getItem('token');
  if (token) {
    // Ajouter un écouteur d'événements pour le clic en dehors de la modale pour la fermer


    // Si un token est présent, cela signifie que l'utilisateur est connecté
    // Affiche la modale
    modal.style.display = 'block';
    addPhotoModal.style.zIndex = '2000'; // Assurez-vous que la modale est au-dessus de l'overlay
    // Affiche l'overlay lorsque la modale s'ouvre
    overlay.style.display = 'block';
    const travaux = document.querySelectorAll('.travail');
    travaux.forEach(travail => {
      travail.style.display = 'block';
    });

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
      // Réinitialisez le z-index de la modale
  addPhotoModal.style.zIndex = 'auto';
  // Réaffichez l'overlay
  overlay.style.display = 'none';
  const travaux = document.querySelectorAll('.travail');
  travaux.forEach(travail => {
    travail.style.display = 'block';
  });
  }
  
});





// Fonction pour générer le contenu de la modale avec la galerie des travaux
function generateModalContent(travaux) {

// Récupérer l'élément "Gallery" dans lequel  ajouter les travaux
const gallery = document.getElementById('gallery');


  // Générer le contenu pour chaque travail
  travaux.forEach(travail => {
    const travailElement = document.createElement('div');
    travailElement.classList.add('travail-modal');

    const imageElement = document.createElement('img');
    imageElement.src = travail.imageUrl;
    travailElement.appendChild(imageElement);

    travailElement.setAttribute('data-categoryId', travail.categoryId);

    /*ajouterTravauxAGalerie(travaux);*/

    // Ajouter l'icône poubelle pour supprimer la photo
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash', 'deleteIcon');
    deleteIcon.addEventListener('click', () => deleteImage(travail.id)); // Appel de la fonction deleteImage avec l'ID du travail
    travailElement.appendChild(deleteIcon);
    /*console.log(deleteIcon);*/

  // Ajouter le bouton editer
    const editText = document.createElement('span');
    editText.classList.add('edit-text');
    editText.textContent = 'éditer';
    travailElement.appendChild(editText);


    // Ajouter la div du travail à la modale

    gallery.appendChild(travailElement);

  });
};





// Fonction pour supprimer une image via l'API
async function deleteImage(imageId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: 'DELETE',
      headers: {
      Authorization : 'Bearer ' + token,
      'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      // La suppression a réussi
      // Supprimer l'élément de la photo du DOM correspondant
      const photoElement = document.querySelector(`img[data-id="${imageId}"]`); 
      console.log(photoElement);
      if (photoElement) {
        photoElement.remove();
      }
      /*
      recupererTravauxArchitecte();*/
    } else {
      console.error('La suppression de l\'image a échoué :', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image :', error);
  }
}


// Appel de la fonction pour récupérer les travaux via fetch + création de la variable contenant les nouveaux projets
async function recupererTravauxArchitecte() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const travaux = await response.json();
    generateModalContent(travaux); // Appel de la fonction pour générer le contenu de la modale avec les travaux
    ajouterTravauxAGalerie(travaux); // Traite les données récupérées et les ajoute à la galerie
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


  

  // Ajoute un écouteur d'événement pour le clic sur le bouton "Ajouter une photo"
 /* openAddPhotoModalButton.addEventListener('click', openAddPhotoModal);


  // Fonction pour afficher la modale d'ajout de photo
  function openAddPhotoModal() {

    // Masquer la galerie photo
    modalContent.style.display = 'none';

    // Afficher la modale d'ajout de photo
    addPhotoModal.style.display = 'block';

      // Masquer le bouton "Ajouter une photo"
  openAddPhotoModalButton.style.display = 'none';

  deleteGalleryButton.style.display = 'none';

  }


 // Fonction pour masquer la modale d'ajout de photo
 function closeAddPhotoModal() {
  addPhotoModal.style.display = 'none';

  // Réafficher la galerie photo
  modalContent.style.display = 'block';

}



  // Écouter l'événement de clic sur le bouton de fermeture de la modale d'ajout de photo
  closeButton.addEventListener('click', closeAddPhotoModal);


  // Écouter l'événement de clic en dehors de la modale pour la fermer
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeAddPhotoModal();
    }

  });

  

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

    // Rafraîchir la galerie avec les nouvelles données
    recupererTravauxArchitecte();
          // Rediriger vers la page d'accueil
      window.location.href = './index.html';
  })
  .catch(error => {
    console.error('Erreur lors du téléchargement de l\'image :', error);
  });
*/

// ...

// Ajoute un écouteur d'événement pour le clic sur le bouton "Ajouter une photo"
openAddPhotoModalButton.addEventListener('click', openAddPhotoModal);

// Ajoutez un gestionnaire d'événements pour le clic en dehors de la modale
document.addEventListener('click', function (event) {
  if (event.target === addPhotoModal) {
    closeAddPhotoModal();
  }
});


// Fonction pour afficher la modale d'ajout de photo
function openAddPhotoModal() {
  // Masquer la galerie photo
  modalContent.style.display = 'none';

  // Afficher la modale d'ajout de photo
  addPhotoModal.style.display = 'block';

  // Masquer le bouton "Ajouter une photo"
  openAddPhotoModalButton.style.display = 'none';
  deleteGalleryButton.style.display = 'none';
}

 // Fonction pour masquer la modale d'ajout de photo
 function closeAddPhotoModal() {
  addPhotoModal.style.display = 'none';

  // Réafficher la galerie photo
  modalContent.style.display = 'block';

}



  // Écouter l'événement de clic sur le bouton de fermeture de la modale d'ajout de photo
  closeButton.addEventListener('click', closeAddPhotoModal);


  
  // Ajouter un gestionnaire d'événements pour le clic sur le bouton "Valider"
  saveImageButton.addEventListener('click', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

/*
    // Récupérer les données du formulaire
    const imageInput = document.getElementById('imageInput');
    if (!imageInput.files || imageInput.files.length === 0) {
      alert("Veuillez sélectionner une image avant de valider.");
      return;
    }
    const titleInput = document.getElementById('imageTitle');

    const imageFile = imageInput.files[0];
    console.log(imageInput.files)
    const title = titleInput.value;
    const imageCategorySelect = document.getElementById('imageCategory');

    // Créer un objet FormData pour envoyer les données de formulaire (y compris l'image) via la requête fetch
    const formData = new FormData();
    formData.append('imageUrl', imageFile);
    console.log(formData.get.imageFile)
    formData.append('title', title);
    formData.append('imageCategory', imageCategorySelect.value);

    

    // Envoi de la requête POST vers l'API
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token, // Inclure le jeton d'accès dans l'en-tête de la requête si nécessaire
        'Content-Type': 'multipart/form-data',
      },
      body: {title: 'ess', categoryId: 1 },
    })
  
      .then(response => {
        console.log(response);
        if (!response.ok) {
        
          throw new Error('Échec du téléchargement de l\'image sur le serveur.');
        }
        return response.json();
      })
      .then(nouvellePhoto => {
        console.log('Nouvelle photo ajoutée :', nouvellePhoto);

        // Rafraîchir la galerie avec les nouvelles données
        recupererTravauxArchitecte();
        
        // Rediriger vers la page d'accueil
        window.location.href = './index.html';
      })
      .catch(error => {
        console.error('Erreur lors du téléchargement de l\'image :', error);
      });*/

      // Récupérer les données du formulaire
const imageInput = document.getElementById('imageInput');
if (!imageInput.files || imageInput.files.length === 0) {
  alert("Veuillez sélectionner une image avant de valider.");
  return;
}
const titleInput = document.getElementById('imageTitle');

const imageFile = imageInput.files[0];
const title = titleInput.value;
const imageCategorySelect = document.getElementById('imageCategory');

// Créer un objet FormData pour envoyer les données de formulaire (y compris l'image) via la requête fetch
const formData = new FormData();
formData.append('image', imageFile); // Utilisez 'image' ici pour correspondre à la clé attendue dans le backend
formData.append('title', title);
formData.append('category', imageCategorySelect.value); // Utilisez 'category' ici pour correspondre à la clé attendue dans le backend

// Envoi de la requête POST vers l'API
fetch('http://localhost:5678/api/works', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token, // Inclure le jeton d'accès dans l'en-tête de la requête si nécessaire
  },
  body: formData, // Utilisez formData comme corps de la requête
})
  .then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error('Échec du téléchargement de l\'image sur le serveur.');
    }
    return response.json();
  })
  .then(nouvellePhoto => {
    console.log('Nouvelle photo ajoutée :', nouvellePhoto);

    // Rafraîchir la galerie avec les nouvelles données
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

    //Ajouter une option case vide 
    const emptyOption = document.createElement('option');
  emptyOption.setAttribute('value', ''); // La valeur vide
  emptyOption.textContent = ''; // Texte vide
  imageCategorySelect.appendChild(emptyOption);


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
  

  getCategories();



 









