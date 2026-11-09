# Testing Inteligente

Pruebas e2e con inteligencia artificial y playwright.

Documentación y demo práctica del curso.

https://github.com/AlbertoBasaloAcademy/testing-inteligente

## Qué incluye

| Proyecto | Carpeta           | Tecnología                                            | Puerto |
| -------- | ----------------- | ----------------------------------------------------- | ------ |
| back     | `projects/back/`  | Node.js, TypeScript, Express 5, SQLite                | 3000   |
| front    | `projects/front/` | TypeScript, Vite, Web Components nativos, Pico CSS    | 4000   |
| e2e      | `e2e/`            | Playwright, TypeScript                                | —      |

## Instalar (una vez)

```bash
npm run setup         # comprueba Node e instala todos los proyectos y Chromium
```

## Comprobaciones y pruebas

Ejecuta estos comandos desde la raíz:

| Comando | Alcance | Efecto |
| --- | --- | --- |
| `npm run check` | Formato, lint y tipos | Aplica correcciones automáticas. . |
| `npm test` | Tests unitarios de back y front | No arranca la aplicación. |
| `npm run test:e2e` | Tests de Playwright | Arranca servidores y vacía la base de datos. |
| `npm run verify` | `check`, unitarios y e2e, en ese orden | Lo hace todo. Se detiene si falla un paso. |

### Flujo de trabajo

1. Después de editar código, ejecuta `npm run check` y revisa las correcciones.
2. Ejecuta `npm test` para comprobar la lógica de back y front.
3. Ejecuta `npm run test:e2e` para comprobar los escenarios de usuario en Chromium.
4. Para ejecutar los tres pasos con un solo comando, usa `npm run verify`.

### Hook de commit

El hook pre-commit ejecuta `vp staged`:

- Aplica `vp check --fix` a los archivos preparados para el commit.
- Ejecuta los tests unitarios relacionados con los archivos `.ts` preparados.
- Impide el commit si un comando falla.

El hook no ejecuta Playwright ni sustituye a `npm run verify`.

## Tests e2e

```bash
# Ejecutar los tests (si arranca el back, antes vacía la base de datos)
npm run test:e2e      # headless desde la raíz
cd e2e                # o bajando a la carpeta e2e
npm test              # headless (igual que test:e2e en la raíz)
npm run test:ui       # modo UI
npm run test:headed   # con navegador visible
npm run report        # abrir el último informe HTML
```

- Si ya hay servidores arrancados (`npm start` en la raíz), los tests los reutilizan y la base de datos no se vacía. Para vaciarla: `npm run stop` y `npm run reset` en la raíz.
- `BASE_URL` cambia la URL del front (por defecto `http://localhost:4000`).
- `API_URL` cambia la URL del back (por defecto `http://localhost:3000`); debe coincidir con `API_BASE_URL` del front.
- Los tests están en `e2e/tests/<id>-<slug>/`; las especificaciones en `specs/<id>-<slug>/`.

---

**[Alberto Basalo](https://albertobasalo.dev)**

- [LinkedIn](https://www.linkedin.com/in/albertobasalo/)
- [x/twitter](https://twitter.com/albertobasalo)
- [AI Code Academy](https://aicode.academy)
- [AIDDbot](https://aiddbot.com)
