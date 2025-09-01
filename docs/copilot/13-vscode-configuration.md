# Configuración Universal de GitHub Copilot para Shopify

## 🎯 Configuración Aplicada (Universal)

### Instrucciones Relativas al Workspace

He configurado VS Code para que GitHub Copilot **siempre** busque las guías en cualquier proyecto donde tengas la carpeta `docs/copilot/`.

#### **Review Instructions (Automáticas)**
GitHub Copilot leerá automáticamente:
- `docs/copilot/01-liquid-guidelines.md`
- `docs/copilot/02-sections-snippets.md` 
- `docs/copilot/03-javascript-ajax.md`
- `docs/copilot/04-carousels-components.md`
- `docs/copilot/05-customization-styles.md`
- `docs/copilot/06-analysis-development.md`
- `docs/copilot/07-optimal-prompts.md`
- `docs/copilot/08-liquid-patterns.md`
- `docs/copilot/09-performance-optimization.md`
- `docs/copilot/10-schema-templates.md`
- `docs/copilot/11-git-commits-branches.md`
- `docs/copilot/12-editing-existing-components.md`

#### **Commit Generation (Automático)**
- Lee: `docs/copilot/11-git-commits-branches.md`
- Genera commits semánticos automáticamente

#### **Pull Request Descriptions (Automático)**
- Lee: `docs/copilot/12-editing-existing-components.md`
- Lee: `docs/copilot/11-git-commits-branches.md`
- Describe cambios siguiendo nuestros estándares

## 📁 Estructura Universal Requerida

### En Cualquier Proyecto Shopify:
```
mi-proyecto-shopify/
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
│       └── 13-vscode-configuration.md
├── sections/
├── snippets/
├── assets/
└── templates/
```

## 🚀 Funcionamiento Universal

### ✅ **En Cualquier Proyecto**
1. **Copia la carpeta `docs/copilot/`** a tu proyecto
2. **Las configuraciones se activan automáticamente**
3. **GitHub Copilot lee todas las guías**
4. **Funciona sin rutas específicas**

### ✅ **Detección Automática**
GitHub Copilot automáticamente:
- Busca `docs/copilot/` en el workspace actual
- Lee TODOS los archivos de guías
- Aplica las mejores prácticas
- Genera código siguiendo estándares

### ✅ **Sin Configuración Adicional**
- No necesitas cambiar settings por proyecto
- No hay rutas hardcoded
- Funciona en cualquier máquina
- Se sincroniza con el equipo automáticamente

## 🎯 Configuración de Settings.json Aplicada

### Review Instructions
```json
{
    "file": "docs/copilot/01-liquid-guidelines.md"
},
{
    "file": "docs/copilot/02-sections-snippets.md"
}
// ... todos los archivos de guías
```

### Commit Generation
```json
{
    "file": "docs/copilot/11-git-commits-branches.md"
}
```

### PR Descriptions
```json
{
    "file": "docs/copilot/12-editing-existing-components.md"
},
{
    "file": "docs/copilot/11-git-commits-branches.md"
}
```

## 🔧 Configuraciones Adicionales (Ya Aplicadas)

### Archivos Liquid Optimizados
```json
"files.associations": {
    "*.liquid": "liquid",
    "*.scss": "css"
},
"shopify.theme.check.onSave": true,
"liquid.format.enable": true
```

### GitHub Copilot Habilitado para Shopify
```json
"github.copilot.enable": {
    "liquid": true,
    "javascript": true,
    "css": true,
    "json": true
}
```

## 🚀 Cómo Usar las Instrucciones

### 1. **Al Escribir Código**
GitHub Copilot ahora:
- Sugerirá Liquid en lugar de JavaScript
- Incluirá schema completo automáticamente
- Generará responsive CSS por defecto
- Seguirá patrones de nuestras guías

### 2. **Al Hacer Commits**
GitHub Copilot:
- Generará mensajes semánticos automáticamente
- Incluirá el ámbito correcto (archivo tocado)
- Usará los tipos de commit establecidos

### 3. **Al Hacer Code Review**
GitHub Copilot:
- Revisará según nuestros estándares
- Verificará uso correcto de Liquid
- Validará personalización y responsive

## 📋 Comandos de Chat Optimizados

### Para Crear Secciones
```
@workspace Crea una sección de productos destacados con carrusel, estilo moderno, completamente personalizable, usando las guías de liquid
```

### Para Editar Existentes
```
@workspace Edita product-grid.liquid para agregar quick view, mantén estructura actual y variables existentes
```

### Para Generar Commits
```
@workspace Genera commit para los cambios en product-slider.liquid
```

## 📋 Setup para Nuevos Proyectos

### **Paso 1: Copiar Documentación**
```bash
# En tu nuevo proyecto Shopify:
mkdir -p docs
cp -r /ruta/a/docs/copilot docs/
```

### **Paso 2: Verificar Estructura**
```
nuevo-proyecto/
├── docs/
│   └── copilot/          ← Debe estar aquí
│       ├── *.md          ← Todos los archivos
│       └── README.md
```

### **Paso 3: Abrir en VS Code**
```bash
code nuevo-proyecto/
# GitHub Copilot automáticamente detecta las guías
```

### **Paso 4: Probar Configuración**
```
@workspace Crea una sección hero básica
# Debería generar código siguiendo las guías automáticamente
```

## 🎪 Ejemplos de Uso Universal

### **Prompt Simple en Cualquier Proyecto**
```
Crea una sección de productos destacados
```

**Resultado Automático** (sin especificar guías):
- ✅ Liquid-first approach
- ✅ Schema completo con personalización
- ✅ CSS responsive automático
- ✅ Variables con fallbacks
- ✅ Estructura optimizada

### **Edición de Código Existente**
```
Edita product-grid.liquid para agregar filtros
```

**GitHub Copilot Automáticamente**:
- ✅ Lee el archivo completo primero
- ✅ Mantiene estructura existente
- ✅ Agrega solo lo necesario
- ✅ Preserva funcionalidad actual

### **Generación de Commits**
```
@workspace Genera commit para estos cambios
```

**Resultado Automático**:
```
ft(product-grid.liquid): agrega filtros por precio con AJAX
```

## 🔄 Sincronización de Equipo

### **Para Todo el Equipo**
1. **Un solo setup**: Configuración en settings.json una vez
2. **Docs en proyecto**: Cada proyecto tiene sus guías
3. **Sincronización automática**: Git mantiene guías actualizadas
4. **Estándares consistentes**: Todo el equipo sigue las mismas reglas

### **Actualización de Guías**
```bash
# Actualizar guías en proyecto actual
git pull origin main
# Las nuevas guías se aplican automáticamente
```

## 🎯 Ventajas de la Configuración Universal

### ✅ **Portabilidad**
- Funciona en cualquier máquina
- No depende de rutas específicas
- Se sincroniza con Git

### ✅ **Escalabilidad**
- Fácil agregar nuevos proyectos
- Configuración una sola vez
- Mantenimiento centralizado

### ✅ **Consistencia**
- Mismos estándares en todos los proyectos
- Actualización simultánea de guías
- Equipo alineado automáticamente

### ✅ **Automatización**
- Cero configuración por proyecto
- Detección automática de guías
- Aplicación inmediata de estándares

¡Ahora puedes copiar la carpeta `docs/copilot/` a cualquier proyecto Shopify y GitHub Copilot seguirá automáticamente todas las guías! 🎉
