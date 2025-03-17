# Usar una imagen base oficial de Node.js con Alpine para reducir el tamaño
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto (package.json y package-lock.json) al contenedor
COPY package.json package-lock.json ./

# Instalar las dependencias del proyecto
RUN npm install --only=production

# Copiar el código fuente del microservicio al contenedor
COPY . .

# Compilar el proyecto NestJS
RUN npm run build

# Exponer el puerto 443 para HTTPS
EXPOSE 443

# Comando para ejecutar la aplicación NestJS en el contenedor
CMD ["node", "dist/main.js"]
