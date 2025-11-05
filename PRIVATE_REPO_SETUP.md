# 🔐 Configuración para Repositorio Privado

## El repositorio es privado, necesitas un token de GitHub

### 🚀 Método Rápido con Script Automático

Hemos creado scripts que te guían paso a paso:

#### Windows (PowerShell):
```powershell
# Descarga y ejecuta el script de configuración
irm https://raw.githubusercontent.com/JacuXx/Prompt-Copilot-Shopify/main/setup-token.ps1 | iex

# O si ya tienes el repo clonado:
cd "Prompt Copilot Shopify"
.\setup-token.ps1
```

#### Mac/Linux (Bash/Zsh):
```bash
# Descarga y ejecuta el script de configuración
curl -fsSL https://raw.githubusercontent.com/JacuXx/Prompt-Copilot-Shopify/main/setup-token.sh | bash

# O si ya tienes el repo clonado:
cd Prompt-Copilot-Shopify
chmod +x setup-token.sh
./setup-token.sh
```

---

## 📋 Método Manual

### Paso 1: Crear Token de GitHub

1. Ve a: https://github.com/settings/tokens
2. Click en **"Generate new token"** → **"Generate new token (classic)"**
3. Dale un nombre: `Shopify Copilot Sync`
4. Selecciona el scope: **`repo`** (Full control of private repositories)
5. Click en **"Generate token"**
6. **Copia el token** (empieza con `ghp_...`)
   ⚠️ Solo se muestra una vez, guárdalo en un lugar seguro

### Paso 2: Configurar el Token

#### En Windows (PowerShell):

```powershell
# Opción A: Solo para esta sesión de PowerShell
$env:GITHUB_TOKEN = "ghp_tu_token_aqui"

# Opción B: Permanente (recomendado)
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'ghp_tu_token_aqui', 'User')

# Verificar que quedó configurado
echo $env:GITHUB_TOKEN
```

#### En Mac/Linux (Bash/Zsh):

```bash
# Opción A: Solo para esta sesión de terminal
export GITHUB_TOKEN="ghp_tu_token_aqui"

# Opción B: Permanente (recomendado)
echo 'export GITHUB_TOKEN="ghp_tu_token_aqui"' >> ~/.bashrc
source ~/.bashrc

# Para Zsh:
echo 'export GITHUB_TOKEN="ghp_tu_token_aqui"' >> ~/.zshrc
source ~/.zshrc

# Verificar que quedó configurado
echo $GITHUB_TOKEN
```

### Paso 3: Usar el Comando

```bash
# Ahora funciona con el token
npx github:JacuXx/Prompt-Copilot-Shopify
```

**Salida esperada:**
```
🔄 Sincronizando documentación de Shopify Copilot...
═══════════════════════════════════════════════════

🔐 Usando autenticación de GitHub (repo privado)
📡 Obteniendo lista de archivos del repositorio...

📚 Se encontraron 19 archivos para sincronizar

✓ 01-liquid-guidelines.md (descargado)
✓ 02-sections-snippets.md (descargado)
...
```

---

## 🚀 Método Rápido (Windows)

Copia y pega esto en PowerShell (reemplaza con tu token):

```powershell
# Configurar token
$env:GITHUB_TOKEN = "ghp_REEMPLAZA_CON_TU_TOKEN"

# Ejecutar comando
npx github:JacuXx/Prompt-Copilot-Shopify
```

---

## 🚀 Método Rápido (Mac/Linux)

Copia y pega esto en tu terminal (reemplaza con tu token):

```bash
# Configurar token
export GITHUB_TOKEN="ghp_REEMPLAZA_CON_TU_TOKEN"

# Ejecutar comando
npx github:JacuXx/Prompt-Copilot-Shopify
```

---

## 🔒 Seguridad del Token

### ✅ Buenas Prácticas:

- **SÍ** guarda el token en variables de entorno
- **SÍ** usa un token con permisos mínimos (solo `repo`)
- **SÍ** revoca tokens que ya no uses

### ❌ Evita:

- **NO** compartas tu token con nadie
- **NO** lo subas a GitHub (en código o archivos)
- **NO** lo pongas en archivos de texto sin protección

### Revocar Token:

Si tu token se compromete:
1. Ve a https://github.com/settings/tokens
2. Click en el token
3. Click en "Delete" o "Revoke"
4. Genera uno nuevo

---

## 🆚 Alternativa: Hacer el Repositorio Público

Si no hay problema en que las guías sean públicas:

1. Ve a https://github.com/JacuXx/Prompt-Copilot-Shopify/settings
2. Baja a "Danger Zone"
3. Click en "Change visibility"
4. Selecciona "Make public"

**Ventajas:**
- No necesitas token
- Cualquiera puede usar el comando
- Más fácil de compartir

**Desventajas:**
- El código será visible para todos
- No puedes hacer el repo privado después (sin esfuerzo)

---

## ✅ Verificar Configuración

```bash
# Windows PowerShell
echo $env:GITHUB_TOKEN

# Mac/Linux
echo $GITHUB_TOKEN
```

Si muestra tu token (empieza con `ghp_`), ¡está configurado correctamente! 🎉

---

## 🧪 Probar

```bash
# Ir a cualquier proyecto
cd tu-proyecto-shopify

# Ejecutar
npx github:JacuXx/Prompt-Copilot-Shopify

# Debería mostrar:
# 🔐 Usando autenticación de GitHub (repo privado)
```

---

¿Necesitas ayuda? Revisa [INSTALL.md](./INSTALL.md) para más detalles.
