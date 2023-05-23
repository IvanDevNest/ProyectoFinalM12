#!/bin/bash

# Clonar el repositorio desde GitHub
git clone https://github.com/Guilirex/ProyectoFinalM12.git

# Navegar al directorio del proyecto clonado
cd ProyectoFinalM12/laravel

# Instalar las dependencias de Composer
composer install

# Copiar el archivo .env
cp .env.example .env

# Generar la clave de la aplicación
php artisan key:generate

# Crear enlace simbólico entre la carpeta public/storage y la carpeta storage/app/public
php artisan storage:link

# Ejecutar migraciones 
php artisan migrate

# Ejecutar seeders
./seed.sh

#
cd ../reactNative

#
npm install


