# Chuleta de Git

Lo que vas a usar en el taller, en el orden en que lo vas a necesitar.

## Configuración (una sola vez)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@mail.com"
git config --global init.defaultBranch main
git config --global pull.rebase true
git config --list                      # ver todo lo configurado
```

## Empezar

```bash
git clone URL            # traer un repo remoto
git init                 # convertir una carpeta en repo
git remote -v            # ver a qué remoto apunta
```

## Ver dónde estás parado

```bash
git status               # el comando que más vas a usar
git diff                 # cambios sin agregar al stage
git diff --staged        # cambios ya agregados
git log --oneline -10    # últimos 10 commits, una línea cada uno
git log --oneline --graph --all --decorate
git show HEAD            # el último commit completo
```

## Ramas

```bash
git branch                       # listar
git switch -c fix/12-descripcion # crear y cambiar
git switch main                  # cambiar a una existente
git branch -d nombre             # borrar (ya mergeada)
git branch -D nombre             # borrar a la fuerza
```

## Guardar cambios

```bash
git add archivo
git add -p               # elegir trozo por trozo qué entra
git add .                # todo lo modificado (mirá `git status` antes)
git commit               # abre el editor: mensaje largo bien escrito
git commit -m "fix(app): corrige el contador"
git commit --amend       # corregir el último commit (solo si NO lo subiste)
```

## Sincronizar

```bash
git pull                 # traer y aplicar lo del remoto
git push                 # subir
git push -u origin mi-rama  # primera subida de una rama nueva
git fetch                # traer sin aplicar
```

## Vincular con issues

Se escribe dentro del mensaje del commit o en la descripción del PR.

```
Refs #12                 menciona, NO cierra
Closes #12               cierra la issue al llegar a main
Fixes #12                idéntico a Closes
Resolves #12             idéntico a Closes
Closes usuario/repo#12   issue de otro repositorio
Closes #12, closes #15   varias issues (una palabra clave por cada una)
```

Todas las variantes que cierran: `close` `closes` `closed` `fix` `fixes` `fixed`
`resolve` `resolves` `resolved`.

## Deshacer

```bash
git restore archivo             # descartar cambios del archivo
git restore --staged archivo    # sacar del stage, conservar los cambios
git reset --soft HEAD~1         # deshacer el commit, conservar los cambios
git reset --hard HEAD~1         # deshacer el commit y los cambios (destructivo)
git revert COMMIT               # commit nuevo que deshace otro (seguro en main)
git reflog                      # historial de dónde estuvo HEAD: tu red de seguridad
```

## Guardar para después

```bash
git stash                # guardar cambios sin commitear
git stash pop            # recuperarlos
git stash list
```

## Formato de commit que usamos

```
tipo(alcance): resumen en imperativo

Cuerpo opcional: por qué era necesario, qué decidiste y qué descartaste.

Closes #12
```

Tipos: `feat` `fix` `docs` `style` `refactor` `test` `chore`

## Reglas de oro

1. `git status` antes de cada `commit`.
2. Nunca trabajes directo sobre `main`.
3. Un commit = un cambio con sentido.
4. `--force` sobre una rama compartida: no.
5. Si te perdiste, `git reflog` casi siempre tiene la salida.
