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

- En L01, cada prueba entraba por el formulario de login. ¿Cuántas veces **repetimos lo mismo**?
- Todas las specs pasan en verde. ¿Puede el operador **planificar un lanzamiento con un cohete nuevo**?

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

### Entrar una vez

Playwright guarda el estado del navegador con `storageState`: las cookies y el `localStorage`. Una prueba nueva puede empezar con ese estado.

En AstroBookings no hay cookies. La sesión es un `session-token` en `localStorage`.

- Entramos **una vez** por el formulario con cada rol, antes de las pruebas.
- Cada prueba empieza **ya dentro**, o sin sesión si lo necesita.

> Guarda la sesión que crea la web. No la fabriques con el token de la API.

---

## Concepts

### Una sesión compartida

Una sesión guardada es una sesión **compartida**. Varias pruebas en paralelo usan el mismo token, y una de ellas cierra la sesión:

| Paso | Qué ocurre |
| --- | --- |
| Logout | El back invalida el token compartido |
| Una prueba que empieza después | La web lleva a `/login` |

> Falla otra prueba, no la culpable, y no siempre la misma. Por eso el logout entra con su propia sesión.

---

## Concepts

### Un recorrido de usuario

Un **journey** es un objetivo completo de un usuario. Atraviesa varias specs y **no añade reglas**: cada paso apunta a un criterio que ya existe.

| | Prueba de spec | Journey |
| --- | --- | --- |
| Pregunta | ¿Se cumple la regla? | ¿El usuario consigue su objetivo? |
| Sesión | Guardada | Entra por la UI |
| Datos | La prueba los prepara | El usuario los crea |
| Comprueba | Cada criterio de una spec | Un resultado al final de cada paso |

> Un journey no sustituye a las specs. Comprueba que encajan.

---

## Concrete practice

### P1 · Una sesión para cada rol

Primero, medimos la suite tal como está. Después pedimos al agente:

- Entrar una vez con el `operator` y con el `passenger`, y guardar cada sesión.
- Usar la sesión del `operator` por defecto.
- Empezar **sin sesión** el registro y las pruebas sin token.

Toda la suite pasa, más rápida. Casi ninguna prueba toca ya el formulario.

> Al preparar esta lección encontramos un problema: los servidores en marcha guardaban datos de otras ejecuciones. Ahora cada ejecución empieza limpia.

---

## Concrete practice

### P2 · Enseñar journeys a las skills

No creamos una skill nueva. Enseñamos a las que ya tenemos:

- `define-test` escribe un journey cuando el código empieza por `J`.
- Las reglas de los tests añaden cómo se prueba un journey: paso a paso, por la UI, sin sesión.
- `triage-bugs` aprende que el código de un paso es **una pista**, no un culpable.

Con un journey usamos los mismos `/test-builder` y `/bugs-hunter` de siempre.

---

## Concrete practice

### P3 · El journey `J0001` con `/test-builder`

> El operador entra, añade un cohete y planifica un lanzamiento con ese cohete. Al final ve el lanzamiento en la lista, con el estado `planned`.

El agente propone el `.feature` y para. No apruebes todavía:

- ¿Nombra las cuatro specs que atraviesa: `S0006`, `S0002`, `S0003` y `S0004`?
- ¿Cada paso tiene un criterio que existe? Búscalo en su spec.
- ¿Algún paso inventa una regla?

---

## Concrete practice

### P4 · Todo en verde, menos el journey

Un compañero «optimiza» la web: la página de lanzamientos reutiliza la flota que guardó la página de cohetes.

- Todas las specs siguen en verde. Usan el cohete de la semilla.
- El journey falla: **el cohete nuevo no está en el selector**.
- El paso que falla es de `S0003`, pero `S0003` no tiene la culpa. El fallo está **entre** dos specs.

El triage encuentra el origen en el código. `fix-bugs` lo arregla y la suite vuelve a verde.

---

## Concrete practice

### P4 · Lo que hemos comprobado

| Comprobado | Fuera |
| --- | --- |
| El operador entra, añade un cohete y planifica un lanzamiento por la UI | `J0002`: el pasajero reserva su plaza. Necesita una spec nueva |
| Las specs reutilizan la sesión guardada de cada rol | La caducidad del token |
| El journey empieza sin sesión | Un navegador real cerrado y abierto otra vez |

Dos commits: primero el arreglo, después el journey.

---

## Conclusion

### Las piezas y el camino

Las specs dicen que cada pieza funciona. El journey dice que el usuario llega a su objetivo.

### Antes de aceptar el resultado

¿Qué demuestra el journey que **no demuestran las specs**?

### Siguiente paso: la página pública

En L03 revisarás rendimiento, SEO y accesibilidad con comprobaciones acotadas.

[Alberto Basalo](https://albertobasalo.dev)
