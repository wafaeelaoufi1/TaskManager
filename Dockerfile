# Étape 1 : Build de l'application React
FROM node:18-alpine AS build

# Crée un dossier de travail
WORKDIR /app

# Copie les fichiers nécessaires
COPY package*.json ./
COPY . .

# Installe les dépendances
RUN npm install

# Compile le projet pour production
RUN npm run build

# Étape 2 : Serve avec Nginx
FROM nginx:stable-alpine

# Supprime la config par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copie le build React vers le dossier de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copie la config personnalisée de Nginx si tu veux (optionnel)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose le port 80
EXPOSE 80

# Démarre Nginx
CMD ["nginx", "-g", "daemon off;"]
