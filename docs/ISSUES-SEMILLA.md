# Issues semilla

Material para cargar en el repo antes o durante el taller, para que haya trabajo
real en el tablero. Cada bloque es el cuerpo de una issue: copiá, pegá, etiquetá.

Sugerencia: cargá 3 o 4 antes de arrancar (así el Backlog no está vacío) y dejá el
resto para que los participantes las abran ellos.

---

## Etiquetas a crear primero

| Etiqueta | Color | Para qué |
|---|---|---|
| `bug` | `#d73a4a` | algo anda mal |
| `mejora` | `#0e8a16` | algo nuevo |
| `docs` | `#0075ca` | documentación |
| `buena-primera-issue` | `#7057ff` | apta para arrancar |
| `prioridad:alta` | `#b60205` | urgente |
| `prioridad:baja` | `#c5def5` | puede esperar |

---

## MEJORA — Editar el título de una tarea

**Etiquetas:** `mejora`, `buena-primera-issue`

Hoy, si te equivocás al escribir una tarea, la única salida es borrarla y escribirla
de nuevo. Se pierde el estado de completada.

**Propuesta**
Doble clic sobre el título lo convierte en un campo editable. `Enter` guarda,
`Escape` cancela, perder el foco guarda.

**Criterios de aceptación**
- [ ] Doble clic entra en modo edición con el texto actual seleccionado
- [ ] `Enter` guarda y persiste en localStorage
- [ ] `Escape` descarta el cambio
- [ ] Un título vacío no se guarda
- [ ] Se puede llegar al modo edición con teclado

---

## MEJORA — Reordenar tareas arrastrando

**Etiquetas:** `mejora`

El orden lo decide la fecha de creación y no se puede cambiar. Para una lista de
prioridades eso es poco.

**Propuesta**
Arrastrar filas para reordenar. El orden se persiste.

**Criterios de aceptación**
- [ ] Se puede arrastrar una fila y soltarla en otra posición
- [ ] El orden sobrevive al recargar
- [ ] Hay una alternativa por teclado (subir/bajar)

---

## MEJORA — Contadores en las pestañas de filtro

**Etiquetas:** `mejora`, `buena-primera-issue`

Para saber cuántas tareas hay en cada estado hay que cambiar de filtro y contar.

**Propuesta**
Cada pestaña muestra su total: `TODAS 12`, `PENDIENTES 7`, `COMPLETADAS 5`.

**Criterios de aceptación**
- [ ] Los tres números se actualizan al agregar, completar o borrar
- [ ] No rompen el layout en pantallas chicas

---

## MEJORA — Deshacer el borrado de una tarea

**Etiquetas:** `mejora`

Borrar es inmediato y definitivo. Un clic de más y la tarea no vuelve.

**Propuesta**
Al borrar, aparece un aviso al pie con "Deshacer" durante 6 segundos.

**Criterios de aceptación**
- [ ] "Deshacer" restaura la tarea en su posición original
- [ ] El aviso se va solo a los 6 segundos
- [ ] Borrar varias seguidas no apila avisos

---

## MEJORA — Fecha de vencimiento

**Etiquetas:** `mejora`

**Propuesta**
Campo de fecha opcional al crear la tarea. Las vencidas se marcan visualmente.

**Criterios de aceptación**
- [ ] El campo es opcional
- [ ] Una tarea vencida y no completada se distingue de un vistazo
- [ ] La distinción no depende solo del color

---

## DOCS — El README no explica cómo contribuir

**Etiquetas:** `docs`, `buena-primera-issue`

Falta la sección que diga: abrí una issue, ramificá con este formato, commiteá así,
vinculá con `Closes #N`.

**Criterios de aceptación**
- [ ] `CONTRIBUTING.md` con el circuito completo
- [ ] El README enlaza a ese archivo

---

## BUG — El filtro no sobrevive al recargar

**Etiquetas:** `bug`, `prioridad:baja`

**Pasos para reproducir**
1. Seleccionar el filtro "Completadas"
2. Recargar la página (F5)

**Resultado esperado:** sigue en "Completadas".
**Resultado obtenido:** vuelve a "Todas".

---

## BUG — Se pueden cargar tareas duplicadas sin aviso

**Etiquetas:** `bug`, `prioridad:baja`

**Pasos para reproducir**
1. Escribir "Comprar café" y presionar Enter
2. Escribir exactamente "Comprar café" otra vez y presionar Enter

**Resultado esperado:** algún aviso, o al menos una señal de que ya existe.
**Resultado obtenido:** se crean dos filas idénticas, indistinguibles.
