# 📦 Instalación y Uso de Shopify Copilot Docs Sync

## 🎯 ¿Qué hace este paquete?

Este paquete te permite descargar automáticamente las guías actualizadas de GitHub Copilot para desarrollo de Shopify en cualquier proyecto, tanto en Windows como en Mac/Linux.

## 🚀 Instalación

### Opción 1: Uso sin instalación (Recomendado)

Ejecuta directamente con `npx` desde cualquier proyecto Shopify:

```bash
npx github:JacuXx/Prompt-Copilot-Shopify
```

### Opción 2: Instalación Global

Instala el paquete globalmente para usarlo en cualquier lugar:

```bash
npm install -g github:JacuXx/Prompt-Copilot-Shopify
```

Luego úsalo con:

```bash
shopify-copilot-sync
# o con el alias corto
scs
```

### Opción 3: Instalación Local en Proyecto

Instala en tu proyecto Shopify:

```bash
npm install --save-dev github:JacuXx/Prompt-Copilot-Shopify
```

Y agrega a tus scripts en `package.json`:

```json
{
  "scripts": {
    "sync-docs": "shopify-copilot-sync",
    "update-docs": "shopify-copilot-sync --force"
  }
}
```

## 📖 Uso

### Comandos Disponibles

#### Sincronizar documentación
```bash
npx shopify-copilot-sync
```

#### Forzar actualización (sobrescribe archivos existentes)
```bash
npx shopify-copilot-sync --force
# o
npx shopify-copilot-sync -f
```

#### Ver ayuda
```bash
npx shopify-copilot-sync --help
# o
npx shopify-copilot-sync -h
```

#### Ver versión
```bash
npx shopify-copilot-sync --version
# o
npx shopify-copilot-sync -v
```

### Uso con Alias

Si instalaste globalmente, puedes usar el alias corto `scs`:

```bash
scs
scs --force
scs --help
```

## 🎬 Ejemplo de Flujo de Trabajo

### 1. En un proyecto Shopify nuevo:

```bash
# Navega a tu proyecto Shopify
cd mi-tema-shopify

# Descarga la documentación
npx shopify-copilot-sync

# Los archivos se descargarán en ./docs/copilot/
```

### 2. Actualizar documentación existente:

```bash
# Actualiza solo archivos nuevos
npx shopify-copilot-sync

# Fuerza actualización de todos
npx shopify-copilot-sync --force
```

### 3. Automatizar en tu flujo:

Agrega a tu `package.json`:

```json
{
  "scripts": {
    "postinstall": "shopify-copilot-sync",
    "docs:update": "shopify-copilot-sync --force"
  }
}
```

## 📁 Estructura Resultante

Después de ejecutar el comando, tendrás esta estructura:

```
tu-proyecto-shopify/
├── docs/
│   └── copilot/
│       ├── 01-liquid-guidelines.md
│       ├── 02-sections-snippets.md
│       ├── 03-javascript-ajax.md
│       ├── 04-carousels-components.md
│       ├── 05-customization-styles.md
│       ├── 06-analysis-development.md
│       ├── 07-optimal-prompts.md
│       ├── 08-liquid-patterns.md
│       ├── 09-performance-optimization.md
│       ├── 10-schema-templates.md
│       ├── 11-git-commits-branches.md
│       ├── 12-editing-existing-components.md
│       ├── 13-seo-accessibility.md
│       ├── 14-section-recommendations.md
│       ├── 15-metafields-guide.md
│       ├── 16-liquid-comments-rules.md
│       ├── 17-direct-responses.md
│       ├── 18-easy-to-change-principle.md
│       └── README.md
└── ...
```

## 🔧 Configuración de VS Code

Después de sincronizar los docs, actualiza tu `.vscode/settings.json` para que Copilot use estas guías:

```json
{
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "file": "docs/copilot/**/*.md"
    }
  ]
}
```

## ⚙️ Requisitos

- **Node.js**: >= 14.0.0
- **npm**: >= 6.0.0
- **Git**: Opcional (solo si instalas desde GitHub)

## 🌍 Compatibilidad

✅ Windows 10/11
✅ macOS
✅ Linux
✅ PowerShell
✅ Bash
✅ Zsh
✅ Fish

## 🐛 Solución de Problemas

### Error: "comando no encontrado"

**Solución**: Asegúrate de tener Node.js instalado:
```bash
node --version
npm --version
```

### Error de permisos en Mac/Linux

**Solución**: Usa `sudo` para instalación global:
```bash
sudo npm install -g github:JacuXx/Prompt-Copilot-Shopify
```

### Los archivos no se descargan

**Solución**: Verifica tu conexión a internet y que tienes acceso al repositorio:
```bash
# Prueba con verbose
npm install --verbose github:JacuXx/Prompt-Copilot-Shopify
```

### Archivos no se sobrescriben

**Solución**: Usa el flag `--force`:
```bash
npx shopify-copilot-sync --force
```

## 📝 Notas

- Los archivos se descargan siempre de la rama `main` del repositorio
- Si ya existen archivos, no se sobrescriben (usa `--force` para actualizar)
- El comando funciona desde cualquier directorio
- No requiere autenticación de GitHub para repositorios públicos

## 🔄 Actualización del Paquete

Para actualizar a la última versión:

### Si instalaste globalmente:
```bash
npm update -g @jacuxx/shopify-copilot-docs
```

### Si usas npx:
```bash
# npx siempre usa la última versión
npx shopify-copilot-sync
```

## 💡 Tips

1. **Automatiza con Git Hooks**: Agrega el comando a tu `.git/hooks/post-merge` para actualizar docs después de cada pull
2. **Integra en CI/CD**: Ejecuta el comando en tu pipeline para mantener docs actualizados
3. **Usa en equipos**: Todos los miembros del equipo pueden sincronizar fácilmente

## 🤝 Soporte

Si encuentras problemas:
1. Revisa esta guía
2. Verifica los requisitos
3. Abre un issue en: https://github.com/JacuXx/Prompt-Copilot-Shopify/issues

---

¡Disfruta de la documentación siempre actualizada! 🚀
