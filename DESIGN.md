# Sistema de diseño — Tareas del taller

## El mundo

**Página rubricada.** La app se lee como un impreso: margen izquierdo de papel más
oscuro con los rótulos y el aparato de navegación, cuerpo de papel más claro con el
texto. El rojo no decora: es la **rúbrica** — en los manuscritos marcaba lo que había
que atender primero, y acá marca exactamente eso. El oro tampoco decora: es el
**estampado** — aparece solo donde algo ya quedó resuelto.

Cada color tiene un trabajo. Si un elemento no puede justificar por qué es rojo o por
qué es dorado, va en tinta.

| Color | Trabajo |
|---|---|
| Negro | la tinta: texto, filetes, el botón principal |
| Beige | el papel: margen (oscuro) y cuerpo (claro) |
| Rojo | la rúbrica: prioridad alta, cifra de la vista activa, foco de escritura, destrucción |
| Oro | el estampado: lo completado, los filetes, la barra de avance, el anillo de foco |

En modo oscuro el impreso se vuelve laca negra y la misma tinta se invierte a beige.
No es un tema alternativo: es el mismo objeto de noche.

## Armazón

```
.marco-app          grid de 296px + resto, 100vh mínimo
├── .marginal       margen izquierdo, pegajoso, scroll propio
│   ├── .marca      nombre + filete doble + "Taller de Git"
│   ├── nav Vista       Todas / Pendientes / Completadas, con cifras
│   ├── nav Prioridad   Cualquiera / Alta / Media / Baja, con cuadro de color
│   ├── .avance     texto + regla que se llena en oro
│   └── enlaces al material del taller
└── .principal      cuerpo
    └── .columna    máx. 900px
        ├── .encabezado  título de la vista + fecha + borrar completadas
        ├── .compositor  alta de tarea
        ├── .grupos      una sección por prioridad, con su propio rótulo y cuenta
        └── .pie         contador
```

Dos filtros independientes: **vista** (estado) y **prioridad**. Volver a tocar la
prioridad activa la quita. La lista siempre se agrupa por prioridad, así que el
rótulo del grupo carga esa información y las filas no repiten una etiqueta.

Bajo 1000 px el margen se pliega en una cabecera horizontal compacta. No debe pasar
de ~330 px de alto: el compositor tiene que entrar en la primera pantalla.

## Tokens

Definidos en `:root` en `src/styles.css`, redefinidos bajo
`@media (prefers-color-scheme: dark)`.

### Papel y tinta

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--margen` | `#e7ddc9` | `#0b0a09` | papel del margen izquierdo |
| `--margen-alto` | `#ece3d2` | `#100e0c` | tope de su degradado |
| `--hoja` | `#f7f2e5` | `#15120f` | papel del cuerpo |
| `--hoja-alto` | `#fbf8ef` | `#1a1613` | tope de su degradado |
| `--tinta` | `#14110e` | `#ece3d3` | texto principal |
| `--tinta-2` | `#6b5c47` | `#9c8e7c` | texto secundario (tintado del papel, nunca gris neutro) |
| `--linea` | `#ded2b9` | `#272119` | separadores internos |
| `--linea-fuerte` | `#bfae8e` | `#41372d` | bordes de controles y del margen |

### Rúbrica y estampado

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--rojo` | `#94201c` | `#d9483c` | prioridad alta, cifra activa |
| `--rojo-vivo` | `#b32a22` | `#e6594a` | caret, plumín al escribir, hover destructivo |
| `--rojo-tenue` | 8% | 12% | selección de texto, hover de navegación |
| `--oro` | `#7e5b12` | `#cfa851` | prioridad media (5.5:1 sobre papel) |
| `--oro-luz` | `#bd9429` | `#dfbb66` | filetes, barra de avance, tilde, anillo de foco |
| `--oro-brillo` | `#e3c470` | `#f0d896` | el destello del estampado, solo en movimiento |
| `--oro-tenue` | 13% | 12% | hover de fila, ítem de navegación activo, casilla marcada |

La prioridad nunca se codifica **solo** por color: el grupo lleva su nombre escrito y
el margen lleva la palabra junto al cuadro.

### Forma y ritmo

- `--radio: 2px`. Es papel impreso, no una burbuja. No hay un segundo radio.
- Espaciado en pasos de 4 px. Más aire arriba de un rótulo que debajo.
- **Sin sombras.** La jerarquía la dan dos papeles distintos y un borde de 1 px. En un
  armazón a sangre completa una sombra sería un disfraz de tarjeta.
- Margen y cuerpo llevan un degradado casi imperceptible (180° y 178°): el papel no
  es plano, y el cuerpo se aclara arriba para que el título respire.

### Tipografía

Dos fuentes garaldas de Google Fonts, con caída a `Georgia, "Times New Roman", serif`.

| Rol | Fuente | Tamaño | Peso |
|---|---|---|---|
| Título de vista | Cormorant Garamond | `clamp(2.5rem, 6vw, 3.75rem)` | 300, `-0.02em` |
| Marca del margen | Cormorant Garamond | `2.125rem` | 500 |
| Fecha, avance, vacío | EB Garamond *itálica* | `0.9375–1rem` | 400 |
| Tareas | EB Garamond | `1.0625rem` | 400 |
| Navegación | EB Garamond | `1rem` | 400 / 600 en activo |
| Rótulos, grupos, contador | EB Garamond | `0.75–0.875rem` | 500/600, versalitas reales, `0.11–0.2em` |

Versalitas de verdad (`font-variant-caps: all-small-caps`), no `text-transform`.
Cifras del índice, las cuentas y el contador con `tabular-nums lining-nums`.
El índice de fila va a dos dígitos (`01`, `02`), como una numeración de línea.

## Componentes

- **Filete doble** — 2 px de tinta con hilo de oro debajo. Aparece dos veces en toda
  la app: bajo la marca y bajo el encabezado. Es el sello del mundo, no un adorno
  repetible. En el encabezado el hilo de oro se hace con `box-shadow: 0 1px 0`.
- **Ítem de navegación** (`.nav-item`) — etiqueta a la izquierda, cifra a la derecha.
  Activo: fondo oro tenue, texto en tinta, cifra en rojo. Los de prioridad llevan un
  cuadro de 7 px con su color como leyenda.
- **Avance** — texto más una regla de 2 px que se llena en oro. Sin porcentajes ni
  anillos: es una barra de progreso porque el progreso es lineal, y nada más.
- **Grupo** (`.grupo`) — rótulo en versalitas del color de la prioridad, cuenta a la
  derecha, regla de 1 px debajo.
- **Fila** (`.tarea`) — índice, casilla, título, papelera. Alineación por línea de
  base. La última fila de cada grupo no lleva borde: lo cierra la sección siguiente.
- **Casilla** (`.caja` + `.marco`) — `input` real oculto sobre un marco dibujado.
- **Vacío** (`.vacio`) — marco simple, mensaje en itálica que cambia según la
  combinación de vista y prioridad.

## Iconografía

SVG dibujados a mano en `index.html` como sprite de `<symbol>`: `i-check`, `i-trash`,
`i-plus`, `i-nib`, `i-libro`. Trazo fino (1.2–2 px), terminaciones redondeadas, sin
relleno — la mano, no la máquina. **No se usan emoji ni glifos Unicode como iconos.**

## Movimiento

Un solo momento con autoría: al completar una tarea, el tilde **se estampa**. El trazo
se dibuja (`stroke-dashoffset` 26 → 0) y el oro pasa por `--oro-brillo` al 55 % del
recorrido antes de asentarse en `--oro-luz`. 460 ms, `cubic-bezier(0.16, 1, 0.3, 1)`.
Es la lámina tomando luz un instante bajo la prensa.

Se dispara **solo en el clic real**: `app.js` marca esa fila con `.estampando` y
`render()` limpia la marca, para que filtrar o agregar no vuelva a estampar todo.

Lo demás son transiciones de estado de 200–300 ms sobre color y borde, más la barra
de avance (600 ms sobre `inline-size`). Bajo `prefers-reduced-motion: reduce` todo cae
a 1 ms y el tilde aparece ya estampado.

## Superficies del navegador

Tematizadas, no heredadas: `::selection` (rojo tenue), `caret-color` (rojo),
`::placeholder` (itálica), `:focus-visible` (1.5 px de oro con 3 px de separación),
barra de scroll — con el `border` del pulgar distinto en el margen y en el cuerpo para
que se funda con cada papel — y el `text-decoration-color` del tachado, que es oro.

## Accesibilidad

- Texto de cuerpo y placeholder ≥ 4.5:1 en ambos temas, verificado sobre cada papel.
- Todo control alcanzable por teclado, con anillo de foco visible.
- Etiquetas ocultas (`.oculto`) para el campo de texto y el selector.
- `aria-label` por fila en la casilla y en la papelera, con el título incluido.
- `aria-hidden` en el índice de fila: es orientación visual, no contenido.
- `aria-current="page"` en la vista activa, `aria-pressed` en la prioridad,
  `aria-live="polite"` en el contador.
- Objetivos táctiles de 48 px de alto en el compositor.
- Sin desbordes horizontales a 375 px.

## Al extender

1. Antes de pintar algo de rojo o dorado, decí qué trabajo hace ese color ahí. Si no
   hay respuesta, va en tinta.
2. Usá los tokens. Un hex suelto en una regla nueva es un bug de diseño.
3. Radio 2 px. No introduzcas un segundo radio, ni sombras.
4. Iconos nuevos: al sprite, mismo trazo fino, terminaciones redondeadas.
5. No agregues un segundo momento de animación; ese presupuesto ya está gastado.
6. Nunca comuniques estado solo con color.
7. El filete doble no se repite. Si una sección nueva pide jerarquía, usá una regla
   de 1 px y un rótulo en versalitas.
