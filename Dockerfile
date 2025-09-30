# --- Étape 1 : Construction ---
# Utilise une image avec le JDK (Java Development Kit) et Maven pour compiler le code
FROM maven:3.8.5-openjdk-17 AS build

# Définit le répertoire de travail dans le conteneur de construction
WORKDIR /app

# Copie tout le contenu du projet local dans le conteneur
COPY . .

# Exécute la construction Maven pour nettoyer et empaqueter l'application dans un JAR
# Nous sautons les tests pour accélérer la construction sur Render, mais vous pouvez les inclure
# si nécessaire (en retirant -DskipTests)
RUN mvn clean package -DskipTests

# --- Étape 2 : Exécution ---
# Utilise une image plus légère avec seulement le JRE (Java Runtime Environment) pour l'exécution finale.
# C'est plus sûr et plus rapide au démarrage.
FROM openjdk:17-jre-slim

# Définit le répertoire de travail dans le conteneur final
WORKDIR /app

# Copie le fichier JAR compilé depuis l'étape 'build' vers le conteneur final
# REMPLACEZ 'NOM_DE_VOTRE_FICHIER_JAR' par le nom exact du fichier JAR généré par Maven (ex: 'mon-app-0.0.1-SNAPSHOT.jar')
COPY --from=build /app/target/NOM_DE_VOTRE_FICHIER_JAR .

# Définit le port que Render doit exposer (doit correspondre au port de votre application Java, souvent 8080)
EXPOSE 8080

# Commande de démarrage de l'application Java
# REMPLACEZ 'NOM_DE_VOTRE_FICHIER_JAR' par le même nom de fichier JAR que ci-dessus
CMD ["java", "-jar", "NOM_DE_VOTRE_FICHIER_JAR"]
