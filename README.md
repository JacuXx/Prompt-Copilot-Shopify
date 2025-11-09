# 🚀 Shopify Copilot Docs

Guías de desarrollo optimizadas para GitHub Copilot en proyectos de Shopify. Incluye configuración de VS Code, snippets y mejores prácticas para desarrollo de temas.

## 📦 Uso

Sincroniza las guías en cualquier proyecto Shopify con un solo comando:

```bash
# Opción 1: Ejecutar directamente (recomendado)
npx github:JacuXx/Prompt-Copilot-Shopify

# Opción 2: Instalación global
npm install -g github:JacuXx/Prompt-Copilot-Shopify
shopify-copilot-sync
```

Esto descargará la carpeta `docs/copilot/` con todas las guías en tu proyecto actual.

### Opciones disponible

```bash
# Forzar actualización (sobrescribe archivos existentes)
npx github:JacuXx/Prompt-Copilot-Shopify --force

# Ver ayuda
npx github:JacuXx/Prompt-Copilot-Shopify --help

# Ver versión
npx github:JacuXx/Prompt-Copilot-Shopify --version
```


## � Contenido

Las guías incluyen:

- **Liquid**: Patrones, optimización y mejores prácticas
- **Sections & Snippets**: Creación y estructura de componentes
- **JavaScript**: AJAX, carruseles y componentes
- **CSS**: Personalización y diseño responsive
- **SEO & Accesibilidad**: Optimización y cumplimiento de estándares
- **Performance**: Técnicas de optimización
- **Git**: Flujo de trabajo y commits semánticos
- **VS Code**: Configuración optimizada para Copilot

## � Automatización

Agrega a tu `package.json` para sincronizar automáticamente:

```json
{
  "scripts": {
    "postinstall": "npx github:JacuXx/Prompt-Copilot-Shopify",
    "docs:update": "npx github:JacuXx/Prompt-Copilot-Shopify --force"
  }
}
```

## 🏗️ Arquitectura

Este proyecto usa **Clean Architecture** con principios **SOLID**:

- ✅ 16 módulos especializados
- ✅ Dependency Injection
- ✅ Design Patterns (Strategy, Command, Singleton)
- ✅ Fácil de mantener y extender

**Ver**: [ARCHITECTURE.md](./ARCHITECTURE.md) para más detalles.

## � Documentación

- [INSTALL.md](./INSTALL.md) - Guía de instalación completa
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura del proyecto
- [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) - Estructura de archivos
- [EXAMPLES.md](./EXAMPLES.md) - Ejemplos de uso
- [PRIVATE_REPO_SETUP.md](./PRIVATE_REPO_SETUP.md) - Configuración de token

---

**Versión**: 2.0.0 | **Licencia**: MIT
