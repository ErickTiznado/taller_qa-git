# Tareas del taller

App de tareas mínima — HTML, CSS y JS a mano, sin build ni dependencias — usada como
campo de práctica para aprender **Git, GitHub Issues, la vinculación commit ↔ incidencia
y GitHub Projects**.

El código es chico a propósito: unas 200 líneas de JS que se leen enteras en diez
minutos. El taller es sobre el flujo de trabajo, no sobre el framework.

## Correr la app

No hay nada que instalar. Abrí `index.html` en el navegador, o levantá un servidor:

```bash
python -m http.server 8000
```

y entrá a http://localhost:8000

## Estructura

```
index.html        marcado de la app
src/app.js        estado, render y persistencia en localStorage
src/styles.css    sistema visual (tokens, claro y oscuro)
docs/             material del taller
.github/          plantillas de issue y de pull request
```

## Material del taller

- **[Guía del taller](docs/TALLER.md)** — el recorrido completo, paso a paso
- **[Chuleta de Git](docs/CHULETA.md)** — comandos de referencia
- **[Issues semilla](docs/ISSUES-SEMILLA.md)** — bugs y mejoras listos para cargar
- **[Sistema de diseño](DESIGN.md)** — decisiones visuales, por si tocás la UI

## Cómo trabajamos acá

1. Todo cambio empieza en una issue.
2. Toda issue se trabaja en una rama: `fix/12-descripcion` o `feat/12-descripcion`.
3. Todo commit dice por qué, y termina con `Refs #12` o `Closes #12`.
4. Todo merge a `main` pasa por un pull request.

El detalle está en la [guía](docs/TALLER.md).

## Reiniciar los datos

La app guarda en `localStorage` bajo la clave `taller-tareas`. Para volver al estado
de ejemplo, en la consola del navegador:

```js
localStorage.removeItem('taller-tareas'); location.reload();
```
