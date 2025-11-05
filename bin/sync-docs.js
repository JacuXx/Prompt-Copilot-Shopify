#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const REPO_OWNER = 'JacuXx';
const REPO_NAME = 'Prompt-Copilot-Shopify';
const BRANCH = 'main';
const DOCS_PATH = 'docs/copilot';

// Token de GitHub (opcional, para repos privados)
// Puedes configurarlo como variable de entorno: GITHUB_TOKEN
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function showHelp() {
  log('\n🚀 Shopify Copilot Docs Sync', 'cyan');
  log('═══════════════════════════════════════\n', 'cyan');
  log('Uso:', 'bright');
  log('  npx shopify-copilot-sync [opciones]\n');
  log('Alias:', 'bright');
  log('  scs [opciones]\n');
  log('Opciones:', 'bright');
  log('  --help, -h     Muestra esta ayuda');
  log('  --force, -f    Sobrescribe archivos existentes');
  log('  --version, -v  Muestra la versión\n');
  log('Ejemplos:', 'bright');
  log('  npx shopify-copilot-sync');
  log('  scs --force\n');
}

function showVersion() {
  const packageJson = require('../package.json');
  log(`v${packageJson.version}`, 'green');
}

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {}
    };
    
    if (GITHUB_TOKEN) {
      options.headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }
    
    https.get(url, options, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadFile(response.headers.location, destPath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Error al descargar: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function getRepoContents(path) {
  return new Promise((resolve, reject) => {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`;
    
    const headers = {
      'User-Agent': 'shopify-copilot-docs-sync',
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }
    
    https.get(url, { headers }, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        if (response.statusCode !== 200) {
          let errorMsg = `Error API GitHub: ${response.statusCode}`;
          try {
            const errorData = JSON.parse(data);
            if (errorData.message) {
              errorMsg += `\n   Mensaje: ${errorData.message}`;
            }
            if (errorData.documentation_url) {
              errorMsg += `\n   Docs: ${errorData.documentation_url}`;
            }
          } catch (e) {
            // Si no se puede parsear, usar mensaje simple
          }
          errorMsg += `\n   URL: ${url}`;
          errorMsg += `\n\n   💡 Posibles soluciones:`;
          errorMsg += `\n   1. Verifica que el repositorio existe: https://github.com/${REPO_OWNER}/${REPO_NAME}`;
          errorMsg += `\n   2. Asegúrate de haber hecho push de la carpeta docs/copilot a GitHub`;
          errorMsg += `\n   3. Verifica que la rama '${BRANCH}' existe`;
          errorMsg += `\n   4. Si el repo es privado, necesitas configurar un token de acceso`;
          reject(new Error(errorMsg));
          return;
        }
        resolve(JSON.parse(data));
      });
    }).on('error', reject);
  });
}

async function syncDocs(force = false) {
  try {
    log('\n🔄 Sincronizando documentación de Shopify Copilot...', 'cyan');
    log('═══════════════════════════════════════════════════\n', 'cyan');
    
    if (GITHUB_TOKEN) {
      log('🔐 Usando autenticación de GitHub (repo privado)', 'blue');
    }

    const targetDir = path.join(process.cwd(), 'docs', 'copilot');
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      log('✓ Carpeta docs/copilot creada', 'green');
    }

    log('📡 Obteniendo lista de archivos del repositorio...', 'blue');
    const files = await getRepoContents(DOCS_PATH);

    if (!Array.isArray(files)) {
      throw new Error('Respuesta inesperada de la API de GitHub');
    }

    const markdownFiles = files.filter(file => 
      file.type === 'file' && file.name.endsWith('.md')
    );

    log(`\n📚 Se encontraron ${markdownFiles.length} archivos para sincronizar\n`, 'yellow');

    let downloaded = 0;
    let skipped = 0;
    let errors = 0;

    for (const file of markdownFiles) {
      const destPath = path.join(targetDir, file.name);
      const fileExists = fs.existsSync(destPath);

      if (fileExists && !force) {
        log(`⊘ ${file.name} (ya existe, usa --force para sobrescribir)`, 'yellow');
        skipped++;
        continue;
      }

      try {
        await downloadFile(file.download_url, destPath);
        log(`✓ ${file.name} ${fileExists ? '(actualizado)' : '(descargado)'}`, 'green');
        downloaded++;
      } catch (err) {
        log(`✗ ${file.name} (error: ${err.message})`, 'red');
        errors++;
      }
    }

    log('\n═══════════════════════════════════════════════════', 'cyan');
    log('📊 Resumen:', 'bright');
    log(`   Descargados/Actualizados: ${downloaded}`, 'green');
    if (skipped > 0) log(`   Omitidos: ${skipped}`, 'yellow');
    if (errors > 0) log(`   Errores: ${errors}`, 'red');
    log('\n✅ Sincronización completada!', 'green');
    log('\n💡 Tip: Los archivos están en ./docs/copilot/', 'cyan');
    log('═══════════════════════════════════════════════════\n', 'cyan');

  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  showVersion();
  process.exit(0);
}

const force = args.includes('--force') || args.includes('-f');

syncDocs(force);
