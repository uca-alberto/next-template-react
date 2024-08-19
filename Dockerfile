# Etapa 1: Construcción
# Utilizamos una imagen de Node.js como base
FROM node:18-alpine AS builder

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y el archivo package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

COPY .env .env

# Construye la aplicación utilizando Vite
RUN npm run build

# Etapa 2: Servidor
# Utilizamos una imagen de nginx para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos construidos desde la etapa de construcción al directorio de NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia la configuración personalizada de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto en el que NGINX estará escuchando
EXPOSE 80

# Comando para ejecutar NGINX
CMD ["nginx", "-g", "daemon off;"]
