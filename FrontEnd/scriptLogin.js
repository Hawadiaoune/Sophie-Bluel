// Sélectionner les éléments du formulaire
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const loginMessage = document.getElementById('loginMessage');


// Fonction pour gérer la soumission du formulaire
async function handleLoginFormSubmit(event) {
  event.preventDefault(); // Empêcher la soumission par défaut du formulaire

  // Récupérer les valeurs de l'email et du mot de passe depuis le formulaire
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Effectuer une requête POST vers l'endpoint d'authentification de votre API
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Envoyer les données au format JSON
    });

    if (response.ok) {
      // Authentification réussie, obtenir le token depuis la réponse
      const data = await response.json();
      const token = data.token;

      // Enregistrer le token dans le stockage local pour les futures requêtes
      localStorage.setItem('token', token);

      // Afficher le message de réussite
      const successMessage = "Connexion réussie ! Bienvenue, " + email + " !";
      showSuccessMessage(successMessage);

      // Rediriger vers la page principale ou effectuer d'autres actions nécessaires
      window.location.href = './index.html';
    } else if (response.status === 401) {
      // Identifiants incorrects, afficher un message d'erreur
      console.error('Identifiants incorrects');
      const errorMessage = "Erreur dans l'identifiant ou le mot de passe";
      showErrorMessage(errorMessage);
      // Vous pouvez afficher un message d'erreur à l'utilisateur ici
    } else {
      // Gérer d'autres erreurs ici
      console.error('Erreur lors de la connexion :', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
  }
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  // Ajoutez le gestionnaire d'événements ici
  loginForm.addEventListener('submit', handleLoginFormSubmit);
}
// Écouter l'événement de soumission du formulaire




 /* Fonction pour afficher un message d'erreur*/
 function showErrorMessage(message) {
  loginMessage.textContent = message;
  loginMessage.style.color = 'red';
}

// Fonction pour afficher un message de succès
function showSuccessMessage(message) {
  loginMessage.textContent = message;
  loginMessage.style.color = 'green';

}

//*S0phie