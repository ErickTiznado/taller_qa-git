# Guía del taller — de la incidencia al merge

El recorrido completo: alguien reporta un problema, alguien lo arregla, y el historial
de Git queda contando esa historia solo. Usamos esta app de tareas como campo de práctica.

**Duración estimada:** 90–120 min.

---

## 0. Antes de empezar

Necesitás:

- Git instalado (`git --version`)
- Una cuenta de GitHub
- Un editor
- Tu nombre y mail configurados:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@mail.com"
```

Recomendado: que Git use `main` como rama por defecto y haga rebase al traer cambios.

```bash
git config --global init.defaultBranch main
git config --global pull.rebase true
```

---

## 1. Clonar y correr la app

```bash
git clone https://github.com/USUARIO/REPO.git
cd REPO
python -m http.server 8000
```

Abrí http://localhost:8000. No hay build ni dependencias: HTML, CSS y JS a mano.

Mirá `src/app.js`. Son ~200 líneas. Vas a poder leerlo entero, y eso es a propósito:
el taller es sobre Git, no sobre el framework.

---

## 2. Armar el tablero (GitHub Projects)

El tablero es donde el equipo ve el estado. No reemplaza a las issues: **las muestra**.

1. En el repo → pestaña **Projects** → **New project** → plantilla **Board**.
2. Nombralo `Taller — Tablero`.
3. Columnas (campo `Status`): `Backlog`, `Todo`, `En progreso`, `En revisión`, `Hecho`.
4. **Settings → Workflows** y prendé estas automatizaciones:

   | Workflow | Efecto |
   |---|---|
   | *Item added to project* → `Backlog` | toda issue nueva cae en Backlog |
   | *Item reopened* → `Todo` | si se reabre, vuelve a la fila |
   | *Pull request merged* → `Hecho` | el merge mueve la tarjeta solo |
   | *Item closed* → `Hecho` | cerrar la issue mueve la tarjeta |

5. **Settings → Manage access**: agregá al equipo.

> La gracia del tablero es que casi nadie lo arrastra a mano. Si lo estás arrastrando
> todo el tiempo, te falta un workflow.

---

## 3. Reportar la incidencia (rol: QA)

Una issue vale por lo que permite reproducir, no por lo indignada que suene.

Repo → **Issues** → **New issue** → plantilla **Reporte de bug**. La plantilla pide
justo lo que hace falta:

- **Qué pasa** en una línea
- **Pasos para reproducir**, numerados, desde un estado conocido
- **Resultado esperado** vs **resultado obtenido**
- **Entorno** (navegador, sistema)
- Captura si ayuda

Etiquetá con `bug` y la prioridad. Asignala al tablero (`Projects` en la barra lateral).

Anotá el número que le tocó: **#N**. Todo lo que sigue cuelga de ese número.

---

## 4. Tomar el trabajo (rol: dev)

Nunca se trabaja sobre `main`. Se abre una rama que dice de qué issue sale:

```bash
git switch main
git pull
git switch -c fix/N-descripcion-corta
```

Convención que vamos a usar:

| Prefijo | Para qué |
|---|---|
| `fix/` | arreglar un bug |
| `feat/` | funcionalidad nueva |
| `docs/` | documentación |
| `chore/` | mantenimiento, config |

Ejemplo: `fix/12-contador-ignora-filtro`.

Pasá la tarjeta a **En progreso** y asignate la issue.

---

## 5. Commits que se entienden solos

Un commit es un mensaje para la persona que va a leer esto en seis meses. Suele ser
la misma persona que lo escribió, sin recordar nada.

Formato (Conventional Commits):

```
tipo(alcance): resumen en imperativo, minúscula, sin punto final

Por qué era necesario y qué decidiste. El "qué" ya está en el diff;
el "por qué" solo está acá.

Refs #12
```

Reglas prácticas:

- Resumen ≤ 72 caracteres.
- Imperativo: "corrige", no "corregido" ni "corrigiendo".
- Un commit = un cambio con sentido. Si el mensaje necesita un "y", probablemente son dos.

```bash
git add src/app.js
git commit
```

---

## 6. Vincular el commit con la incidencia

Acá está el corazón del taller. GitHub lee ciertas palabras en el mensaje y arma el
vínculo solo.

**Mencionar sin cerrar** — deja un enlace cruzado en el timeline de la issue:

```
Refs #12
```

**Mencionar y cerrar** — cierra la issue cuando el cambio llegue a la rama por defecto:

```
Closes #12
```

Palabras que cierran (equivalentes entre sí): `close`, `closes`, `closed`,
`fix`, `fixes`, `fixed`, `resolve`, `resolves`, `resolved`.

Tres detalles que se preguntan siempre:

1. **La issue no se cierra al hacer push a la rama.** Se cierra cuando ese commit
   llega a la rama por defecto (`main`), normalmente al mergear el PR.
2. **Necesita el número, no el título.** `Closes #12`, no `Closes la del contador`.
3. **Para otro repo:** `Closes usuario/repo#12`.

Si ya hiciste el commit y te olvidaste la referencia, y todavía no lo subiste:

```bash
git commit --amend
```

---

## 7. Subir y abrir el Pull Request

```bash
git push -u origin fix/12-contador-ignora-filtro
```

GitHub te va a ofrecer el botón para abrir el PR. En la descripción:

- Qué cambia y por qué.
- `Closes #12` (si el commit ya lo tenía, igual sirve tenerlo en el PR).
- Cómo verificarlo: los pasos exactos para que quien revisa lo compruebe en 30 segundos.

Pedí revisión. Movelo a **En revisión**.

> El PR puede cerrar la issue aunque los commits no digan nada. Y los commits pueden
> cerrarla aunque el PR no diga nada. Con que lo diga uno alcanza.

---

## 8. Revisar

Quien revisa mira tres cosas, en este orden:

1. ¿Reproduce el bug antes del cambio y deja de reproducirlo después?
2. ¿El cambio hace **solo** eso?
3. ¿Se entiende sin preguntar?

Comentarios sobre líneas concretas, no sobre la persona. "Esto recalcula en cada
render" es una observación; "esto está mal hecho" no es nada.

---

## 9. Mergear y ver la magia

Al mergear a `main`:

- la issue **#12** se cierra sola,
- en su timeline aparece el commit que la cerró,
- la tarjeta se mueve a **Hecho** sola.

Entrá a la issue cerrada y leé el timeline completo. Eso es el entregable real del
taller: una historia que se lee sin que nadie la haya narrado a mano.

Después, limpieza:

```bash
git switch main
git pull
git branch -d fix/12-contador-ignora-filtro
```

---

## 10. Ahora al revés

Elegí una mejora de [ISSUES-SEMILLA.md](ISSUES-SEMILLA.md), abrí la issue vos y
recorré el circuito completo de nuevo. La segunda vuelta es la que fija el hábito.

---

## Si algo sale mal

| Situación | Salida |
|---|---|
| Commiteaste en `main` sin querer | `git branch mi-rama && git reset --hard origin/main && git switch mi-rama` |
| Mensaje de commit equivocado, sin push | `git commit --amend` |
| Querés deshacer el último commit pero conservar los cambios | `git reset --soft HEAD~1` |
| Conflicto al mergear | Abrí el archivo, resolvé los marcadores `<<<<<<<`, `git add`, `git commit` |
| Te perdiste | `git status` casi siempre te dice el siguiente comando |

Más en la [Chuleta de Git](CHULETA.md).
