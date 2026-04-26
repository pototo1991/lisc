# Usamos la imagen oficial de Nginx basada en Alpine (sumamente ligera, ~20MB)
FROM nginx:alpine

# Limpiamos el directorio de bienvenida por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos nuestra configuración de Nginx optimizada para rendimiento
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos nuestros archivos al directorio que sirve Nginx
# Esto asegura que la imagen de producción sea inamovible (self-contained)
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Exponemos el puerto 80 hacia el entorno Docker
EXPOSE 80

# Mantenemos Nginx corriendo en primer plano
CMD ["nginx", "-g", "daemon off;"]
