# Boda Alejandra & Jean · sitio + RSVP

Invitación web con confirmación por familia. Stack igual al de La Villita:
**React + Vite** (frontend) · **Vercel Serverless Functions** (API) · **Turso / libSQL** (base de datos).

## Cómo funciona el RSVP

Cada invitación (familia o invitado individual) tiene un **código único** y un link propio:
`https://tu-sitio.com/rsvp/jostin-9ca2`. La persona abre su link, ve a los integrantes de su
grupo y confirma por cada uno: **Ambos / Ceremonia / Recepción / No podré**, más un mensaje
opcional. No hay búsqueda por nombre (hay nombres repetidos), el link es la llave.

---

## 1. Instalar

```bash
npm install
cp .env.example .env   # y completa los valores
```

## 2. Base de datos (Turso)

```bash
# crea la base
turso db create boda-linares
turso db show boda-linares --url        # → TURSO_DATABASE_URL
turso db tokens create boda-linares     # → TURSO_AUTH_TOKEN
```

Pega esos valores en `.env`.

## 3. Importar la lista de invitados

Coloca el Excel exportado del planner (ej. `guests.xls`) en la raíz y corre:

```bash
npm run import -- ./guests.xls --reset
```

Esto:
- crea las tablas (`db/schema.sql`),
- agrupa por la columna **Familia** (los invitados sin familia quedan como invitación de 1),
- genera el código único de cada invitación,
- escribe **`scripts/invitaciones.csv`** con los 74 links listos para repartir por WhatsApp.

> Para probar local sin Turso: deja `TURSO_DATABASE_URL=file:./wedding.db` en `.env`.

## 4. Contraseña del admin

Opción rápida: pon `ADMIN_PASSWORD=...` en `.env`.
Opción segura (recomendada):

```bash
node scripts/hash-password.mjs "miClaveSecreta"
# copia el resultado en ADMIN_PASSWORD_HASH y borra ADMIN_PASSWORD
```

## 5. Desarrollo

El frontend corre con Vite, pero las funciones `/api` necesitan el runtime de Vercel:

```bash
npm i -g vercel
vercel dev          # levanta frontend + API juntos
```

(`npm run dev` levanta solo el frontend; útil para ver el diseño.)

## 6. Deploy

```bash
vercel
```

Carga las variables de entorno en el dashboard de Vercel (Settings → Environment Variables):
`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `JWT_SECRET`, y `ADMIN_PASSWORD` o `ADMIN_PASSWORD_HASH`.

---

## Tus fotos

Coloca las imágenes en `public/fotos/` con estos nombres (o edita las rutas en
`src/lib/config.js`):

```
public/fotos/hero.jpg        # horizontal, pantalla completa
public/fotos/historia.jpg    # vertical 4:5
public/fotos/g1.jpg … g6.jpg # galería
```

Mientras no existan, el sitio muestra placeholders elegantes con la etiqueta de cada espacio.

## Rutas

| Ruta            | Qué es                                  |
| --------------- | --------------------------------------- |
| `/`             | Invitación (landing)                    |
| `/rsvp/:code`   | Confirmación de una familia             |
| `/admin`        | Panel privado (login + dashboard)       |

## API

| Endpoint               | Método | Auth  |
| ---------------------- | ------ | ----- |
| `/api/rsvp/:code`      | GET    | —     |
| `/api/rsvp/submit`     | POST   | —     |
| `/api/admin/login`     | POST   | —     |
| `/api/admin/stats`     | GET    | admin |
| `/api/admin/export`    | GET    | admin |

---

### Nota sobre `@libsql/client`
Está fijado a `0.17.3`. Si topas con el problema de `fetch` que tuviste en La Villita,
puedes bajar a `0.5.6` como hiciste allá.
