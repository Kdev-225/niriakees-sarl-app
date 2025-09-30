# --- Étape 1 : Construction ---
# Utilise une image avec le JDK (Java Development Kit) et Maven pour compiler le code
FROM maven:3.8.5-openjdk-17 AS build

# Définit le répertoire de travail dans le conteneur de construction
WORKDIR /app

# Copie tout le contenu du projet local dans le conteneur
COPY . .

# Exécute la construction Maven pour nettoyer et empaqueter l'application
RUN mvn clean package -DskipTests

# --- Étape 2 : Exécution ---
FROM openjdk:17-jre-slim
WORKDIR /app

# COPIE LE FICHIER JAR UTILISANT SON NOM EXACT
COPY --from=build /app/target/niriakees-api-0.0.1-SNAPSHOT.jar /app/niriakees-api.jar

# Définit le port (votre application doit écouter sur ce port, souvent 8080)
EXPOSE 8080

# COMMANDE DE DÉMARRAGE UTILISANT LE NOM DU FICHIER COPIÉ
CMD ["java", "-jar", "niriakees-api.jar"]
