/**
 * Formateador de salida
 * Principio: Single Responsibility - Solo formatea la salida al usuario
 */

class OutputFormatter {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Muestra el encabezado de sincronización
   * @param {boolean} hasAuth - Si tiene autenticación configurada
   */
  showHeader(hasAuth) {
    this.logger.title('🔄 Sincronizando documentación de Shopify Copilot...');
    this.logger.emptyLine();
    
    if (hasAuth) {
      this.logger.info('🔐 Usando autenticación de GitHub (repo privado)');
    }
  }

  /**
   * Muestra el resumen de resultados
   * @param {SyncResult} result - Resultado de la sincronización
   */
  showSummary(result) {
    this.logger.emptyLine();
    this.logger.separator();
    this.logger.log('📊 Resumen:', 'bright');
    this.logger.success(`   Descargados/Actualizados: ${result.downloaded}`);
    
    if (result.skipped > 0) {
      this.logger.warning(`   Omitidos: ${result.skipped}`);
    }
    
    if (result.errors > 0) {
      this.logger.error(`   Errores: ${result.errors}`);
    }

    this.logger.emptyLine();
    
    if (result.isSuccessful()) {
      this.logger.success('✅ Sincronización completada!');
    } else if (result.hasErrors()) {
      this.logger.error('⚠️  Sincronización completada con errores');
    } else {
      this.logger.info('ℹ️  No hubo cambios que sincronizar');
    }

    this.logger.emptyLine();
    this.logger.info('💡 Tip: Los archivos están en ./docs/copilot/');
    this.logger.separator();
    this.logger.emptyLine();
  }

  /**
   * Muestra la ayuda del comando
   */
  showHelp() {
    this.logger.title('🚀 Shopify Copilot Docs Sync');
    this.logger.emptyLine();
    this.logger.log('Uso:', 'bright');
    this.logger.log('  npx shopify-copilot-sync [opciones]');
    this.logger.emptyLine();
    this.logger.log('Alias:', 'bright');
    this.logger.log('  scs [opciones]');
    this.logger.emptyLine();
    this.logger.log('Opciones:', 'bright');
    this.logger.log('  --help, -h     Muestra esta ayuda');
    this.logger.log('  --force, -f    Sobrescribe archivos existentes');
    this.logger.log('  --version, -v  Muestra la versión');
    this.logger.emptyLine();
    this.logger.log('Ejemplos:', 'bright');
    this.logger.log('  npx shopify-copilot-sync');
    this.logger.log('  scs --force');
    this.logger.emptyLine();
  }

  /**
   * Muestra la versión
   * @param {string} version - Versión de la aplicación
   */
  showVersion(version) {
    this.logger.log(`v${version}`, 'green');
  }

  /**
   * Muestra un error
   * @param {Error} error - Error a mostrar
   */
  showError(error) {
    this.logger.emptyLine();
    this.logger.error(`❌ Error: ${error.message}`);
  }
}

module.exports = OutputFormatter;
