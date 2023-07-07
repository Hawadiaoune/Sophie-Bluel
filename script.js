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

// creation du filtre par categorie//
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
      ajouterTravauxAGalerie(travaux); // Traite les données récupérées et ajoutez-les à la galerie
  } catch (error) {
      console.error('Erreur lors de la récupération des travaux :', error);
  }
}

// Appel de la fonction pour récupérer et ajouter les travaux à la galerie
recupererTravauxArchitecte();



    




