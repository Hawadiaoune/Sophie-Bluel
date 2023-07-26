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
    // Affiche la modale
    modal.style.display = 'block';
  } else {
    // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
    // Redirige vers la page de login
    window.location.href = 'login.html';
  }
    modal.style.display = 'block';
  }

  closeBtn.addEventListener('click', fermerModal);

  function fermerModal() {
    modal.style.display = 'none';
  }
});

// Sélectionne l'élément du lien de connexion/logout
const loginLink = document.getElementById('loginLink');

// Vérifie si un token d'authentification est présent dans le stockage local
const token = localStorage.getItem('token');
if (token) {
  // Si un token est présent, cela signifie que l'utilisateur est connecté
  // Masque le lien de connexion et affichez le lien de déconnexion
  loginLink.textContent = 'Logout';
} else {
  // Si aucun token n'est présent, cela signifie que l'utilisateur n'est pas connecté
  // Masque le lien de déconnexion
  loginLink.style.display = 'none';
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

  // Ajouter l'icône poubelle pour supprimer la photo
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
    deleteIcon.addEventListener('click', () => deleteImage(travail.id)); // Appel de la fonction deleteImage avec l'ID du travail
    travailElement.appendChild(deleteIcon);

    /**    // Ajouter l'icône poubelle pour supprimer la photo
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
    deleteIcon.setAttribute('data-id', travail.id); // Ajouter l'ID du travail comme attribut personnalisé
    deleteIcon.addEventListener('click', handleDeleteImage); // Ajouter un gestionnaire d'événements au clic sur l'icône poubelle
    travailElement.appendChild(deleteIcon);
 */

    
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

// 




//* Deuxieme modale ajout photo


const addPhotoModal = document.getElementById('addPhotoModal');
const closeButton = document.getElementById('closeAddPhotoModalButton');
const openAddPhotoModalButton = document.getElementById('openAddPhotoModalButton');


// Fonction pour masquer la modale d'ajout de photo
function closeAddPhotoModal() {
  addPhotoModal.style.display = 'none';
}

// Fonction pour afficher la modale d'ajout de photo
function openAddPhotoModal() {
  addPhotoModal.style.display = 'block';
}


// Écouter l'événement de clic sur le bouton "Ajouter une photo" pour ouvrir la modale d'ajout de photo
openAddPhotoModalButton.addEventListener('click', openAddPhotoModal);

// Écouter l'événement de clic sur le bouton de fermeture de la modale d'ajout de photo
closeButton.addEventListener('click', closeAddPhotoModal);


/** en utilisant la mm logique que pour ma modale 1, la modale deux ne veut pas fontionner */