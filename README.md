# CRUDZASO - IdeaHub

Una plataforma donde los empleados de CRUDZASO pueden registrarse, iniciar sesion y compartir ideas sobre productos, mejoras y experimentos.

## Descripcion del proyecto

Este proyecto es una aplicacion web solo frontend donde los usuarios pueden crear cuentas, hacer login y compartir sus ideas con otros colaboradores. Usamos solo HTML, CSS, JavaScript y localStorage para guardar los datos.

## Miembros del equipo

- Daniela Quinto Rios
- Andrés Mauricio Hidrobo Escalona  
- Camilo Flórez Moreno
- Ximena Jaramillo Cardenas

## Funciones

- Registro de usuarios
- Inicio de sesion
- Crear, editar y eliminar ideas
- Ver ideas de otros usuarios
- Filtrar ideas por categoria y autor
- Perfil de usuario
- Contador de ideas por usuario

## Git Flow

Usamos Git Flow para organizar el trabajo:

- main: version estable
- develop: rama principal de desarrollo
- feature/: ramas para cada funcionalidad

### Como trabajamos

1. Creamos las ramas feature/ desde develop
2. Desarrollamos la funcionalidad
3. Hacemos merge a develop
4. Al final merge develop a main

## Commits convencionales

Usamos estos tipos de commits:

- feat: nueva funcionalidad
- fix: arreglo de bugs
- style: cambios de CSS
- refactor: reorganizar codigo
- docs: documentacion
- chore: configuracion

Ejemplos:
```
feat: add user registration
fix: fix login validation
style: update button colors
```

## Como ejecutar localmente

1. Clonar el repositorio
```
git clone https://github.com/dquintor/CRUDZASO-IdeaHub.git
```

2. Abrir con un servidor local (Live Server o similar)

3. Ir a index.html para empezar

## Estructura de archivos

```
index.html       (login)
register.html    (registro)  
ideas.html       (feed de ideas)
profile.html     (perfil)
js/
 auth.js
 ideas.js
 profile.js
 storage.js
   ui.js
styles/
assets/
```

## Datos en localStorage

- crudzaso_ideahub_users: usuarios registrados
- crudzaso_ideahub_ideas: todas las ideas
- crudzaso_ideahub_session: sesion actual

## Filtros implementados

Se pueden filtrar las ideas por:
- Categoria (producto, mejora, experimento, otro)
- Autor (lista de usuarios)
- Boton para limpiar filtros

Las ideas se muestran en tarjetas con Bootstrap y solo el autor puede editar/eliminar sus propias ideas.
