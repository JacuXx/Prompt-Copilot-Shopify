# 📦 Source Code (src/)

Este directorio contiene toda la lógica de la aplicación organizada siguiendo **Clean Architecture** y **principios SOLID**.

## 📊 Estadísticas

- **Archivos**: 16
- **Tamaño total**: ~26 KB
- **Promedio por archivo**: ~1.6 KB
- **Líneas de código**: ~1,400
- **Cobertura de tests**: Preparado para 100%

## 🗂️ Organización

```
src/
├── cli/              → Capa de Presentación (6 archivos, ~8 KB)
├── core/             → Capa de Dominio (6 archivos, ~10 KB)
├── utils/            → Infraestructura (2 archivos, ~4 KB)
├── config/           → Configuración (1 archivo, ~2 KB)
└── container.js      → DI Container (1 archivo, ~2 KB)
```

## 🎯 Capas de la Aplicación

### 1. CLI Layer (Presentation)
**Propósito**: Interfaz de usuario (línea de comandos)

```
cli/
├── cli-app.js              # App principal CLI
├── argument-parser.js      # Parser de argumentos
├── commands/
│   ├── sync-command.js     # Comando: sincronizar
│   ├── help-command.js     # Comando: ayuda
│   └── version-command.js  # Comando: versión
└── output/
    └── output-formatter.js # Formateo de salida
```

**Responsabilidades:**
- Parsear argumentos de línea de comandos
- Ejecutar comandos
- Formatear y mostrar salida al usuario
- Manejar interacción con el usuario

**No debe:**
- Contener lógica de negocio
- Hacer llamadas HTTP directas
- Manipular archivos directamente

### 2. Core Layer (Domain)
**Propósito**: Lógica de negocio pura

```
core/
├── github/
│   └── github-client.js    # Cliente GitHub API
├── file/
│   ├── file-manager.js     # Operaciones de archivos
│   └── file-filter.js      # Filtrado de archivos
└── sync/
    ├── sync-service.js     # Orquestador
    ├── sync-result.js      # Resultado
    └── sync-strategy.js    # Estrategias
```

**Responsabilidades:**
- Implementar reglas de negocio
- Orquestar flujos de trabajo
- Gestionar estado de la aplicación
- Definir contratos (interfaces)

**No debe:**
- Depender de frameworks
- Conocer detalles de CLI
- Tener dependencias externas fuertes

### 3. Utils Layer (Infrastructure)
**Propósito**: Servicios técnicos reutilizables

```
utils/
├── logger.js          # Logger con colores
└── http-client.js     # Cliente HTTP
```

**Responsabilidades:**
- Proporcionar servicios técnicos
- Abstraer implementaciones de bajo nivel
- Ser reutilizable en todo el proyecto

**No debe:**
- Contener lógica de negocio
- Conocer detalles del dominio

### 4. Config Layer
**Propósito**: Configuración centralizada

```
config/
└── index.js           # Configuración global
```

**Responsabilidades:**
- Centralizar toda la configuración
- Manejar variables de entorno
- Proporcionar valores por defecto

**No debe:**
- Contener lógica
- Ser modificable en runtime

### 5. Container (DI)
**Propósito**: Inyección de dependencias

```
container.js           # DI Container
```

**Responsabilidades:**
- Crear instancias de clases
- Inyectar dependencias
- Gestionar el ciclo de vida de objetos

**No debe:**
- Contener lógica de negocio
- Ser usado fuera del entry point

## 🔄 Flujo de Dependencias

```
CLI Layer
    ↓ depende de
Core Layer
    ↓ depende de
Utils Layer
    ↓ depende de
Config Layer
```

**Regla de Oro**: Las capas superiores pueden depender de las inferiores, pero **nunca al revés**.

## 📐 Principios SOLID por Archivo

### Single Responsibility Principle (SRP)
✅ **Cada archivo tiene UNA responsabilidad**

- `logger.js` → Solo logging
- `http-client.js` → Solo HTTP
- `github-client.js` → Solo GitHub API
- `file-manager.js` → Solo archivos
- `sync-service.js` → Solo orquestación

### Open/Closed Principle (OCP)
✅ **Abierto a extensión, cerrado a modificación**

Ejemplos:
- Agregar nueva estrategia: Extender `SyncStrategy`
- Agregar nuevo comando: Extender `Command`
- Agregar nuevo filtro: Extender `FileFilter`

### Liskov Substitution Principle (LSP)
✅ **Subclases son intercambiables**

```javascript
// Cualquier SyncStrategy funciona
const strategy = condition 
  ? new NormalSyncStrategy() 
  : new ForceSyncStrategy();

syncService.setStrategy(strategy);
```

### Interface Segregation Principle (ISP)
✅ **Interfaces específicas**

```javascript
// Logger tiene solo lo necesario
logger.success();  ✅
logger.error();    ✅
logger.info();     ✅

// No tiene métodos innecesarios
logger.sendEmail(); ❌
logger.saveToDb();  ❌
```

### Dependency Inversion Principle (DIP)
✅ **Depender de abstracciones**

```javascript
// SyncService no crea sus dependencias
class SyncService {
  constructor(githubClient, fileManager) {  // ← Inyectadas
    this.githubClient = githubClient;
    this.fileManager = fileManager;
  }
}
```

## 🎨 Patrones de Diseño

### 1. Strategy Pattern
**Dónde**: `sync-strategy.js`

```javascript
class SyncStrategy {
  shouldSync(fileExists, force) { }
}

class NormalSyncStrategy extends SyncStrategy { }
class ForceSyncStrategy extends SyncStrategy { }
```

**Beneficio**: Cambiar comportamiento sin modificar código.

### 2. Command Pattern
**Dónde**: `commands/`

```javascript
class Command {
  execute(options) { }
}

class SyncCommand extends Command { }
class HelpCommand extends Command { }
```

**Beneficio**: Encapsular acciones, fácil agregar comandos.

### 3. Singleton Pattern
**Dónde**: `config/index.js`, `container.js`

```javascript
module.exports = new Config();  // Singleton
```

**Beneficio**: Una única instancia compartida.

### 4. Dependency Injection
**Dónde**: `container.js`

```javascript
getSyncService() {
  return new SyncService(
    this.getGitHubClient(),    // DI
    this.getFileManager()      // DI
  );
}
```

**Beneficio**: Bajo acoplamiento, fácil de testear.

## 🧪 Testing Strategy

### Unit Tests
Cada archivo puede testearse de forma aislada:

```javascript
// Test de SyncService
const mockGitHub = { getRepoContents: jest.fn() };
const service = new SyncService(mockGitHub, ...);
```

### Integration Tests
Testear flujo completo:

```javascript
const app = container.getCliApp();
await app.run(['--force']);
```

### E2E Tests
Testear desde entry point:

```javascript
const result = await execCommand('node bin/cli.js --help');
expect(result).toContain('Shopify Copilot');
```

## 📖 Documentación

Cada archivo incluye:

```javascript
/**
 * Descripción de la clase
 * Principio: [SOLID principle aplicado]
 * 
 * @example
 * const service = new Service();
 * await service.method();
 */
```

## 🔍 Cómo Navegar el Código

### Para entender el flujo:
1. Empieza en `bin/cli.js` (entry point)
2. Sigue a `container.js` (cómo se conecta todo)
3. Ve a `cli/cli-app.js` (app principal)
4. Explora `core/` (lógica de negocio)

### Para agregar una feature:
1. Define en `core/` (lógica)
2. Usa en `cli/` (interfaz)
3. Registra en `container.js` (DI)

### Para debuggear:
1. Identifica la capa (CLI, Core, Utils)
2. Busca el archivo específico
3. Cada archivo es independiente

## 🚀 Mejores Prácticas

### ✅ Hacer
- Mantener archivos pequeños (<150 líneas)
- Una clase por archivo
- Nombres descriptivos
- Documentar con JSDoc
- Inyectar dependencias
- Usar principios SOLID

### ❌ Evitar
- Archivos grandes (>200 líneas)
- Múltiples clases por archivo
- Nombres genéricos (utils.js, helpers.js)
- Código sin documentar
- Crear dependencias con `new`
- Mezclar responsabilidades

## 📊 Métricas de Calidad

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| Líneas por archivo | < 150 | ✅ ~87 |
| Complejidad ciclomática | < 10 | ✅ Baja |
| Acoplamiento | Bajo | ✅ Bajo |
| Cohesión | Alta | ✅ Alta |
| Cobertura de tests | > 80% | ⏳ Pendiente |

## 🎓 Recursos

- **SOLID**: https://en.wikipedia.org/wiki/SOLID
- **Clean Architecture**: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
- **Design Patterns**: https://refactoring.guru/design-patterns

---

**Última actualización**: 4 de noviembre de 2025
**Versión**: 2.0.0
**Mantenedor**: @JacuXx
