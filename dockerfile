# Etapa de construcción
FROM node:20 AS build

WORKDIR /app

# Copiar solo los archivos necesarios para la instalación de dependencias
COPY package.json package-lock.json* ./

# Instalar las dependencias de producción
RUN npm install --production

# Copiar el resto del código
COPY . .

# Establecer la variable de entorno para producción
ENV NODE_ENV=production

# Exponer el puerto de la aplicación (por defecto 8080 en Cloud Run)
EXPOSE 8080

# Iniciar la aplicación
CMD ["npm", "start"]
