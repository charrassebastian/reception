#Instalación del sistema

Este tutorial fue escrito para hacer que el sistema funcione de manera automática al iniciar la computadora. Esta debe usar Ubuntu 22.04, aunque pueden adaptarse las instrucciones para aplicarlas a otros sistemas.

#Instalacion de software

En primer lugar debe instalarse los programas necesarios para que el sistema funcione. Antes de hacer este paso, ejecutar el siguiente comando:

sudo apt-get update

##Unzip

Para descomprimir el proyecto se usara unzip, por lo que si no está instalado se debe hacer:

sudo apt-get install unzip

##Curl

Para descargar nvm hay que tener instalado curl, de no contar con él, ejecutar el siguiente comando:

sudo apt-get install curl

##NodeJS

Para poder ejecutar el servidor y crear la versión de producción del frontend es necesario contar con NodeJS, para lo cual se usará nvm. Usar curl para descargar nvm:

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

Ahora que nvm está instalado, cargar nuevamente el entorno con el siguiente comando:

source ~/.profile

Con el entorno cargado de nuevo, ejecutar:

nvm install --lts

Ese comando instalará NodeJS en su versión lts. Al momento de escribir este tutorial dicha versión es la 18.16.1.

##MongoDB



#Descarga de los archivos del proyecto

Ejecutar el siguiente comando para descargar los archivos del proyecto:

wget https://github.com/sebastian-charras/sirhc/archive/refs/heads/main.zip

Una vez descargado, hacer:

unzip main.zip

y luego borrar el archivo comprimido con:

rm main.zip

ahora en la carpeta sirhc-main estara el proyeto, abrirla con:

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

Para ejecutar servers, es necesario hacer vim /lib/systemd/system/sirhc.service y dentro de ese archivo colocar el siguiente contenido, modificando el puerto, user, password, usuario del sitema y comando de ejecucion para el inicio de la manera que corresponda:

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



Para ejecutar chrome al inicio del sistema en la pagina correspondiente, hacer un proceso similar al anterior, con el siguiente archivo chrome.service

[Unit]

Description=Start Chrome

PartOf=graphical-session.target



[Service]

ExecStart=/usr/bin/google-chrome http://localhost:8090

Type=oneshot



[Install]

WantedBy=graphical-session.target