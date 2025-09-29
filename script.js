 tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: "#f97316",  // Orange doux
                        secondary: "#a16207", // Brun doux
                        light: "#f5f5f4",    // Beige clair
                        dark: "#1c1917"      // Gris foncé
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif']
                    },
                    animation: {
                        'fade-in': 'fadeIn 1s ease-in-out',
                        'slide-up': 'slideUp 0.8s ease-out',
                        'slide-left': 'slideLeft 0.8s ease-out',
                        'slide-right': 'slideRight 0.8s ease-out',
                        'zoom-in': 'zoomIn 0.5s ease-out'
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' }
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' }
                        },
                        slideLeft: {
                            '0%': { transform: 'translateX(20px)', opacity: '0' },
                            '100%': { transform: 'translateX(0)', opacity: '1' }
                        },
                        slideRight: {
                            '0%': { transform: 'translateX(-20px)', opacity: '0' },
                            '100%': { transform: 'translateX(0)', opacity: '1' }
                        },
                        zoomIn: {
                            '0%': { transform: 'scale(0.95)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' }
                        }
                    }
                }
            }
        }
    


        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Mobile menu toggle (would need implementation)
        document.querySelector('header button').addEventListener('click', function() {
            // Implementation for mobile menu toggle
            console.log('Mobile menu clicked');
        });

        // Modal functions
        function openModal(imageSrc) {
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            modalImage.src = imageSrc;
            modalImage.alt = "Agrandissement de l'image";
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            const modal = document.getElementById('imageModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside the image
        document.getElementById('imageModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

const newsData = {
  1: {
    title: "Lancement d'un nouveau projet immobilier",
    image: "https://picsum.photos/800/400?random=10",
    content: "Nous sommes fiers de lancer notre nouveau projet immobilier situé au cœur de Bonoua, offrant des logements modernes avec toutes les commodités. Contactez-nous pour en savoir plus et réserver votre futur logement."
  },
  2: {
    title: "Conseils pour vendre votre bien rapidement",
    image: "https://picsum.photos/800/400?random=11",
    content: "Découvrez nos conseils d’experts pour valoriser votre bien immobilier et le vendre au meilleur prix rapidement. De la préparation à la mise en vente, nous vous accompagnons à chaque étape."
  },
  3: {
    title: "Nouvelles réglementations immobilières à connaître",
    image: "https://picsum.photos/800/400?random=12",
    content: "Le secteur immobilier évolue avec de nouvelles réglementations importantes. Nous vous expliquons ce qu’il faut savoir pour rester conforme et profiter des meilleures opportunités sur le marché."
  }
};

function openNewsModal(id) {
  const modal = document.getElementById('newsModal');
  const title = document.getElementById('newsModalTitle');
  const image = document.getElementById('newsModalImage');
  const content = document.getElementById('newsModalContent');

  // Met à jour le contenu de la modale avec les données de l'article sélectionné
  title.textContent = newsData[id].title;
  image.src = newsData[id].image;
  image.alt = newsData[id].title;
  content.textContent = newsData[id].content;

  // Affiche la modale
  modal.classList.remove('hidden');
}

function closeNewsModal() {
  const modal = document.getElementById('newsModal');
  modal.classList.add('hidden');
}
// --- Formulaire Contact ---
const form = document.getElementById('contactForm');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', async function(e) {
    e.preventDefault(); // empêche le rechargement de page

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        responseMessage.textContent = "Veuillez remplir tous les champs.";
        responseMessage.style.color = "red";
        return;
    }

    try {
        const res = await fetch('http://localhost:8080/contact-messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        if (res.ok) {
            responseMessage.textContent = "Merci pour votre message, nous vous répondrons bientôt !";
            responseMessage.style.color = "green";
            form.reset();
        } else {
            const data = await res.json();
            responseMessage.textContent = data.message || "Erreur lors de l'envoi.";
            responseMessage.style.color = "red";
        }
    } catch (error) {
        responseMessage.textContent = "Impossible de se connecter au serveur.";
        responseMessage.style.color = "red";
        console.error(error);
    }
});
