# Changelog

## [2.0.0] - 2025-11-04

### 🏗️ Refactorización Completa - Arquitectura Limpia

#### ✨ Añadido
- **Arquitectura Clean Architecture** con separación de capas
- **Principios SOLID** aplicados en todo el código
- **Dependency Injection Container** para gestión de dependencias
- **Design Patterns**:
  - Strategy Pattern para estrategias de sincronización
  - Command Pattern para comandos CLI
  - Singleton Pattern para config y container
- **16 módulos especializados** reemplazando el archivo monolítico
- **Documentación de arquitectura**: `ARCHITECTURE.md`
- **Documentación de estructura**: `FOLDER_STRUCTURE.md`
- **JSDoc completo** en todas las clases y métodos

#### 📂 Nueva Estructura
```
src/
├── config/           # Configuración centralizada
├── utils/           # Utilidades (Logger, HttpClient)
├── core/            # Lógica de negocio
│   ├── github/      # Cliente GitHub API
│   ├── file/        # Gestor de archivos y filtros
│   └── sync/        # Servicio de sincronización
├── cli/             # Interfaz CLI
│   ├── commands/    # Comandos (Sync, Help, Version)
│   └── output/      # Formateo de salida
└── container.js     # DI Container
```

#### 🔧 Mejorado
- **Testabilidad**: Todas las dependencias son inyectadas
- **Mantenibilidad**: Cada clase tiene una única responsabilidad
- **Extensibilidad**: Fácil agregar nuevas funcionalidades sin modificar código existente
- **Legibilidad**: Código autodocumentado con nombres descriptivos

#### 🎯 Principios SOLID Implementados
- ✅ **Single Responsibility**: Una clase, una responsabilidad
- ✅ **Open/Closed**: Abierto a extensión, cerrado a modificación
- ✅ **Liskov Substitution**: Subclases intercambiables
- ✅ **Interface Segregation**: Interfaces específicas
- ✅ **Dependency Inversion**: Dependencias inyectadas

#### 📊 Métricas
- **Antes**: 1 archivo monolítico (~250 líneas)
- **Ahora**: 16 archivos modulares (~1400 líneas total, promedio 87 líneas/archivo)
- **Complejidad ciclomática**: Reducida drásticamente
- **Acoplamiento**: Bajo (gracias a DI)
- **Cohesión**: Alta (SRP)

#### 🗂️ Archivos Afectados
- **Nuevo entry point**: `bin/cli.js`
- **Legacy backup**: `bin/sync-docs.legacy.js` (versión 1.0)
- **Versión**: `1.0.0` → `2.0.0`

---

## [1.0.0] - 2025-11-04

### ✨ Características Iniciales
- Sincronización de documentación desde GitHub
- Soporte para repositorios privados con token
- Comandos: `--help`, `--version`, `--force`
- Scripts de configuración automática para Windows y Mac/Linux
- Documentación completa

### 🔐 Seguridad
- Autenticación con GitHub Token
- Variables de entorno para credenciales

### 📚 Documentación
- INSTALL.md - Guía de instalación
- EXAMPLES.md - Ejemplos de uso
- PRIVATE_REPO_SETUP.md - Setup para repos privados
- PUBLISHING.md - Guía de publicación
- QUICKSTART.md - Inicio rápido
- FIX_404_ERROR.md - Solución de errores

---

## Notas de Migración

### De v1.0 a v2.0

No se requieren cambios para usuarios finales. El comando sigue siendo el mismo:

```bash
npx github:JacuXx/Prompt-Copilot-Shopify
```

**Para desarrolladores**:
- El archivo `bin/sync-docs.js` ahora es `bin/sync-docs.legacy.js`
- El nuevo entry point es `bin/cli.js`
- La lógica se ha dividido en módulos bajo `src/`
- Todas las dependencias se gestionan mediante el Container

**Ventajas de actualizar**:
- Código más fácil de mantener
- Más fácil contribuir
- Mejor para agregar tests
- Arquitectura escalable

---

## Roadmap Futuro

### v2.1.0 (Planeado)
- [ ] Tests unitarios completos
- [ ] Tests de integración
- [ ] CI/CD con GitHub Actions
- [ ] Coverage reports

### v2.2.0 (Planeado)
- [ ] Soporte para múltiples fuentes de docs
- [ ] Cache de archivos descargados
- [ ] Modo offline
- [ ] Verificación de checksums

### v3.0.0 (Ideas)
- [ ] Interfaz gráfica (Electron)
- [ ] Plugin para VS Code
- [ ] Sincronización bidireccional
- [ ] Versionado de documentación

---

**Mantenido por**: [@JacuXx](https://github.com/JacuXx)
**Repositorio**: [Prompt-Copilot-Shopify](https://github.com/JacuXx/Prompt-Copilot-Shopify)
**Licencia**: MIT
