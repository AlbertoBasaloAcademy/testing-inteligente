# M04 L02 · Journeys: decisiones de diseño

Guía de trabajo para la lección M04 L02. Registra las decisiones del brainstorm sobre los journeys.

## 1. Concepto

- Un journey es un objetivo completo de un usuario. Atraviesa varias specs.
- Cada paso del journey apunta a un criterio que existe: `S0002-R1`, `S0003-R1`.
- Un journey no añade reglas de negocio. Compone las reglas de las specs.
- Si un paso no tiene criterio, es un hueco. Pare y proponga una spec nueva con `spec-builder`.
- El journey usa solo la UI. Recorre el camino real del usuario.

## 2. Alcance de la lección

- Incluido: **J0001 Operator plans a launch**. El operador entra, crea un cohete y planifica un lanzamiento. Specs: S0006, S0002, S0003.
- Pospuesto: **J0002 Visitor books a seat**. S0006 excluye "A booking made by a passenger". Este journey necesita una spec nueva (S0007).
- La lección incluye también los storages (`storageState`). El journey muestra el contraste con ellos.
- Los tests de spec usan `storageState` para ir rápido. Si `playwright.config.ts` lo define, el journey lo hereda. El journey lo anula de forma explícita (E8.9).

## 3. Decisiones

| # | Decisión | Estado |
|---|---|---|
| D1 | Los journeys van en `specs/`, con el código `J0001`. El prefijo `J` los distingue de las specs `S`. | Aprobada |
| D2 | Un journey contiene solo un `.feature`: `specs/J0001-<slug>/J0001-<slug>.feature`. No tiene `spec.md` ni `journey.md`. | Aprobada |
| D3 | El test va en `e2e/tests/J0001-<slug>/J0001-<slug>.test.ts`. Tags: `@journey` y `@J0001`. | Aprobada |
| D4 | `define-test` escribe también los journeys. No hay una skill `define-journey`. | Aprobada |
| D5 | Las reglas del test del journey son la sección **E8** de `e2e-rules.md`. | Aprobada |
| D6 | Un journey empieza con un contexto de navegador vacío. No usa `storageState`. Si el actor necesita sesión, entra por la UI como un paso del journey. | Aprobada |
| D7 | Un journey tiene su propio report y su propio triaje, igual que una spec. Vea 6.4. | Aprobada |

## 4. Estructura

```
specs/
  J0001-operator-plans-launch/
    J0001-operator-plans-launch.feature
    e2e-report.md
e2e/tests/
  J0001-operator-plans-launch/
    J0001-operator-plans-launch.test.ts
```

## 5. Ejemplo de `.feature`

```gherkin
# Journey: J0001 · Specs: S0006, S0002, S0003
@journey @J0001
Feature: [J0001] Operator plans a launch
  As an operator
  I want to add a rocket and schedule a launch on it
  So that passengers can book seats on that launch

  Scenario: Operator adds a rocket and schedules a launch
    Given the operator logs in                     # S0006-US2
    When the operator adds a rocket                # S0002-R1
    And the operator schedules a launch on it      # S0003-R1
    Then the launch shows in the list as planned   # S0003-R?
```

Revise los códigos `R?` con las specs antes de escribir el `.feature` final.

## 6. Cambios en las skills

### 6.1 `define-test` (parte común + journey)

La skill muestra `assets/` y `references/` con carga progresiva.

```
.agents/skills/define-test/
  SKILL.md                              # parte común y bifurcación S/J
  assets/
    spec.user-story.template.feature    # existe
    journey.template.feature            # nuevo
  references/
    journey-steps.md                    # nuevo; se lee solo con un código J
```

- Parte común en `SKILL.md`:
  - Input: un código. `S` es una spec. `J` es un journey.
  - Reglas Gherkin: keywords en inglés, sin reglas inventadas, reglas E1.
  - Output: mostrar, esperar la confirmación, guardar.
- Solo para un journey (`references/journey-steps.md`):
  - Obtener el actor y el objetivo.
  - Encontrar las specs que el journey atraviesa.
  - Escribir el código del criterio en cada paso: `# S0002-R1`.
  - Si un paso no tiene criterio, parar e informar del hueco. No inventar el criterio.
  - Escribir un `Feature: [J0001] ...` con uno o pocos escenarios. No escribir un escenario para cada criterio.
- Riesgo: la skill crece con más modos. Mantenga la bifurcación en el Input y en un solo paso.

### 6.2 `implement-test` → `e2e-rules.md`, sección E8 (borrador)

```markdown
## E8 Journeys

- **E8.1** A journey has a folder `specs/J<id>-<slug>/` with one `.feature`: `J<id>-<slug>.feature`.
- **E8.2** Write one test file for the journey: `e2e/tests/J<id>-<slug>/J<id>-<slug>.test.ts`.
- **E8.3** Write one `test.describe` with the tags `@journey` and `@J<id>`. Write one `test` for each scenario.
- **E8.4** Write one `test.step` for each step of the journey. Start its title with the criterion code: `[S0002-R1] Add a rocket`.
- **E8.5** Do all the actions through the UI. Do not use the API to prepare or to check data.
- **E8.6** Use the Page Objects that exist (E6). If a page has no Page Object, add one. Do not write locators in the test.
- **E8.7** Check only the observable result at the end of each step (E3). Do not check again all the rules of the spec.
- **E8.8** Use unique data (E7). Use the seed only for the operator account.
- **E8.9** Start the journey with an empty browser context: `test.use({ storageState: { cookies: [], origins: [] } })`. Log in through the UI as a step of the journey.
```

### 6.3 Otras skills

| Skill | Cambio |
|---|---|
| `test-builder` | Acepta un código `J`. Pasa el código a `define-test`. |
| `define-spec` | El número libre siguiente cuenta solo las carpetas `S*`. |
| `detect-bugs` | Sin cambios. Funciona con `specs/<code>-<slug>/` y `--grep @<code>`. |
| `triage-bugs` | Con un código `J`: leer las specs de los pasos del `.feature` (no hay `spec.md`). En `fix.spec.md`, enlazar el `.feature`. |

### 6.4 Report y triaje de un journey (D7)

Modelo actual: el report y el triaje pertenecen a la unidad que se prueba.

- Si `detect-bugs S0055` encuentra un fallo de S0032, lo pone en `Regressions` del report de S0055.
- `triage-bugs S0055` escribe el `fix.spec.md` de S0055.
- S0032 cambia solo si su definición está mal. El `fix.spec.md` de S0055 lo indica en la sección *Spec*.

Un journey usa el mismo modelo:

- `detect-bugs J0001` escribe `specs/J0001-<slug>/e2e-report.md`. Los fallos de las specs van a `Regressions`.
- `triage-bugs J0001` escribe `specs/J0001-<slug>/fix.spec.md`.
- El código del `test.step` (`[S0002-R1]`) es una pista para el triaje. No asigna el fallo a una spec.

Un journey se ejecuta con las specs en verde. Por eso, un fallo suele ser de uno de estos dos tipos:

- **Grave**: la integración entre specs falla. Por ejemplo, el cohete de S0002 no aparece en el selector de S0003.
- **Trivial**: el test falla. Por ejemplo, un Page Object, un locator o un dato.

El journey debe dejar rastro suficiente en sí mismo: el report, la evidencia y el paso con su código.

## 7. Siguientes pasos

- [x] Confirmar D7.
- [x] Confirmar D6.
- [ ] Aplicar los cambios de 6.1, 6.2 y 6.3 en un commit `docs(skills)`.
- [ ] Escribir J0001 con `test-builder J0001`.
- [ ] Ejecutar `detect-bugs J0001`.
