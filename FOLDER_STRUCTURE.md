# 📁 Estructura de Carpetas del Proyecto

```
Prompt-Copilot-Shopify/
│
├── bin/                              # Ejecutables
│   ├── cli.js                        # ✨ Nuevo punto de entrada (v2.0)
│   └── sync-docs.legacy.js           # Versión antigua (backup)
│
├── src/                              # ✨ NUEVO - Código fuente organizado
│   │
│   ├── config/                       # Configuración
│   │   └── index.js                  # Config centralizada (Singleton)
│   │
│   ├── utils/                        # Utilidades compartidas
│   │   ├── logger.js                 # Logger con colores
│   │   └── http-client.js            # Cliente HTTP reutilizable
│   │
│   ├── core/                         # Lógica de negocio (Domain Layer)
│   │   │
│   │   ├── github/                   # Integración con GitHub
│   │   │   └── github-client.js      # Cliente de GitHub API
│   │   │
│   │   ├── file/                     # Operaciones de archivos
│   │   │   ├── file-manager.js       # Gestor de archivos
│   │   │   └── file-filter.js        # Filtrado de archivos
│   │   │
│   │   └── sync/                     # Sincronización
│   │       ├── sync-service.js       # Orquestador principal
│   │       ├── sync-result.js        # Resultado de sync
│   │       └── sync-strategy.js      # Estrategias (Normal/Force)
│   │
│   ├── cli/                          # Interfaz CLI (Presentation Layer)
│   │   │
│   │   ├── commands/                 # Comandos disponibles
│   │   │   ├── sync-command.js       # Comando de sincronización
│   │   │   ├── help-command.js       # Comando de ayuda
│   │   │   └── version-command.js    # Comando de versión
│   │   │
│   │   ├── output/                   # Formateo de salida
│   │   │   └── output-formatter.js   # Formateador de output
│   │   │
│   │   ├── argument-parser.js        # Parser de argumentos CLI
│   │   └── cli-app.js                # Aplicación CLI principal
│   │
│   └── container.js                  # DI Container (Dependency Injection)
│
├── docs/                             # Documentación del proyecto
│   └── copilot/                      # Guías de GitHub Copilot
│       ├── 01-liquid-guidelines.md
│       ├── 02-sections-snippets.md
│       └── ... (19 archivos .md)
│
├── .vscode/                          # Configuración de VS Code
│   ├── settings.json
│   ├── extensions.json
│   ├── shopify.code-snippets
│   └── shopify-advanced.code-snippets
│
├── .git/                             # Control de versiones
├── .gitignore                        # Archivos ignorados por Git
├── .npmignore                        # Archivos ignorados por npm
├── .prettierrc                       # Configuración de Prettier
│
├── package.json                      # Configuración del paquete npm
│
├── setup-token.ps1                   # Script de setup (Windows)
├── setup-token.sh                    # Script de setup (Mac/Linux)
│
└── Documentación/
    ├── README.md                     # Documentación principal
    ├── ARCHITECTURE.md               # ✨ NUEVO - Documentación de arquitectura
    ├── INSTALL.md                    # Guía de instalación
    ├── EXAMPLES.md                   # Ejemplos de uso
    ├── QUICKSTART.md                 # Inicio rápido
    ├── PUBLISHING.md                 # Guía de publicación
    ├── PRIVATE_REPO_SETUP.md         # Setup para repos privados
    ├── FIX_404_ERROR.md              # Solución error 404
    └── NPM_README.md                 # README para npm registry
```

## 📊 Métricas del Proyecto

### Versión 1.0 (Monolítica)
- **1 archivo**: `bin/sync-docs.js`
- **~250 líneas** de código
- **Difícil de testear**
- **Difícil de extender**

### Versión 2.0 (Arquitectura Limpia) ✨
- **16 archivos modulares**
- **~1400 líneas** total (promedio 87 líneas por archivo)
- **Fácil de testear** (DI)
- **Fácil de extender** (SOLID)
- **Organizado por capas**

## 🎯 Mapeo de Responsabilidades

| Capa | Carpeta | Responsabilidad |
|------|---------|----------------|
| **Entry Point** | `bin/` | Iniciar la aplicación |
| **Presentation** | `src/cli/` | Interfaz de usuario (CLI) |
| **Domain** | `src/core/` | Lógica de negocio |
| **Infrastructure** | `src/utils/` | Servicios técnicos |
| **Configuration** | `src/config/` | Configuración centralizada |
| **DI Container** | `src/container.js` | Inyección de dependencias |

## 🔍 Qué hace cada archivo

### Entry Point
```javascript
bin/cli.js
// → Inicia la aplicación
// → Maneja errores no capturados
// → Delega al Container
```

### Configuration Layer
```javascript
src/config/index.js
// → Configuración centralizada
// → Variables de entorno
// → URLs y constantes
```

### Utilities
```javascript
src/utils/logger.js
// → Logging con colores
// → Métodos: success(), error(), info()

src/utils/http-client.js
// → Cliente HTTP reutilizable
// → GET y Download
```

### Core - GitHub
```javascript
src/core/github/github-client.js
// → Interacción con GitHub API
// → getRepoContents()
// → downloadFile()
```

### Core - File
```javascript
src/core/file/file-manager.js
// → Operaciones de archivos
// → createDirectory()
// → exists(), joinPath()

src/core/file/file-filter.js
// → Filtrado de archivos
// → Por extensión (.md)
```

### Core - Sync
```javascript
src/core/sync/sync-service.js
// → Orquesta la sincronización
// → Coordina GitHubClient + FileManager

src/core/sync/sync-result.js
// → Estadísticas de sincronización
// → downloaded, skipped, errors

src/core/sync/sync-strategy.js
// → Estrategias de sincronización
// → NormalSyncStrategy
// → ForceSyncStrategy
```

### CLI - Commands
```javascript
src/cli/commands/sync-command.js
// → Comando: sincronizar docs
// → Ejecuta SyncService

src/cli/commands/help-command.js
// → Comando: mostrar ayuda

src/cli/commands/version-command.js
// → Comando: mostrar versión
```

### CLI - Core
```javascript
src/cli/argument-parser.js
// → Parsea argumentos CLI
// → --help, --force, --version

src/cli/cli-app.js
// → App principal CLI
// → Coordina comandos

src/cli/output/output-formatter.js
// → Formatea la salida
// → Colores, formato
```

### Dependency Injection
```javascript
src/container.js
// → Crea todas las instancias
// → Inyecta dependencias
// → Singleton de cada servicio
```

## 🔄 Flujo de una Sincronización

```
Usuario ejecuta: npx shopify-copilot-sync

1. bin/cli.js
   - Punto de entrada
   
2. Container.getCliApp()
   - Crea todas las dependencias
   
3. CliApp.run()
   - Parsea argumentos
   - Decide qué comando ejecutar
   
4. SyncCommand.execute()
   - Configura estrategia
   - Llama a SyncService
   
5. SyncService.sync()
   - GitHubClient.getRepoContents()
   - FileFilter.filter()
   - Para cada archivo:
     * FileManager.exists()
     * GitHubClient.downloadFile()
     * SyncResult.recordDownload()
   
6. OutputFormatter.showSummary()
   - Muestra estadísticas
   - Logger con colores
   
7. Retorna código de salida
```

## 🎨 Convenciones

### Nombres de Archivos
- **kebab-case**: `sync-service.js`, `github-client.js`
- **Descriptivos**: El nombre debe indicar qué hace

### Nombres de Clases
- **PascalCase**: `SyncService`, `GitHubClient`
- **Sustantivos**: Representan entidades

### Nombres de Métodos
- **camelCase**: `getRepoContents()`, `shouldSync()`
- **Verbos**: Representan acciones

### Métodos Privados
- **Prefijo `_`**: `_createError()`, `_enrichError()`
- Solo para uso interno de la clase

## 📚 Documentación

Cada archivo incluye:
- JSDoc en funciones públicas
- Comentarios explicando principios SOLID
- Ejemplos de uso cuando es relevante

## 🧪 Preparado para Testing

```javascript
// Ejemplo de test
const mockGitHub = { getRepoContents: jest.fn() };
const mockFileManager = { exists: jest.fn() };
const mockFilter = { filter: jest.fn() };
const mockLogger = { info: jest.fn() };

const service = new SyncService(
  mockGitHub,
  mockFileManager,
  mockFilter,
  mockLogger
);

// Test completamente aislado
await service.sync(options);
```

---

**Conclusión**: Arquitectura organizada, modular y fácil de mantener. Cada archivo tiene un propósito claro y responsabilidades bien definidas.
