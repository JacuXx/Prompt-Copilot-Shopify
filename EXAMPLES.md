# 🧪 Ejemplo de Uso del Paquete

## Escenario Real: Nuevo Proyecto Shopify

### 1. Crear proyecto Shopify
```bash
# Crear nuevo tema de Shopify
shopify theme init my-awesome-theme
cd my-awesome-theme
```

### 2. Instalar las guías de Copilot
```bash
# Opción A: Sin instalar (recomendado)
npx github:JacuXx/Prompt-Copilot-Shopify

# Opción B: Instalado globalmente
npm install -g github:JacuXx/Prompt-Copilot-Shopify
shopify-copilot-sync
```

### 3. Resultado
```
my-awesome-theme/
├── assets/
├── config/
├── layout/
├── sections/
├── snippets/
├── templates/
├── docs/                    ← ¡NUEVO!
│   └── copilot/            ← Guías descargadas aquí
│       ├── 01-liquid-guidelines.md
│       ├── 02-sections-snippets.md
│       ├── 03-javascript-ajax.md
│       └── ... (19 archivos en total)
└── ...
```

### 4. Configurar VS Code para usar las guías
```bash
# Crear carpeta .vscode si no existe
mkdir .vscode

# Crear settings.json
echo '{
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "file": "docs/copilot/**/*.md"
    }
  ]
}' > .vscode/settings.json
```

### 5. ¡Empezar a desarrollar!
```bash
# Abrir en VS Code
code .

# Usar Copilot con las guías
# Ctrl+I o Cmd+I para abrir Copilot Chat
# Escribe: "Crear una sección de productos destacados"
# Copilot usará las guías automáticamente
```

---

## Escenario 2: Actualizar Proyecto Existente

### Tu proyecto ya tiene carpeta docs/copilot/
```bash
cd mi-tema-existente

# Sincronizar (no sobrescribe archivos existentes)
npx github:JacuXx/Prompt-Copilot-Shopify

# Salida:
# ⊘ 01-liquid-guidelines.md (ya existe, usa --force para sobrescribir)
# ⊘ 02-sections-snippets.md (ya existe, usa --force para sobrescribir)
# ✓ 19-nueva-guia.md (descargado)
```

### Quieres actualizar todo
```bash
# Forzar actualización de todo
npx github:JacuXx/Prompt-Copilot-Shopify --force

# Salida:
# ✓ 01-liquid-guidelines.md (actualizado)
# ✓ 02-sections-snippets.md (actualizado)
# ✓ 03-javascript-ajax.md (actualizado)
# ...
```

---

## Escenario 3: Equipo de Desarrollo

### package.json del proyecto
```json
{
  "name": "mi-tema-shopify",
  "version": "1.0.0",
  "scripts": {
    "postinstall": "npx github:JacuXx/Prompt-Copilot-Shopify",
    "docs:sync": "npx github:JacuXx/Prompt-Copilot-Shopify",
    "docs:update": "npx github:JacuXx/Prompt-Copilot-Shopify --force"
  },
  "devDependencies": {
    "@shopify/cli": "^3.50.0",
    "@shopify/theme": "^3.50.0"
  }
}
```

### Flujo del equipo
```bash
# Developer 1: Clona el repo
git clone https://github.com/company/mi-tema.git
cd mi-tema

# Instala dependencias (docs se descargan automáticamente)
npm install
# → postinstall ejecuta el sync automáticamente

# Developer 2: Actualiza docs manualmente
npm run docs:update
# → Actualiza todas las guías a la última versión

# Developer 3: Solo sincroniza archivos nuevos
npm run docs:sync
```

---

## Escenario 4: CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/sync-docs.yml
name: Sync Copilot Docs

on:
  schedule:
    - cron: '0 0 * * 1' # Cada lunes a medianoche
  workflow_dispatch: # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Sync Documentation
        run: npx github:JacuXx/Prompt-Copilot-Shopify --force
      
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/
          git diff --quiet && git diff --staged --quiet || git commit -m "docs: sync Copilot guides"
          git push
```

---

## Escenario 5: Múltiples Proyectos

### Instalación global para usar en todos tus proyectos
```bash
# Instalar una vez globalmente
npm install -g github:JacuXx/Prompt-Copilot-Shopify

# Usar en proyecto 1
cd ~/projects/tema-1
scs

# Usar en proyecto 2
cd ~/projects/tema-2
scs

# Usar en proyecto 3
cd ~/projects/tema-3
scs --force
```

---

## Escenario 6: Sin Node.js en el Proyecto

### Proyecto que no usa npm
```bash
# Proyecto solo con Liquid/CSS/JS (sin package.json)
cd mi-tema-basico

# Descargar docs directamente
npx github:JacuXx/Prompt-Copilot-Shopify

# Los archivos se descargan igual en docs/copilot/
```

---

## Casos de Uso Avanzados

### 1. Script de Setup Automatizado
```bash
#!/bin/bash
# setup-shopify-project.sh

echo "🚀 Configurando proyecto Shopify..."

# Crear estructura básica
mkdir -p .vscode assets config layout sections snippets templates

# Descargar guías de Copilot
npx github:JacuXx/Prompt-Copilot-Shopify

# Configurar VS Code
cat > .vscode/settings.json << 'EOF'
{
  "github.copilot.chat.codeGeneration.instructions": [
    { "file": "docs/copilot/**/*.md" }
  ],
  "files.associations": {
    "*.liquid": "liquid"
  }
}
EOF

echo "✅ Proyecto configurado!"
```

### 2. Makefile
```makefile
# Makefile
.PHONY: setup sync-docs update-docs

setup:
	@echo "Setting up Shopify project..."
	@npx github:JacuXx/Prompt-Copilot-Shopify
	@echo "✅ Setup complete!"

sync-docs:
	@npx github:JacuXx/Prompt-Copilot-Shopify

update-docs:
	@npx github:JacuXx/Prompt-Copilot-Shopify --force
```

Uso:
```bash
make setup        # Primera vez
make sync-docs    # Sincronizar
make update-docs  # Actualizar todo
```

### 3. PowerShell Script (Windows)
```powershell
# setup-project.ps1
Write-Host "🚀 Configurando proyecto Shopify..." -ForegroundColor Cyan

# Descargar guías
npx github:JacuXx/Prompt-Copilot-Shopify

# Configurar VS Code
$settings = @{
    "github.copilot.chat.codeGeneration.instructions" = @(
        @{ "file" = "docs/copilot/**/*.md" }
    )
} | ConvertTo-Json -Depth 10

New-Item -ItemType Directory -Force -Path .vscode
$settings | Out-File -FilePath .vscode/settings.json -Encoding UTF8

Write-Host "✅ Proyecto configurado!" -ForegroundColor Green
```

---

## Verificación de Instalación

### Después de sincronizar, verifica:
```bash
# 1. Archivos descargados
ls docs/copilot/

# 2. Contar archivos (debería ser ~19)
# En Linux/Mac:
ls docs/copilot/*.md | wc -l

# En Windows PowerShell:
(Get-ChildItem docs/copilot/*.md).Count

# 3. Ver contenido de uno
cat docs/copilot/README.md

# 4. Buscar una guía específica
# En Linux/Mac:
grep -l "liquid" docs/copilot/*.md

# En Windows PowerShell:
Select-String -Path "docs/copilot/*.md" -Pattern "liquid"
```

---

## 💡 Tips Prácticos

### 1. Automatizar en nuevos proyectos
Crea un alias en tu shell:

**Bash/Zsh** (~/.bashrc o ~/.zshrc):
```bash
alias shopify-setup='npx github:JacuXx/Prompt-Copilot-Shopify && echo "✅ Docs sincronizados!"'
```

**PowerShell** ($PROFILE):
```powershell
function Sync-ShopifyDocs {
    npx github:JacuXx/Prompt-Copilot-Shopify
    Write-Host "✅ Docs sincronizados!" -ForegroundColor Green
}
Set-Alias -Name ssd -Value Sync-ShopifyDocs
```

### 2. Integrar con Git Hooks
```bash
# .git/hooks/post-checkout
#!/bin/sh
echo "Sincronizando guías de Copilot..."
npx github:JacuXx/Prompt-Copilot-Shopify
```

### 3. Crear template de proyecto
```bash
# Crear carpeta template
mkdir shopify-template
cd shopify-template

# Configurar
npx github:JacuXx/Prompt-Copilot-Shopify

# Agregar .vscode, etc.
# ...

# Usar como base para nuevos proyectos
cp -r shopify-template mi-nuevo-proyecto
```

---

¡Ya estás listo para usar el paquete en cualquier situación! 🎉
