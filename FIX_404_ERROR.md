# ✅ SOLUCIÓN AL ERROR 404 - Repositorio Privado

## 🎯 El Problema
Tu repositorio es **privado**, por eso la API de GitHub devuelve error 404.

## 🔧 Soluciones Disponibles

### Opción 1: Configurar Token de GitHub (Mantener Privado) ⭐ RECOMENDADO

#### Paso 1: Crear el Token

1. Ve a: https://github.com/settings/tokens/new
2. Configuración del token:
   - **Nombre**: `Shopify Copilot Sync`
   - **Scope**: Marca **`repo`** (Full control of private repositories)
3. Click en **"Generate token"**
4. **Copia el token** (empieza con `ghp_...`)
   ⚠️ Solo se muestra una vez!

#### Paso 2: Configurar el Token en tu Sistema

**Windows (PowerShell):**
```powershell
# Configura el token (reemplaza ghp_XXXXX con tu token real)
$env:GITHUB_TOKEN = "ghp_XXXXX"

# Para hacerlo permanente:
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'ghp_XXXXX', 'User')
```

**Mac/Linux (Bash/Zsh):**
```bash
# Configura el token (reemplaza ghp_XXXXX con tu token real)
export GITHUB_TOKEN="ghp_XXXXX"

# Para hacerlo permanente (agrega a ~/.bashrc o ~/.zshrc):
echo 'export GITHUB_TOKEN="ghp_XXXXX"' >> ~/.bashrc
source ~/.bashrc
```

#### Paso 3: Usar el Comando

```bash
# Ahora funciona!
npx github:JacuXx/Prompt-Copilot-Shopify
```

**Salida esperada:**
```
🔄 Sincronizando documentación de Shopify Copilot...
═══════════════════════════════════════════════════

🔐 Usando autenticación de GitHub (repo privado)  ← Verás esto
📡 Obteniendo lista de archivos del repositorio...

📚 Se encontraron 19 archivos para sincronizar

✓ 01-liquid-guidelines.md (descargado)
✓ 02-sections-snippets.md (descargado)
...
```

---

### Opción 2: Hacer el Repositorio Público (Más Fácil)

Si no hay problema en que las guías sean públicas:

1. Ve a: https://github.com/JacuXx/Prompt-Copilot-Shopify/settings
2. Baja hasta **"Danger Zone"**
3. Click en **"Change visibility"**
4. Selecciona **"Make public"**
5. Confirma

Luego el comando funciona sin token:
```bash
npx github:JacuXx/Prompt-Copilot-Shopify
```

---

## 🚀 Script Automático de Configuración

Hemos creado un script que te guía paso a paso:

```powershell
# Windows PowerShell
.\setup-token.ps1
```

```bash
# Mac/Linux
chmod +x setup-token.sh
./setup-token.sh
```

El script:
- ✅ Te guía para crear el token
- ✅ Lo configura automáticamente
- ✅ Lo guarda permanentemente
- ✅ Verifica que funcione

---

## 🧪 Verificar que Funciona

```powershell
# Windows
echo $env:GITHUB_TOKEN
```

```bash
# Mac/Linux
echo $GITHUB_TOKEN
```

Debería mostrar tu token (empieza con `ghp_`)

---

## 📝 Ejemplo Completo (Windows)

```powershell
# 1. Configurar token
$env:GITHUB_TOKEN = "ghp_tu_token_real_aqui"

# 2. Ir a tu proyecto Shopify
cd C:\Users\tu-usuario\mi-tema-shopify

# 3. Ejecutar el comando
npx github:JacuXx/Prompt-Copilot-Shopify

# 4. ¡Listo! Los archivos se descargan en docs/copilot/
```

---

## 📚 Más Información

- **PRIVATE_REPO_SETUP.md** - Guía completa de configuración
- **INSTALL.md** - Todas las opciones de instalación
- **EXAMPLES.md** - Ejemplos de uso

---

## 💡 Recomendación

**Para uso personal**: Configura el token (Opción 1)
**Para compartir públicamente**: Haz el repo público (Opción 2)

---

¿Necesitas ayuda? Revisa los archivos de documentación o abre un issue en GitHub.
