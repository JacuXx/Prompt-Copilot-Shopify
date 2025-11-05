# 🎨 Diagrama Visual de Arquitectura

## 📊 Capas de la Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     👤 USUARIO                               │
│                npx shopify-copilot-sync                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  🚪 ENTRY POINT                              │
│                   bin/cli.js                                 │
│  • Inicia la aplicación                                      │
│  • Maneja errores globales                                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              💉 DEPENDENCY INJECTION                         │
│                  src/container.js                            │
│  • Crea todas las instancias                                 │
│  • Inyecta dependencias                                      │
│  • Singleton pattern                                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            🖥️  PRESENTATION LAYER (CLI)                      │
│                   src/cli/                                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  CliApp (cli-app.js)                                         │
│      │                                                        │
│      ├─► ArgumentParser ────► Parsea --help, --force, etc   │
│      │                                                        │
│      ├─► Commands                                            │
│      │    ├─► SyncCommand    ────► Ejecuta sincronización   │
│      │    ├─► HelpCommand    ────► Muestra ayuda            │
│      │    └─► VersionCommand ────► Muestra versión          │
│      │                                                        │
│      └─► OutputFormatter ────► Formatea salida con colores  │
│                                                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              💼 DOMAIN LAYER (Core)                          │
│                   src/core/                                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  📦 Sync                                                      │
│      SyncService (Orquestador principal)                     │
│          │                                                    │
│          ├─► SyncStrategy ────► Normal / Force              │
│          │                                                    │
│          └─► SyncResult ──────► Estadísticas                │
│                                                               │
│  🐙 GitHub                                                    │
│      GitHubClient                                            │
│          ├─► getRepoContents() ────► Lista archivos         │
│          └─► downloadFile() ───────► Descarga archivo       │
│                                                               │
│  📁 File                                                      │
│      FileManager                                             │
│          ├─► createDirectory() ────► Crea carpetas          │
│          ├─► exists() ─────────────► Verifica archivos      │
│          └─► joinPath() ───────────► Une rutas              │
│                                                               │
│      FileFilter                                              │
│          └─► filter() ─────────────► Filtra .md files       │
│                                                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│           🔧 INFRASTRUCTURE LAYER (Utils)                    │
│                   src/utils/                                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  HttpClient                                                  │
│      ├─► get() ────────► Peticiones HTTP GET                │
│      └─► download() ───► Descarga archivos                  │
│                                                               │
│  Logger                                                      │
│      ├─► success() ────► Mensaje verde ✓                    │
│      ├─► error() ──────► Mensaje rojo ✗                     │
│      ├─► warning() ────► Mensaje amarillo ⚠                 │
│      └─► info() ───────► Mensaje azul ℹ                     │
│                                                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            ⚙️  CONFIGURATION LAYER                           │
│                  src/config/                                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Config (Singleton)                                          │
│      ├─► repo { owner, name, branch }                       │
│      ├─► auth { token }                                      │
│      ├─► github { apiUrl, userAgent }                       │
│      └─► sync { targetDir, extensions }                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Flujo de Datos Completo

```
Usuario ejecuta: npx shopify-copilot-sync --force

    1. bin/cli.js
       ├─► Carga container
       └─► Obtiene CliApp
    
    2. CliApp.run()
       ├─► ArgumentParser.getOptions()
       │   └─► { force: true }
       │
       └─► Decide comando
           └─► SyncCommand.execute({ force: true })
    
    3. SyncCommand
       ├─► OutputFormatter.showHeader()
       │   └─► 🔄 Sincronizando...
       │
       ├─► Configura ForceSyncStrategy
       │
       └─► SyncService.sync()
    
    4. SyncService
       ├─► FileManager.ensureDirectory()
       │   └─► Crea docs/copilot/
       │
       ├─► GitHubClient.getRepoContents()
       │   ├─► HttpClient.get()
       │   │   └─► https://api.github.com/repos/.../contents/docs/copilot
       │   └─► [file1.md, file2.md, ...]
       │
       ├─► FileFilter.filter()
       │   └─► [file1.md, file2.md] (solo .md)
       │
       └─► Para cada archivo:
           ├─► FileManager.exists()
           │   └─► true/false
           │
           ├─► Strategy.shouldSync()
           │   └─► true (force mode)
           │
           ├─► GitHubClient.downloadFile()
           │   ├─► HttpClient.download()
           │   └─► Archivo guardado
           │
           ├─► Logger.success()
           │   └─► ✓ file1.md (actualizado)
           │
           └─► SyncResult.recordDownload()
               └─► downloaded++
    
    5. OutputFormatter.showSummary()
       ├─► Logger.log()
       │   ├─► 📊 Resumen:
       │   ├─► ✓ Descargados: 19
       │   └─► ✅ Sincronización completada!
       │
       └─► Retorna exitCode: 0
    
    6. process.exit(0)
```

## 🧩 Relaciones entre Componentes

```
Container
    │
    ├─► Logger ◄────────────┐
    │                        │
    ├─► HttpClient ◄─────┐  │
    │                     │  │
    ├─► GitHubClient     │  │
    │       └─── usa ────┘  │
    │                        │
    ├─► FileManager          │
    │                        │
    ├─► FileFilter           │
    │                        │
    ├─► SyncService          │
    │       ├─── usa ── GitHubClient
    │       ├─── usa ── FileManager
    │       ├─── usa ── FileFilter
    │       └─── usa ─────────┘
    │
    ├─► OutputFormatter
    │       └─── usa ── Logger
    │
    ├─► SyncCommand
    │       ├─── usa ── SyncService
    │       └─── usa ── OutputFormatter
    │
    ├─► HelpCommand
    │       └─── usa ── OutputFormatter
    │
    ├─► VersionCommand
    │       └─── usa ── OutputFormatter
    │
    └─► CliApp
            ├─── usa ── SyncCommand
            ├─── usa ── HelpCommand
            └─── usa ── VersionCommand
```

## 🎯 Principios SOLID en Acción

### 1️⃣ Single Responsibility Principle

```
❌ ANTES (Monolítico):
   sync-docs.js
   ├─ Parsea argumentos
   ├─ Hace peticiones HTTP
   ├─ Descarga archivos
   ├─ Gestiona archivos
   ├─ Muestra mensajes
   └─ ¡Todo en un solo archivo!

✅ AHORA (Modular):
   ArgumentParser    → Solo parsea argumentos
   HttpClient        → Solo hace peticiones HTTP
   GitHubClient      → Solo interactúa con GitHub
   FileManager       → Solo gestiona archivos
   Logger            → Solo muestra mensajes
   SyncService       → Solo orquesta el proceso
```

### 2️⃣ Open/Closed Principle

```
✅ Agregar nueva estrategia sin modificar código:

class SmartSyncStrategy extends SyncStrategy {
  shouldSync(fileExists, force) {
    // Solo sincroniza si el archivo es más nuevo
    return this.isNewer(remoteFile, localFile);
  }
}

// Usar sin modificar SyncService
syncService.setStrategy(new SmartSyncStrategy());
```

### 3️⃣ Liskov Substitution Principle

```
✅ Estrategias intercambiables:

const strategy = force 
  ? new ForceSyncStrategy()
  : new NormalSyncStrategy();

syncService.setStrategy(strategy);
// Funciona con cualquier SyncStrategy
```

### 4️⃣ Interface Segregation Principle

```
✅ Interfaces específicas:

Logger tiene solo lo que necesita:
├─ success(msg)
├─ error(msg)
├─ warning(msg)
└─ info(msg)

No tiene métodos innecesarios como:
✗ saveToFile()
✗ sendEmail()
✗ etc.
```

### 5️⃣ Dependency Inversion Principle

```
✅ Dependencias inyectadas:

// Clase depende de abstracción (parámetro)
class SyncService {
  constructor(githubClient, fileManager) {
    this.githubClient = githubClient;  // ← Inyectado
    this.fileManager = fileManager;     // ← Inyectado
  }
}

// Container crea e inyecta
const syncService = new SyncService(
  container.getGitHubClient(),
  container.getFileManager()
);
```

## 📈 Beneficios Visualizados

```
Complejidad del Código:
─────────────────────────
v1.0: ████████████████████ (Alta - Todo acoplado)
v2.0: ████ (Baja - Módulos independientes)

Facilidad para Testear:
─────────────────────────
v1.0: ██ (Difícil - Todo junto)
v2.0: ████████████████████ (Fácil - DI)

Facilidad para Mantener:
─────────────────────────
v1.0: ████ (Difícil - Un solo archivo grande)
v2.0: ████████████████████ (Fácil - Archivos pequeños y específicos)

Facilidad para Extender:
─────────────────────────
v1.0: ██ (Difícil - Modificar código existente)
v2.0: ████████████████████ (Fácil - Agregar sin modificar)
```

## 🎓 Resumen

La nueva arquitectura transforma un archivo monolítico de 250 líneas en un sistema modular de 16 componentes bien definidos, aplicando las mejores prácticas de desarrollo de software:

- ✅ **Clean Architecture**: Separación clara de responsabilidades
- ✅ **SOLID**: Código mantenible y extensible
- ✅ **DRY**: Sin repetición de código
- ✅ **KISS**: Cada módulo hace una cosa simple
- ✅ **Easy to Change**: Modificaciones seguras y predecibles

**Resultado**: Un código profesional, escalable y fácil de mantener.
