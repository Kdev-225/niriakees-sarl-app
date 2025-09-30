# Utiliser une image de base Node
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de dépendances et installer
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Définir la commande de démarrage
CMD ["npm", "start"]