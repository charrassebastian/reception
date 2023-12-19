# Manual de instalación

A continuación se mostrará cómo puede configurarse el sistema para que pueda funcionar y cuales
son sus requisitos.

Este sistema está pensado para correr en una computadora principal que actuará como servidor y
otras (una por puesto) que se encuentren conectadas en la misma red local de internet.

El servidor deberá correr, preferentemente, un sistema basado en Linux, en este caso se darán las
instrucciones para Ubuntu 22.04.

La base de datos requiere que el procesador tenga soporte para las instrucciones AVX, por lo que
procesadores muy antiguos o de gamas más bajas pueden dar problemas. Esto puede resolverse
usando un procesador más moderno o una versión más antigua de MongoDB (4 o inferior).

Para realizar el despliegue del sistema se hará uso de tecnologías basadas en contenedores: Docker
y Kubernetes.

Será necesario contar con Docker instalado y configurado para poder ser ejecutado sin necesitar
permisos de superusuario. También será necesario tener instalado minikube y kubectl para poder
orquestrar los contenedores con kubernetes.

A continuación se dejan algunos enlaces útiles para instalar y configurar el software necesario para
ejecutar el sistema.

- https://docs.docker.com/engine/install/ubuntu/

- https://docs.docker.com/engine/install/linux-postinstall/

- https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

- https://minikube.sigs.k8s.io/docs/start/

Para poder correr las capas del sistema, ejecutar en primer lugar el siguiente comando:

minikube start

Para poder ver el estado de las capas del sistema se puede luego ejecutar el próximo comando:

minikube dashboard

Es necesario aplicar las configuraciones del backend, frontend y la base de datos, para ello hay que
primero clonar el repositorio del sistema:

git clone https://github.com/charrassebastian/sirhc

Ahora ir al directorio que contiene el código (sirhc), abrir el subdirectorio database. Luego ejecutar
los siguientes comandos para aplicar cada archivo de configuración:

kubectl apply -f persistentvolume.yaml

kubectl apply -f persistentvolumeclaim.yaml

kubectl apply -f service.yaml

kubectl apply -f statefulset.yaml

kubectl apply -f storageclass.yaml

Con estas configuraciones para la base de datos aplicadas, es hora de configurar el backend. Acceder
dentro del directorio sirhc al subdirectorio backend, y luego ejecutar:

kubectl apply -f deployment.yaml

kubectl apply -f service.yaml

Ahora que las configuraciones para el frontend ya se han aplicado, hay que configurar el frontend.
Abrir dentro del directorio sirhc el subdirectorio frontend y ejecutar:

kubectl apply -f sirhc-frontend-deployment.yaml

kubectl apply -f sirhc-frontend-service.yaml

Luego de unos minutos los contenedores ya deberían estar corriendo luego de haber sido descargados
los datos necesarios. Cuando en el dashboard de minikube aparezcan todos los deployments con el
estado running, entonces es hora de permitir las conexiones a los contenedores:

kubectl port-forward svc/sirhc-backend 8082:80 &

kubectl port-forward svc/sirhc-frontend 8080:80 &

Para saber cuál es la dirección IP del servidor, desde este ejecutar:

ip a

Esta dirección IP deberá usarse desde los navegadores de internet que vayan a acceder al sistema.
Es importante que las computadoras que se conecten se encuentren en la misma red local, ya que
de lo contrario no podrán hacer uso del sistema.

Ahora al ingresar al navegador de internet la url con el formato:

http://localhost:8080

Reemplazando localhost por la direccion IP del servidor, se podrá ver la pantalla principal del
sistema.

De aquí en adelante, cada vez que se inicie nuevamente el servidor habrá que ejecutar estos comandos para que funcione el sistema:

minikube start

kubectl port-forward svc/sirhc-backend 8082:80 &

kubectl port-forward svc/sirhc-frontend 8080:80 &

Y luego obtener la dirección IP para conectarse al servidor:

ip a

