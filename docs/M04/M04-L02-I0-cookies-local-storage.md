---
marp: true
theme: ab-landscape
---

# M04-L02 · Cookies, local storage

[Alberto Basalo](https://albertobasalo.dev)

## Testing Inteligente
### Going Pro

> Entra una vez. Después, recorre el camino completo.

---

## Connections

- Cada prueba entra por el formulario de login. ¿Cuánto tiempo **repite** la suite?
- Todas las specs pasan. ¿Puede el operador **planificar un lanzamiento con un cohete nuevo**?

---

## Concepts

### Cookies

El navegador las guarda y las envía en las peticiones que cumplen sus condiciones. Su función depende de la aplicación.

### Almacenamiento local

`localStorage` guarda valores por origen y los conserva entre visitas. La aplicación decide cómo usarlos.

> No supongas dónde está la sesión. Compruébalo.

Consulta: [cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies) y [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) en MDN.

---

## Concepts

### Guardar la sesión

`storageState` guarda las cookies y el `localStorage` de cada origen en un archivo. Una prueba nueva empieza con ese estado.

| Dato de AstroBookings | Dónde |
| --- | --- |
| Sesión | `localStorage`: `session-token` |
| Cookies | No hay |

- Entra **una vez** por el formulario para cada rol.
- Cada prueba empieza con la sesión de su rol, o sin sesión.

> La sesión guardada es la misma que crea la web. No la fabriques con el token de la API.

---

## Concepts

### Una sesión compartida

Varias pruebas en paralelo usan el mismo token. Una de ellas cierra la sesión.

| Paso | Qué ocurre |
| --- | --- |
| Logout | El back invalida el token compartido |
| Una prueba que empieza después | La web lleva a `/login` |

> Falla otra prueba, no la culpable, y no siempre la misma. Por eso el logout entra con su propia sesión.

---

## Concepts

### Un journey

Un **objetivo completo** de un usuario. Atraviesa varias specs y **no añade reglas**.

- Cada paso apunta a un criterio que existe: `# S0002-R1`.
- Si un paso no tiene criterio, el agente para e informa del hueco.
- Todo pasa por la UI, como lo hace el usuario.

> Un journey no sustituye a las specs. Prueba que encajan.

---

## Concepts

### Prueba de spec y journey

| | Prueba de spec | Journey |
| --- | --- | --- |
| Pregunta | ¿Se cumple la regla? | ¿El usuario consigue su objetivo? |
| Sesión | Guardada | Entra por la UI |
| Datos | La prueba los prepara | El usuario los crea |
| Comprueba | Cada criterio de una spec | Un resultado al final de cada paso |

---

## Concrete practice

### P1 · Una sesión para cada rol

Mide la suite antes de cambiar nada. Después, en una conversación nueva, pide:

- `global-setup.ts` entra una vez con cada rol y guarda `e2e/.auth/<rol>.json`.
- El `operator` es la sesión por defecto.
- El registro y las pruebas sin token empiezan **sin sesión**.

Pasa toda la suite, más rápida. Casi ninguna prueba entra por el formulario.

> Mejora continua: `npm run test:e2e` ahora para los servidores y vacía la base de datos. Cada ejecución empieza igual.

---

## Concrete practice

### P2 · Journeys en las skills

No hay una skill nueva. Una primitiva gana un **modo**:

- `define-test`: un código `J` escribe un journey. Sus pasos están en `references/journey-steps.md`.
- `e2e-rules.md`: la sección **E8**. Un `test.step` para cada paso, todo por la UI, sin sesión.
- `triage-bugs`: con un journey, el código de un paso es una pista, no el culpable.

Con un journey usas los mismos `/test-builder` y `/bugs-hunter`.

---

## Concrete practice

### P3 · El journey `J0001` con `/test-builder`

> El operador entra, añade un cohete y planifica un lanzamiento con ese cohete. Al final ve el lanzamiento en la lista, con el estado `planned`.

Antes de aprobar el `.feature`, comprueba que:

- La primera línea nombra `S0006`, `S0002`, `S0003` y `S0004`.
- Cada paso tiene el código de un criterio que existe.
- El test entra por el formulario y comprueba lo que ve el usuario.

---

## Concrete practice

### P4 · Un fallo entre specs con `/bugs-hunter`

Un compañero cambia la página de lanzamientos: reutiliza la flota que guarda la página de cohetes.

- Pasan todas las specs. Falla solo el journey: el cohete nuevo **no está en el selector**.
- En la pausa del triage: el origen es el código y el fallo es **grave**.
- `fix-bugs` arregla el código. Dos commits: el arreglo y el journey.

| Comprobado | Fuera |
| --- | --- |
| El operador entra, añade un cohete y planifica un lanzamiento por la UI | `J0002`: el pasajero reserva su plaza |
| Las specs reutilizan la sesión guardada de cada rol | La caducidad del token |

---

## Conclusion

### Reglas y objetivos

Las specs prueban cada regla con la sesión guardada. El journey prueba que el usuario llega a su objetivo.

### Antes de aceptar el resultado

¿Qué demuestra el journey que **no demuestran las specs**?

### Siguiente paso: la página pública

En L03 revisarás rendimiento, SEO y accesibilidad con comprobaciones acotadas.

[Alberto Basalo](https://albertobasalo.dev)
