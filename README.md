# exam-star-wars-infinite-scroll

La aplicacion cuenta con una pantalla de Login, lo que permite iniciar con un usuario previamente creado. Si no se tiene uno, se puede crear uno con el botón **Regístrate** y después iniciar sesión con las credenciales de ese usuario.

La aplicación es totalmente responsiva, y se ve excelente tanto en móvil, tablet laptop o pantalla. Así mismo, cuenta con un ancho máximo para evitar que todo el diseño se desborde.

> **NOTA:** :warning: Tomar en cuenta lo siguiente.
>
>> Existe la funcionalidad del scroll infinito, pero en mi caso, no siempre es muy perceptible, ya que la url para hacer las peticiones, contesta muy muy rápido, si se desea, se puede modificar la red del navegador para simular una mala conexión, la app no se quedará colgada, ya que cuenta con un timeout en producción y desarrollo de 60 seg.
>>
>> Se pueden crear tantos usuarios como se desee, estos se almacenan en **localStorage**.
>>
>> Para hacer un inicio con un usuario, se velida la información almacenada contra la que el usuario escribe, eso para simular un login.
>>
>> Todos los datos que simulen peticiones al API, pasan por **Context API** y se almacenan en **localStorage**.
>>
>> La aplicación tiene los archivos **.env** en el repositorio, cosa que jamaás se debee de hacer, pero para fines del ejercicio y para que quien clone mi proyecto lo pueda correr en su local, construir y correrlo en local ya construido, es que se subieron esos archivos.
>>

&nbsp;

## Tabla de contenido

<!-- no toc -->
- [Ruteo](#ruteo)
  - [Rutas privadas](#rutas-privadas)
  - [Rutas públicas](#rutas-públicas)
- [.nvmrc](#nvmrc)
- [Dependencias](#dependencias)
- [Build](#build)
- [Test](#test)
- [Deploy](#deploy)
- [Run](#run)
  - [Develop](#develop)
  - [Production](#production)

## Ruteo

Para el ruteo se esta haciendo uso de [React Router V6](https://reactrouter.com/en/main) y se manejan rutas protegidas y públicas, con las siguientes características.

### Rutas privadas

- Solo se puede acceder a ellas con un "fake token" de sesión, haciendo login.
- Si se tiene una sesión activa, y se quiere ir a una ruta pública, te redirigirá a '/welcome'
- Si se tiene una sesión activa, y se navega a una ruta que no existe, te redirigirá a '/welcome'

  | Nombre | Path |
  |-------|-------|
  | Welcome | /welcome |
  | MyInformation | /my-information |
  | MyFavorites | /my-favorites |

### Rutas públicas

- No se necesitas hacer login, las rutas las puede ser cualquiera sin restricción.
- Si no se tiene una sesión activa, y se quiere ir a una ruta privada, te redirigirá a '/'
- Si no se tiene una sesión activa, y se navega a una ruta que no existe, te redirigirá a '/'

  | Nombre | Path |
  |-------|-------|
  | Root | / |

&nbsp;

## .nvmrc

Para usar el archivo .nvmrc, es necesario tener instalado [nvm](https://github.com/nvm-sh/nvm) en el equipo, y, desde la raiz del proyecto, correr el siguiente comando para cambiar a la version de node que usa el proyecto.
Este archivo tambien indica la verdion de node con la que trabaje el proyecto.

  ``` bash
  nvm use
  ```

## Dependencias

El proyecto cuenta con 2 dependencias que yo mismo cree, [local-storage-to-object](https://www.npmjs.com/package/local-storage-to-object) que es para poder manejar localStorage siempre como un obejto y de manera mas sencilla. La otra es [react-responsive-detecter](https://www.npmjs.com/package/react-responsive-detecter) que es para pintar una **grid** que sirve de guía para el acomodo de los componentes y el diseño responsivo, este componente es solo para desarrollo, asi que para producción no se muestra.

Para isntalar las dependencias del proyecto, basta con correr `npm i` desde la raiz del mismo, este comando va a instalar primero las dependencias del cliente y luego las del servidor.

## Build

Para construit la aplicacion se debe correr el siguiente comando `npm run build` desde la raiz del mismo, este comando va a dejar una carpeta **dist/** en la raiz, la cual contiene el empaquetado del proyecto, tanto el server como la app.

## Test

Para correr las pruebas, se debe correr el siguiente comando `npm run test` desde la la carpeta **/client**.

## Deploy

El proyecto está alojado en un servidor gratuito de [Heroku](https://www.heroku.com/), por lo que se puede acceder a el desde la siguiente liga, pero tarda en levantar la primera vez que se accede a el, ya que al ser gratuito, Heroku se mantien en espera para ahorrar recursos, y se despierta hasta que alguien visita el sitio.

[Proyecto de STAR WARS](https://exam-star-wars-infinite-scroll.herokuapp.com/)

> **NOTA:** El archivo package.json contiene los paquetes de **@types** como dependencias del proyecto, esto es muy mala practica, pero se tuvo que hacer así ya que al subirlo a Heroku, hay un problema, y es que Heroku borra todo lo que esta en "devDependencies", lo que genera errores al construir el proyecto y desplegarlo en Heroku.

## Run

Para correr el proyecto se deben considerar los siguientes casos:

### Develop

- Si se quiere corre tanto el servidor como el cliente al mismo tiempo, desde la raiz ejecutar:

  ``` bash
  npm run start:dev
  ```

- Si se quiere corre solo el servidor, desde la raiz ejecutar:

  ``` bash
  npm run server
  ```

- Si se quiere corre solo el cliente, desde **/client** ejecutar:

  ``` bash
  npm start
  ```

### Production

- Si se quiere corre el proyecto construido, desde la raiz ejecutar:

  ``` bash
  npm run start:local
  ```

> **NOTA:** :warning: Si se va a correr el proyecto construido desde local en una maquina con windows, se debe correr el siguiente script, y descomentar las variables de entorno del archivo **.env** de la raiz del proyecto y comentar las que actualmente esten descomentadas.

 ``` bash
  # Script para windows
  npm run start:local-windows
```

``` bash
  # Archivo .env de la raiz del proyecto
  ALLOW_ORIGINS="http://localhost:4000"
  NODE_ENV="production"
```
