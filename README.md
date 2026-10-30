# Around The U.S.

Página web interactiva donde el usuario puede editar su perfil y administrar una galería de tarjetas con imágenes de lugares. Toda la información se guarda en un servidor a través de una API REST: el perfil, la foto, las tarjetas y los "me gusta" se mantienen aunque se recargue la página.

**Repositorio:** https://github.com/alexis-into/web_project_around_es

## Funcionalidades

- Carga del perfil del usuario y de las tarjetas desde el servidor.
- Edición del nombre y la descripción del perfil.
- Cambio de la foto de perfil: al pasar el cursor sobre ella aparece un icono de edición.
- Creación de tarjetas nuevas a partir de un título y un enlace a una imagen.
- "Me gusta" en las tarjetas, guardado en el servidor.
- Eliminación de tarjetas con una ventana de confirmación. Solo el autor de una tarjeta puede borrarla.
- Vista ampliada de la imagen en un popup.
- Los botones muestran "Guardando..." mientras se espera la respuesta del servidor.
- Los popups se cierran con el botón de cerrar, con clic en el área sombreada o con la tecla `Esc`.
- Validación de formularios en tiempo real, con mensajes de error y botón de envío desactivado mientras los datos no sean válidos.

## Tecnologías y técnicas

- **HTML5** semántico.
- **CSS3** con metodología **BEM** y diseño responsivo.
- **TypeScript**: tipado de elementos del DOM, eventos, interfaces, genéricos y tipos separados para los datos que se envían y los que devuelve el servidor.
- **Programación orientada a objetos (POO)**: encapsulamiento, herencia y acoplamiento débil mediante callbacks.
- **API REST** con `fetch`, `async`/`await`, `Promise.all()` y manejo de errores con `try...catch`.
- **Módulos ES6** (`import` / `export`).

## Estructura

```
src/                              Código fuente en TypeScript
  index.ts                        Punto de entrada: crea las instancias y conecta los eventos
  components/
    Api.ts                        Todas las solicitudes al servidor
    Card.ts                       Crea una tarjeta a partir de una plantilla
    Section.ts                    Renderiza una lista de elementos en un contenedor
    Popup.ts                      Clase base de las ventanas emergentes
    PopupWithImage.ts             Popup que muestra una imagen ampliada
    PopupWithForm.ts              Popup con formulario
    PopupWithConfirmation.ts      Popup para confirmar la eliminación de una tarjeta
    FormValidator.ts              Validación de formularios
    UserInfo.ts                   Lee y actualiza la información del perfil
  utils/
    constants.ts                  Configuración de la API y de la validación
    types.ts                      Interfaces de los datos
public/                           Archivos que se sirven al navegador (HTML, CSS, imágenes y JS compilado)
```

## Cómo ejecutarlo

1. Compila el código TypeScript:
   ```bash
   tsc
   ```
2. Abre `public/index.html` con un servidor local (por ejemplo, la extensión Live Server de VS Code).
