# Guía rápida — MEDA Frontend Skills (español)

> Versión resumida en español. La documentación completa está en `README.md` (inglés).

## Concepto clave

Hay DOS cosas distintas, no las mezcles:
- **`meda-fe-skills`** = la caja de herramientas. La clonas UNA vez.
- **Tu app** = tu proyecto Next.js real, en OTRA carpeta, donde corres `meda-fe`.

Nunca desarrollas tu app dentro de `meda-fe-skills`.

## Paso 0 — Instalar la herramienta (una vez por máquina)

```bash
git clone https://github.com/saulfrancoMeda/meda-fe-skills.git
cd meda-fe-skills
./setup.sh
meda-fe version    # debe decir: meda-fe v0.3.0
```

Si bajaste un .zip: descomprímelo, asegúrate que la carpeta se llame `meda-fe-skills`
(si termina en `-dist`, renómbrala: `mv meda-fe-skills-dist meda-fe-skills`), y corre `./setup.sh`.

## Paso 1 — Usarla en tu proyecto

### Caso A — Proyecto nuevo (carpeta vacía)
```bash
mkdir ~/repos/mi-app-nueva && cd ~/repos/mi-app-nueva
meda-fe scan
```
Detecta que está vacío → setup interactivo (te pregunta tipo de proyecto, Zustand/Redux, etc.) →
instala skills + crea `MEDA-FE-SETUP.md`. Luego en Cursor: `/meda-fe-new use the choices in MEDA-FE-SETUP.md`.

### Caso B — Proyecto existente (ya tiene código, vas a desarrollar)
```bash
cd ~/repos/mi-app-existente
meda-fe scan
```
Detecta código → genera `ASSESSMENT.md` (cómo está hecho + seguridad) E instala skills.
Luego en Cursor: `/meda-fe-review` o `/meda-fe-endpoint`.

### Caso C — Solo revisión (no tocar nada)
```bash
cd ~/repos/repo-a-revisar
meda-fe assess --report-only
cat ASSESSMENT.md
```
Genera SOLO el reporte. No crea `.claude` ni `.gemini`, no instala nada. El repo queda intacto.

## Paso 2 — Componentes MEDA UI (cuando necesites UI)
```bash
cd ~/repos/mi-app
meda-fe add all
pnpm add clsx tailwind-merge
# tailwind.config: presets: [require('./meda-tailwind-preset')]
# layout raíz: import './styles/meda-tokens.css'
```

## Qué comando según tu caso

| Tu situación | Comando |
|---|---|
| Proyecto nuevo vacío | `meda-fe scan` |
| Repo existente, desarrollar | `meda-fe scan` |
| Solo revisar, no tocar | `meda-fe assess --report-only` |
| Necesitas componentes UI | `meda-fe add all` |
| Verificar instalación | `meda-fe verify` |

## Problemas comunes

| Problema | Solución |
|---|---|
| `cd meda-fe-skills: no such file` | Tu carpeta se llama `-dist`. Renómbrala: `mv meda-fe-skills-dist meda-fe-skills` |
| `meda-fe: command not found` | No corriste el Paso 0. Corre `./setup.sh` y abre terminal nueva |
| No salen los comandos en Cursor | Recarga: `Cmd+Shift+P` → "Reload Window" |
| Git: "Author identity unknown" | `git config --global user.email "tu@meda.com.mx"` y `user.name "Tu Nombre"` |
