FROM node:20

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

# # Script para descargar datos
# COPY download-data.sh /usr/local/bin/download-data.sh
# RUN chmod +x /usr/local/bin/download-data.sh

# Ejecutar el script al iniciar
# CMD ["/bin/sh", "-c", "download-data.sh && npm start"]
CMD  npm start