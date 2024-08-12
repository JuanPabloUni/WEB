# Juan Pablo Hernández T. - 202122707

# Parcial 1 - Programación con Tecnologías Web

## Introducción

Repositorio público para el desarrollo del primer parcial de la asignatura de Programación con Tecnologías Web.

## Instalación

### Pre-requisitos
- REACT (Boostrap, Scripts, Router Dom)
- npm

### Paso a paso
1. Clonar el repositorio en la máquina local:
   ```bash
   git clone https://github.com/JuanPabloUni/202122707-parcial1
   ```
2. Navegar al directorio del proyecto:
   ```bash
   cd 202122707-parcial1
   ```
3. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```

4. Iniciar la aplicación:
   ```bash
   npm start
   ```

## Uso

La página principal de la aplicación es `http://localhost:3000/`. Ahí se puede ver una imitación de un perfil de Instagram, con una foto de perfil, información del usuario (nombre de usuario, biografía, seguidores, seguidos, publicaciones), y una lista de publicaciones. Toda la información presentada aquí es escogida aleatoriamente de un conjunto de datos predeteriminado, y las imágenes son traídas remotamente, también de forma aleatoria.

En esta vista, se puede dar click a una publicación para verla en mayor tamaño. Adicionalmente, hay un botón al superior derecho que permite cambiar el idioma de la página entre inglés y español. Al dar click en la foto de perfil, se navega a la dirección `http://localhost:3000/profile`.

En la vista de perfil, se puede ver casi la misma información que en la página principal, pero con un formato diferente. Aquí es posible editar el nombre de usuario y la biografía, y al dar click en el botón de "Guardar", se logea un mensaje en la consola con la información actualizada. En esta página también hay un botón para regresar a la página principal y otro para cambiar el idioma de la página. Adicionalmente, cada vez que se carga esta página, existe un 50% de probabilidad de que los campos de nombre de usuario y biografía no se puedan editar y por ende, no se muestre el botón de "Guardar".

## Decisiones de diseño y procesos de desarrollo

Para el desarrollo de este parcial, se utilizaron paquetes de npm como `react-router-dom` para la navegación entre páginas, y `bootstrap` para el diseño de la página.

Se utilizó el Fetch API para traer los datos de los usuarios y las publicaciones, y se empleó el estado de los componentes de React para manejar la información de los usuarios y las publicaciones.

Se usó CSS para el diseño de la página, y se utilizó el estado de los componentes de React para manejar la información de los usuarios y las publicaciones.

Para cumplir con los requerimientos del parcial, se crearon dos componentes de REACT principales: home.js y profile.js. El primero maneja la información de la página principal, y el segundo maneja la información de la página de perfil.

home.js se encarga de traer aleatoriamente la información de un usuario (haciendo una petición a un archivo JSON con 5 usuarios) y de hacer 13 peticiones para traer aleatoriamente 12 publicaciones y una foto de perfil para dicho usuario. home.js se divide entre un header donde se encuentra toda la información del usuario y un mapa de publicaciones el cual se ajusta al tamaño de la pantalla.

Adicionalmente, se declaró un subcomponente de modal para mostrar las publicaciones en mayor tamaño. Este subcomponente recibe la información de la publicación a mostrar (para asegurar que la foto maximizada sea la misma que la que se seleccionó de la lista de publicaciones) y la muestra en un formato diferente y aislado, con un botón para cerrar el modal.

Al dar click sobre la foto del usuario, se hacer un llamado al router para navegar a la página de perfil, la cual se encuentra en profile.js. Se asegura de pasar como estado la información del usuario para que esta pueda ser mostrada en la página de perfil.

Una vez en la página de perfil, se muestra la información del usuario en un formato diferente, y se permite editar el nombre de usuario y la biografía. Tanto la foto de perfil, como el nombre de usuario y la biografía llegan igual a cómo se presentaban en la página principal, gracias al estado que se pasó desde home.js.

La página de perfil utiliza un form-container para manejar el estado de los campos de nombre de usuario y biografía, y un botón para logear los cambios una vez se se hace submit al formulario.

En profile.js, se utiliza un generador de números aleatorios para determinar si los campos de nombre de usuario y biografía se pueden editar o no. Si no se pueden editar, no se muestra el botón de "Guardar".

Tanto home.js como profile.js tienen un botón para cambiar el idioma de la página, el cual se implementó con un estado que cambia entre "english" y "spanish" y que se pasa como un condicional a cada label estático de la página.

La App.js maneja el enrutamiento entre las páginas de home y profile, y se asegura de definir la ruta por defecto en caso de que no se encuentre ninguna ruta definida (en este caso, la ruta por defecto es la de home). Es por esto que en index.js se importa App.js y se renderiza dentro de un BrowserRouter.

Se usó un único archivo de CSS para el diseño de la aplicación, el cual define un estilo para cada componente y subcomponente de la aplicación.

## Tecnologías Utilizadas

- React.js
- React Router
- npm
- CSS
- Fetch API