# Instalación del sistema

Este tutorial fue escrito para hacer que el sistema funcione de manera automática al iniciar la computadora. Esta debe usar Ubuntu 22.04, aunque pueden adaptarse las instrucciones para aplicarlas a otros sistemas.

Se recomienda agregar la ip del servidor en un dns para facilitar el acceso al sistema, y configurar el puerto en que se ejecuta el sistema como 8080, 80 o (si se usa HTTPS) 443. De lo contrario quizás se deba acceder al sistema con una URL de la forma http://<ip_del_servidor>:<puerto_del_servidor>

# Instalación de software

En primer lugar debe instalarse los programas necesarios para que el sistema funcione. Antes de hacer este paso, ejecutar el siguiente comando:

sudo apt-get update

## Unzip

Para descomprimir el proyecto se usara unzip, por lo que si no está instalado se debe hacer:

sudo apt-get install -y unzip

## Curl

Para descargar nvm hay que tener instalado curl, de no contar con él, ejecutar el siguiente comando:

sudo apt-get install -y curl

## Gnupg

Para instalar MongoDB es necesario contar primero con gnupg, para lo cual se lo puede instalar haciendo:

sudo apt-get install -y gnupg

## NodeJS

Para poder ejecutar el servidor y crear la versión de producción del frontend es necesario contar con NodeJS, para lo cual se usará nvm. Usar curl para descargar nvm:

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

Ahora que nvm está instalado, cargar nuevamente el entorno con el siguiente comando:

source ~/.profile

Con el entorno cargado de nuevo, ejecutar:

nvm install --lts

Ese comando instalará NodeJS en su versión lts. Al momento de escribir este tutorial dicha versión es la 18.16.1.

## MongoDB

Para importar la clave GPG de MongoDB, hacer:

curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg \
   --dearmor

Crear el archivo .list para la versión de ubuntu correspondiente (aquí se usa 22.04)

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

Cargar nuevamente la base de datos de paquetes:

sudo apt-get update

Ahora instalar MongoDB:

sudo apt-get install -y mongodb-org

# Configurar base de datos

## Habilitar ejecución en segundo plano de base de datos

En primer lugar, ya con MongoDB instalado, es necesario hacer que se ejecute en segundo plano al iniciar la computadora, para ello hacer lo siguiente:

sudo systemctl daemon-reload
sudo systemctl start mongod
sudo systemctl enable mongod

Revisar que el servicion esté corriendo:

sudo systemctl status mongod

## Configurar usuario de base de datos

Seguir los siguientes pasos, al ejecutar createUser usar un user y pwd diferentes y guardarlos en algún lugar para luego usarlos para autenticar al momento de acceder a la base de datos:

mongosh
use admin
db.createUser({user:"user", pwd:"pwd", roles:[{role:"root", db:"admin"}]})
exit

Con el usuario creado, editar el servicio de mongo haciendo:

sudo nano /lib/systemd/system/mongod.service

Agregar al archivo la siguiente linea

ExecStart=/usr/bin/mongod --quiet --auth --config /etc/mongod.conf

Probar conectarse al shell de MongoDB con el siguiente comando, cambiando user por el usuario correspondiente, se pedirá la password, ingresarla:

mongosh -u user -p --authenticationDatabase admin
db.runCommand({connectionStatus : 1})

# Descarga de los archivos del proyecto

Ejecutar el siguiente comando para descargar los archivos del proyecto:

wget https://github.com/sebastian-charras/sirhc/archive/refs/heads/main.zip

Una vez descargado, hacer:

unzip main.zip

y luego borrar el archivo comprimido con:

rm main.zip

ahora en la carpeta sirhc-main estará el proyecto, abrirla con:

cd sirhc-main

hay que instalar las dependencias tanto para el backend como para el frontend para poder ejecutar el backend y crear los archivos de producción del frontend, para eso hacer:

cd backend

npm install

cd ../frontend

npm install

Ahora con las dependencias instaladas se pueden crear los archivos de producción del frontend y copiarlos en la carpeta correspondiente del backend, para lo cual hay que ejecutar:

npx vite build

mkdir ../backend/client

mkdir ../backend/client/build

cp -r dist/* ../backend/client/build/

Con eso terminado ahora se pueden crear los servicios para ejecutar el sistema al iniciar la computadora:

Para ejecutar servers, es necesario hacer vim /lib/systemd/system/sirhc.service y dentro de ese archivo colocar el siguiente contenido, modificando el puerto, user, password, usuario del sistema y comando de ejecución para el inicio de la manera que corresponda:

[Unit]
Description=Sistema Informativo para la Recepcion del Hospital de Clinicas
Documentation=https://github.com/sebastian-charras/sirhc/blob/main/README.md
After=network.target

[Service]
Environment=NODE_PORT=8090
Environment=DB_USER=user
Environment=DB_PASSWORD=password
Type=simple
User=user
ExecStart=/path/to/node /path/to/server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target



Para ejecutar Chrome al inicio del sistema en la pagina correspondiente, hacer un proceso similar al anterior, con el siguiente archivo chrome.service

[Unit]

Description=Start Chrome

PartOf=graphical-session.target



[Service]

ExecStart=/usr/bin/google-chrome http://localhost:8090

Type=oneshot



[Install]

WantedBy=graphical-session.target