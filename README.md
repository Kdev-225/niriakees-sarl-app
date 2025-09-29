
# 🏢 Application Web Niriakees.SARL

Application Full-Stack dynamique développée pour l'agence multi-service **Niriakees.SARL**, spécialisée dans l'achat, la vente et la location de biens immobiliers.

Ce projet utilise une architecture moderne (Spring Boot/MySQL) pour gérer les données et offrir une plateforme fiable.

---

## ⚙️ Stack Technologique (Full-Stack)

| Composant | Technologie | Rôle |
| :--- | :--- | :--- |
| **Back-end & Serveur** | **Spring Boot (Java)** | Logique métier, API REST et service des ressources web (Front-end). |
| **Base de Données** | **MySQL** | Stockage des données structurées (propriétés, clients, transactions). |
| **Front-end** | **HTML / JavaScript** | Structure de base et interactivité côté client. |
| **Styling** | **Tailwind CSS** | Framework CSS utilitaire pour la conception et le design responsive. |

---

## 🚀 Démarrage Local (Développement)

Pour lancer l'application sur votre machine de développement :

### 1. Prérequis

Assurez-vous d'avoir installé :
* **Java Development Kit (JDK) 17+**
* Votre gestionnaire de dépendances (**Maven** ou **Gradle**)
* Un serveur **MySQL** local actif.

### 2. Configuration DB Locale

Mettez à jour le fichier `src/main/resources/application.properties` (ou `.yml`) avec les identifiants de votre base de données locale :

```properties
# Exemple de configuration de la DB locale
spring.datasource.url=jdbc:mysql://localhost:3306/votre_db_locale
spring.datasource.username=votre_user_mysql
spring.datasource.password=votre_mot_de_passe
