# 📦 Guía de Publicación del Paquete

## Opción 1: Publicar en npm (Recomendado)

### Paso 1: Crear cuenta en npm
```bash
# Si no tienes cuenta, regístrate en https://www.npmjs.com
npm login
```

### Paso 2: Verificar el paquete
```bash
# Verifica que el paquete esté bien configurado
npm pack --dry-run
```

### Paso 3: Publicar
```bash
# Publicar en npm
npm publish --access public
```

### Paso 4: Usuarios podrán instalarlo así
```bash
# Sin instalación
npx @jacuxx/shopify-copilot-docs

# Con instalación global
npm install -g @jacuxx/shopify-copilot-docs
```

---

## Opción 2: Usar desde GitHub (Gratis)

### Ventajas
- No requiere publicar en npm
- Gratis
- Funciona inmediatamente
- Se actualiza automáticamente

### Los usuarios lo usarán así:

```bash
# Sin instalación (siempre usa la última versión)
npx github:JacuXx/Prompt-Copilot-Shopify

# O con instalación global
npm install -g github:JacuXx/Prompt-Copilot-Shopify
shopify-copilot-sync
```

### Pasos para configurar:

1. **Commit y push de los archivos**
```bash
git add .
git commit -m "feat: add npm package for syncing docs"
git push origin main
```

2. **Crear un release (opcional pero recomendado)**
```bash
git tag v1.0.0
git push origin v1.0.0
```

3. **Listo!** Los usuarios ya pueden usarlo

---

## Opción 3: GitHub Packages (Alternativa)

### Configurar para GitHub Packages

1. Actualizar `package.json`:
```json
{
  "name": "@jacuxx/shopify-copilot-docs",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

2. Autenticarse:
```bash
npm login --registry=https://npm.pkg.github.com
```

3. Publicar:
```bash
npm publish
```

---

## 🎯 Recomendación

**Para ti:** Usa la **Opción 2** (GitHub directamente)

### ¿Por qué?
- ✅ Es gratis (npm puede cobrar si creces)
- ✅ No necesitas configuración adicional
- ✅ Los usuarios pueden usarlo inmediatamente con `npx`
- ✅ Se actualiza automáticamente cuando haces push
- ✅ No necesitas gestionar versiones manualmente

### Pasos inmediatos:

1. **Commitea todo:**
```bash
git add .
git commit -m "feat: add portable npm package for docs sync"
git push
```

2. **Comparte con usuarios:**
```bash
npx github:JacuXx/Prompt-Copilot-Shopify
```

---

## 🧪 Testing Local

Antes de publicar, prueba localmente:

### Test 1: Probar el script directamente
```bash
node bin/sync-docs.js --help
```

### Test 2: Probar con npm link
```bash
# En el directorio del paquete
npm link

# En cualquier otro directorio
shopify-copilot-sync --help

# Cuando termines de probar
npm unlink -g @jacuxx/shopify-copilot-docs
```

### Test 3: Probar como si fuera instalado
```bash
# Crear un directorio de prueba
mkdir test-project
cd test-project
npm init -y

# Instalar desde local
npm install ../Prompt-Copilot-Shopify

# Probar
npx shopify-copilot-sync
```

---

## 📋 Checklist antes de publicar

- [ ] `package.json` tiene toda la info correcta
- [ ] `bin/sync-docs.js` es ejecutable
- [ ] Script funciona en Windows
- [ ] Script funciona en Mac/Linux (si es posible testear)
- [ ] README.md está actualizado
- [ ] INSTALL.md tiene instrucciones claras
- [ ] `.npmignore` excluye archivos innecesarios
- [ ] Version number es correcto (1.0.0 para primera vez)
- [ ] Licencia está definida (MIT)
- [ ] Repositorio GitHub está público

---

## 🔄 Actualizaciones Futuras

Cuando hagas cambios:

### Para GitHub (Opción 2):
```bash
# 1. Haz tus cambios
# 2. Actualiza versión en package.json
# 3. Commit y push
git add .
git commit -m "feat: nueva funcionalidad"
git push

# 4. Opcionalmente, crea un tag
git tag v1.1.0
git push origin v1.1.0
```

### Para npm (Opción 1):
```bash
# 1. Actualiza versión
npm version patch  # 1.0.0 -> 1.0.1
# o
npm version minor  # 1.0.0 -> 1.1.0
# o
npm version major  # 1.0.0 -> 2.0.0

# 2. Publica
npm publish

# 3. Push tags
git push --tags
```

---

## 💡 Tips Adicionales

### Agregar badge de npm (si publicas en npm)
En tu README.md:
```markdown
[![npm version](https://badge.fury.io/js/@jacuxx%2Fshopify-copilot-docs.svg)](https://www.npmjs.com/package/@jacuxx/shopify-copilot-docs)
```

### Agregar statistics
```markdown
[![npm downloads](https://img.shields.io/npm/dm/@jacuxx/shopify-copilot-docs.svg)](https://www.npmjs.com/package/@jacuxx/shopify-copilot-docs)
```

### Documentar en el repo
Crea un archivo PUBLISHING.md o añade al README principal las instrucciones de instalación.

---

## 🎉 ¡Listo!

Ahora tienes un paquete npm portable que funciona en Windows y Mac.
Elige la opción que prefieras y ¡a publicar! 🚀
