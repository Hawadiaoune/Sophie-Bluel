// Création de la Fonction qui va ajouter les projets à la galerie// 
function ajouterTravauxAGalerie(travaux) {
  const galerieArchitecte = document.getElementById('galerie-architecte'); // Sélectionnez l'élément de la galerie dans le DOM


// création des éléments HTML //
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
      const travailCategoryId = travail.getAttribute('data-categoryId'); // pour chaque travail, extraction de l'id

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
          // Supprimer la classe "active" de tous les boutons de catégorie
    boutonsCategories.forEach(b => b.classList.remove('active'));

    // Ajouter la classe "active" uniquement au bouton de catégorie cliqué
    bouton.classList.add('active');
        const categorie = this.getAttribute('data-categoryId');
        filtrerTravauxParCategorie(categorie);
        console.log('ok')
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


// Sélectionner l'élément du lien de connexion/logout
const loginLink = document.getElementById('loginLink');

// Vérifier si un token d'authentification est présent dans le stockage local
const token = localStorage.getItem('token');
if (token) {
  // Si un token est présent, cela signifie que l'utilisateur est connecté

  loginLink.textContent = 'Logout';
}


// Ajouter un écouteur d'événement au lien de connexion/logout
loginLink.addEventListener('click', handleLoginLogout);


function handleLoginLogout() {
  if (token) {
    // Si un token est présent, cela signifie que l'utilisateur est connecté

    // Supprimer le token du stockage local
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



//* Modale 1 - affichage de la galerie

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

// Ajouter l'overlay au corps (body) du document
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

// Ajouter un gestionnaire d'événements pour le clic en dehors de la modale
document.addEventListener('click', function (event) {
  if (event.target === overlay) {
    fermerModal();
  }
});


  function ouvrirModal() {
    
    // Vérifier si un token d'authentification est présent dans le stockage local
  const token = localStorage.getItem('token');
  if (token) {
    // Ajouter un écouteur d'événements pour le clic en dehors de la modale pour la fermer


    // Si un token est présent, cela signifie que l'utilisateur est connecté
    // Afficher la modale
    modal.style.display = 'block';
    addPhotoModal.style.zIndex = '2000'; // Assurer que la modale est au-dessus de l'overlay
    // Afficher l'overlay lorsque la modale s'ouvre
    overlay.style.display = 'block';
    const travaux = document.querySelectorAll('.travail');
    travaux.forEach(travail => {
      travail.style.display = 'block';
    });

  } else {
    // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
    // Rediriger vers la page de login
    window.location.href = './login.html';
    modal.style.display = 'none';
  }
 
  }

  closeBtn.addEventListener('click', fermerModal);


  function fermerModal() {
    modal.style.display = 'none';
      // Réinitialiser le z-index de la modale
  addPhotoModal.style.zIndex = 'auto';
  // Réafficher l'overlay
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


    // Ajouter l'icône poubelle pour supprimer la photo
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash', 'deleteIcon');
    deleteIcon.addEventListener('click', (event) => deleteImage(event, travail.id)); // Appel de la fonction deleteImage avec l'ID du travail
    travailElement.appendChild(deleteIcon);


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
async function deleteImage(event, imageId) {
  event.preventDefault();
  
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
           // Mettre à jour la liste des travaux après la suppression réussie
            recupererTravauxArchitecte();
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
    ajouterTravauxAGalerie(travaux); // Traite les données récupérées et les ajoute à la galerie
    // Nettoyer la galerie existante et ajouter les travaux
    gallery.innerHTML = ''; // Supprimer tous les éléments enfants de la galerie
    generateModalContent(travaux); // Ajouter les travaux à la galerie
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

  const deleteGalleryButton = document.getElementById('deleteGalleryButton');
  
// Ajouter un écouteur d'événement pour le clic sur le bouton "Ajouter une photo"
openAddPhotoModalButton.addEventListener('click', openAddPhotoModal);

// Ajouter un gestionnaire d'événements pour le clic en dehors de la modale
document.addEventListener('click', function (event) {
  if (event.target === overlay) {
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
  // Réafficher les boutons "Ajouter une photo" et "Supprimer ma galerie"
  openAddPhotoModalButton.style.display = 'block';
  deleteGalleryButton.style.display = 'block';
}



  // Écouter l'événement de clic sur le bouton de fermeture de la modale d'ajout de photo
  closeButton.addEventListener('click', closeAddPhotoModal);
  
  
  // Ajouter un gestionnaire d'événements pour le clic sur le bouton "Valider"
  saveImageButton.addEventListener('click', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire


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

// Créer un objet FormData pour envoyer les données de formulaire via la requête fetch
const formData = new FormData();
formData.append('image', imageFile); 
formData.append('title', title);
formData.append('category', imageCategorySelect.value); 


const gallery = document.getElementById('gallery');

// Envoi de la requête POST vers l'API
fetch('http://localhost:5678/api/works', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token, // Inclure le jeton d'accès dans l'en-tête de la requête 
  },
  body: formData, // Utiliser formData comme corps de la requête
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
    closeAddPhotoModal();

 // rafraichir la galerie 
  recupererTravauxArchitecte();

  })
  .catch(error => {
    console.error('Erreur lors du téléchargement de l\'image :', error);
  });

      
  });

// Fonction pour nettoyer la galerie existante et ajouter les nouveaux travaux
function updateGallery(travaux) {
  const gallery = document.getElementById('gallery');
  
  // Supprimer tous les éléments enfants de la galerie
  gallery.innerHTML = '';
  
  // Ajouter les travaux à la galerie
  travaux.forEach(travail => {
    const travailElement = document.createElement('div');
    travailElement.classList.add('travail-modal');
    // ...
    const imageElement = document.createElement('img');
    imageElement.src = travail.imageUrl;
    travailElement.appendChild(imageElement);
    travailElement.setAttribute('data-categoryId', travail.categoryId);


    // Ajouter l'icône poubelle pour supprimer la photo
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash', 'deleteIcon');
    deleteIcon.addEventListener('click', (event) => deleteImage(event, travail.id)); // Appel de la fonction deleteImage avec l'ID du travail
    travailElement.appendChild(deleteIcon);


  // Ajouter le bouton editer
    const editText = document.createElement('span');
    editText.classList.add('edit-text');
    editText.textContent = 'éditer';
    travailElement.appendChild(editText);


    // Ajouter la div du travail à la modale
    gallery.appendChild(travailElement);
  });
}

// Fonction pour récupérer les travaux via fetch + mise à jour de la galerie
async function recupererTravauxArchitecte() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const travaux = await response.json();
    
    // Mettre à jour la galerie avec les nouveaux travaux
    updateGallery(travaux);
  } catch (error) {
    console.error('Erreur lors de la récupération des travaux :', error);
  }
} 

updateGallery();
/*  

// Sélectionnez l'élément img pour l'aperçu
const imagePreview = document.getElementById('imagePreview');

// Ajoutez un gestionnaire d'événements pour le changement de sélection de fichier
imageInput.addEventListener('change', function () {
  const imageFile = imageInput.files[0];

  if (imageFile) {
    // Créez un objet FileReader
    const reader = new FileReader();

    // Ajoutez un gestionnaire d'événements pour la fin de la lecture
    reader.onload = function (e) {
      // Définissez la source de l'aperçu sur les données de l'image lue
      imagePreview.src = e.target.result;

      // Affichez l'aperçu
      imagePreview.style.display = 'block';
    };

    // Lisez le contenu de l'image en tant que URL de données
    reader.readAsDataURL(imageFile);
  } else {
    // Effacez l'aperçu si aucun fichier n'est sélectionné
    imagePreview.src = '#';
    imagePreview.style.display = 'none';
  }
});



// ...
/*
// Envoi de la requête POST vers l'API
fetch('http://localhost:5678/api/works', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token, // Inclure le jeton d'accès dans l'en-tête de la requête 
  },
  body: formData, // Utiliser formData comme corps de la requête
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

// ...
Avec cette modification, lorsque l'utilisateur sélectionne une image à ajouter, un aperçu de cette image sera affiché dans la modal d'ajout de photo avant la soumission du formulaire. Si aucun fichier n'est sélectionné, l'aperçu sera masqué.




 */

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



 









