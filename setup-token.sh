#!/bin/bash
# 🔐 Script de Configuración de Token para Mac/Linux
# Este script te ayuda a configurar el token de GitHub para repositorios privados

# Colores
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "\n${CYAN}🔐 Configuración de Token de GitHub${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════${NC}\n"

# Verificar si ya existe un token
if [ ! -z "$GITHUB_TOKEN" ]; then
    echo -e "${GREEN}✓ Ya tienes un token configurado:${NC} ${YELLOW}${GITHUB_TOKEN:0:10}...${NC}"
    read -p $'\nquieres reemplazarlo? (s/n): ' respuesta
    if [ "$respuesta" != "s" ] && [ "$respuesta" != "S" ]; then
        echo -e "\n${BLUE}OK, manteniendo el token actual.${NC}"
        exit 0
    fi
fi

echo -e "\n${YELLOW}📋 Pasos para obtener tu token:${NC}"
echo -e "${NC}1. Ve a: https://github.com/settings/tokens${NC}"
echo -e "${NC}2. Click en 'Generate new token' → 'Generate new token (classic)'${NC}"
echo -e "${NC}3. Dale un nombre: 'Shopify Copilot Sync'${NC}"
echo -e "${NC}4. Selecciona el scope: 'repo' (Full control)${NC}"
echo -e "${NC}5. Click en 'Generate token' y cópialo${NC}\n"

read -p "¿Quieres abrir GitHub ahora para crear el token? (s/n): " abrir
if [ "$abrir" = "s" ] || [ "$abrir" = "S" ]; then
    if command -v open &> /dev/null; then
        open "https://github.com/settings/tokens/new?description=Shopify%20Copilot%20Sync&scopes=repo"
    elif command -v xdg-open &> /dev/null; then
        xdg-open "https://github.com/settings/tokens/new?description=Shopify%20Copilot%20Sync&scopes=repo"
    fi
    echo -e "\n${GREEN}✓ Navegador abierto. Crea tu token y vuelve aquí.${NC}"
fi

echo -e "\n${CYAN}🔑 Ingresa tu token de GitHub:${NC}"
read -p "(empieza con ghp_): " token

if [ -z "$token" ]; then
    echo -e "\n${RED}❌ No ingresaste ningún token. Abortando.${NC}"
    exit 1
fi

if [[ ! $token =~ ^(ghp_|github_pat_) ]]; then
    echo -e "\n${YELLOW}⚠️  Advertencia: El token no parece válido (debería empezar con ghp_ o github_pat_)${NC}"
    read -p "¿Continuar de todas formas? (s/n): " continuar
    if [ "$continuar" != "s" ] && [ "$continuar" != "S" ]; then
        echo -e "\n${RED}Abortando.${NC}"
        exit 1
    fi
fi

# Detectar el shell
SHELL_RC=""
if [ -n "$BASH_VERSION" ]; then
    SHELL_RC="$HOME/.bashrc"
elif [ -n "$ZSH_VERSION" ]; then
    SHELL_RC="$HOME/.zshrc"
else
    # Intentar detectar por SHELL
    case "$SHELL" in
        */bash)
            SHELL_RC="$HOME/.bashrc"
            ;;
        */zsh)
            SHELL_RC="$HOME/.zshrc"
            ;;
        *)
            SHELL_RC="$HOME/.profile"
            ;;
    esac
fi

echo -e "\n${CYAN}📌 ¿Cómo quieres guardar el token?${NC}"
echo -e "${NC}1. Solo para esta sesión de terminal (temporal)${NC}"
echo -e "${NC}2. Permanente (recomendado - se agregará a $SHELL_RC)${NC}\n"

read -p "Elige una opción (1 o 2): " opcion

if [ "$opcion" = "2" ]; then
    echo "export GITHUB_TOKEN=\"$token\"" >> "$SHELL_RC"
    export GITHUB_TOKEN="$token"
    echo -e "\n${GREEN}✅ Token configurado permanentemente!${NC}"
    echo -e "${BLUE}   El token se agregó a $SHELL_RC${NC}"
    echo -e "\n${YELLOW}💡 Tip: Ejecuta 'source $SHELL_RC' o abre una nueva terminal para que el token esté disponible.${NC}"
else
    export GITHUB_TOKEN="$token"
    echo -e "\n${GREEN}✅ Token configurado para esta sesión!${NC}"
    echo -e "${BLUE}   El token solo estará disponible en esta terminal.${NC}"
fi

echo -e "\n${CYAN}🧪 Verificando configuración...${NC}"
if [ ! -z "$GITHUB_TOKEN" ]; then
    echo -e "${GREEN}✓ Token configurado correctamente:${NC} ${YELLOW}${GITHUB_TOKEN:0:10}...${GITHUB_TOKEN: -4}${NC}"
else
    echo -e "${RED}❌ Error: No se pudo configurar el token${NC}"
    exit 1
fi

echo -e "\n${GREEN}🚀 ¡Listo! Ahora puedes ejecutar:${NC}"
echo -e "${CYAN}   npx github:JacuXx/Prompt-Copilot-Shopify${NC}\n"

read -p "¿Quieres probarlo ahora? (s/n): " probar
if [ "$probar" = "s" ] || [ "$probar" = "S" ]; then
    echo -e "\n${CYAN}🔄 Ejecutando comando...${NC}\n"
    npx github:JacuXx/Prompt-Copilot-Shopify --help
fi

echo -e "\n${CYAN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Configuración completa!${NC}\n"
