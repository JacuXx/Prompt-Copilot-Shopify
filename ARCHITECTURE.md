# 🏗️ Arquitectura del Proyecto

## 📐 Principios Aplicados

### SOLID Principles

#### ✅ Single Responsibility Principle (SRP)
Cada clase tiene una única responsabilidad:
- `Logger` - Solo maneja logging
- `HttpClient` - Solo maneja peticiones HTTP
- `GitHubClient` - Solo interactúa con GitHub API
- `FileManager` - Solo maneja operaciones de archivos
- `SyncService` - Solo orquesta la sincronización

#### ✅ Open/Closed Principle (OCP)
Las clases están abiertas a extensión pero cerradas a modificación:
- `SyncStrategy` - Fácil agregar nuevas estrategias sin modificar código existente
- `FileFilter` - Fácil agregar nuevos filtros
- `GitHubClient` - Fácil agregar nuevos métodos de API

#### ✅ Liskov Substitution Principle (LSP)
Las subclases pueden reemplazar a sus clases base:
- `NormalSyncStrategy` y `ForceSyncStrategy` son intercambiables
- Todas implementan el mismo contrato de `SyncStrategy`

#### ✅ Interface Segregation Principle (ISP)
Las clases no dependen de interfaces que no usan:
- Cada clase tiene métodos específicos a su responsabilidad
- No hay métodos "gordos" que no se usen

#### ✅ Dependency Inversion Principle (DIP)
Las dependencias se inyectan, no se crean internamente:
- `Container` gestiona todas las dependencias
- Las clases dependen de abstracciones, no de implementaciones concretas
- Fácil de testear con mocks

### Easy to Change

#### 🔄 Cambiar la API de GitHub
Solo modificas `GitHubClient` - el resto del código no se ve afectado.

#### 🔄 Cambiar el formato de salida
Solo modificas `OutputFormatter` - la lógica de negocio permanece igual.

#### 🔄 Agregar nuevos comandos
Solo creas una nueva clase en `cli/commands/` y la registras en el container.

#### 🔄 Cambiar la estrategia de sincronización
Solo creas una nueva `Strategy` sin tocar el código existente.

## 📂 Estructura del Proyecto

```
src/
├── config/                 # Configuración centralizada
│   └── index.js           # Config Singleton (SRP)
│
├── utils/                 # Utilidades compartidas
│   ├── logger.js          # Logger con colores (SRP)
│   └── http-client.js     # Cliente HTTP reutilizable (SRP)
│
├── core/                  # Lógica de negocio (Domain Layer)
│   ├── github/
│   │   └── github-client.js      # Cliente GitHub API (SRP, OCP)
│   │
│   ├── file/
│   │   ├── file-manager.js       # Operaciones de archivos (SRP)
│   │   └── file-filter.js        # Filtrado de archivos (SRP, OCP)
│   │
│   └── sync/
│       ├── sync-service.js       # Orquestación (SRP, DIP)
│       ├── sync-result.js        # Resultado (SRP)
│       └── sync-strategy.js      # Estrategias (Strategy Pattern, OCP)
│
├── cli/                   # Interfaz de línea de comandos (Presentation Layer)
│   ├── commands/
│   │   ├── sync-command.js       # Comando sync (Command Pattern, SRP)
│   │   ├── help-command.js       # Comando help (Command Pattern, SRP)
│   │   └── version-command.js    # Comando version (Command Pattern, SRP)
│   │
│   ├── output/
│   │   └── output-formatter.js   # Formateo de salida (SRP)
│   │
│   ├── argument-parser.js        # Parser de args (SRP)
│   └── cli-app.js                # App principal (SRP)
│
└── container.js           # DI Container (DIP)

bin/
└── cli.js                 # Entry point
```

## 🎯 Patrones de Diseño

### 1. Dependency Injection (DI)
```javascript
// Container inyecta todas las dependencias
const syncService = new SyncService(
  githubClient,    // ← Inyectado
  fileManager,     // ← Inyectado
  fileFilter,      // ← Inyectado
  logger          // ← Inyectado
);
```

**Beneficios:**
- Fácil de testear (mocks)
- Bajo acoplamiento
- Alta cohesión

### 2. Strategy Pattern
```javascript
// Diferentes estrategias de sincronización
class NormalSyncStrategy { ... }
class ForceSyncStrategy { ... }

// Intercambiables en runtime
syncService.setStrategy(new ForceSyncStrategy());
```

**Beneficios:**
- Agregar nuevas estrategias sin modificar código existente
- Fácil de testear cada estrategia por separado

### 3. Command Pattern
```javascript
// Cada comando es una acción encapsulada
class SyncCommand {
  execute(options) { ... }
}
```

**Beneficios:**
- Fácil agregar nuevos comandos
- Cada comando es independiente
- Fácil de testear

### 4. Singleton Pattern
```javascript
// Config y Container son singletons
module.exports = new Config();
module.exports = new Container();
```

**Beneficios:**
- Una única instancia compartida
- Estado consistente

## 🔧 Cómo Extender

### Agregar un nuevo comando

1. Crea el comando en `src/cli/commands/`:
```javascript
class NewCommand {
  constructor(dependencies) {
    this.dependencies = dependencies;
  }

  execute(options) {
    // Tu lógica aquí
  }
}
```

2. Regístralo en el container:
```javascript
getNewCommand() {
  return new NewCommand(this.getDependencies());
}
```

3. Úsalo en `CliApp`:
```javascript
if (options.new) {
  return this.newCommand.execute();
}
```

### Agregar una nueva estrategia

```javascript
class CustomSyncStrategy extends SyncStrategy {
  shouldSync(fileExists, force) {
    // Tu lógica personalizada
  }

  getStatusMessage(fileExists) {
    return '(custom)';
  }
}

// Usar
syncService.setStrategy(new CustomSyncStrategy());
```

### Agregar un nuevo filtro

```javascript
class CustomFileFilter extends FileFilter {
  filter(files) {
    // Tu lógica de filtrado
  }
}

// Usar en container
getFileFilter() {
  return new CustomFileFilter();
}
```

## 🧪 Testing

La arquitectura facilita el testing:

```javascript
// Mock de GitHubClient
const mockGitHub = {
  getRepoContents: jest.fn(),
  downloadFile: jest.fn()
};

// Inyectar mock
const syncService = new SyncService(
  mockGitHub,  // ← Mock
  fileManager,
  fileFilter,
  logger
);

// Test aislado
await syncService.sync(options);
expect(mockGitHub.getRepoContents).toHaveBeenCalled();
```

## 📊 Flujo de Ejecución

```
1. bin/cli.js
   ↓
2. Container.getCliApp()
   ↓
3. CliApp.run(args)
   ↓
4. ArgumentParser.getOptions()
   ↓
5. Command.execute()
   ↓
6. SyncService.sync()
   ↓
7. GitHubClient.getRepoContents()
   ↓
8. FileManager + FileFilter
   ↓
9. SyncResult
   ↓
10. OutputFormatter.showSummary()
```

## 🎨 Beneficios de la Arquitectura

### ✅ Mantenibilidad
- Código organizado y fácil de encontrar
- Cada clase tiene un propósito claro
- Fácil de entender

### ✅ Testabilidad
- Dependencias inyectadas
- Fácil crear mocks
- Tests aislados

### ✅ Extensibilidad
- Agregar features sin modificar código existente
- Patrones de diseño facilitan extensión
- Bajo acoplamiento

### ✅ Escalabilidad
- Fácil agregar nuevos comandos
- Fácil agregar nuevas fuentes de datos
- Arquitectura preparada para crecer

## 📝 Notas

- Todo el código tiene documentación JSDoc
- Cada clase tiene comentarios explicando principios SOLID
- La arquitectura es "screaming" - se ve claramente qué hace cada parte
- El código es autodocumentado - los nombres son descriptivos

---

**Versión anterior**: `bin/sync-docs.js` (monolítico, 250+ líneas)
**Versión actual**: 16 archivos modulares, cada uno con < 150 líneas

✅ Más fácil de mantener
✅ Más fácil de testear
✅ Más fácil de extender
✅ Cumple principios SOLID
✅ Arquitectura limpia
